export type EasyQueryType =
	| 'EasyAttendanceQuery'
	| 'EasyIssueQuery'
	| 'EasyLeadQuery'
	| 'EasyCrmCaseQuery'
	| 'EasyContactQuery'
	| 'EasyGanttEasyProjectQuery'
	| 'EasyPersonalContactQuery'
	| 'EasyTimeEntryQuery'
	| 'EasyUserQuery';

export interface EasyQueryInfo {
	id: number;
	name: string;
	is_public: boolean;
	project_id: number | null;
	type: EasyQueryType;
}
