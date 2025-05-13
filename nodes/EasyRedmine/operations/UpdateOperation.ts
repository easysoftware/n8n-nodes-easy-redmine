import { IExecuteFunctions, IRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';
import {
	AccountUpdateOptions,
	CustomField,
	IssueUpdateOptions,
	LeadUpdateOptions,
	OpportunityUpdateOptions,
	UpdateOptionsWithCustomFields, PersonalContactUpdateOptions,
	UserUpdateOptions,
} from './UpdateModel';
import { sanitizeDomain } from '../utils/SanitizeDomain';

function convertCustomFields(options: UpdateOptionsWithCustomFields): CustomField[] | undefined {
	return options.customFields?.field.map((customField) => ({
		id: customField.id,
		value: customField.value,
	}));
}

function updateBodyForIssue(this: IExecuteFunctions, itemIndex: number): { [key: string]: any } {
	const options = this.getNodeParameter(
		'update_options_issue',
		itemIndex,
		{},
	) as IssueUpdateOptions;

	this.logger.info(`Update issue with subject: ${JSON.stringify(options)}`);

	const customFields = convertCustomFields(options);
	return {
		issue: {
			subject: options.subject,
			description: options.description,
			custom_fields: customFields,
		},
	};
}

function updateBodyForLead(this: IExecuteFunctions, itemIndex: number): { [key: string]: any } {
	const options = this.getNodeParameter('update_options_lead', itemIndex, {}) as LeadUpdateOptions;

	this.logger.info(`Update lead with subject: ${JSON.stringify(options)}`);

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
		'update_options_opportunity',
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
		'update_options_accounts',
		itemIndex,
		{},
	) as AccountUpdateOptions;

	const customFields = convertCustomFields(options);

	return {
		easy_contact: {
			firstname: options.firstname,
			custom_fields: customFields,
		},
	};
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

function updateBodyForUser(this: IExecuteFunctions, itemIndex: number): { [key: string]: any } {
	const options = this.getNodeParameter('update_options_user', itemIndex, {}) as UserUpdateOptions;

	const customFields = convertCustomFields(options);

	return {
		user: {
			login: options.login,
			firstname: options.firstname,
			lastname: options.lastname,
			mail: options.mail,
			phone: options.phone,
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
		case EasyNodeResourceType.issues:
			body = updateBodyForIssue.call(this, itemIndex);
			break;
		case EasyNodeResourceType.leads:
			body = updateBodyForLead.call(this, itemIndex);
			break;
		case EasyNodeResourceType.opportunities:
			body = updateBodyForOpportunity.call(this, itemIndex);
			break;
		case EasyNodeResourceType.accounts:
			body = updateBodyForAccount.call(this, itemIndex);
			break;
		case EasyNodeResourceType.personalContacts:
			body = updateBodyForPersonalContact.call(this, itemIndex);
			break;
		case EasyNodeResourceType.users:
			body = updateBodyForUser.call(this, itemIndex);
			break;
		default:
			throw new Error('Unsupported resource type: ' + resource);
	}

	const id = this.getNodeParameter('id', itemIndex) as string;
	const options = {
		method: 'PUT',
		uri: `${domain}/${resource}/${id}.json`,
		body,
		json: true,
	} satisfies IRequestOptions;

	this.logger.info(`Update ${resource} with ${JSON.stringify(options)}`);

	return await this.helpers.requestWithAuthentication.call(this, 'easyRedmineApi', options);
}
