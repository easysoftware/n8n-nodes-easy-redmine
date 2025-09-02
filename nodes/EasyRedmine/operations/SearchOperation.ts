import { IDataObject, IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { EasyNodeResourceType } from '../Model';
import { sanitizeDomain } from '../utils';

function enhanceIssueRequestOptions(
	this: IExecuteFunctions,
	itemIndex: number,
	req: IHttpRequestOptions,
) {
	const options = this.getNodeParameter('issueSearchOptions', itemIndex, {}) as any;

	const qs = req.qs as IDataObject;

	qs.set_filter = '1';
	qs.type = 'EasyIssueQuery';
	qs.sort = 'priority:desc, due_date';

	if (options.assignedToId) {
		qs['f[assigned_to_id]'] = options.assignedToId;
		// = 'me' - trick
		// query["f[easy_helpdesk_ticket_owner_id]"] = f"={ticket_owner_id}"
	}

	if (options.dueDateFrom || options.dueDateTo) {
		const dueDateFrom = options.dueDateFrom ?? '2000-01-01';
		const dueDateTo = options.dueDateTo ?? '2040-01-01';
		qs['f[due_date]'] = `${dueDateFrom}|${dueDateTo}`;
	}

	if (options.query) {
		qs.easy_query_q = options.query;
	}
}

function enhanceProjectRequestOptions(
	this: IExecuteFunctions,
	itemIndex: number,
	req: IHttpRequestOptions,
) {
	const options = this.getNodeParameter('projectSearchOptions', itemIndex, {}) as any;

	const qs = req.qs as IDataObject;

	if (options.query) {
		qs.easy_query_q = options.query;
	}
}

function enhanceUserRequestOptions(
	this: IExecuteFunctions,
	itemIndex: number,
	req: IHttpRequestOptions,
) {
	const options = this.getNodeParameter('userSearchOptions', itemIndex, {}) as any;

	const qs = req.qs as IDataObject;

	if (options.email) {
		qs['f[mail]'] = `~${options.email}`;
	}

	if (options.firstname) {
		qs['f[firstname]'] = `~${options.firstname}`;
	}

	if (options.lastname) {
		qs['f[lastname]'] = `~${options.lastname}`;
	}

	if (options.login) {
		qs['f[login]'] = `~${options.login}`;
	}

	if (options.status !== undefined) {
		qs['f[status]'] = options.status;
	}

	if (options.lastLoginTimeFrom || options.lastLoginTimeTo) {
		const timeFrom = options.lastLoginTimeFrom ?? '2000-01-01';
		const timeTo = options.lastLoginTimeTo ?? '2040-01-01';
		qs['f[last_login_on]'] = `${timeFrom}|${timeTo}`;
	}
}

function enhanceTimeEntryRequestOptions(
	this: IExecuteFunctions,
	itemIndex: number,
	req: IHttpRequestOptions,
) {
	const options = this.getNodeParameter('timeEntrySearchOptions', itemIndex, {}) as any;

	const qs = req.qs as IDataObject;

	if (options.query) {
		qs.easy_query_q = options.query;
	}

	if (options.projectId) {
		qs['f[project_id]'] = options.projectId;
	}

	if (options.from || options.to) {
		const dateFrom = options.from ?? '2000-01-01';
		const dateTo = options.to ?? '2040-01-01';
		qs['f[spent_on]'] = `${dateFrom}|${dateTo}`;
	}
}

export async function processSearchOperation(
	this: IExecuteFunctions,
	resource: EasyNodeResourceType,
	itemIndex: number,
) {
	const credentials = await this.getCredentials('easyRedmineApi');
	const qs: IDataObject = {};

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

		switch (resource) {
			case EasyNodeResourceType.issues:
				enhanceIssueRequestOptions.call(this, itemIndex, options);
				break;
			case EasyNodeResourceType.projects:
				enhanceProjectRequestOptions.call(this, itemIndex, options);
				break;
			case EasyNodeResourceType.users:
				enhanceUserRequestOptions.call(this, itemIndex, options);
				break;
			case EasyNodeResourceType.timeEntries:
				enhanceTimeEntryRequestOptions.call(this, itemIndex, options);
				break;
			default:
				throw new Error('Not implemented!');
		}

		this.logger.info(`Requesting ${resource} with ${JSON.stringify(options)}`);

		const subResult = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'easyRedmineApi',
			options,
		);

		resultItems.push(...subResult[resource]);
		fetchedItemsCount = subResult[resource].length;
		offset += fetchedItemsCount;
	} while (fetchedItemsCount >= limit && returnAll);

	this.logger.debug(`Fetched all ${resource} ${resultItems.length} items`);

	const result: any = {};
	result[resource] = resultItems;
	return result;
}
