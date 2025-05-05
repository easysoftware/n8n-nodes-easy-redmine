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
