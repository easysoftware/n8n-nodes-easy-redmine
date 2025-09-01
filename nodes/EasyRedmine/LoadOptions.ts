import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { tryToParseParameterAsNumber } from './utils';
import { EasyRedmineClient } from './client';

export const loadOptions: {
	[key: string]: (this: ILoadOptionsFunctions) => Promise<INodePropertyOptions[]>;
} = {
	getEasyAttendanceQueries: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		const client = new EasyRedmineClient(this, this.helpers);
		const queries = await client.listEasyQueries('EasyAttendanceQuery');
		return queries
			.map((query) => ({
				name: query.name,
				value: query.id,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
	},

	getEasyIssueQueries: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		const client = new EasyRedmineClient(this, this.helpers);
		const queries = await client.listEasyQueries('EasyIssueQuery');
		return queries
			.map((query) => ({
				name: query.name,
				value: query.id,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
	},

	getEasyProjectQueries: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		const client = new EasyRedmineClient(this, this.helpers);
		const queries = await client.listEasyQueries('EasyProjectQuery');
		return queries
			.map((query) => ({
				name: query.name,
				value: query.id,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
	},

	getEasyLeadQueries: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		const client = new EasyRedmineClient(this, this.helpers);
		const queries = await client.listEasyQueries('EasyLeadQuery');
		return queries
			.map((query) => ({
				name: query.name,
				value: query.id,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
	},

	getEasyCrmCaseQueries: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		const client = new EasyRedmineClient(this, this.helpers);
		const queries = await client.listEasyQueries('EasyCrmCaseQuery');
		return queries
			.map((query) => ({
				name: query.name,
				value: query.id,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
	},

	getEasyAccountQueries: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		const client = new EasyRedmineClient(this, this.helpers);
		const queries = await client.listEasyQueries('EasyContactQuery');
		return queries
			.map((query) => ({
				name: query.name,
				value: query.id,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
	},

	getEasyPersonalAccountQueries: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		const client = new EasyRedmineClient(this, this.helpers);
		const queries = await client.listEasyQueries('EasyPersonalContactQuery');
		return queries
			.map((query) => ({
				name: query.name,
				value: query.id,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
	},

	getTimeEntryQueries: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		const client = new EasyRedmineClient(this, this.helpers);
		const queries = await client.listEasyQueries('EasyTimeEntryQuery');
		return queries
			.map((query) => ({
				name: query.name,
				value: query.id,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
	},

	getEasyUserQueries: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		const client = new EasyRedmineClient(this, this.helpers);
		const queries = await client.listEasyQueries('EasyUserQuery');
		return queries
			.map((query) => ({
				name: query.name,
				value: query.id,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
	},

	getAccessibleProjects: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		const client = new EasyRedmineClient(this, this.helpers);
		const projects = await client.listProjects();
		return projects
			.map((project) => ({
				name: project.name,
				value: project.id,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
	},

	getAvailablePriorities: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		const client = new EasyRedmineClient(this, this.helpers);
		const priorities = await client.listAutocompletePriorities();
		return priorities
			.map((priority) => ({
				name: priority.text,
				value: priority.value,
			}))
			.sort((a, b) => (a.value < b.value ? -1 : 1));
	},

	getAvailableStatuses: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		const client = new EasyRedmineClient(this, this.helpers);
		const states = await client.listAllIssueStatuses();
		return states
			.map((state) => ({
				name: state.name,
				value: state.id,
			}))
			.sort((a, b) => (a.value < b.value ? -1 : 1));
	},

	getProjectsTrackers: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		let projectId: number | undefined = tryToParseParameterAsNumber(this, 'projectId');
		if (!projectId) {
			projectId = tryToParseParameterAsNumber(this, 'issueUpdateOptions.projectId');
		}

		if (!projectId) {
			const issueId = tryToParseParameterAsNumber(this, 'id');
			if (issueId) {
				try {
					const client = new EasyRedmineClient(this, this.helpers);
					const issue = await client.getIssue(issueId);
					projectId = issue.project.id;
				} catch (error) {
					this.logger.error(error);
				}
			}
		}

		const client = new EasyRedmineClient(this, this.helpers);
		const project = await client.getProject(projectId);
		const trackers = project.trackers;
		if (trackers) {
			return trackers.map((tracker) => ({
				name: tracker.name,
				value: tracker.id,
			}));
		}
		return [];
	},
};
