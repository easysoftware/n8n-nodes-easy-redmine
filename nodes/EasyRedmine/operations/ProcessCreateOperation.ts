import { IExecuteFunctions, IRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';
import { CustomField } from './UpdateModel';
import { sanitizeDomain } from '../utils/SanitizeDomain';

interface IssueCreateOptions {
	statusId: number | undefined;
	trackerId: number | undefined;
	description: string | undefined;
	customFields: { field: CustomField[] } | undefined;
}

interface LeadCreateOptions {
	description: string | undefined;
	companyName: string | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export type OptionsWithCustomFields = IssueCreateOptions | LeadCreateOptions;

function convertCustomFields(options: OptionsWithCustomFields): CustomField[] | undefined {
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
		issue: {
			// subject,
			// project_id: projectId,
			// tracker_id: options.trackerId,
			// status_id: options.statusId,
			company_name: options.companyName,
			description: options.description,
			custom_fields: customFields,
		},
	};
}

export async function processCreateOperation(
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
