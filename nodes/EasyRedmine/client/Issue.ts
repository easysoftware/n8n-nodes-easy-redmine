export interface EasyIdNamePair {
	id: number;
	name: string;
}

export interface EasyIssue {
	id: number;
	project: EasyIdNamePair;
	subject: string;
}

export interface EasyIssueStatus {
	id: number;
	name: string;
	is_closed: boolean;
	description: string | null;
}
