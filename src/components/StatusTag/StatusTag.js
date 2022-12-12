import React from 'react';
import './StatusTag.scss';

export default function StatusTag({
	color = 'red',
	className,
	background = 'rgba(255, 255, 255, 0.1)',
	children = '',
	width = '120px',
	onClick = () => {},
}) {
	const getColor = () => {
		switch (color) {
			case 'red':
				return 'rgb(255, 99, 50)';

			case 'green':
				return 'rgb(51, 199, 28)';

			case 'yellow':
				return 'rgb(255, 193, 7)';

			default:
				return color;
		}
	};
	const currentColor = getColor();
	return (
		<div
			className={'status-tag ' + className}
			style={{
				color: 'white',
				background: currentColor,
				width: width,
			}}
			onClick={onClick}
		>
			{children}
		</div>
	);
}
