import { IExecuteFunctions, IHttpRequestOptions, IRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';
import { IDataObject } from 'n8n-workflow/dist/Interfaces';

export async function processGetManyOperation(
	this: IExecuteFunctions,
	resource: EasyNodeResourceType,
	itemIndex: number,
) {
	const credentials = await this.getCredentials('easyRedmineApi');
	const qs: IDataObject = {
		limit: 100,
	};

	let query_id_parameter: string;
	switch (resource) {
		case EasyNodeResourceType.issues:
			query_id_parameter = 'issueQueryId';
			break;
		case EasyNodeResourceType.leads:
			query_id_parameter = 'leadQueryId';
			break;
		case EasyNodeResourceType.opportunities:
			query_id_parameter = 'opportunityQueryId';
			break;
		case EasyNodeResourceType.accounts:
			query_id_parameter = 'accountQueryId';
			break;
		case EasyNodeResourceType.personalContacts:
			query_id_parameter = 'personalContactQueryId';
			break;
		case EasyNodeResourceType.users:
			query_id_parameter = 'userQueryId';
			break;
		default:
			throw new Error(`Unsupported resource type: ${resource}`);
	}

	const queryId = this.getNodeParameter(query_id_parameter, itemIndex);
	if (queryId) {
		qs.query_id = queryId;
	}

	let domain = credentials.domain as string;
	if (domain.endsWith('/')) {
		domain = domain.slice(0, -1);
	}

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${domain}/${resource}.json`,
		qs,
		json: true,
	};

	this.logger.info(`Get many ${resource} with ${JSON.stringify(options)}`);

	return await this.helpers.httpRequestWithAuthentication.call(this, 'easyRedmineApi', options);
}
