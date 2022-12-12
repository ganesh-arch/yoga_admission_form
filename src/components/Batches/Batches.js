import React, { useEffect, useState } from 'react';
import './Batches.scss';

// assets
import loader from '../../assets/loader-green.svg';
import clock from '../../assets/clock.png';

// api
import { readAllBatch } from '../../api/batch';

// utils
import moment from 'moment';

const Batches = ({
	batch_id = '',
	setBatch_id = () => {},
	disabled = false,
}) => {
	// getting all batches
	const [batches, setBatches] = useState([]);
	const [loading, setLoading] = useState(true);
	const getAllBatches = async () => {
		setLoading(true);
		const response = await readAllBatch();
		setLoading(false);
		switch (response.code) {
			case 200:
				setBatches(response.data);
				setBatch_id(batch_id || response.data[0].id);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		getAllBatches();
	}, []);

	return (
		<>
			<div className='batches__container'>
				{loading && (
					<div className='loader-container'>
						<img src={loader} alt='loading' width={40} className='loader' />
					</div>
				)}
				{!loading &&
					batches.map((batch) => {
						return (
							<div
								className={
									'batches' +
									(batch.id == batch_id ? ' selected' : '') +
									(disabled ? ' disabled' : '')
								}
								onClick={() => {
									if (!disabled) setBatch_id(batch.id);
								}}
							>
								<>
									<div className='timing'>
										<img src={clock} alt='time' />

										<div>
											IN -{' '}
											<span>
												{moment(batch.in_time, 'hh:mm').format('hh:mm a')}
											</span>
										</div>
										<div>
											OUT -{' '}
											<span>
												{moment(batch.out_time, 'hh:mm').format('hh:mm a')}
											</span>
										</div>
									</div>
									<div className='fee '>₹ {batch.fee}</div>
								</>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default Batches;
