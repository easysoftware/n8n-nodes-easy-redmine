/**
 * Sanitizes a domain string by removing trailing slashes.
 */
export function sanitizeDomain(domain: string): string {
	if (domain.endsWith('/')) {
		return domain.slice(0, -1);
	}
	return domain;
}
