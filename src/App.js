import { useEffect, useState } from 'react';
import './App.scss';

// assets
import loader from './assets/loader-green.svg';

// utils
import { Route, Routes, useNavigate } from 'react-router-dom';

// components
import Illustration from './components/Illustration/Illustration';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import getUserFromLocalStorage from './helpers/getUserFromLocalStorage';
import Profile from './pages/Profile/Profile';
import useCustomToast from './helpers/useCustomToast';

function App() {
	const { ToastComponent } = useCustomToast();
	const navigate = useNavigate();

	// check login status
	const [loading, setLoading] = useState(true);
	const checkLoginStatus = async () => {
		setLoading(true);
		const user = await getUserFromLocalStorage();
		if (user === null) {
			setLoading(false);
			return;
		}
		navigate('/profile');
		setLoading(false);
	};

	useEffect(() => {
		checkLoginStatus();
	}, [window.location.href]);
	return (
		<div className='App'>
			<ToastComponent />
			<Illustration />
			<div className='form-container'>
				{loading ? (
					<div className='loading-container'>
						<img src={loader} alt='loading'></img>
					</div>
				) : (
					<Routes>
						<Route path='/' element={<SignUp />} />
						<Route path='/login' element={<Login />} />
						<Route path='/profile' element={<Profile />} />
					</Routes>
				)}
			</div>
		</div>
	);
}

export default App;
