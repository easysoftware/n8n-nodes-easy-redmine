import { INodeProperties } from 'n8n-workflow';
import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { CustomFieldsOption } from './CustomFields';

const CommonTimeEntryOptions: INodeProperties[] = [
	{
		displayName: 'Hours',
		name: 'hours',
		type: 'number',
		default: '',
		description: 'Spent hours',
	},
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
		displayName: 'Project ID',
		name: 'projectId',
		type: 'number',
		default: '',
		description: 'ID of the project associated with the time entry',
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
		description: 'ID of the user who belongs the time entry to',
	},
];

export const TimeEntryFields: INodeProperties[] = [
	{
		displayName: 'Time Entry ID',
		name: 'id',
		type: 'number',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.getOne, EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.timeEEntries],
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
				resource: [EasyNodeResourceType.timeEEntries],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getTimeEntryQueries',
		},
		default: '',
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
				resource: [EasyNodeResourceType.timeEEntries],
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
				resource: [EasyNodeResourceType.timeEEntries],
			},
		},
		options: [...CommonTimeEntryOptions, CustomFieldsOption],
	},
];
