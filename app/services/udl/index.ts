type OptionType = {
	label: string;
	value: string;
};

export const LicenseFeeOptions: OptionType[] = [
	{
		label: 'None',
		value: 'None',
	},
	{
		label: 'Monthly',
		value: 'Monthly',
	},
	{
		label: 'One Time',
		value: 'One-Time',
	},
];

export const CommercialUseOptions: OptionType[] = [
	{
		label: 'None',
		value: 'None',
	},
	{
		label: 'Allowed',
		value: 'Allowed',
	},
	{
		label: 'Allowed With Credit',
		value: 'Allowed-With-Credit',
	},
];

export const CurrencyOptions: OptionType[] = [
	{
		label: 'U',
		value: 'U',
	},
	{
		label: 'Arweave',
		value: 'AR',
	},
	{
		label: 'Matic',
		value: 'MATIC',
	},
	{
		label: 'Ethereum',
		value: 'ETH',
	},
	{
		label: 'Solana',
		value: 'SOL',
	},
];

export const DerivationOptions: OptionType[] = [
	{
		label: 'None',
		value: 'None',
	},
	{
		label: 'Allowed With Credit',
		value: 'Allowed-With-Credit',
	},
	{
		label: 'Allowed With Indication',
		value: 'Allowed-With-Indication',
	},
	{
		label: 'Allowed With License Passthrough',
		value: 'Allowed-With-License-Passthrough',
	},
	{
		label: 'Allowed With Revenue Share',
		value: 'Allowed-With-RevenueShare',
	},
];
