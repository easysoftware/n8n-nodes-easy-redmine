/* eslint-disable n8n-nodes-base/node-class-description-inputs-wrong-regular-node, n8n-nodes-base/node-class-description-outputs-wrong */
import {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	INodeListSearchResult,
} from 'n8n-workflow';
import { EasyNodeOperationType, EasyNodeResourceType } from './Model';
import {
	processGetManyOperation,
	processGetOneOperation,
	addCommentOperation,
	updateOperation,
	createOperation,
	processSearchOperation,
} from './operations';
import { IssueFields } from './fields/IssueFields';
import { LeadFields } from './fields/LeadFields';
import { OpportunityFields } from './fields/OpportunityFields';
import { AccountFields } from './fields/AccountFields';
import { PersonalContactFields } from './fields/PersonalContactFields';
import { UserFields } from './fields/UserFields';
import { TimeEntryFields } from './fields/TimeEntryFields';
import { AttendanceFields } from './fields/AttendanceFields';
import { loadOptions } from './LoadOptions';
import { EasyRedmineClient } from './client';
import { ProjectFields } from './fields/ProjectFields';

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
		usableAsTool: true,
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
						name: 'Project',
						value: EasyNodeResourceType.projects,
					},
					{
						name: 'Account',
						value: EasyNodeResourceType.accounts,
					},
					{
						name: 'Attendance',
						value: EasyNodeResourceType.attendances,
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

			...AttendanceFields,
			...IssueFields,
			...LeadFields,
			...OpportunityFields,
			...ProjectFields,
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
						operation: [EasyNodeOperationType.getMany, EasyNodeOperationType.search],
					},
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Result offset',
				typeOptions: {
					minValue: 0,
				},
				displayOptions: {
					show: {
						operation: [EasyNodeOperationType.getMany, EasyNodeOperationType.search],
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
						operation: [EasyNodeOperationType.getMany, EasyNodeOperationType.search],
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
		loadOptions,
		listSearch: {
			getProjects: async function (
				this: ILoadOptionsFunctions,
				filter?: string,
				paginationToken?: string,
			): Promise<INodeListSearchResult> {
				const client = new EasyRedmineClient(this, this.helpers);
				const projects = (await client.listProjects()).sort((p0, p1) =>
					p0.name.localeCompare(p1.name),
				);
				return {
					results: projects.map((project) => ({
						name: project.name,
						value: project.id,
					})),
					paginationToken: undefined,
				};
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
					case EasyNodeOperationType.search:
						responseData = await processSearchOperation.call(this, resource, itemIndex);
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
					let errorMessage = error.message;
					if (error.context?.data?.errors && Array.isArray(error.context.data.errors)) {
						const errors = error.context.data.errors;
						errorMessage = errors.join(', ');
					}
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: errorMessage }),
						{ itemData: { item: itemIndex } },
					);
					returnData.push(...executionErrorData);
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
