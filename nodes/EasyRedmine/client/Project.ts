export interface Project {
	id: number;
	name: string;
	status: number;
	trackers: EasyProjectTracker[] | undefined;
}

export interface EasyProjectTracker {
	id: number;
	name: string;
}
