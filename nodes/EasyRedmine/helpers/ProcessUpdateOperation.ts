import { IExecuteFunctions, IRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';
import {
	AccountUpdateOptions,
	CustomField,
	IssueUpdateOptions,
	LeadUpdateOptions,
	OpportunityUpdateOptions,
	OptionsWithCustomFields,
	UserUpdateOptions,
} from './UpdateModel';
import { sanitizeDomain } from '../utils/SanitizeDomain';

function convertCustomFields(options: OptionsWithCustomFields): CustomField[] | undefined {
	return options.customFields?.field.map((customField) => ({
		id: customField.id,
		value: customField.value,
	}));
}

function createUpdateBodyForIssue(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
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

function createUpdateBodyForLead(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const options = this.getNodeParameter('update_options_lead', itemIndex, {}) as LeadUpdateOptions;

	this.logger.info(`Update lead with subject: ${JSON.stringify(options)}`);

	const customFields = convertCustomFields(options);

	return {
		easy_lead: {
			description: options.description,
			custom_fields: customFields,
		},
	};
}

function createUpdateBodyForOpportunity(
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

function createUpdateBodyForAccount(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
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

function createUpdateBodyForPersonalAccount(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	// update_options_personal_account
	return {
		easy_personal_contact: {},
	};
}

function createUpdateBodyForUser(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
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

export async function processUpdateOperation(
	this: IExecuteFunctions,
	resource: EasyNodeResourceType,
	itemIndex: number,
) {
	const credentials = await this.getCredentials('easyRedmineApi');
	const domain = sanitizeDomain(credentials.domain as string);

	let body: { [key: string]: any };
	switch (resource) {
		case EasyNodeResourceType.issues:
			body = createUpdateBodyForIssue.call(this, itemIndex);
			break;
		case EasyNodeResourceType.leads:
			body = createUpdateBodyForLead.call(this, itemIndex);
			break;
		case EasyNodeResourceType.opportunities:
			body = createUpdateBodyForOpportunity.call(this, itemIndex);
			break;
		case EasyNodeResourceType.accounts:
			body = createUpdateBodyForAccount.call(this, itemIndex);
			break;
		case EasyNodeResourceType.personalAccounts:
			body = createUpdateBodyForPersonalAccount.call(this, itemIndex);
			break;
		case EasyNodeResourceType.users:
			body = createUpdateBodyForUser.call(this, itemIndex);
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
