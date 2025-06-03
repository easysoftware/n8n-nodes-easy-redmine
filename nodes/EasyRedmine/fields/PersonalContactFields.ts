import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';
import { CustomFieldsOption } from './CustomFields';

const PersonalContactCreateOptionalFields: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Partner ID',
		name: 'partnerId',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Job Title',
		name: 'jobTitle',
		type: 'string',
		default: '',
	},
];

const PersonalContactUpdateOptionalFields: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Partner ID',
		name: 'partnerId',
		type: 'number',
		default: '',
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
		displayName: 'Email',
		name: 'mail',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Job Title',
		name: 'jobTitle',
		type: 'string',
		default: '',
	},
];

export const PersonalContactFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.personalContacts],
			},
		},
		default: 'get-many',
		options: [
			{
				name: 'Get One',
				description: 'Get a single personal contact',
				value: EasyNodeOperationType.getOne,
				action: 'Get one',
			},
			{
				name: 'Get Many',
				description: 'Get multiple personal contacts',
				value: EasyNodeOperationType.getMany,
				action: 'Get many',
			},
			{
				name: 'Add Comment',
				description: 'Add comment to personal contact',
				value: EasyNodeOperationType.addComment,
				action: 'Add comment',
			},
			{
				name: 'Create',
				description: 'Create personal contact',
				value: EasyNodeOperationType.create,
				action: 'Create',
			},
			{
				name: 'Update',
				description: 'Update personal contact',
				value: EasyNodeOperationType.update,
				action: 'Update',
			},
		],
	},

	{
		displayName: 'Personal Contact ID',
		name: 'id',
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					EasyNodeOperationType.getOne,
					EasyNodeOperationType.addComment,
					EasyNodeOperationType.update,
				],
				resource: [EasyNodeResourceType.personalContacts],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine Personal Contacts Query Name or ID',
		name: 'personalContactQueryId',
		type: 'options',
		description: 'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.personalContacts],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getEasyPersonalAccountQueries',
		},
		default: '',
	},

	{
		displayName: 'First Name',
		name: 'firstname',
		type: 'string',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.personalContacts],
				operation: [EasyNodeOperationType.create],
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
				resource: [EasyNodeResourceType.personalContacts],
				operation: [EasyNodeOperationType.create],
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
				resource: [EasyNodeResourceType.personalContacts],
				operation: [EasyNodeOperationType.create],
			},
		},
		default: '',
	},

	{
		displayName: 'Create Fields',
		name: 'personalContactCreateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.personalContacts],
			},
		},
		options: [...PersonalContactCreateOptionalFields, CustomFieldsOption],
	},

	{
		displayName: 'Update Fields',
		name: 'personalContactUpdateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.personalContacts],
			},
		},
		options: [...PersonalContactUpdateOptionalFields, CustomFieldsOption],
	},
];
