import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.scss';

const useCustomToast = (
	toastStyle = {
		position: 'top-right',
		autoClose: 3000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
	}
) => {
	const successToast = (msg = 'Success.') => toast.success(msg, toastStyle);
	const errorToast = (msg = 'Oops ! Something went wrong.') =>
		toast.error(msg, toastStyle);

	return { successToast, errorToast, ToastComponent };
};

export default useCustomToast;

const ToastComponent = () => {
	return (
		<ToastContainer
			autoClose={3000}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme='dark'
			transition={Slide}
			className='Toastify__toast-container'
		/>
	);
};
