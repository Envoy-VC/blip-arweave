import React from 'react';
import { useActiveAddress, ConnectButton } from 'arweave-wallet-kit';
import Account from 'arweave-account';

import { Avatar, Button } from 'antd';
import { ProfileModal } from '../modal';

import { Chat, Notification } from 'react-iconly';
import { PiUser } from 'react-icons/pi';

const CustomConnectButton = () => {
	const address = useActiveAddress();
	const account = new Account();
	const [profile, setProfile] = React.useState<any>(null);
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);

	React.useEffect(() => {
		async function getProfile() {
			let res = await account.get(address!);
			console.log(res);
			setProfile(res);
		}
		if (address) {
			getProfile();
		}
	}, []);

	if (!address) {
		return (
			<ConnectButton
				title='Sign in'
				accent='#8149FC'
				className='!rounded-xl !py-0 !font-bold'
			/>
		);
	}

	if (address) {
		return (
			<div className='flex flex-row items-center gap-8'>
				<div className='flex-row items-center hidden gap-8 md:flex'>
					<Button
						type='text'
						icon={<Chat set='light' primaryColor='#B4B8BD' size={28} />}
					/>
					<Button
						type='text'
						icon={<Notification set='light' primaryColor='#B4B8BD' size={28} />}
					/>
				</div>
				<div className='max-w-[44px] max-h-[44px] h-full w-full'>
					<Avatar
						shape='square'
						size={{ xs: 38, sm: 38, md: 42, lg: 44, xl: 44, xxl: 44 }}
						src={
							profile?.profile?.avatarURL || (
								<PiUser size={48} color='#aaaaaa' />
							)
						}
						className='border-2 border-[#ff84ffd8] cursor-pointer flex items-center justify-center'
						onClick={() => setModalOpen(true)}
					/>
				</div>
				<ProfileModal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					profile={profile}
				/>
			</div>
		);
	}
	return <div>CustomConnectButton</div>;
};

export default CustomConnectButton;
