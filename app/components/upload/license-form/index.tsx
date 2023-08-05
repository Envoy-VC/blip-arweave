import React from 'react';
import { Select, InputNumber, Input, Slider } from 'antd';
import {
	LicenseFeeOptions,
	CommercialUseOptions,
	CurrencyOptions,
	DerivationOptions,
} from '@/services/udl';

import {
	LicenseFeeType,
	CommercialUseType,
	CurrencyType,
	DerivationType,
} from '@/types/udl-license';

const LicenseForm = () => {
	// License State
	const [licenseFee, setLicenseFee] = React.useState<LicenseFeeType>('None');
	const [licenseFeeValue, setLicenseFeeValue] = React.useState<string>('0');

	// Commercial Use State
	const [commercialUse, setCommercialUse] =
		React.useState<CommercialUseType>('None');

	// Payment Information State
	const [paymentAddress, setPaymentAddress] = React.useState<string>('');
	const [currency, setCurrency] = React.useState<CurrencyType>('U');

	// Derivation State
	const [derivation, setDerivation] = React.useState<DerivationType>('None');
	const [revenueShare, setRevenueShare] = React.useState<number>(25);

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-3'>
				<span className='text-[1rem] font-semibold text-gray-400'>
					License Fee
				</span>
				<div className='flex flex-col gap-4 sm:flex-row'>
					<Select
						defaultValue='None'
						className='min-w-[128px]'
						onChange={(value) => setLicenseFee(value as LicenseFeeType)}
						options={LicenseFeeOptions}
					/>
					{licenseFee !== 'None' && (
						<InputNumber
							defaultValue='2'
							className='max-w-[256px]'
							onChange={(value) => setLicenseFeeValue(value as string)}
						/>
					)}
				</div>
			</div>
			<div className='flex flex-col gap-3'>
				<span className='text-[1rem] font-semibold text-gray-400'>
					Commercial Use
				</span>
				<Select
					defaultValue='None'
					className='max-w-[256px]'
					onChange={(value) => setCommercialUse(value as CommercialUseType)}
					options={CommercialUseOptions}
				/>
			</div>
			<div className='flex flex-col gap-3'>
				<span className='text-[1rem] font-semibold text-gray-400'>
					Payment Information
				</span>
				<div className='flex flex-col-reverse gap-4 sm:flex-row'>
					<Select
						defaultValue='None'
						className='min-w-[128px]'
						onChange={(value) => setCurrency(value as CurrencyType)}
						options={CurrencyOptions}
					/>
					<Input
						placeholder='Payment Wallet Address'
						className='max-w-[256px]'
						allowClear
						onChange={(value: any) => setPaymentAddress(value as string)}
					/>
				</div>
			</div>
			<div className='flex flex-col gap-3'>
				<span className='text-[1rem] font-semibold text-gray-400'>
					Derivation
				</span>
				<div className='flex flex-col gap-4 sm:flex-row'>
					<Select
						defaultValue='None'
						className='min-w-[256px]'
						onChange={(value) => setDerivation(value as DerivationType)}
						options={DerivationOptions}
					/>
					{derivation === 'Allowed-With-RevenueShare' && (
						<Slider
							style={{ width: '256px' }}
							defaultValue={25}
							onChange={(value) => setRevenueShare(value as number)}
							tooltip={{ formatter: (value) => `${value}%` }}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default LicenseForm;
