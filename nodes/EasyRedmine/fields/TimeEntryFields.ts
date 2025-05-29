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
];
