import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';
import { CustomFieldsOption } from './CustomFields';

export const AccountFields: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'id',
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					EasyNodeOperationType.getOne,
					EasyNodeOperationType.addComment,
					EasyNodeOperationType.update,
				],
				resource: ['easy_contacts'],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine Accounts Query Name or ID',
		name: 'account_query_id',
		type: 'options',
		description:
			'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.accounts],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getEasyAccountsQueries',
		},
		default: '',
	},

	{
		displayName: 'Update Fields',
		name: 'update_options_accounts',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.accounts],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'firstname',
				type: 'string',
				default: '',
				description: 'Account name',
			},
			CustomFieldsOption,
		],
	},
];
