import { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';
import { IDataObject } from 'n8n-workflow/dist/Interfaces';
import { sanitizeDomain } from '../utils/SanitizeDomain';

export async function processGetManyOperation(
	this: IExecuteFunctions,
	resource: EasyNodeResourceType,
	itemIndex: number,
) {
	const credentials = await this.getCredentials('easyRedmineApi');

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
	const qs: IDataObject = {};
	if (queryId) {
		qs.query_id = queryId;
	}

	const domain = sanitizeDomain(credentials.domain as string);

	const returnAll = this.getNodeParameter('returnAll', itemIndex, false);

	const resultItems = [];

	let offset = 0;
	let limit = 100;
	if (!returnAll) {
		offset = this.getNodeParameter('offset', itemIndex, 0) as number;
		limit = this.getNodeParameter('limit', itemIndex, 100) as number;
	}

	let fetchedItemsCount = 0;
	do {
		const options: IHttpRequestOptions = {
			method: 'GET',
			url: `${domain}/${resource}.json`,
			qs: {
				...qs,
				offset,
				limit,
			},
			json: true,
		};

		const subResult = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'easyRedmineApi',
			options,
		);

		resultItems.push(...subResult[resource]);
		fetchedItemsCount = subResult[resource].length;
		offset += fetchedItemsCount;
	} while (fetchedItemsCount >= limit && returnAll);

	this.logger.info(`Fetched all ${resource} ${resultItems.length} items`);

	const result: any = {};
	result[resource] = resultItems;
	return result;
}
