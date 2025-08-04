import { ILoadOptionsFunctions } from 'n8n-workflow';

export function tryToParseParameterAsNumber(optionsFn: ILoadOptionsFunctions, paramName: string) {
	let projectIdParam: any = optionsFn.getNodeParameter(paramName, 0) as number | string;
	optionsFn.logger.info(`Project ID: "${projectIdParam}"`);
	optionsFn.logger.info(`Type of Project ID: ${typeof projectIdParam}`);
	let projectId: number | undefined;
	if (typeof projectIdParam === 'string') {
		projectId = parseInt((projectIdParam as string).trim(), 10);
		optionsFn.logger.info(`parseInt(Project ID): "${projectIdParam}"`);
		if (isNaN(projectId)) {
			projectId = undefined;
		}
	} else if (typeof projectIdParam === 'number') {
		optionsFn.logger.info(`Project ID is a numebr `);
		projectId = projectIdParam as number;
	}
	return projectId;
}
