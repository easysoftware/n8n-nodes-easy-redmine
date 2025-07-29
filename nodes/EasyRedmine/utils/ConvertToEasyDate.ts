/**
 * Takes input dateTime in n8n format and converts it to EasyRedmine date format for API.
 * Ignores time zones and uses the literal date components.
 */
export function convertToEasyDate(input: string | undefined): string | undefined {
	if (!input) {
		return undefined;
	}

	try {
		// Parse the input date - handles both ISO dates and n8n dateTime formats
		const date = new Date(input);

		// Check if the date is valid
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
