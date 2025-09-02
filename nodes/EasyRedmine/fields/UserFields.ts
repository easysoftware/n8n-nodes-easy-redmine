import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';
import { CustomFieldsOption } from './CustomFields';

export const UserFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.users],
			},
		},
		default: 'get-many',
		options: [
			{
				name: 'Get One',
				description: 'Get a single user',
				value: EasyNodeOperationType.getOne,
				action: 'Get one',
			},
			{
				name: 'Get Many',
				description: 'Get multiple user',
				value: EasyNodeOperationType.getMany,
				action: 'Get many',
			},
			{
				name: 'Search',
				description: 'Search users',
				value: EasyNodeOperationType.search,
				action: 'Search',
			},
			{
				name: 'Create',
				description: 'Create user',
				value: EasyNodeOperationType.create,
				action: 'Create',
			},
			{
				name: 'Update',
				description: 'Update user',
				value: EasyNodeOperationType.update,
				action: 'Update',
			},
		],
	},

	{
		displayName: 'User ID',
		name: 'id',
		type: 'number',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.getOne, EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.users],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine User Query Name or ID',
		name: 'userQueryId',
		type: 'options',
		description: 'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.users],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getEasyUserQueries',
		},
		default: '',
	},

	{
		displayName: 'Login',
		name: 'login',
		type: 'string',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.users],
			},
		},
		default: '',
	},
	{
		displayName: 'First Name',
		name: 'firstname',
		type: 'string',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.users],
			},
		},
		default: '',
	},
	{
		displayName: 'Last Name',
		name: 'lastname',
		type: 'string',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.users],
			},
		},
		default: '',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.users],
			},
		},
		default: '',
	},
	{
		displayName: 'Create Options',
		name: 'userCreateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.users],
			},
		},
		options: [
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Phone number',
			},
			CustomFieldsOption,
		],
	},

	{
		displayName: 'Update Fields',
		name: 'userUpdateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.users],
			},
		},
		options: [
			{
				displayName: 'Email',
				name: 'mail',
				type: 'string',
				default: '',
				description: 'Email address',
			},
			{
				displayName: 'First Name',
				name: 'firstname',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Last Name',
				name: 'lastname',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Login',
				name: 'login',
				type: 'string',
				default: '',
				description: 'User login',
			},

			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Phone number',
			},

			CustomFieldsOption,
		],
	},

	{
		displayName: 'Search Options',
		name: 'userSearchOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.search],
				resource: [EasyNodeResourceType.users],
			},
		},
		options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Search by email address (partial match)',
			},
			{
				displayName: 'First Name',
				name: 'firstname',
				type: 'string',
				default: '',
				description: 'Search by first name (partial match)',
			},
			{
				displayName: 'Last Login Time From',
				name: 'lastLoginTimeFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter users who logged in after this date',
			},
			{
				displayName: 'Last Login Time To',
				name: 'lastLoginTimeTo',
				type: 'dateTime',
				default: '',
				description: 'Filter users who logged in before this date',
			},
			{
				displayName: 'Last Name',
				name: 'lastname',
				type: 'string',
				default: '',
				description: 'Search by last name (partial match)',
			},
			{
				displayName: 'Login',
				name: 'login',
				type: 'string',
				default: '',
				description: 'Search by login username (partial match)',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'number',
				default: '',
				description: 'Filter by user status (integer value)',
			},
		],
	},
];
