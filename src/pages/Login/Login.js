import React, { useEffect, useState } from 'react';
import './Login.scss';

// api
import { login } from '../../api/user';

// utils
import { Link, useNavigate } from 'react-router-dom';
import useCustomToast from '../../helpers/useCustomToast';
import Joi from 'joi';
import getInnerKey from '../../helpers/getInnerKey';
import flattenObj from '../../helpers/flatternObj';

// components
import CustomInput from '../../components/CustomInput/CustomInput';
import FormButton from '../../components/FormButton/FormButton';

const Login = ({ setUserData = () => {} }) => {
	// utils
	const { successToast } = useCustomToast();
	const [loading, setLoading] = useState(false);
	const [validationError, setValidationError] = useState('');
	const navigate = useNavigate();

	// form states
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// login user
	const handleLogin = async () => {
		const data = {
			email: email,
			password: password,
		};
		const validation = validate(data);
		if (!(validation === true)) {
			setValidationError(validation);
			return;
		}
		setLoading(true);
		const res = await login(data);
		switch (res.code) {
			case 200:
				successToast('Login Successfull');
				navigate('/profile');
				setUserData(res.data);
				break;
			case 400:
				setValidationError(
					getInnerKey(flattenObj(res), '.message')[0] ||
						'email or password does not match '
				);
				break;
		}
		setLoading(false);
	};

	// resetting validation error when fields are changed
	useEffect(() => {
		setValidationError('');
	}, [email, password]);
	return (
		<>
			<h1>Login to your account</h1>
			<form className='login__fields'>
				<CustomInput
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type='email'
					error={
						validationError.includes('email') ||
						validationError.includes('error') ||
						validationError.includes('match')
					}
					errorText={validationError}
					success={validationError.includes('success')}
				/>
				<CustomInput
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					error={
						validationError.includes('password') ||
						validationError.includes('error') ||
						validationError.includes('match')
					}
					errorText={validationError}
					success={validationError.includes('success')}
				/>
				<FormButton type='submit' onClick={handleLogin} loading={loading}>
					Submit
				</FormButton>
			</form>
			<span>
				Do not have an account?{' '}
				<Link to='/' className='green'>
					Sign up
				</Link>
			</span>
		</>
	);
};

export default Login;

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required(),

		password: Joi.string().min(8).required(),
	});
	let { error } = schema.validate(data);
	if (error) {
		error = error.toString().replace('ValidationError:', '');
		return error;
	} else return true;
};
