import React from 'react';
import { useActiveAddress, useConnection, useApi } from 'arweave-wallet-kit';
import { Modal, ConfigProvider, Button, Avatar } from 'antd';

import { PiUser, PiCopy, PiSignOut } from 'react-icons/pi';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
interface Props {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	profile: any;
}

const ProfileModal = ({ modalOpen, setModalOpen, profile }: Props) => {
	const address = useActiveAddress();
	const [arweaveBalance, setArweaveBalance] = React.useState<number>(0);

	React.useEffect(() => {
		const getBalance = async () => {
			const res = await fetch(
				`https://arweave.net/wallet/${address}/balance`
			).then((response) => response.json());
			setArweaveBalance(res);
		};

		getBalance();
	}, [address]);

	const { disconnect } = useConnection();
	const handleModalState = (state: boolean) => {
		setModalOpen(state);
	};

	const handleDisconnect = async () => {
		await disconnect();
		setModalOpen(false);
	};

	return (
		<ConfigProvider
			theme={{
				token: {
					colorBgElevated: '#161618',
					borderRadiusLG: 18,
				},
			}}
		>
			<Modal
				footer={null}
				open={modalOpen}
				onCancel={() => handleModalState(false)}
			>
				<div className={`flex flex-col gap-8 ${inter.className}`}>
					<div className='text-xl font-semibold'>Profile</div>
					<div className='flex flex-col items-center gap-3 text-center'>
						<Avatar
							size={84}
							src={
								profile?.profile?.avatarURL || (
									<PiUser size={48} color='#aaaaaa' />
								)
							}
							className='flex items-center justify-center border-2 border-[#aaaaaa]'
						/>
						<div className='flex flex-row items-center justify-center'>
							<span className='text-lg font-medium'>
								{profile?.profile?.handleName ||
									profile?.addr.slice(0, 8) + '...' + profile?.addr.slice(-8)}
							</span>
							<Button
								icon={<PiCopy size={16} color='#cccccc' />}
								type='text'
								className='flex items-center justify-center'
								onClick={() => navigator.clipboard.writeText(address!)}
							/>
						</div>
						<div className='text-lg font-bold'>{`${
							arweaveBalance / 10 ** 12
						} AR`}</div>
					</div>
					<Button
						type='text'
						className='flex flex-row items-center justify-center gap-2 !py-6 bg-black hover:!bg-black hover:!scale-[102%]'
						size='large'
						onClick={() => handleDisconnect()}
					>
						<PiSignOut size={20} color='#fff' />
						<span className='text-lg font-medium'>Disconnect</span>
					</Button>
				</div>
			</Modal>
		</ConfigProvider>
	);
};

export default ProfileModal;
