import { IExecuteFunctions, IRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';
import { CustomField } from './UpdateModel';
import { sanitizeDomain } from '../utils/SanitizeDomain';
import {
	CreateOptionsWithCustomFields,
	IssueCreateOptions,
	LeadCreateOptions,
	OpportunityCreateOptions, PersonalContactCreateOptions, UserCreateOptions,
} from './CreateModel';


function convertCustomFields(options: CreateOptionsWithCustomFields): CustomField[] | undefined {
	return options.customFields?.field.map((customField) => ({
		id: customField.id,
		value: customField.value,
	}));
}

function createCreateBodyForIssue(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const options = this.getNodeParameter(
		'create_options_issue',
		itemIndex,
		{},
	) as IssueCreateOptions;

	this.logger.info(`Create issue with subject: ${JSON.stringify(options)}`);

	const subject = this.getNodeParameter('subject', itemIndex) as string;
	const projectId = this.getNodeParameter('projectId', itemIndex) as string;
	const customFields = convertCustomFields(options);
	return {
		issue: {
			subject,
			project_id: projectId,
			tracker_id: options.trackerId,
			status_id: options.statusId,
			description: options.description,
			custom_fields: customFields,
		},
	};
}

function createCreateBodyForLead(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const options = this.getNodeParameter('create_options_lead', itemIndex, {}) as LeadCreateOptions;

	this.logger.info(`Create lead with subject: ${JSON.stringify(options)}`);

	const customFields = convertCustomFields(options);
	return {
		easy_lead: {
			company_name: options.companyName,
			description: options.description,
			custom_fields: customFields,
		},
	};
}

function creteCreateBodyForOpportunity(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const options = this.getNodeParameter(
		'create_options_opportunity',
		itemIndex,
		{},
	) as OpportunityCreateOptions;

	const projectId = this.getNodeParameter('projectId', itemIndex) as string;
	const name = this.getNodeParameter('name', itemIndex) as string;
	const accountId = this.getNodeParameter('accountId', itemIndex) as string;

	this.logger.info(`Create opportunity with subject: ${JSON.stringify(options)}`);

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

	this.logger.info(`Create personal contact with : ${JSON.stringify(options)}`);

	const customFields = convertCustomFields(options);
	return {
		easy_personal_contact: {
			custom_fields: customFields,
		},
	};
}

function createCreateBodyForUser(
	this: IExecuteFunctions,
	itemIndex: number,
): { [key: string]: any } {
	const options = this.getNodeParameter(
		'create_options_user',
		itemIndex,
		{},
	) as UserCreateOptions;

	const login = this.getNodeParameter('login', itemIndex) as string;
	const firstname = this.getNodeParameter('firstname', itemIndex) as string;
	const lastname = this.getNodeParameter('lastname', itemIndex) as string;
	const email = this.getNodeParameter('email', itemIndex) as string;

	this.logger.info(`Create user with : ${JSON.stringify(options)}`);

	const customFields = convertCustomFields(options);
	return {
		user: {
			login,
			firstname: firstname,
			lastname: lastname,
			mail: email,
			phone: options.phone,
			custom_fields: customFields,
		},
	};
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
		case EasyNodeResourceType.issues:
			body = createCreateBodyForIssue.call(this, itemIndex);
			break;
		case EasyNodeResourceType.leads:
			body = createCreateBodyForLead.call(this, itemIndex);
			break;
		case EasyNodeResourceType.opportunities:
			body = creteCreateBodyForOpportunity.call(this, itemIndex);
			break;
		case EasyNodeResourceType.personalContacts:
			body = createBodyForPersonalContact.call(this, itemIndex);
			break;
		case EasyNodeResourceType.users:
			body = createCreateBodyForUser.call(this, itemIndex);
			break;
		default:
			throw new Error('Unsupported resource type: ' + resource);
	}

	const options = {
		method: 'POST',
		uri: `${domain}/${resource}.json`,
		body,
		json: true,
	} satisfies IRequestOptions;

	this.logger.info(`Create ${resource} with ${JSON.stringify(options)}`);

	return await this.helpers.requestWithAuthentication.call(this, 'easyRedmineApi', options);
}
