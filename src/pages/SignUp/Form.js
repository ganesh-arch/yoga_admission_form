import React, { useEffect, useState } from 'react';
import './SignUp.scss';

// utils
import { Link } from 'react-router-dom';
import Joi from 'joi';

// components
import CustomInput from '../../components/CustomInput/CustomInput';
import FormButton from '../../components/FormButton/FormButton';
import Batches from '../../components/Batches/Batches';

const Form = ({
	handleSubmit = () => {},
	validationError = '',
	setValidationError = () => {},
	loading = false,
}) => {
	// form states
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [age, setAge] = useState('');
	const [batch_id, setBatch_id] = useState();

	// change handlers
	const handleChange_name = (e) => {
		setName(e.target.value);
	};
	const handleChange_age = (e) => {
		setAge(e.target.value);
	};
	const handleChange_email = (e) => {
		setEmail(e.target.value);
	};
	const handleChange_password = (e) => {
		setPassword(e.target.value);
	};
	const handleChange_passwordConfirm = (e) => {
		setPasswordConfirm(e.target.value);
	};

	// resetting validation error when fields are changed
	useEffect(() => {
		setValidationError('');
	}, [name, email, password, passwordConfirm, age]);

	// validating user
	const validateUser = () => {
		const data = {
			email: email,
			password: password,
			passwordConfirm: passwordConfirm,
			name: name,
			age: age,
			batch_id: batch_id,
		};
		const validation = validate(data);
		if (!(validation === true)) {
			setValidationError(validation);
			return;
		}
		handleSubmit(data);
	};
	return (
		<>
			<h1>Sign Up to a healthy mind and body.</h1>
			<form className='signup__fields'>
				<CustomInput
					placeholder='Email'
					value={email}
					onChange={handleChange_email}
					type='email'
					error={validationError.includes('email')}
					errorText={validationError}
					success={validationError.includes('success')}
				/>
				<CustomInput
					placeholder='Name'
					value={name}
					onChange={handleChange_name}
					error={validationError.includes('name')}
					errorText={validationError}
					success={validationError.includes('success')}
				/>
				<CustomInput
					placeholder='Age'
					value={age}
					onChange={handleChange_age}
					error={validationError.includes('age')}
					errorText={validationError}
					success={validationError.includes('success')}
				/>
				<CustomInput
					placeholder='Password'
					value={password}
					onChange={handleChange_password}
					error={
						validationError.includes('password') ||
						validationError.includes('Passwords')
					}
					errorText={validationError}
					success={validationError.includes('success')}
				/>
				<CustomInput
					placeholder='Confirm Password'
					value={passwordConfirm}
					onChange={handleChange_passwordConfirm}
					error={validationError.includes('Passwords')}
					errorText={validationError}
					success={validationError.includes('success')}
				/>
				<section>
					<div className='divider'></div>
					<h6>Select batch</h6>
					<div className='divider'></div>
				</section>

				<Batches batch_id={batch_id} setBatch_id={setBatch_id} />

				<FormButton type='submit' onClick={validateUser} loading={loading}>
					Submit
				</FormButton>
			</form>
			<span>
				Already have an account?{' '}
				<Link to='/login' className='green'>
					Log In
				</Link>
			</span>
		</>
	);
};

export default Form;

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required(),
		name: Joi.string().min(2).required(),
		age: Joi.number().min(18).max(65).required(),
		password: Joi.string().min(8).required(),
		passwordConfirm: Joi.string().equal(data.password).required(),
		batch_id: Joi.string().required(),
	});
	let { error } = schema.validate(data);
	if (error) {
		error = error.toString().replace('ValidationError:', '');
		if (error.includes('passwordConfirm')) return 'Passwords does not match';
		return error;
	} else return true;
};
