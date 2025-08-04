import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { EasyRedmineClient } from '../client';

export async function getAvailableStatuses(
	that: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const client = new EasyRedmineClient(that, that.helpers);
	const states = await client.listAllIssueStatuses();
	return states
		.map((state) => ({
			name: state.name,
			value: state.id,
		}))
		.sort((a, b) => a.value < b.value ? -1 : 1);
}
