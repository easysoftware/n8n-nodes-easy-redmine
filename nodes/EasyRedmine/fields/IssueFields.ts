import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';

export const IssueFields: INodeProperties[] = [
	{
		displayName: 'Issue ID',
		name: 'id',
		type: 'number',
		noDataExpression: false,
		displayOptions: {
			show: {
				operation: [
					EasyNodeOperationType.getOne,
					EasyNodeOperationType.addComment,
					EasyNodeOperationType.update,
				],
				resource: ['issues'],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine Issues Query Name or ID',
		name: 'issue_query_id',
		type: 'options',
		description:
			'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.issues],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getEasyIssueQueries',
		},
		default: '',
	},

	{
		displayName: 'Update Fields',
		name: 'update_options_issues',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.issues],
			},
		},
		options: [
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				noDataExpression: true,
				default: '',
				description: 'Subject of the issue',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				noDataExpression: true,
				default: '',
				description: 'Issue description',
			},
		],
	},
];
