export interface IssueUpdateOptions {
	subject: string | undefined;
	description: string | undefined;
}

export interface LeadUpdateOptions {
	description: string | undefined;
}

export interface OpportunityUpdateOptions {
	name: string | undefined;
	description: string | undefined;
}

export interface AccountUpdateOptions {
	firstname: string | undefined;
}

export interface UserUpdateOptions {
	login: string | undefined;
	firstname: string | undefined;
	lastname: string | undefined;
	mail: string | undefined;
	phone: string | undefined;
}
