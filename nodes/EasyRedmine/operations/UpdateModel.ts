import { BaseIssueOptions } from './BaseModel';

export interface CustomField {
	id: number;
	value: string;
}

export type IssueUpdateOptions = BaseIssueOptions & {
	subject: string | undefined;
};

export interface LeadUpdateOptions {
	description: string | undefined;
	companyName: string | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export interface OpportunityUpdateOptions {
	name: string | undefined;
	description: string | undefined;

	statusId: number | undefined;
	assignedToId: number | undefined;
	externalAssignedToId: number | undefined;
	price: number | undefined;
	contractDate: string | undefined;
	projectId: number | undefined;

	customFields: { field: CustomField[] } | undefined;
}

export interface AccountUpdateOptions {
	firstname: string | undefined;
	industryId: number | undefined;
	typeId: number | undefined;
	customFields: { field: CustomField[] } | undefined;

	assignedToId: number | undefined;
	externalAssignedToId: number | undefined;
	contactStatusId: number | undefined;
	contactLevelId: number | undefined;
	authorId: number | undefined;
	accountOpened: string | undefined;
	accountClosed: string | undefined;
	customerLeftReasonId: number | undefined;
}

export interface AttendanceUpdateOptions {
	arrival: string | undefined;
	departure: string | undefined;
	description: string | undefined;
	activityId: string | undefined;
}

export interface PersonalContactUpdateOptions {
	partnerId: number | undefined;
	accountId: number | undefined;
	firstname: string | undefined;
	lastname: string | undefined;
	email: string | undefined;
	jobTitle: string | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export interface TimeEntryUpdateOptions {
	hours: number | undefined;
	comment: string | undefined;
	spentOn: string | undefined;
	projectId: number | undefined;
	activityId: number | undefined;
	userId: number | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export interface UserUpdateOptions {
	login: string | undefined;
	firstname: string | undefined;
	lastname: string | undefined;
	mail: string | undefined;
	phone: string | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export type UpdateOptionsWithCustomFields =
	| AccountUpdateOptions
	| IssueUpdateOptions
	| LeadUpdateOptions
	| OpportunityUpdateOptions
	| PersonalContactUpdateOptions
	| TimeEntryUpdateOptions
	| UserUpdateOptions;
