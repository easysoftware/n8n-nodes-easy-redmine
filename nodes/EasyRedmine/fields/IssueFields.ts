import { EasyNodeOperationType, EasyNodeResourceType } from '../Model';
import { INodeProperties } from 'n8n-workflow';
import { CustomFieldsOption } from './CustomFields';

const ProjectIdField: INodeProperties = {
	displayName: 'Project Name or ID',
	name: 'projectId',
	type: 'resourceLocator',
	description:
		'ID of the project. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  default: { mode: 'list', value: '' },
  modes: [
    {
      displayName: 'Project',
      name: 'list',
      type: 'list',
      placeholder: 'Select a Project...',
      typeOptions: {
        searchListMethod: 'getProjects',
        searchable: false,
      },
    },
    {
      displayName: 'ID',
      name: 'id',
      type: 'string',
      placeholder: '10000',
      validation: [
        {
          type: 'regex',
          properties: {
            regex: '([0-9]{2,})[ \t]*',
            errorMessage: 'Not a valid Project ID',
          },
        },
      ],
      extractValue: {
        type: 'regex',
        regex: '^([0-9]{2,})',
      },
    },
  ]
};

const CommonIssueFields: INodeProperties[] = [
	{
		displayName: 'Assigned To ID',
		description: 'ID of the user to assign the issue to',
		name: 'assignedToId',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'Issue description',
	},
	{
		displayName: 'Done Ratio (0-100)',
		name: 'doneRatio',
		type: 'number',
		default: '',
		description: 'Percentage of completion of the issue',
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'dateTime',
		default: '',
		description: 'Due date of the issue',
	},
	{
		displayName: 'Estimated Hours',
		name: 'estimatedHours',
		type: 'number',
		default: '',
		description: 'Estimated hours to complete the issue',
	},
	{
		displayName: 'Private Issue',
		name: 'isPrivate',
		type: 'boolean',
		default: false,
		description: 'Whether to make the issue private',
	},
	{
		displayName: 'Parent Issue ID',
		name: 'parentIssueId',
		type: 'number',
		default: '',
		description: 'ID of the parent issue',
	},
	{
		displayName: 'Priority Name or ID',
		name: 'priorityId',
		type: 'options',
		description:
			'ID of the priority. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getAvailablePriorities',
		},
	},

	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		description: 'Start date of the issue',
		default: '',
	},
	{
		displayName: 'Status Name or ID',
		name: 'statusId',
		type: 'options',
		description:
			'ID of the status. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getAvailableStatuses',
		},
	},
	{
		displayName: 'Tracker Name or ID',
		name: 'trackerId',
		type: 'options',
		description:
			'ID of the tracker. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getProjectsTrackers',
			loadOptionsDependsOn: ['projectId', 'id', 'issueUpdateOptions.projectId'],
		},
	},
];

export const IssueFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					EasyNodeResourceType.issues,
				],
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
				name: 'Search',
				description: 'Search for multiple issues',
				value: EasyNodeOperationType.search,
				action: 'Search',
			},
			{
				name: 'Add Comment',
				description: 'Add a comment to entity',
				value: EasyNodeOperationType.addComment,
				action: 'Add comment',
			},
			{
				name: 'Create',
				description: 'Create entity',
				value: EasyNodeOperationType.create,
				action: 'Create',
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
		displayName: 'Issue ID',
		name: 'id',
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					EasyNodeOperationType.getOne,
					EasyNodeOperationType.addComment,
					EasyNodeOperationType.update,
				],
				resource: ['issues'],
			},
		},
		default: '',
	},

	{
		displayName: 'EasyRedmine Issues Query Name or ID',
		name: 'issueQueryId',
		type: 'options',
		description:
			'Choose a query to filter the results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.issues],
				operation: [EasyNodeOperationType.getMany],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getEasyIssueQueries',
		},
		default: '',
	},

	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		description: 'Subject of the issue',
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.issues],
				operation: [EasyNodeOperationType.create],
			},
		},
		default: '',
	},
	{
		...ProjectIdField,
		displayOptions: {
			show: {
				resource: [EasyNodeResourceType.issues],
				operation: [EasyNodeOperationType.create],
			},
		},
	},

	{
		displayName: 'Create Fields',
		name: 'issueCreateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.create],
				resource: [EasyNodeResourceType.issues],
			},
		},
		options: [...CommonIssueFields, CustomFieldsOption],
	},

	{
		displayName: 'Update Fields',
		name: 'issueUpdateOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.update],
				resource: [EasyNodeResourceType.issues],
			},
		},
		options: [
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'Subject of the issue',
			},
			ProjectIdField,
			...CommonIssueFields,
			CustomFieldsOption,
		],
	},

	{
		displayName: 'Search Fields',
		name: 'issueSearchOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				operation: [EasyNodeOperationType.search],
				resource: [EasyNodeResourceType.issues],
			},
		},
		options: [
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Query the name of the issue',
			},
			{
				displayName: 'Assigned To ID',
				name: 'assignedToId',
				type: 'string',
				default: '',
				description: 'ID of the user the issue is assigned to',
			},
			{
				displayName: 'Due Date From',
				name: 'dueDateFrom',
				type: 'string',
				default: '',
				placeholder: '2025-01-01',
			},
			{
				displayName: 'Due Date To',
				name: 'dueDateTo',
				type: 'string',
				default: '',
				placeholder: '2025-01-31',
			}
		],
	},
];
