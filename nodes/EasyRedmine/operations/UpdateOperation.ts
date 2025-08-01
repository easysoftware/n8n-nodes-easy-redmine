import { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';
import {
	AccountUpdateOptions,
	AttendanceUpdateOptions,
	CustomField,
	IssueUpdateOptions,
	LeadUpdateOptions,
	OpportunityUpdateOptions,
	PersonalContactUpdateOptions,
	TimeEntryUpdateOptions,
	UpdateOptionsWithCustomFields,
	UserUpdateOptions,
} from './UpdateModel';
import { convertToEasyDate, extractBillingOptions, sanitizeDomain } from '../utils';

function convertCustomFields(options: UpdateOptionsWithCustomFields): CustomField[] | undefined {
	return options.customFields?.field.map((customField) => ({
		id: customField.id,
		value: customField.value,
	}));
}

function updateBodyForIssue(this: IExecuteFunctions, itemIndex: number): { [key: string]: any } {
	const options = this.getNodeParameter('issueUpdateOptions', itemIndex, {}) as IssueUpdateOptions;

	this.logger.debug(`Update issue with subject: ${JSON.stringify(options)}`);

	const customFields = convertCustomFields(options);
	return {
		issue: {
			subject: options.subject,
			description: options.description,
			projectId: options.projectId,
			parent_issue_id: options.parentIssueId,
			assigned_to_id: options.assignedToId,
			estimated_hours: options.estimatedHours,
			done_ratio: options.doneRatio,
			start_date: convertToEasyDate(options.startDate),
			due_date: convertToEasyDate(options.dueDate),
			is_private: options.isPrivate,
			priority_id: options.priorityId,
			status_id: options.statusId,
			tracker_id: options.trackerId,
			custom_fields: customFields,
		},
	};
}

function updateBodyForLead(this: IExecuteFunctions, itemIndex: number): { [key: string]: any } {
	const options = this.getNodeParameter('leadUpdateOptions', itemIndex, {}) as LeadUpdateOptions;

	this.logger.debug(`Update lead with subject: ${JSON.stringify(options)}`);

	const customFields = convertCustomFields(options);

	return {
		easy_lead: {
			description: options.description,
			company_name: options.companyName,
			custom_fields: customFields,
		},
	};
}

function updateBodyForOpportunity(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const options = this.getNodeParameter(
		'opportunityUpdateOptions',
		itemIndex,
		{},
	) as OpportunityUpdateOptions;

	const customFields = convertCustomFields(options);

	return {
		easy_crm_case: {
			name: options.name,
			description: options.description,
			custom_fields: customFields,
		},
	};
}

function updateBodyForAccount(this: IExecuteFunctions, itemIndex: number): { [key: string]: any } {
	const options = this.getNodeParameter(
		'accountsUpdateOptions',
		itemIndex,
		{},
	) as AccountUpdateOptions;

	const customFields = convertCustomFields(options);

	const primaryBillingOptions = extractBillingOptions(
		this,
		'accountPrimaryBillingUpdateOptions',
		itemIndex,
		true,
	);

	const contactBillingOptions = extractBillingOptions(
		this,
		'accountContactBillingUpdateOptions',
		itemIndex,
		false,
	);

	return {
		easy_contact: {
			firstname: options.firstname,
			easy_contact_industry_id: options.industryId,
			easy_contact_type_id: options.typeId,
			custom_fields: customFields,

			assigned_to_id: options.assignedToId,
			external_assigned_to_id: options.externalAssignedToId,
			easy_contact_status_id: options.contactStatusId,
			easy_contact_level_id: options.contactLevelId,
			author_id: options.authorId,
			account_opened: options.accountOpened,
			account_closed: options.accountClosed,
			easy_contact_customer_left_reason_id: options.customerLeftReasonId,

			contact_easy_billing_info_attributes: contactBillingOptions,
			primary_easy_billing_info_attributes: primaryBillingOptions,
		},
	};
}

function updateBodyForAttendance(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const options = this.getNodeParameter(
		'attendanceUpdateOptions',
		itemIndex,
		{},
	) as AttendanceUpdateOptions;

	const body = {
		easy_attendance: {
			arrival: options.arrival,
			departure: options.departure,
			description: options.description,
			easy_attendance_activity_id: options.activityId,
		},
	};

	this.logger.debug(`Updating attendance with body: ${JSON.stringify(body)}`);
	return body;
}

function updateBodyForPersonalContact(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const options = this.getNodeParameter(
		'personalContactUpdateOptions',
		itemIndex,
		{},
	) as PersonalContactUpdateOptions;

	const customFields = convertCustomFields(options);

	return {
		easy_personal_contact: {
			account_id: options.accountId,
			easy_partner_id: options.partnerId,
			first_name: options.firstname,
			last_name: options.lastname,
			email: options.email,
			job_title: options.jobTitle,
			custom_fields: customFields,
		},
	};
}

function updateBodyForTimeEntry(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const options = this.getNodeParameter(
		'timeEntryUpdateOptions',
		itemIndex,
		{},
	) as TimeEntryUpdateOptions;

	const customFields = convertCustomFields(options);

	return {
		time_entry: {
			comments: options.comment,
			hours: options.hours,
			spent_on: options.spentOn,
			project_id: options.projectId,
			activity_id: options.activityId,
			user_id: options.userId,
			custom_fields: customFields,
		},
	};
}

function updateBodyForUser(this: IExecuteFunctions, itemIndex: number): { [key: string]: any } {
	const options = this.getNodeParameter('userUpdateOptions', itemIndex, {}) as UserUpdateOptions;

	const customFields = convertCustomFields(options);

	return {
		user: {
			login: options.login,
			firstname: options.firstname,
			lastname: options.lastname,
			mail: options.mail,
			phone: options.phone,
			// status: options.status,
			// admin: options.admin,
			// password: options.password,
			custom_fields: customFields,
		},
	};
}

export async function updateOperation(
	this: IExecuteFunctions,
	resource: EasyNodeResourceType,
	itemIndex: number,
) {
	const credentials = await this.getCredentials('easyRedmineApi');
	const domain = sanitizeDomain(credentials.domain as string);

	let body: { [key: string]: any };
	switch (resource) {
		case EasyNodeResourceType.accounts:
			body = updateBodyForAccount.call(this, itemIndex);
			break;
		case EasyNodeResourceType.attendances:
			body = updateBodyForAttendance.call(this, itemIndex);
			break;
		case EasyNodeResourceType.issues:
			body = updateBodyForIssue.call(this, itemIndex);
			break;
		case EasyNodeResourceType.leads:
			body = updateBodyForLead.call(this, itemIndex);
			break;
		case EasyNodeResourceType.opportunities:
			body = updateBodyForOpportunity.call(this, itemIndex);
			break;
		case EasyNodeResourceType.personalContacts:
			body = updateBodyForPersonalContact.call(this, itemIndex);
			break;
		case EasyNodeResourceType.timeEntries:
			body = updateBodyForTimeEntry.call(this, itemIndex);
			break;
		case EasyNodeResourceType.users:
			body = updateBodyForUser.call(this, itemIndex);
			break;
		default:
			throw new Error('Unsupported resource type: ' + resource);
	}

	const id = this.getNodeParameter('id', itemIndex) as string;
	const options: IHttpRequestOptions = {
		method: 'PUT',
		url: `${domain}/${resource}/${id}.json`,
		body,
		json: true,
	};

	this.logger.debug(`Update ${resource} with ${JSON.stringify(options)}`);

	return await this.helpers.httpRequestWithAuthentication.call(this, 'easyRedmineApi', options);
}
