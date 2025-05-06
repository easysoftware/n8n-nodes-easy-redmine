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
		noDataExpression: false,
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
		name: 'user_query_id',
		type: 'options',
		description:
			'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.users],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getEasyUsersQueries',
		},
		default: '',
	},

	{
		displayName: 'Update Fields',
		name: 'update_options_user',
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
				displayName: 'Login',
				name: 'login',
				type: 'string',
				noDataExpression: true,
				default: '',
				description: 'User login',
			},
			{
				displayName: 'First Name',
				name: 'firstname',
				type: 'string',
				noDataExpression: true,
				default: '',
			},

			{
				displayName: 'Last Name',
				name: 'lastname',
				type: 'string',
				noDataExpression: true,
				default: '',
			},

			{
				displayName: 'Email',
				name: 'mail',
				type: 'string',
				noDataExpression: true,
				default: '',
				description: 'Email address',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				noDataExpression: true,
				default: '',
				description: 'Phone number',
			},

			CustomFieldsOption,
		],
	},
];
