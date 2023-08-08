import React from 'react';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { InputNumber, Button } from 'antd';

import { getAvailableFunds, fundBundlr } from '@/services/bundlr';

import { PiCurrencyEth } from 'react-icons/pi';

const BundlrConfig = () => {
	const address = useAddress();
	const [availableFunds, setAvailableFunds] = React.useState<string | null>(
		null
	);
	const [funds, setFunds] = React.useState<number>(0);

	React.useEffect(() => {
		if (address) {
			getAvailableFunds().then((res) => {
				setAvailableFunds(res);
			});
		}
	}, [address]);

	const handleFund = async () => {
		console.log(funds);
		await fundBundlr((funds * 10 ** 18).toString());
	};

	return (
		<div className='rounded-xl bg-[#111111] p-8 w-full shadow-md '>
			<div className='mb-8 text-2xl font-semibold'>Bundlr Configuration</div>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col justify-around gap-4 sm:flex-row'>
					<div className='flex flex-col items-center justify-center p-4 px-6 bg-[#111111] shadow-md rounded-xl border-2 border-[#232326]'>
						<p className='text-[1rem] font-semibold text-white'>Funds</p>
						<p className='text-lg font-bold text-[#cccccc]'>{`${
							availableFunds || 0
						} MATIC`}</p>
					</div>
					<ConnectWallet
						btnTitle='Connect Wallet'
						className='!py-6 !justify-center !bg-[#111111] !text-white'
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<InputNumber
						addonAfter='MATIC'
						size='large'
						max={100000}
						onChange={(value) => setFunds(value || 0)}
					/>
					<Button
						icon={<PiCurrencyEth size={18} color='#fff' />}
						size='large'
						className='flex items-center justify-center font-semibold text-white border-[#5f5f5f] border-[2px]'
						type='text'
						onClick={handleFund}
					>
						Fund
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BundlrConfig;
