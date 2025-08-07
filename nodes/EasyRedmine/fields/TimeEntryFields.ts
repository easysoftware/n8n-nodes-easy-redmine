import { INodeProperties } from 'n8n-workflow';
import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { CustomFieldsOption } from './CustomFields';

const CommonTimeEntryOptions: INodeProperties[] = [
	{
		displayName: 'Comment',
		name: 'comment',
		type: 'string',
		default: '',
		description: 'Time entry comment',
	},

	{
		displayName: 'Spent On',
		name: 'spentOn',
		type: 'string',
		typeOptions: {
			inputType: 'date',
			dateFormat: 'YYYY-MM-DD',
		},
		default: '',
		placeholder: 'YYYY-MM-DD',
		description: 'Date when the time was spent',
	},
	{
		displayName: 'Project Name or ID',
		name: 'projectId',
		type: 'options',
		default: '',
		description: 'ID of the project associated with the time entry. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: {
			loadOptionsMethod: 'getAccessibleProjects',
		},
	},
	{
		displayName: 'Activity ID',
		name: 'activityId',
		type: 'number',
		default: '',
		description: 'ID of the activity associated with the time entry',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		default: '',
		description: 'ID of the user to whom the time entry belongs',
	},
];

export const TimeEntryFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					EasyNodeResourceType.timeEntries
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

	{
		displayName: 'Time Entry ID',
		name: 'id',
		type: 'number',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.getOne, EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.timeEntries],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine Time Entries Query Name or ID',
		name: 'timeEntryQueryId',
		type: 'options',
		description:
			'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.timeEntries],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getTimeEntryQueries',
		},
		default: '',
	},

	{
		displayName: 'Hours',
		name: 'hours',
		type: 'number',
		default: '',
		required: true,
		description: 'Spent hours',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.timeEntries],
				operation: [EasyNodeOperationType.create],
			},
		},
	},

	{
		displayName: 'Create Fields',
		name: 'timeEntryCreateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.timeEntries],
			},
		},
		options: [...CommonTimeEntryOptions, CustomFieldsOption],
	},

	{
		displayName: 'Update Fields',
		name: 'timeEntryUpdateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.timeEntries],
			},
		},
		options: [
			{
				displayName: 'Hours',
				name: 'hours',
				type: 'number',
				default: '',
				description: 'Spent hours',
			},
			...CommonTimeEntryOptions,
			CustomFieldsOption,
		],
	},
];
