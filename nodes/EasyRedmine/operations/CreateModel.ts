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
  customFields: { field: CustomField[] } | undefined;

  typeId: number | undefined;
  assignedToId: number | undefined;
  externalAssignedToId: number | undefined;
  contactStatusId: number | undefined;
  contactLevelId: number | undefined;
  authorId: number | undefined;
  accountOpened: string | undefined;
  accountClosed: string | undefined;
  customerLeftReasonId: number | undefined;
}

export interface AccountBillingCreateOptions {
	organization: string | undefined;
	street: string | undefined;
	city: string | undefined;
	countryCode: string | undefined;
	countrySubdivisionCode: string | undefined;
	postalCode: string | undefined;
	email: string | undefined;
	phone: string | undefined;
	vatNo: string | undefined;
	vatRate: number | undefined;
	bankAccount: string | undefined;
	iban: string | undefined;
	variableSymbol: string | undefined;
	swift: string | undefined;
	bic: string | undefined;
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
