import React, { useState } from 'react';
import './SignUp.scss';

// utils
import flattenObj from '../../helpers/flatternObj';
import getInnerKey from '../../helpers/getInnerKey';
import useCustomToast from '../../helpers/useCustomToast';

// api
import { createUser } from '../../api/user';

// components
import Form from './Form';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ setUserData = () => {} }) => {
	// utils
	const navigate = useNavigate();
	const { successToast, errorToast } = useCustomToast();
	const [validationError, setValidationError] = useState('');

	// handle create user
	const [loading, setLoading] = useState(false);
	const handleCreateUser = async (data) => {
		setLoading(true);
		const res = await createUser(data);

		switch (res.code) {
			case 200:
				successToast('Registeration Successfull');
				setUserData(res.data);
				navigate('/login');
				break;
			case 400:
				setValidationError(getInnerKey(flattenObj(res), '.message')[0]);
				break;
			case 403:
				errorToast('You are not allowed to perform this request');
				break;
		}

		setLoading(false);
	};

	return (
		<div className='signup'>
			{/* <ToastComponent /> */}
			<Form
				handleSubmit={handleCreateUser}
				loading={loading}
				validationError={validationError}
				setValidationError={setValidationError}
			/>
		</div>
	);
};

export default SignUp;
