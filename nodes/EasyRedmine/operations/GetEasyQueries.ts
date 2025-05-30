import {
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';
import { sanitizeDomain } from '../utils/SanitizeDomain';

export type EasyQueryType =
	| 'EasyIssueQuery'
	| 'EasyLeadQuery'
	| 'EasyCrmCaseQuery'
	| 'EasyContactQuery'
	| 'EasyPersonalContactQuery'
	| 'EasyTimeEntryQuery'
	| 'EasyUserQuery';

export async function getEasyQueries(this: ILoadOptionsFunctions, type: EasyQueryType) {
	const resource = this.getCurrentNodeParameter('resource');
	if (!resource) {
		return [];
	}

	let offset = 0;
	let pageSize = 100;
	let fetchedItems = pageSize;
	const credentials = await this.getCredentials('easyRedmineApi');
	let page = 1;
	const allItems: INodePropertyOptions[] = [];
	const domain = sanitizeDomain(credentials.domain as string);

	while (fetchedItems >= pageSize) {
		this.logger.debug(`Loading page ${page} for ${type}`);

		const options: IHttpRequestOptions = {
			method: 'GET',
			qs: {
				type: type,
				offset: offset,
				limit: pageSize,
			},
			url: `${domain}/easy_queries.json`,
			json: true,
		};
		const result = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'easyRedmineApi', // Credential name
			options,
		);
		if (!result) {
			this.logger.error(`Error loading page ${page}`);
			break;
		}
		const items = result['easy_queries'];
		for (const item of items) {
			allItems.push({
				name: item.name,
				value: item.id,
			});
		}

		fetchedItems = items.length;
		offset += pageSize;
		page += 1;
	}
	return allItems;
}
