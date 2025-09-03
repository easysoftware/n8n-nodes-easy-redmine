import { IExecuteFunctions } from 'n8n-workflow';

export interface ProjectIdValue {
	mode: string;
	value: string | number;
}

export function getProjectId(
	this: IExecuteFunctions,
	projectId: ProjectIdValue | number | string | undefined,
): number | undefined {
	if (typeof projectId === 'undefined') {
		return undefined;
	}

	// For backward compatibility
	if (typeof projectId === 'string') {
		const result = parseInt(projectId, 10);
		if (isNaN(result)) {
			return undefined;
		}
		return result;
	} else if (typeof projectId === 'number') {
		return projectId;
	}

	if (!projectId) {
		return undefined;
	}

	if (typeof projectId.value === 'string') {
		const result = parseInt(projectId.value);
		if (isNaN(result)) {
			return undefined;
		}
		return result;
	} else {
		return projectId.value;
	}
}
