import { INodeProperties } from 'n8n-workflow';

export const CustomFieldsOption: INodeProperties = {
	displayName: 'Custom Fields',
	name: 'customFields',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	options: [
		{
			name: 'field',
			displayName: 'Field',
			values: [
				{
					displayName: 'ID',
					name: 'id',
					type: 'number',
					default: '',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
	],
};
