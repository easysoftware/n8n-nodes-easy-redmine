import { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';
import { sanitizeDomain } from '../utils/SanitizeDomain';

export async function processGetOneOperation(
	this: IExecuteFunctions,
	resource: EasyNodeResourceType,
	itemIndex: number,
) {
	const credentials = await this.getCredentials('easyRedmineApi');
	const domain = sanitizeDomain(credentials.domain as string);
	const id = this.getNodeParameter('id', itemIndex) as string;

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${domain}/${resource}/${id}.json`,
		json: true,
	};

	this.logger.debug(`Get one ${resource} with ${JSON.stringify(options)}`);

	return await this.helpers.httpRequestWithAuthentication.call(this, 'easyRedmineApi', options);
}
