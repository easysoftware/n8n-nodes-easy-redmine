/**
 * Takes input dateTime in n8n format and converts it to EasyRedmine date format for API.
 * Ignores time zones and uses the literal date components.
 */
export function convertToEasyDate(input: string | undefined): string | undefined {
	if (!input) {
		return undefined;
	}

	try {
		//  YYYY-MM-DD
		const simpleMatch = input.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
		if (simpleMatch) {
			return input;
		}

		// Parse the input date - handles both ISO 8601 dates (e.g., "2023-03-15T13:45:00Z")
		// and n8n dateTime formats, which are typically ISO 8601 compliant. Examples:
		// "2023-03-15T13:45:00Z", "2023-03-15", "2023-03-15T13:45:00+01:00".
		const date = new Date(input);
		if (isNaN(date.getTime())) {
			return undefined;
		}

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	} catch (error) {
		return undefined;
	}
}
