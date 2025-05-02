import { IExecuteFunctions, IRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';

export async function processUpdateOperation(
	this: IExecuteFunctions,
	resource: EasyNodeResourceType,
	itemIndex: number,
) {
	const credentials = await this.getCredentials('easyRedmineApi');

	let domain = credentials.domain as string;
	if (domain.endsWith('/')) {
		domain = domain.slice(0, -1);
	}

	let updateOptName: string;
	switch (resource) {
		case EasyNodeResourceType.issues:
			updateOptName = 'update_options_issues';
			break;
		case EasyNodeResourceType.leads:
			updateOptName = 'update_options_leads';
			break;
		case EasyNodeResourceType.opportunities:
			updateOptName = 'update_options_opportunities';
			break;
		case EasyNodeResourceType.accounts:
			updateOptName = 'update_options_accounts';
			break;
		case EasyNodeResourceType.personalAccounts:
			updateOptName = 'update_options_personal_accounts';
			break;
		default:
			throw new Error(`Update options for resource ${resource} was not implemented`);
	}
	const { subject, name, firstname, description } = this.getNodeParameter(
		updateOptName,
		itemIndex,
		{},
	) as {
		subject: string | undefined;
		name: string | undefined;
		firstname: string | undefined;
		description: string | undefined;
	};
	this.logger.debug(`Subject: ${subject}`);
	this.logger.debug(`Description: ${description}`);

	const entity: { [key: string]: any } = {};
	if (subject !== undefined) {
		entity['subject'] = subject;
	}
	if (name !== undefined) {
		entity['name'] = name;
	}
	if (firstname !== undefined) {
		entity['firstname'] = firstname;
	}
	if (description !== undefined) {
		entity['description'] = description;
	}

	const body: { [key: string]: any } = {};
	switch (resource) {
		case EasyNodeResourceType.issues:
			body['issue'] = entity;
			break;
		case EasyNodeResourceType.leads:
			body['easy_lead'] = entity;
			break;
		case EasyNodeResourceType.opportunities:
			body['easy_crm_case'] = entity;
			break;
		case EasyNodeResourceType.accounts:
			body['easy_contact'] = entity;
			break;
		case EasyNodeResourceType.personalAccounts:
			body['easy_personal_account'] = entity;
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
