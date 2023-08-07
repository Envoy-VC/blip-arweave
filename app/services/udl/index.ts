import { TagType } from '@/types/udl-license';
import { DefaultTags } from '@/config';

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

interface FormatTagsProps {
	licenseFee: string;
	licenseFeeValue: string;
	commercialUse: string;
	paymentAddress: string;
	currency: string;
	derivation: string;
	revenueShare: number;
	expires: string;
}

export const formatTags = ({
	licenseFee,
	licenseFeeValue,
	commercialUse,
	paymentAddress,
	currency,
	derivation,
	revenueShare,
	expires,
}: FormatTagsProps) => {
	let tags: TagType[] = [];
	tags.push(...DefaultTags);

	// License Tag
	if (licenseFee !== 'None') {
		tags.push({
			name: 'License-Fee',
			value: `${licenseFee}-${licenseFeeValue}`,
		});
	}

	// Commercial Use Tag
	if (commercialUse !== 'None') {
		tags.push({
			name: 'Commercial-Use',
			value: commercialUse,
		});
	}

	// Payment Information Tags
	tags.push({
		name: 'Currency',
		value: currency,
	});
	tags.push({
		name: 'Payment-Address',
		value: paymentAddress,
	});

	// Derivation Tags
	if (derivation !== 'None') {
		if (derivation !== 'Allowed-With-RevenueShare') {
			tags.push({
				name: 'Derivation',
				value: derivation,
			});
		} else {
			tags.push({
				name: 'Derivation',
				value: `${derivation}-${revenueShare}%`,
			});
		}
	}
	tags.push({
		name: 'Expires',
		value: `${expires}`,
	});

	return tags;
};
