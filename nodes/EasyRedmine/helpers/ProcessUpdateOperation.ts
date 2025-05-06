import { IExecuteFunctions, IRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';
import {
	AccountUpdateOptions,
	IssueUpdateOptions,
	LeadUpdateOptions,
	OpportunityUpdateOptions,
	UserUpdateOptions,
} from './UpdateModel';
import { sanitizeDomain } from '../utils/SanitizeDomain';

function createUpdateBodyForIssue(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const { subject, description } = this.getNodeParameter(
		'update_options_issue',
		itemIndex,
		{},
	) as IssueUpdateOptions;

	return {
		issue: {
			subject,
			description,
		},
	};
}

function createUpdateBodyForLead(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const { description } = this.getNodeParameter(
		'update_options_lead',
		itemIndex,
		{},
	) as LeadUpdateOptions;

	return {
		easy_lead: {
			description,
		},
	};
}

function createUpdateBodyForOpportunity(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const { name, description } = this.getNodeParameter(
		'update_options_opportunity',
		itemIndex,
		{},
	) as OpportunityUpdateOptions;

	return {
		easy_crm_case: {
			name,
			description,
		},
	};
}

function createUpdateBodyForAccount(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const { firstname } = this.getNodeParameter(
		'update_options_accounts',
		itemIndex,
		{},
	) as AccountUpdateOptions;

	return {
		easy_contact: {
			firstname,
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
	const { login, firstname, lastname, mail, phone } = this.getNodeParameter(
		'update_options_user',
		itemIndex,
		{},
	) as UserUpdateOptions;
	return {
		user: { login, firstname, lastname, mail, phone },
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
