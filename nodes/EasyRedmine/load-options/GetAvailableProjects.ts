import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { EasyRedmineClient } from '../client/EasyRedmineClient';

export async function getAvailableProjects(
	that: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const client = new EasyRedmineClient(that, that.helpers);
	const projects = await client.listProjects();
	return projects.map((project) => ({
		name: project.name,
		value: project.id,
	})).sort((a, b) => a.name.localeCompare(b.name));
}
