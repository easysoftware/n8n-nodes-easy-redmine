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
];
