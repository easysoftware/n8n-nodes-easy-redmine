import { IHttpRequestOptions, IAllExecuteFunctions, RequestHelperFunctions } from 'n8n-workflow';
import { Project } from './Project';
import { sanitizeDomain } from '../utils';
import { EasyIssue, EasyIssueStatus } from './Issue';
import { EasyAutocompleteItem } from './Autocomplete';
import { EasyQueryInfo, EasyQueryType } from './Resources';

interface ModifyRequestOptions {
	options: IHttpRequestOptions;
	offset: number;
	pageSize: number;
}

interface ListRequestOptions {
	/**
	 * Function to modify the request options for each page. Note that you have to specify
	 * offset and limit params.
	 */
	modifyOptionsFn: (options: ModifyRequestOptions) => void;
	/**
	 * The default page size for pagination.
	 */
	pageSize: number;
	resultItemKey: string;
}

export class EasyRedmineClient {
	constructor(
		private readonly that: IAllExecuteFunctions, // FunctionsBase,
		private readonly helpers: RequestHelperFunctions,
	) {}

	async listProjects(): Promise<Project[]> {
		const baseUrl = await this.baseUrl();
		return await this.listAllItems({
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

	async getProject(projectId: number | undefined): Promise<Project> {
		const baseUrl = await this.baseUrl();
		this.that.logger.debug(`Loading Project ${projectId}`);

		const options: IHttpRequestOptions = {
			method: 'GET',
			url: `${baseUrl}/projects/${projectId}.json`,
			qs: {
				include: 'trackers',
			},
			json: true,
		};
		const result = await this.helpers.httpRequestWithAuthentication.call(
			this.that,
			'easyRedmineApi', // Credential name
			options,
		);
		return result['project'] as Project;
	}

	async getIssue(issueId: number): Promise<EasyIssue> {
		const baseUrl = await this.baseUrl();
		this.that.logger.debug(`Loading Project ${issueId}`);

		const options: IHttpRequestOptions = {
			method: 'GET',
			url: `${baseUrl}/issues/${issueId}.json`,
			qs: {
				include: 'trackers',
			},
			json: true,
		};
		const result = await this.helpers.httpRequestWithAuthentication.call(
			this.that,
			'easyRedmineApi', // Credential name
			options,
		);
		return result['issue'] as EasyIssue;
	}

	async listAllIssueStatuses(): Promise<EasyIssueStatus[]> {
		const baseUrl = await this.baseUrl();
		this.that.logger.debug(`Loading all issue statuses`);

		const options: IHttpRequestOptions = {
			method: 'GET',
			url: `${baseUrl}/issue_statuses.json`,
			json: true,
		};
		const result = await this.helpers.httpRequestWithAuthentication.call(
			this.that,
			'easyRedmineApi', // Credential name
			options,
		);
		return result['issue_statuses'] as EasyIssueStatus[];
	}

	async listAutocompletePriorities(): Promise<EasyAutocompleteItem[]> {
		const baseUrl = await this.baseUrl();
		this.that.logger.debug(`Loading Autocomplete Priorities`);

		const options: IHttpRequestOptions = {
			method: 'GET',
			url: `${baseUrl}/easy_autocompletes/issue_priorities.json`,
			json: true,
		};
		const result = await this.helpers.httpRequestWithAuthentication.call(
			this.that,
			'easyRedmineApi', // Credential name
			options,
		);
		return result as EasyAutocompleteItem[];
	}

	async listEasyQueries(type: EasyQueryType): Promise<EasyQueryInfo[]> {
		const baseUrl = await this.baseUrl();
		return await this.listAllItems({
			modifyOptionsFn: ({ options, offset, pageSize }) => {
				options.method = 'GET';
				options.url = `${baseUrl}/easy_queries.json`;
				options.qs = {
					type: type,
					offset,
					limit: pageSize,
				};
			},
			pageSize: 100,
			resultItemKey: 'easy_queries',
		});
	}

	/**
	 * Returns the base URL for the EasyRedmine API.
	 */
	private async baseUrl(): Promise<string> {
		const cred = await this.that.getCredentials('easyRedmineApi');
		return sanitizeDomain(cred.domain as string);
	}

	/**
	 * Helper method to perform correct paginated listing of all items.
	 */
	private async listAllItems(options: ListRequestOptions): Promise<any[]> {
		const that = this.that;

		let offset = 0;
		let pageSize = options.pageSize;
		let fetchedItemsCount = pageSize;
		let page = 1;
		const allItems = [];

		while (fetchedItemsCount >= pageSize) {
			that.logger.debug(`Loading page ${page}`);

			const requestOptions: IHttpRequestOptions = {
				url: '', // To be set by modifyOptionsFn
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
