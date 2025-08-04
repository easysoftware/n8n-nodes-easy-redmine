import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { EasyRedmineClient } from '../client';

export async function getAvailablePriorities(
	that: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const client = new EasyRedmineClient(that, that.helpers);
	const priorities = await client.listAutocompletePriorities();
	return priorities
		.map((priority) => ({
			name: priority.text,
			value: priority.value,
		}))
		.sort((a, b) => a.value < b.value ? -1 : 1);
}
