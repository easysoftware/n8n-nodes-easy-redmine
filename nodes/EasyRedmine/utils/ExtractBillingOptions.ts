import { AccountBillingCreateOptions } from '../operations/CreateModel';
import { IExecuteFunctions } from 'n8n-workflow';

export function extractBillingOptions(
	that: IExecuteFunctions,
	parameterName: string,
	itemIndex: number,
	isPrimary: boolean,
) {
	const options = that.getNodeParameter(
		parameterName,
		itemIndex,
		{},
	) as AccountBillingCreateOptions;

	if (options) {
		return {
			primary: isPrimary ? 1 : undefined,
			contact: isPrimary ? undefined : 1,
			organization: options.organization,
			street: options.street,
			city: options.city,
			country_code: options.countryCode,
			subdivision_code: options.countrySubdivisionCode,
			postal_code: options.postalCode,
			email: options.email,
			telephone: options.phone,
			vat_no: options.vatNo,
			vat_rate: options.vatRate,
			bank_account: options.bankAccount,
			iban: options.iban,
			variable_symbol: options.variableSymbol,
			swift: options.swift,
			bic: options.bic,
		};
	}

	return undefined;
}
