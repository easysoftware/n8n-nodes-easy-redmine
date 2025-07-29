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
		displayName: 'Accounts',
		name: 'typeId',
		type: 'number',
		default: '',
		description: 'Contact Type ID',
	},

	{
		displayName: 'Account Manager',
		name: 'assignedToId',
		type: 'string',
		default: '',
		description: 'Account manager ID',
	},
	{
		displayName: 'External Account Manager',
		name: 'externalAssignedToId',
		type: 'string',
		default: '',
		description: 'External account manager ID',
	},
	{
		displayName: 'Account Status',
		name: 'contactStatusId',
		type: 'string',
		default: '',
		description: 'Current status of the account',
	},
	{
		displayName: 'Account Level',
		name: 'contactLevelId',
		type: 'string',
		default: '',
		description: 'Level of the account',
	},
	{
		displayName: 'Author',
		name: 'authorId',
		type: 'string',
		default: '',
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
		displayName: 'Customer Left - Reason',
		name: 'customerLeftReasonId',
		type: 'number',
		default: '',
		description: 'Reason why the customer left',
	},
];

const BillingAccountOptions: INodeProperties[] = [
	{
		displayName: 'Primary Billing Company Name',
		name: 'primaryBillingOrganization',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Primary Billing Street',
		name: 'primaryBillingStreet',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Primary Billing City',
		name: 'primaryBillingCity',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Primary Billing Country',
		name: 'primaryBillingCountryCode',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Primary Billing Country Division',
		name: 'primaryBillingCountrySubdivisionCode',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Primary Billing Postal Code',
		name: 'primaryBillingPostalCode',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Primary Billing Email',
		name: 'primaryBillingEmail',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Primary Billing Telephone',
		name: 'primaryBillingPhone',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Primary Billing VAT Number',
		name: 'primaryBillingVatNo',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Primary Billing VAT Rate',
		name: 'primaryBillingVatRate',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Primary Billing Bank Account Number',
		name: 'primaryBillingBankAccount',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Primary Billing IBAN',
		name: 'primaryBillingIBAN',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Primary Billing Variable Symbol',
		name: 'primaryBillingVariableSymbol',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Primary Billing SWIFT',
		name: 'primaryBillingSWIFT',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Primary Billing BIC',
		name: 'primaryBillingBIC',
		type: 'string',
		default: '',
	},
];

const ContactAccountOptions: INodeProperties[] = [
	{
		displayName: 'Contact Billing Company Name',
		name: 'contactBillingOrganization',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Contact Billing Street',
		name: 'contactBillingStreet',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Contact Billing City',
		name: 'contactBillingCity',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Contact Billing Country',
		name: 'contactBillingCountryCode',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Contact Billing Country Division',
		name: 'contactBillingCountrySubdivisionCode',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Contact Billing Postal Code',
		name: 'contactBillingPostalCode',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Contact Billing Email',
		name: 'contactBillingEmail',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Contact Billing Telephone',
		name: 'contactBillingPhone',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Contact Billing VAT Number',
		name: 'contactBillingVatNo',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Contact Billing VAT Rate',
		name: 'contactBillingVatRate',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Contact Billing Bank Account Number',
		name: 'contactBillingBankAccount',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Contact Billing IBAN',
		name: 'contactBillingIBAN',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Contact Billing Variable Symbol',
		name: 'contactBillingVariableSymbol',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Contact Billing SWIFT',
		name: 'contactBillingSWIFT',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Contact Billing BIC',
		name: 'contactBillingBIC',
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
		options: [
			...CommonAccountOptions,
			CustomFieldsOption,
			...BillingAccountOptions,
			...ContactAccountOptions,
		],
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
		options: [
			...CommonAccountOptions,
			CustomFieldsOption,
			...BillingAccountOptions,
			...ContactAccountOptions,
		],
	},
];
