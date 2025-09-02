import { INodeProperties } from 'n8n-workflow';
import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';

export const ProjectFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.projects],
			},
		},
		default: 'get-many',
		options: [
			{
				name: 'Get One',
				description: 'Get a single project',
				value: EasyNodeOperationType.getOne,
				action: 'Get one',
			},
			{
				name: 'Get Many',
				description: 'Get multiple projects',
				value: EasyNodeOperationType.getMany,
				action: 'Get many',
			},
			{
				name: 'Search',
				description: 'Search for multiple projects',
				value: EasyNodeOperationType.search,
				action: 'Search',
			},
		],
	},

	{
		displayName: 'Project ID',
		name: 'id',
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					EasyNodeOperationType.getOne,
				],
				resource: [EasyNodeResourceType.projects],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine Project Query Name or ID',
		name: 'projectQueryId',
		type: 'options',
		description:
			'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.projects],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getEasyProjectQueries',
		},
		default: '',
	},

	{
		displayName: 'Search Fields',
		name: 'projectSearchOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.search],
				resource: [EasyNodeResourceType.projects],
			},
		},
		options: [
			{
				displayName: 'Free Text',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Free text query to search for projects',
			},
		],
	},

	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.search],
				resource: [EasyNodeResourceType.projects],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},

	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.search],
				resource: [EasyNodeResourceType.projects],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},

	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.search],
				resource: [EasyNodeResourceType.projects],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		description: 'Number of results to skip',
	},
];
