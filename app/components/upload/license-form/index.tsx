import React from 'react';
import toast from 'react-hot-toast';
import { UploadContext } from '@/pages/upload';
import { Select, InputNumber, Input, Slider, Button } from 'antd';
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

import { formatTags } from '@/services/udl';

const LicenseForm = () => {
	const { uploadForm, setUploadForm } = React.useContext(UploadContext);

	// License State
	const [licenseFee, setLicenseFee] = React.useState<LicenseFeeType>('None');
	const [licenseFeeValue, setLicenseFeeValue] = React.useState<string>('100');

	// Commercial Use State
	const [commercialUse, setCommercialUse] =
		React.useState<CommercialUseType>('None');

	// Payment Information State
	const [paymentAddress, setPaymentAddress] = React.useState<string>('');
	const [currency, setCurrency] = React.useState<CurrencyType>('U');

	// Derivation State
	const [derivation, setDerivation] = React.useState<DerivationType>('None');
	const [revenueShare, setRevenueShare] = React.useState<number>(25);

	// Expire State
	const [expires, setExpires] = React.useState<string>('2');

	const handleSave = () => {
		try {
			if (!paymentAddress) {
				toast.error('Payment Address is required');
				return;
			}
			let tags = formatTags({
				licenseFee,
				licenseFeeValue,
				commercialUse,
				paymentAddress,
				currency,
				derivation,
				revenueShare,
				expires,
			});
			console.log(tags);
			setUploadForm({ ...uploadForm, tags });
			toast.success('License Information Saved');
		} catch (error) {
			toast.error('Error Saving License Information');
		}
	};

	return (
		<>
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
								defaultValue='100'
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
							defaultValue='U'
							className='min-w-[128px]'
							onChange={(value) => setCurrency(value as CurrencyType)}
							options={CurrencyOptions}
						/>
						<Input
							placeholder='Payment Wallet Address'
							className='max-w-[256px]'
							allowClear
							onChange={(e) => setPaymentAddress(e.target.value as string)}
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
				<div className='flex flex-col gap-3'>
					<span className='text-[1rem] font-semibold text-gray-400'>
						Expires
					</span>
					<InputNumber
						defaultValue='2'
						className='max-w-[256px]'
						onChange={(value) => setExpires(value as string)}
					/>
				</div>
			</div>
			<Button
				size='large'
				type='text'
				className='bg-[#8149FC] text-white text-xl font-semibold hover:!bg-[#8149FC] hover:!scale-[102%] mt-6'
				onClick={handleSave}
			>
				Save
			</Button>
		</>
	);
};

export default LicenseForm;
