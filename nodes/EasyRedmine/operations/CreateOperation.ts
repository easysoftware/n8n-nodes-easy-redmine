import { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';
import { CustomField } from './UpdateModel';
import { sanitizeDomain } from '../utils/SanitizeDomain';
import {
	AccountCreateOptions, AttendanceCreateOptions,
	CreateOptionsWithCustomFields,
	IssueCreateOptions,
	LeadCreateOptions,
	OpportunityCreateOptions,
	PersonalContactCreateOptions,
	TimeEntryCreateOptions,
	UserCreateOptions,
} from './CreateModel';
import { convertToEasyDate } from '../utils/ConvertToEasyDate';

function convertCustomFields(options: CreateOptionsWithCustomFields): CustomField[] | undefined {
	return options.customFields?.field.map((customField) => ({
		id: customField.id,
		value: customField.value,
	}));
}


function createBodyForAccount(this: IExecuteFunctions, itemIndex: number): { [key: string]: any } {
	const options = this.getNodeParameter(
		'accountCreateOptions',
		itemIndex,
		{},
	) as AccountCreateOptions;

	this.logger.debug(`Create account with : ${JSON.stringify(options)}`);

	const customFields = convertCustomFields(options);
	return {
		easy_contact: {
			firstname: options.firstname,
			easy_contact_industry_id: options.industryId,
			easy_contact_type_id: options.typeId,
			custom_fields: customFields,
		},
	};
}

export function createBodyForAttendance(this: IExecuteFunctions, itemIndex: number): { [key: string]: any } {
	const options = this.getNodeParameter(
		'attendanceCreateOptions',
		itemIndex,
		{},
	) as AttendanceCreateOptions;

	const arrival = this.getNodeParameter('arrival', itemIndex) as string;

	const body = {
		easy_attendance: {
			arrival,
			departure: options.departure,
			description: options.description,
			easy_attendance_activity_id: options.activityId,
		},
	};
	this.logger.debug(`Create attendance with : ${JSON.stringify(body)}`);
	return body;
}

function createBodyForIssue(this: IExecuteFunctions, itemIndex: number): { [key: string]: any } {
	const options = this.getNodeParameter('issueCreateOptions', itemIndex, {}) as IssueCreateOptions;

	this.logger.debug(`Create issue with subject: ${JSON.stringify(options)}`);

	const subject = this.getNodeParameter('subject', itemIndex) as string;
	const projectId = this.getNodeParameter('projectId', itemIndex) as string;
	const customFields = convertCustomFields(options);

	return {
		issue: {
			subject,
			description: options.description,
			project_id: projectId,
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

function createBodyForLead(this: IExecuteFunctions, itemIndex: number): { [key: string]: any } {
	const options = this.getNodeParameter('leadCreateOptions', itemIndex, {}) as LeadCreateOptions;

	this.logger.debug(`Create lead with subject: ${JSON.stringify(options)}`);

	const customFields = convertCustomFields(options);
	return {
		easy_lead: {
			company_name: options.companyName,
			description: options.description,
			custom_fields: customFields,
		},
	};
}

function createBodyForOpportunity(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const options = this.getNodeParameter(
		'opportunityCreateOptions',
		itemIndex,
		{},
	) as OpportunityCreateOptions;

	const projectId = this.getNodeParameter('projectId', itemIndex) as string;
	const name = this.getNodeParameter('name', itemIndex) as string;
	const accountId = this.getNodeParameter('accountId', itemIndex) as string;

	this.logger.debug(`Create opportunity with subject: ${JSON.stringify(options)}`);

	const customFields = convertCustomFields(options);
	return {
		easy_crm_case: {
			// subject,
			project_id: projectId,
			name,
			account_id: accountId,
			custom_fields: customFields,
		},
	};
}

function createBodyForPersonalContact(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const options = this.getNodeParameter(
		'personalContactCreateOptions',
		itemIndex,
		{},
	) as PersonalContactCreateOptions;

	const firstname = this.getNodeParameter('firstname', itemIndex) as string;
	const lastname = this.getNodeParameter('lastname', itemIndex) as string;
	const email = this.getNodeParameter('email', itemIndex) as string;

	this.logger.debug(`Create personal contact with : ${JSON.stringify(options)}`);

	const customFields = convertCustomFields(options);
	const x = {
		easy_personal_contact: {
			account_id: options.accountId,
			easy_partner_id: options.partnerId,
			first_name: firstname,
			last_name: lastname,
			email,
			job_title: options.jobTitle,
			custom_fields: customFields,
		},
	};
	this.logger.debug(`Create personal contact with : ${JSON.stringify(x)}`);

	return x;
}

function createBodyForTimeEntry(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const options = this.getNodeParameter(
		'timeEntryCreateOptions',
		itemIndex,
		{},
	) as TimeEntryCreateOptions;

	const hours = this.getNodeParameter('hours', itemIndex) as number;

	const customFields = convertCustomFields(options);
	const body = {
		time_entry: {
			hours,
			activity_id: options.activityId,
			comments: options.comment,
			custom_fields: customFields,
			project_id: options.projectId,
			spent_on: options.spentOn,
			user_id: options.userId,
		},
	};
	this.logger.debug(`Create time entry with : ${JSON.stringify(body)}`);
	return body;
}

function createBodyForUser(this: IExecuteFunctions, itemIndex: number): { [key: string]: any } {
	const options = this.getNodeParameter('userCreateOptions', itemIndex, {}) as UserCreateOptions;

	const login = this.getNodeParameter('login', itemIndex) as string;
	const firstname = this.getNodeParameter('firstname', itemIndex) as string;
	const lastname = this.getNodeParameter('lastname', itemIndex) as string;
	const email = this.getNodeParameter('email', itemIndex) as string;

	const customFields = convertCustomFields(options);
	const body = {
		user: {
			login,
			firstname: firstname,
			lastname: lastname,
			mail: email,
			phone: options.phone,
			custom_fields: customFields,
		},
	};
	this.logger.debug(`Create user with : ${JSON.stringify(body)}`);
	return body;
}

export async function createOperation(
	this: IExecuteFunctions,
	resource: EasyNodeResourceType,
	itemIndex: number,
) {
	const credentials = await this.getCredentials('easyRedmineApi');
	const domain = sanitizeDomain(credentials.domain as string);

	let body: { [key: string]: any };
	switch (resource) {
		case EasyNodeResourceType.accounts:
			body = createBodyForAccount.call(this, itemIndex);
			break;
		case EasyNodeResourceType.attendances:
			body = createBodyForAttendance.call(this, itemIndex);
			break;
		case EasyNodeResourceType.issues:
			body = createBodyForIssue.call(this, itemIndex);
			break;
		case EasyNodeResourceType.leads:
			body = createBodyForLead.call(this, itemIndex);
			break;
		case EasyNodeResourceType.opportunities:
			body = createBodyForOpportunity.call(this, itemIndex);
			break;
		case EasyNodeResourceType.personalContacts:
			body = createBodyForPersonalContact.call(this, itemIndex);
			break;
		case EasyNodeResourceType.timeEntries:
			body = createBodyForTimeEntry.call(this, itemIndex);
			break;
		case EasyNodeResourceType.users:
			body = createBodyForUser.call(this, itemIndex);
			break;
		default:
			throw new Error('Unsupported resource type: ' + resource);
	}

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${domain}/${resource}.json`,
		body,
		json: true,
	};

	this.logger.debug(`Create ${resource} with ${JSON.stringify(options)}`);

	return await this.helpers.httpRequestWithAuthentication.call(this, 'easyRedmineApi', options);
}
