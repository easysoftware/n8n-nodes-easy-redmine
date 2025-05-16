import { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';
import { sanitizeDomain } from '../utils/SanitizeDomain';

export async function addCommentOperation(
	this: IExecuteFunctions,
	resource: EasyNodeResourceType,
	itemIndex: number,
) {
	const credentials = await this.getCredentials('easyRedmineApi');
	const domain = sanitizeDomain(credentials.domain as string);

	const id = this.getNodeParameter('id', itemIndex) as string;
	const comment = this.getNodeParameter('comment', itemIndex) as string;
	const entity: { [key: string]: any } = {
		notes: comment,
	};

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
		case EasyNodeResourceType.personalContacts:
			body['easy_personal_contact'] = entity;
			break;
		default:
			throw new Error('Unsupported resource type: ' + resource);
	}

	const options: IHttpRequestOptions = {
		method: 'PUT',
		url: `${domain}/${resource}/${id}.json`,
		body,
		json: true,
	};

	this.logger.debug(`Add comment ${resource} with ${JSON.stringify(options)}`);

	return await this.helpers.httpRequestWithAuthentication.call(this, 'easyRedmineApi', options);
}
