import React from 'react';
import { Player } from '@livepeer/react';

import { Image } from 'antd';

import { Video } from '@/types/video';

const VideoPlayer = ({ title, transactionId, thumbnail }: Video) => {
	return (
		<div className='max-w-[1124px]'>
			<Player
				title={title}
				playbackId={`ar://${transactionId}`}
				objectFit='cover'
				theme={{
					borderStyles: {
						containerBorderStyle: undefined,
					},
					colors: {
						accent: '#7E4AFD',
					},
					radii: {
						containerBorderRadius: '1rem',
					},
				}}
				aspectRatio='16to9'
				showPipButton
				poster={
					<Image
						src={`https://qhwwu7xzi43l35vol5bkrjilcnfaw37oy5mlustvbbrrhnbi6xha.arweave.net/${thumbnail}`}
						alt={title}
						preview={false}
						className='object-cover'
					/>
				}
			/>
		</div>
	);
};

export default VideoPlayer;
