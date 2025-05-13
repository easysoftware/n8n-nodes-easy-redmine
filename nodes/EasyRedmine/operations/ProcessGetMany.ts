import { IExecuteFunctions, IRequestOptions } from 'n8n-workflow';
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
			query_id_parameter = 'issue_query_id';
			break;
		case EasyNodeResourceType.leads:
			query_id_parameter = 'lead_query_id';
			break;
		case EasyNodeResourceType.opportunities:
			query_id_parameter = 'opportunity_query_id';
			break;
		case EasyNodeResourceType.accounts:
			query_id_parameter = 'account_query_id';
			break;
		case EasyNodeResourceType.personalContacts:
			query_id_parameter = 'personalContactQueryId';
			break;
		case EasyNodeResourceType.users:
			query_id_parameter = 'user_query_id';
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

	const options = {
		method: 'GET',
		uri: `${domain}/${resource}.json`,
		qs,
		json: true,
	} satisfies IRequestOptions;

	this.logger.info(`Get many ${resource} with ${JSON.stringify(options)}`);

	return await this.helpers.requestWithAuthentication.call(this, 'easyRedmineApi', options);
}
