import React, { useEffect, useState } from 'react';
import './Payments.scss';

// assets
import loader from '../../assets/button-loader.svg';

// api
import { createPayment, readAllPayments } from '../../api/payments';
import StatusTag from '../StatusTag/StatusTag';
import moment from 'moment';
import Modal from '../Modal/Modal';
import { readOneBatch } from '../../api/batch';
import FormButton from '../FormButton/FormButton';
import useCustomToast from '../../helpers/useCustomToast';

const Payments = ({ id = '', user = {} }) => {
	// utils
	const { successToast, errorToast, ToastComponent } = useCustomToast();
	const [payments, setPayments] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState(false);
	const [batch, setBatch] = useState({});
	const [selectedSource, setSelectedSource] = useState('UPI');
	const getPaymentStatus = () => {
		let status = false;
		payments.forEach((payment) => {
			if (
				moment(payment.created).format('MM yyyy') ===
				moment(moment()).format('MM yyyy')
			)
				status = true;
		});
		setPaymentStatus(status);
	};

	// getting batch details
	const [modalLoading, setModalLoading] = useState(true);
	const getBatchDetails = async () => {
		setModalLoading(true);
		const response = await readOneBatch(user.batch_id);
		if (response.code === 200) setBatch(response.data);
		setModalLoading(false);
	};

	// fetching all payments
	const [loading, setLoading] = useState(true);
	const getAllPayments = async () => {
		setLoading(true);
		const response = await readAllPayments(id);
		if (response.code == 200) setPayments(response.data);
		setLoading(false);
	};

	// creating payment
	const [payLoading, setPayLoading] = useState(false);
	const pay = async () => {
		setPayLoading(true);
		const data = {
			amount: batch.fee,
			user_id: id,
			status: 'success',
			source: selectedSource,
		};
		const res = await createPayment(data);
		switch (res.code) {
			case 200:
				successToast('Payment Successfull');
				setPaymentStatus(true);
				setShowModal(false);
				break;
			default:
				errorToast(res.message);
				break;
		}

		setPayLoading(false);
	};

	useEffect(() => {
		if (payments.length > 0) getPaymentStatus();
	}, [payments]);
	useEffect(() => {
		getAllPayments();
		getBatchDetails();
	}, []);
	return (
		<div className='payments'>
			{showModal && (
				<Modal
					title='Add Payment'
					setShowModal={setShowModal}
					loading={modalLoading}
				>
					<ToastComponent />
					<h1>Amount : ₹ {batch.fee}</h1>
					<section>
						<div className='divider'></div>
						<h6>Select Source</h6>
						<div className='divider'></div>
					</section>
					<div className='sources'>
						<div
							className={
								'source-card ' + (selectedSource === 'UPI' && 'selected')
							}
							onClick={(e) => setSelectedSource(e.target.innerText)}
						>
							UPI
						</div>
						<div
							className={
								'source-card ' + (selectedSource === 'CARD' && 'selected')
							}
							onClick={(e) => setSelectedSource(e.target.innerText)}
						>
							CARD
						</div>
					</div>
					<FormButton onClick={pay} loading={payLoading}>
						Pay ₹ {batch.fee}
					</FormButton>
				</Modal>
			)}
			<h6>Payment Status : </h6>
			<StatusTag color={paymentStatus ? 'green' : 'red'}>
				{loading ? (
					<img src={loader} alt='loading' width={20}></img>
				) : paymentStatus === true ? (
					'Completed'
				) : (
					'Pending'
				)}
			</StatusTag>
			{!paymentStatus && (
				<StatusTag color='dodgerblue' onClick={() => setShowModal(true)}>
					+ Add Payment{' '}
				</StatusTag>
			)}
		</div>
	);
};

export default Payments;
