import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';

const CommonAttendanceOptions: INodeProperties[] = [
	{
		displayName: 'Departure',
		name: 'departure',
		type: 'dateTime',
		default: '',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Activity',
		name: 'activityid',
		type: 'string',
		default: '',
	},
];

const AttendanceUpdateOptions: INodeProperties[] = [
	{
		displayName: 'Arrival',
		name: 'arrival',
		type: 'dateTime',
		default: '',
	},
];

export const AttendanceFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.attendances],
			},
		},
		default: 'get-many',
		options: [
			{
				name: 'Get One',
				description: 'Get a single attendance entity',
				value: EasyNodeOperationType.getOne,
				action: 'Get one',
			},
			{
				name: 'Get Many',
				description: 'Get multiple attendance entities',
				value: EasyNodeOperationType.getMany,
				action: 'Get many',
			},
			{
				name: 'Create',
				description: 'Create attendance entity',
				value: EasyNodeOperationType.create,
				action: 'Create',
			},
			{
				name: 'Update',
				description: 'Update attendance entity',
				value: EasyNodeOperationType.update,
				action: 'Update',
			},
		],
	},

	{
		displayName: 'Attendance ID',
		name: 'id',
		type: 'number',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.getOne, EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.attendances],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine Attendances Query Name or ID',
		name: 'attendanceQueryId',
		type: 'options',
		description:
			'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.attendances],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getEasyAttendancesQueries',
		},
		default: '',
	},

	{
		displayName: 'Arrival',
		name: 'arrival',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.attendances],
			},
		},
	},

	{
		displayName: 'Create Fields',
		name: 'attendancesCreateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.attendances],
			},
		},
		options: [...CommonAttendanceOptions],
	},

	{
		displayName: 'Update Fields',
		name: 'attendancesUpdateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.attendances],
			},
		},
		options: [...CommonAttendanceOptions, ...AttendanceUpdateOptions],
	},
];
