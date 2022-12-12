import React, { useEffect, useState } from 'react';
import './Profile.scss';

// assets
import loader from '../../assets/loader-green.svg';

// utils
import pb from '../../api/instance';
import { useNavigate } from 'react-router-dom';

// components
import FormButton from '../../components/FormButton/FormButton';
import Batches from '../../components/Batches/Batches';
import Payments from '../../components/Payments/Payments';
import getUserFromLocalStorage from '../../helpers/getUserFromLocalStorage';
import { readUser, updateUser } from '../../api/user';
import useCustomToast from '../../helpers/useCustomToast';

const Profile = () => {
	// utils
	const { successToast, errorToast } = useCustomToast();
	const navigate = useNavigate();
	const [edit, setEdit] = useState(false);
	const [batch_id, setBatch_id] = useState('');

	// getting user data
	const [userData, setUserData] = useState({});
	const [loading, setLoading] = useState(true);
	const getUserData = async () => {
		setLoading(true);
		const user = await getUserFromLocalStorage();
		if (user === null) navigate('/');
		const response = await readUser(user.id);
		setUserData(response.data);
		setBatch_id(response.data.batch_id);
		setLoading(false);
	};

	const logout = () => {
		pb.authStore.clear();
		setUserData({});
		navigate('/');
	};

	// handle edit user
	const [editLoading, setEditLoading] = useState(false);
	const handleEditClick = async () => {
		if (!edit) {
			setEdit(true);
			return;
		}
		setEditLoading(true);
		const res = await updateUser(userData.id, { batch_id: batch_id });
		switch (res.code) {
			case 200:
				successToast(
					'Batch updated Successfully (new batch timings will be active from next month)'
				);
				setUserData(res.data);
				setEdit(false);
				break;
			default:
				errorToast(res.message);
				break;
		}
		setEditLoading(false);
	};

	useEffect(() => {
		getUserData();
	}, []);

	if (loading) {
		return (
			<div className='loading-container'>
				<img src={loader} alt='loading'></img>
			</div>
		);
	}
	return (
		<div className='profile'>
			<h1>
				Welcome to your profile
				<Payments id={userData.id} user={userData} />
			</h1>
			<div className='title'>{userData.name} </div>
			<section>
				<div className='divider'></div>
				<h6>Yoga Batches</h6>
				<div className='divider'></div>
			</section>
			<Batches disabled={!edit} batch_id={batch_id} setBatch_id={setBatch_id} />
			<div className='flex-items'>
				<FormButton onClick={handleEditClick} loading={editLoading}>
					{edit ? 'Save' : 'Edit'}
				</FormButton>
				<FormButton className='logout-button' onClick={logout}>
					Logout
				</FormButton>
			</div>
		</div>
	);
};

export default Profile;
