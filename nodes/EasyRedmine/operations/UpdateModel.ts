export interface CustomField {
	id: number;
	value: string;
}

export interface IssueUpdateOptions {
	subject: string | undefined;
	description: string | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export interface LeadUpdateOptions {
	description: string | undefined;
	companyName: string | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export interface OpportunityUpdateOptions {
	name: string | undefined;
	description: string | undefined;
	customFields: { field: CustomField[] } | undefined;
}

export interface AccountUpdateOptions {
	firstname: string | undefined;
	customFields: { field: CustomField[] } | undefined;
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
	| UserUpdateOptions;
