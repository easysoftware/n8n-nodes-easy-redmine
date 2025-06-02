import { CustomField } from './UpdateModel';
import { BaseIssueOptions } from './BaseModel';

export type IssueCreateOptions = BaseIssueOptions;

export interface LeadCreateOptions {
	description: string | undefined;
	companyName: string | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export interface OpportunityCreateOptions {
	customFields: { field: CustomField[] } | undefined;
}

export interface TimeEntryCreateOptions {
	activityId: number | undefined;
	comment: string | undefined;
	projectId: number | undefined;
	spentOn: string | undefined;
	userId: number | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export interface UserCreateOptions {
	phone: string | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export interface AccountCreateOptions {
	firstname: string | undefined;
	industryId: number | undefined;
	typeId: number | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export interface AttendanceCreateOptions {
	departure: string | undefined;
	userId: number | undefined;
	description: string | undefined;
	activityId: string | undefined;
}

export interface PersonalContactCreateOptions {
	accountId: number | undefined;
	partnerId: number | undefined;
	jobTitle: string | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export type CreateOptionsWithCustomFields =
	| AccountCreateOptions
	| IssueCreateOptions
	| LeadCreateOptions
	| OpportunityCreateOptions
	| PersonalContactCreateOptions
	| TimeEntryCreateOptions
	| UserCreateOptions;
