import {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { INodePropertyOptions } from 'n8n-workflow';
import { getEasyQueries } from './helpers/GetEasyQueries';
import { EasyNodeOperationType, EasyNodeResourceType } from './Model';
import { processGetManyOperation } from './helpers/ProcessGetMany';
import { processGetOneOperation } from './helpers/ProcessGetOne';
import { processAddCommentOperation } from './helpers/ProcessAddCommentOperation';
import { processUpdateOperation } from './helpers/ProcessUpdateOperation';
import { IssueFields } from './IssueFields';
import { LeadFields } from './LeadFields';
import { OpportunityFields } from './OpportunityFields';
import { AccountFields } from './AccountFields';
import { PersonalAccountFields } from './PersonalAccountFields';

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
				'X-Redmine-API-Key': '={{$credentials.token}}',
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
						name: 'Personal Account',
						value: EasyNodeResourceType.personalAccounts,
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
							EasyNodeResourceType.personalAccounts,
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
			...PersonalAccountFields,

			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				noDataExpression: false,
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
		loadOptions: {
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
						responseData = await processAddCommentOperation.call(this, resource, itemIndex);
						break;
					case EasyNodeOperationType.update:
						responseData = await processUpdateOperation.call(this, resource, itemIndex);
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
