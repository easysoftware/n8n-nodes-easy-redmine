import { ILoadOptionsFunctions } from 'n8n-workflow';

export function tryToParseParameterAsNumber(optionsFn: ILoadOptionsFunctions, paramName: string) {
	let projectIdParam: any = optionsFn.getNodeParameter(paramName, 0) as number | string;
	let projectId: number | undefined;
	if (typeof projectIdParam === 'string') {
		projectId = parseInt((projectIdParam as string).trim(), 10);
		if (isNaN(projectId)) {
			projectId = undefined;
		}
	} else if (typeof projectIdParam === 'number') {
		projectId = projectIdParam as number;
	}
	return projectId;
}
