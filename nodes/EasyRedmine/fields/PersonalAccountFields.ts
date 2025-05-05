import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';

export const PersonalAccountFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.personalAccounts],
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
				name: 'Update',
				description: 'Update entity',
				value: EasyNodeOperationType.update,
				action: 'Update',
			},
		],
	},

	{
		displayName: 'Personal Account ID',
		name: 'id',
		type: 'number',
		noDataExpression: false,
		displayOptions: {
			show: {
				operation: [
					EasyNodeOperationType.getOne,
					EasyNodeOperationType.addComment,
					EasyNodeOperationType.update,
				],
				resource: [EasyNodeResourceType.personalAccounts],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine Personal Accounts Query Name or ID',
		name: 'personal_account_query_id',
		type: 'options',
		description:
			'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.personalAccounts],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getEasyPersonalAccountsQueries',
		},
		default: '',
	},
];
