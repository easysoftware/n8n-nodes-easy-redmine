import { INodeProperties } from 'n8n-workflow';

export const ProjectIdField: INodeProperties = {
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
	],
};
