import { EasyNodeOperationType, EasyNodeResourceType } from './Model';
import { INodeProperties } from 'n8n-workflow';

export const OpportunityFields: INodeProperties[] = [
	{
		displayName: 'Opportunity ID',
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
				resource: ['opportunities'],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine Opportunities Query Name or ID',
		name: 'opportunity_query_id',
		type: 'options',
		description:
			'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.opportunities],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getEasyCrmCaseQueries',
		},
		default: '',
	},
];
