export type TagType = {
	name: string;
	value: string;
};

export type DerivationType =
	| 'Allowed-With-Credit'
	| 'Allowed-With-Indication'
	| 'Allowed-With-License-Passthrough'
	| `Allowed-With-RevenueShare`
	| 'None';

export type CommercialUseType = 'Allowed' | 'Allowed-With-Credit' | 'None';

export type LicenseFeeType = `Monthly` | `One-Time` | 'None';

export type CurrencyType = 'U' | 'AR' | 'MATIC' | 'ETH';
