import React from 'react';
import { useActiveAddress, useConnection } from 'arweave-wallet-kit';
import { Modal, ConfigProvider, Button, Avatar } from 'antd';
import { PiUser, PiCopy, PiSignOut } from 'react-icons/pi';
interface Props {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	profile: any;
}

const ProfileModal = ({ modalOpen, setModalOpen, profile }: Props) => {
	const address = useActiveAddress();
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
				<div className='flex flex-col gap-8 font-righteous'>
					<div className='text-lg'>Profile</div>
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
							<span className='text-lg tracking-wide'>
								{profile?.profile?.handleName ||
									profile?.addr.slice(0, 8) + '...' + profile?.addr.slice(-8)}
							</span>
							<Button
								icon={<PiCopy size={16} color='#aaaaaa' />}
								type='text'
								className='flex items-center justify-center'
								onClick={() => navigator.clipboard.writeText(address!)}
							/>
						</div>
						<div className='text-lg tracking-wide'>0 AR</div>
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
