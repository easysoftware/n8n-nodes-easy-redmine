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

export interface UserCreateOptions {
	phone: string | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export interface PersonalContactCreateOptions {
	accountId: number | undefined;
	partnerId: number | undefined;
	jobTitle: string | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export type CreateOptionsWithCustomFields =
	| IssueCreateOptions
	| LeadCreateOptions
	| OpportunityCreateOptions
	| PersonalContactCreateOptions
	| UserCreateOptions;
