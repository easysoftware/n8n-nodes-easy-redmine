import { IExecuteFunctions, IRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';

export async function processGetOneOperation(
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

	const options = {
		method: 'GET',
		uri: `${domain}/${resource}/${id}.json`,
		json: true,
	} satisfies IRequestOptions;

	this.logger.debug(`Get one ${resource} with ${JSON.stringify(options)}`);

	return await this.helpers.requestWithAuthentication.call(this, 'easyRedmineApi', options);
}
