import { IExecuteFunctions } from 'n8n-workflow';

export function getProjectId(this: IExecuteFunctions, itemIndex: number): number | undefined {
	let projectId = this.getNodeParameter('projectId', itemIndex) as any;
	// For backward compatibility
	if (typeof projectId === 'string') {
		return parseInt(projectId, 10);
	} else if (typeof projectId === 'number') {
		return projectId;
	}

	if (projectId['mode'] === 'id') {
		return projectId['value'];
	} else {
		this.logger.error(`Project id '${JSON.stringify(projectId)}' data not supported`);
		throw new Error('Only project by ID is supported');
	}
}
