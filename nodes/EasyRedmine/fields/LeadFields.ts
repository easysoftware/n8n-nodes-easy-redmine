import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';
import { CustomFieldsOption } from './CustomFields';

const CommonLeadOptions: INodeProperties[] = [
	{
		displayName: 'Company Name',
		name: 'companyName',
		type: 'string',
		default: '',
		description: 'Lead company name',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'Lead description',
	},
];

export const LeadFields: INodeProperties[] = [
	{
		displayName: 'Lead ID',
		name: 'id',
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					EasyNodeOperationType.getOne,
					EasyNodeOperationType.addComment,
					EasyNodeOperationType.update,
				],
				resource: [EasyNodeResourceType.leads],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine Leads Query Name or ID',
		name: 'leadQueryId',
		type: 'options',
		description: 'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.leads],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getEasyLeadsQueries',
		},
		default: '',
	},

	{
		displayName: 'Create Options',
		name: 'leadCreateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.leads],
			},
		},
		options: [...CommonLeadOptions, CustomFieldsOption],
	},

	{
		displayName: 'Update Fields',
		name: 'leadUpdateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.leads],
			},
		},
		options: [...CommonLeadOptions, CustomFieldsOption],
	},
];
