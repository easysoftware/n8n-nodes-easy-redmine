import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';
import { CustomFieldsOption } from './CustomFields';

const ProjectIdField: INodeProperties = {
	displayName: 'Project Name or ID',
	name: 'projectId',
	type: 'options',
	description:
		'ID of the project. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	default: '',
	typeOptions: {
		loadOptionsMethod: 'getAccessibleProjects',
	},
};

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
		displayName: 'Priority ID',
		name: 'priorityId',
		type: 'number',
		description: 'ID of the priority',
		default: '',
	},
	// {
	// 	...ProjectIdField,
	// 	displayOptions: {
	// 		show: {
	// 			resource: [EasyNodeResourceType.issues],
	// 			operation: [EasyNodeOperationType.update],
	// 		},
	// 	},
	// },
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		description: 'Start date of the issue',
		default: '',
	},
	{
		displayName: 'Status Name or ID',
		name: 'statusId',
		type: 'number',
		description:
			'ID of the status. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		default: ''
	},
	{
		displayName: 'Tracker Name or ID',
		name: 'trackerId',
		type: 'options',
		description: 'ID of the tracker. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getProjectsTrackers',
			loadOptionsDependsOn: ['projectId', 'id', 'issueUpdateOptions.projectId'],
		},
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
		name: 'issueQueryId',
		type: 'options',
		description:
			'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
		...ProjectIdField,
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.issues],
				operation: [EasyNodeOperationType.create],
			},
		},
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
			ProjectIdField,
			...CommonIssueFields,
			CustomFieldsOption,
		],
	},
];
