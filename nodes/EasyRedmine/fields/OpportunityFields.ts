import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';
import { CustomFieldsOption } from './CustomFields';
import { ProjectIdField } from './ProjectIdField';

export const OpportunityOptions: INodeProperties[] = [
	{
		displayName: 'Status ID',
		name: 'statusId',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Account Manager ID',
		name: 'assignedToId',
		type: 'number',
		default: '',
	},
	{
		displayName: 'External Account Manager ID',
		name: 'externalAssignedToId',
		type: 'number',
		default: '',
		description: 'External account manager identifier',
	},
	{
		displayName: 'Price',
		name: 'price',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Contract Date',
		name: 'contractDate',
		type: 'string',
		default: '',
		description: 'Contract date in YYYY-MM-DD format',
	},
];

export const OpportunityFields: INodeProperties[] = [
	{
		displayName: 'Opportunity ID',
		name: 'id',
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					EasyNodeOperationType.getOne,
					EasyNodeOperationType.addComment,
					EasyNodeOperationType.update,
				],
				resource: [EasyNodeResourceType.opportunities],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine Opportunities Query Name or ID',
		name: 'opportunityQueryId',
		type: 'options',
		description:
			'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.opportunities],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getEasyCrmCaseQueries',
		},
		default: '',
	},

	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.opportunities],
			},
		},
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.opportunities],
			},
		},
	},
	{
		...ProjectIdField,
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.opportunities],
				operation: [EasyNodeOperationType.create],
			},
		},
	},
	{
		displayName: 'Create Options',
		name: 'opportunityCreateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.opportunities],
			},
		},
		options: [...OpportunityOptions, CustomFieldsOption],
	},

	{
		displayName: 'Update Fields',
		name: 'opportunityUpdateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.opportunities],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Opportunity name',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Opportunity description',
			},
			...OpportunityOptions,
			ProjectIdField,
			CustomFieldsOption,
		],
	},

	{
		displayName: 'Search Options',
		name: 'opportunitySearchOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.search],
				resource: [EasyNodeResourceType.opportunities],
			},
		},
		options: [
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Search query for opportunities',
			},
		],
	},
];
