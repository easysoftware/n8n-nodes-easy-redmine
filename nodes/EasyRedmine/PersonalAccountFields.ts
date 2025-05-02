import { EasyNodeOperationType, EasyNodeResourceType } from './Model';
import { INodeProperties } from 'n8n-workflow';

export const PersonalAccountFields: INodeProperties[] = [
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
				resource: ['personal_accounts'],
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
