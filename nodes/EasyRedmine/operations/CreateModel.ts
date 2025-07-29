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

	assignedToId: number | undefined;
	externalAssignedToId : number | undefined;
	contactStatusId: number | undefined;
	contactLevelId: number | undefined;
	authorId: number | undefined;
	accountOpened: string | undefined;
	accountClosed: string | undefined;
	customerLeftReasonId: number | undefined;

	contactBillingOrganization: string | undefined;
	contactBillingStreet: string | undefined;
	contactBillingCity: string | undefined;
	contactBillingCountryCode: string | undefined;
	contactBillingCountrySubdivisionCode: string | undefined;
	contactBillingPostalCode: string | undefined;
	contactBillingEmail: string | undefined;
	contactBillingPhone: string | undefined;
	contactBillingVatNo: string | undefined;
	contactBillingVatRate: number | undefined;
	contactBillingBankAccount: string | undefined;
	contactBillingIBAN: string | undefined;
	contactBillingVariableSymbol: string | undefined;
	contactBillingSWIFT: string | undefined;
	contactBillingBIC: string | undefined;

	primaryBillingOrganization: string | undefined;
	primaryBillingStreet: string | undefined;
	primaryBillingCity: string | undefined;
	primaryBillingCountryCode: string | undefined;
	primaryBillingCountrySubdivisionCode: string | undefined;
	primaryBillingPostalCode: string | undefined;
	primaryBillingEmail: string | undefined;
	primaryBillingPhone: string | undefined;
	primaryBillingVatNo: string | undefined;
	primaryBillingVatRate: number | undefined;
	primaryBillingBankAccount: string | undefined;
	primaryBillingIBAN: string | undefined;
	primaryBillingVariableSymbol: string | undefined;
	primaryBillingSWIFT: string | undefined;
	primaryBillingBIC: string | undefined;
}

export interface AttendanceCreateOptions {
	departure: string | undefined;
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
