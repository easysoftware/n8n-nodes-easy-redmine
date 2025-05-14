import { CustomField } from './UpdateModel';

export interface BaseIssueOptions {
	assignedToId: number | undefined;
	customFields: { field: CustomField[] } | undefined;
	description: string | undefined;
	doneRatio: number | undefined;
	dueDate: string | undefined;
	estimatedHours: number | undefined;
	isPrivate: boolean | undefined;
	parentIssueId: number | undefined;
	priorityId: number | undefined;
	projectId: number | undefined;
	startDate: string | undefined;
	statusId: number | undefined;
	trackerId: number | undefined;
}
