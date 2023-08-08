import React from 'react';
interface Props {
	width?: number;
	height?: number;
}

const BlipIcon = ({ width = 64, height = 62 }: Props) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 64 62'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M9.48148 0H54.5185V4.74074H59.2593V9.48148H64V52.1481H59.2593V56.8889H54.5185V61.6296H9.48148V56.8889H4.74074V52.1481H0V9.48148H4.74074V4.74074H9.48148V0Z'
				fill='url(#paint0_linear_344_9)'
			/>
			<path
				d='M33.1852 18.9657V23.7065H37.9259V28.4472H42.6667V33.1879H37.9259V37.9287H33.1852V42.6671L28.4444 42.6694V47.4102H23.7037V14.2227H28.4444V18.9657H33.1852Z'
				fill='white'
			/>
			<defs>
				<linearGradient
					id='paint0_linear_344_9'
					x1='32'
					y1='0'
					x2='32'
					y2='61.6296'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#604AFE' />
					<stop offset='1' stopColor='#DA49FA' />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default BlipIcon;
