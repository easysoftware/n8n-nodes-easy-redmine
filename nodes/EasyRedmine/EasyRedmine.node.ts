import {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { getEasyQueries } from './operations/GetEasyQueries';
import { EasyNodeOperationType, EasyNodeResourceType } from './Model';
import { processGetManyOperation } from './operations/GetManyOperation';
import { processGetOneOperation } from './operations/GetOneOperation';
import { addCommentOperation } from './operations/AddCommentOperation';
import { updateOperation } from './operations/UpdateOperation';
import { IssueFields } from './fields/IssueFields';
import { LeadFields } from './fields/LeadFields';
import { OpportunityFields } from './fields/OpportunityFields';
import { AccountFields } from './fields/AccountFields';
import { PersonalContactFields } from './fields/PersonalContactFields';
import { UserFields } from './fields/UserFields';
import { createOperation } from './operations/CreateOperation';
import { TimeEntryFields } from './fields/TimeEntryFields';
import { INodeListSearchResult } from 'n8n-workflow/dist/Interfaces';

/**
 * Node that enables communication with EasyRedmine.
 */
export class EasyRedmine implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Easy Redmine',
		subtitle: '={{$parameter["operation"]}}:{{$parameter["resource"]}}',
		name: 'easyRedmine',
		icon: {
			light: 'file:EasyRedmine.svg',
			dark: 'file:EasyRedmine.dark.svg',
		} as const,
		group: ['transform'],
		version: 1,
		description: 'Easy Redmine Operations',
		defaults: {
			name: 'Easy Redmine Node',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'easyRedmineApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.domain}}',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},

		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				default: 'issues',
				noDataExpression: true,
				options: [
					{
						name: 'Issue',
						value: EasyNodeResourceType.issues,
					},
					{
						name: 'Lead',
						value: EasyNodeResourceType.leads,
					},
					{
						name: 'Opportunity',
						value: EasyNodeResourceType.opportunities,
					},
					{
						name: 'Account',
						value: EasyNodeResourceType.accounts,
					},
					{
						name: 'Personal Contact',
						value: EasyNodeResourceType.personalContacts,
					},
					{
						name: 'Time Entry',
						value: EasyNodeResourceType.timeEntries,
					},
					{
						name: 'User',
						value: EasyNodeResourceType.users,
					},
				],
			},

			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							EasyNodeResourceType.issues,
							EasyNodeResourceType.leads,
							EasyNodeResourceType.opportunities,
							EasyNodeResourceType.accounts,
						],
					},
				},
				default: 'get-many',
				options: [
					{
						name: 'Get One',
						description: 'Get a single entity',
						value: EasyNodeOperationType.getOne,
						action: 'Get one',
					},
					{
						name: 'Get Many',
						description: 'Get multiple entities',
						value: EasyNodeOperationType.getMany,
						action: 'Get many',
					},
					{
						name: 'Add Comment',
						description: 'Add a comment to entity',
						value: EasyNodeOperationType.addComment,
						action: 'Add comment',
					},
					{
						name: 'Create',
						description: 'Create entity',
						value: EasyNodeOperationType.create,
						action: 'Create',
					},
					{
						name: 'Update',
						description: 'Update entity',
						value: EasyNodeOperationType.update,
						action: 'Update',
					},
				],
			},

			...IssueFields,
			...LeadFields,
			...OpportunityFields,
			...AccountFields,
			...PersonalContactFields,
			...TimeEntryFields,
			...UserFields,

			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to return all results or only up to a given limit',
				displayOptions: {
					show: {
						operation: [EasyNodeOperationType.getMany],
					},
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Result offset',
				displayOptions: {
					show: {
						operation: [EasyNodeOperationType.getMany],
						returnAll: [false],
					},
				},
			},
			{
				displayName: 'Limit (1-100)',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
				displayOptions: {
					show: {
						operation: [EasyNodeOperationType.getMany],
						returnAll: [false],
					},
				},
			},

			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				displayOptions: {
					show: {
						operation: [EasyNodeOperationType.addComment],
					},
				},
				default: '',
			},
		],
	};

	methods = {
		listSearch: {
			getEasyPriorities: async function (
				this: ILoadOptionsFunctions,
				filter?: string,
				paginationToken?: string,
			): Promise<INodeListSearchResult> {
				this.logger.info('listSearch: getEasyPriorities');
				return {
					results: [
						{
							name: 'Jedna',
							value: 1,
						},
					], // INodeListSearchItems[]
				};
			},
		},
		loadOptions: {
			getEasyPriorities2: async function (
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				this.logger.info('listSearch: getEasyPriorities');
				return [
					{
						name: 'Jedna',
						value: 1,
					},
				]; // INodeListSearchItems[]
			},

			getEasyIssueQueries: async function (
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				return await getEasyQueries.call(this, 'EasyIssueQuery');
			},

			getEasyLeadsQueries: async function (
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				return await getEasyQueries.call(this, 'EasyLeadQuery');
			},

			getEasyCrmCaseQueries: async function (
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				return await getEasyQueries.call(this, 'EasyCrmCaseQuery');
			},

			getEasyAccountsQueries: async function (
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				return await getEasyQueries.call(this, 'EasyContactQuery');
			},

			getEasyPersonalAccountsQueries: async function (
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				return await getEasyQueries.call(this, 'EasyPersonalContactQuery');
			},

			getTimeEntryQueries: async function (
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				return await getEasyQueries.call(this, 'EasyTimeEntryQuery');
			},

			getEasyUsersQueries: async function (
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				return await getEasyQueries.call(this, 'EasyUserQuery');
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];

		const items = this.getInputData();
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const operation = this.getNodeParameter('operation', itemIndex) as EasyNodeOperationType;
				const resource = this.getNodeParameter('resource', itemIndex) as EasyNodeResourceType;

				this.logger.debug(`Operation: ${operation}, resource: ${resource}`);

				let responseData: any[] = [];
				switch (operation) {
					case EasyNodeOperationType.getMany:
						responseData = await processGetManyOperation.call(this, resource, itemIndex);
						break;
					case EasyNodeOperationType.getOne:
						responseData = await processGetOneOperation.call(this, resource, itemIndex);
						break;
					case EasyNodeOperationType.addComment:
						responseData = await addCommentOperation.call(this, resource, itemIndex);
						break;
					case EasyNodeOperationType.update:
						responseData = await updateOperation.call(this, resource, itemIndex);
						break;
					case EasyNodeOperationType.create:
						responseData = await createOperation.call(this, resource, itemIndex);
						break;
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject[]),
					{ itemData: { item: itemIndex } },
				);

				returnData.push(...executionData);
			} catch (error) {
				// This node should never fail but we want to showcase how
				// to handle errors.
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
				} else {
					// Adding `itemIndex` allows other workflows to handle this error
					if (error.context) {
						// If the error thrown already contains the context property,
						// only append the itemIndex
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return [returnData];
	}
}
