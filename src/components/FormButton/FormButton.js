import React from 'react';
import './FormButton.scss';

// assets
import loader from '../../assets/button-loader.svg';

const FormButton = ({
	children = <></>,
	loading = false,
	onClick = () => {},
	type = 'button',
	className = '',
}) => {
	return (
		<button
			className={'form-button ' + className}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
			type={type}
			disabled={loading}
		>
			{loading ? (
				<img
					src={loader}
					alt='loading'
					width={24}
					style={{ marginBottom: '-3px' }}
				/>
			) : (
				children
			)}
		</button>
	);
};

export default FormButton;
