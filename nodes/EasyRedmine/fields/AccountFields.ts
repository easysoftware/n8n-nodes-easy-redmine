import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';
import { CustomFieldsOption } from './CustomFields';

const CommonAccountOptions: INodeProperties[] = [
	{
		displayName: 'Industry ID',
		name: 'industryId',
		type: 'number',
		default: ''
	},
	{
		displayName: 'Name',
		name: 'firstname',
		type: 'string',
		default: '',
		description: 'Account name',
	},
	{
		displayName: 'Type ID',
		name: 'typeId',
		type: 'number',
		default: '',
		description: 'Contact Type ID'
	},
];

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
				resource: [EasyNodeResourceType.accounts],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine Accounts Query Name or ID',
		name: 'accountQueryId',
		type: 'options',
		description:
			'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
		displayName: 'Create Fields',
		name: 'accountsCreateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.accounts],
			},
		},
		options: [...CommonAccountOptions, CustomFieldsOption],
	},

	{
		displayName: 'Update Fields',
		name: 'accountsUpdateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.accounts],
			},
		},
		options: [...CommonAccountOptions, CustomFieldsOption],
	},
];
