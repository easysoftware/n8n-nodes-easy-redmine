import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';
import { CustomFieldsOption } from './CustomFields';

const CommonIssueFields: INodeProperties[] = [
	{
		displayName: 'Assigned To ID',
		description: 'ID of the user to assign the issue to',
		name: 'assignedToId',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'Issue description',
	},
	{
		displayName: 'Done Ratio (0-100)',
		name: 'doneRatio',
		type: 'number',
		default: '',
		description: 'Percentage of completion of the issue',
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'dateTime',
		default: '',
		description: 'Due date of the issue',
	},
	{
		displayName: 'Estimated Hours',
		name: 'estimatedHours',
		type: 'number',
		default: '',
		description: 'Estimated hours to complete the issue',
	},
	{
		displayName: 'Private Issue',
		name: 'isPrivate',
		type: 'boolean',
		default: false,
		description: 'Whether to make the issue private',
	},
	{
		displayName: 'Parent Issue ID',
		name: 'parentIssueId',
		type: 'number',
		default: '',
		description: 'ID of the parent issue',
	},
	{
		displayName: 'Priority Name or ID',
		name: 'priorityId',
		type: 'options', // 'resourceLocator',
		// description: 'ID of the priority',
		description: 'Priority of the issue. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getEasyPriorities2',
			loadOptionsDependsOn: ['projectId'],
			searchable: true,
			showCreate: false,
			// createEntityLabel: 'Priority',
			// expirable: true,
		},
	},
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'number',
		description: 'ID of the project',
		default: '',
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		description: 'Start date of the issue',
		default: '',
	},
	{
		displayName: 'Status ID',
		name: 'statusId',
		type: 'number',
		description: 'ID of the status',
		default: '',
	},
	{
		displayName: 'Tracker ID',
		name: 'trackerId',
		type: 'string',
		description: 'ID of the tracker',
		default: '',
	}
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
		name: 'issueQueryId',
		type: 'options',
		description: 'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
		name: 'issueCreateOptions',
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
		name: 'issueUpdateOptions',
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
