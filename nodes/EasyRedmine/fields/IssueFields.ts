import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';
import { CustomFieldsOption } from './CustomFields';

const CommonIssueFields: INodeProperties[] = [
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'Issue description',
	},
	{
		displayName: 'Tracker',
		name: 'trackerId',
		type: 'string',
		description: 'ID of the tracker',
		default: '',
	},
	{
		displayName: 'Status',
		name: 'statusId',
		type: 'number',
		description: 'ID of the status',
		default: '',
	},
];

export const IssueFields: INodeProperties[] = [
	{
		displayName: 'Issue ID',
		name: 'id',
		type: 'number',
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
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		description: 'Subject of the issue',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.issues],
				operation: [EasyNodeOperationType.create],
			},
		},
		default: '',
	},
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'number',
		description: 'Assigned project ID',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.issues],
				operation: [EasyNodeOperationType.create],
			},
		},
		default: '',
	},

	{
		displayName: 'Create Fields',
		name: 'create_options_issue',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.issues],
			},
		},
		options: [...CommonIssueFields, CustomFieldsOption],
	},

	{
		displayName: 'Update Fields',
		name: 'update_options_issue',
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
				default: '',
				description: 'Subject of the issue',
			},
			...CommonIssueFields,
			CustomFieldsOption,
		],
	},
];
