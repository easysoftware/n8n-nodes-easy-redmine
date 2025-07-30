import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';
import { CustomFieldsOption } from './CustomFields';

const CommonAccountOptions: INodeProperties[] = [
	{
		displayName: 'Industry ID',
		name: 'industryId',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Name',
		name: 'firstname',
		type: 'string',
		default: '',
		description: 'Account name',
	},
	{
		displayName: 'Accounts Type ID',
		name: 'typeId',
		type: 'number',
		default: '',
		description: 'Contact Type ID',
	},

	{
		displayName: 'Account Manager ID',
		name: 'assignedToId',
		type: 'string',
		default: '',
	},
	{
		displayName: 'External Account Manager ID',
		name: 'externalAssignedToId',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Account Status ID',
		name: 'contactStatusId',
		type: 'string',
		default: '',
		description: 'Current status of the account',
	},
	{
		displayName: 'Account Level ID',
		name: 'contactLevelId',
		type: 'string',
		default: '',
		description: 'Level of the account',
	},
	{
		displayName: 'Author ID',
		name: 'authorId',
		type: 'number',
		default: 0,
		description: 'Author who created the account',
	},
	{
		displayName: 'Account Opened',
		name: 'accountOpened',
		type: 'dateTime',
		default: '',
		description: 'Date when the account was opened',
	},
	{
		displayName: 'Account Closed',
		name: 'accountClosed',
		type: 'dateTime',
		default: '',
		description: 'Date when the account was closed',
	},

	{
		displayName: 'Customer Left Reason ID',
		name: 'customerLeftReasonId',
		type: 'number',
		default: '',
		description: 'Reason why the customer left',
	},
];

const BillingAccountOptions: INodeProperties[] = [
	{
		displayName: 'Company Name',
		name: 'organization',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Street',
		name: 'street',
		type: 'string',
		default: '',
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Country Code',
		name: 'countryCode',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Country Division',
		name: 'countrySubdivisionCode',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Postal Code',
		name: 'postalCode',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Email',
		name: 'email',
		placeholder: 'name@email.com',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Telephone',
		name: 'phone',
		type: 'string',
		default: '',
	},
	{
		displayName: 'VAT Number',
		name: 'vatNo',
		type: 'string',
		default: '',
	},
	{
		displayName: 'VAT Rate',
		name: 'vatRate',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Bank Account Number',
		name: 'bankAccount',
		type: 'string',
		default: '',
	},
	{
		displayName: 'IBAN',
		name: 'iban',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Variable Symbol',
		name: 'variableSymbol',
		type: 'string',
		default: '',
	},
	{
		displayName: 'SWIFT',
		name: 'swift',
		type: 'string',
		default: '',
	},
	{
		displayName: 'BIC',
		name: 'bic',
		type: 'string',
		default: '',
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
			loadOptionsMethod: 'getEasyAccountQueries',
		},
		default: '',
	},

	{
		displayName: 'Create Fields',
		name: 'accountCreateOptions',
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
		displayName: 'Billing Fields',
		name: 'accountPrimaryBillingCreateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.accounts],
			},
		},
		options: [...BillingAccountOptions],
	},

	{
		displayName: 'Contact Fields',
		name: 'accountContactBillingCreateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.accounts],
			},
		},
		options: [...BillingAccountOptions],
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

	{
		displayName: 'Billing Fields',
		name: 'accountPrimaryBillingUpdateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.accounts],
			},
		},
		options: [...BillingAccountOptions],
	},

	{
		displayName: 'Contact Fields',
		name: 'accountContactBillingUpdateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.accounts],
			},
		},
		options: [...BillingAccountOptions],
	},
];
