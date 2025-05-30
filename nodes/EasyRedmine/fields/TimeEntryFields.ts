import { INodeProperties } from 'n8n-workflow';
import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';

export const TimeEntryFields: INodeProperties[] = [
	{
		displayName: 'Time Entry ID',
		name: 'id',
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					EasyNodeOperationType.getOne,
					EasyNodeOperationType.update,
				],
				resource: [EasyNodeResourceType.timeEEntries],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine Time Entries Query Name or ID',
		name: 'timeEntryQueryId',
		type: 'options',
		description: 'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
];
