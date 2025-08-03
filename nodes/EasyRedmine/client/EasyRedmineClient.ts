import { IHttpRequestOptions, IAllExecuteFunctions, RequestHelperFunctions } from 'n8n-workflow';
import { EasyProject } from './EasyProject';
import { sanitizeDomain } from '../utils';

interface ModifyRequestOptions {
	options: IHttpRequestOptions;
	offset: number;
	pageSize: number;
}

interface ListRequestOptions {
	modifyOptionsFn: (options: ModifyRequestOptions) => void;
	pageSize: number;
	resultItemKey: string;
}

export class EasyRedmineClient {
	constructor(
		private readonly that: IAllExecuteFunctions, // FunctionsBase,
		private readonly helpers: RequestHelperFunctions,
	) {}

	async listProjects(): Promise<EasyProject[]> {
		const baseUrl = await this.baseUrl();
		return await this.listRequest({
			modifyOptionsFn: ({ options, offset, pageSize }) => {
				options.method = 'GET';
				options.url = `${baseUrl}/projects.json`;
				options.qs = {
					offset,
					limit: pageSize,
				};
			},
			pageSize: 100,
			resultItemKey: 'projects',
		});
	}

	private async baseUrl(): Promise<string> {
		const cred = await this.that.getCredentials('easyRedmineApi');
		return sanitizeDomain(cred.domain as string);
	}

	private async listRequest(options: ListRequestOptions): Promise<any[]> {
		const that = this.that;

		let offset = 0;
		let pageSize = options.pageSize;
		let fetchedItemsCount = pageSize;
		const credentials = await that.getCredentials('easyRedmineApi');
		let page = 1;
		const allItems = [];
		const domain = sanitizeDomain(credentials.domain as string);

		while (fetchedItemsCount >= pageSize) {
			that.logger.debug(`Loading page ${page}`);

			const requestOptions: IHttpRequestOptions = {
				url: `${domain}/easy_queries.json`,
				json: true,
			};
			// Modify the request options using the provided function
			options.modifyOptionsFn({ options: requestOptions, offset, pageSize });

			const result = await this.helpers.httpRequestWithAuthentication.call(
				that,
				'easyRedmineApi', // Credential name
				requestOptions,
			);
			if (!result) {
				that.logger.error(`Error loading page ${page}`);
				break;
			}
			const items = result[options.resultItemKey];
			allItems.push(...items);

			fetchedItemsCount = items.length;
			offset += pageSize;
			page += 1;
		}
		return allItems;
	}
}
