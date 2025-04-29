import { IExecuteFunctions, IRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';

export async function processAddCommentOperation(
	this: IExecuteFunctions,
	resource: EasyNodeResourceType,
	itemIndex: number,
) {
	const credentials = await this.getCredentials('easyRedmineApi');

	let domain = credentials.domain as string;
	if (domain.endsWith('/')) {
		domain = domain.slice(0, -1);
	}

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
		default:
			throw new Error('Unsupported resource type: ' + resource);
	}

	const options = {
		method: 'PUT',
		uri: `${domain}/${resource}/${id}.json`,
		body,
		json: true,
	} satisfies IRequestOptions;

	this.logger.debug(`Add comment ${resource} with ${JSON.stringify(options)}`);

	return await this.helpers.requestWithAuthentication.call(this, 'easyRedmineApi', options);
}
