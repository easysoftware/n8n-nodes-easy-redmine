import { ILoadOptionsFunctions, INodePropertyOptions, IRequestOptions } from 'n8n-workflow';

export type EasyQueryType =
	| 'EasyIssueQuery'
	| 'EasyLeadQuery'
	| 'EasyCrmCaseQuery'
	| 'EasyContactQuery'
	| 'EasyPersonalContactQuery';

export async function getEasyQueries(this: ILoadOptionsFunctions, type: EasyQueryType) {
	const resource = this.getCurrentNodeParameter('resource');
	if (!resource) {
		return [];
	}

	let offset = 0;
	let pageSize = 100;
	let fetchedItems = pageSize;
	const creds = await this.getCredentials('easyRedmineApi');
	let page = 1;
	const allItems: INodePropertyOptions[] = [];
	while (fetchedItems >= pageSize) {
		this.logger.debug(`Loading page ${page} for ${type}`);
		const options: IRequestOptions = {
			method: 'GET',
			qs: {
				type: type,
				offset: offset,
				limit: pageSize,
			},
			uri: `${creds['domain']}/easy_queries.json`,
			json: true,
		};
		const result = await this.helpers.requestWithAuthentication.call(
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
