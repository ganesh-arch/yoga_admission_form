import React from 'react';
import './CustomInput.scss';

const CustomInput = ({
	value = '',
	onChange = () => {},
	placeholder = '',
	type = 'text',
	required = false,
	error = false,
	errorText = '',
	success = false,
}) => {
	return (
		<div className='custom-input__container'>
			<input
				className={
					'custom-input' + (error ? ' error' : '') + (success ? ' success' : '')
				}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				type={type}
				required={required}
			/>
			{error && <div className='custom-input__error'>{errorText}!</div>}
		</div>
	);
};

export default CustomInput;
