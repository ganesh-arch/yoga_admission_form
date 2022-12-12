import React from 'react';
import './Illustration.scss';

// assets
import yogaAnimation from '../../assets/yoga.json';

// utility
import Lottie from 'react-lottie';

const Illustration = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: yogaAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	return (
		<div className='illustration__container'>
			<div className='illustration__title'>Flexmoney</div>
			<div className='illustration__quote'>
				The nature of yoga is to shine the light of awareness into the darkest
				corners of the body.
			</div>
			<Lottie options={defaultOptions} height={600} />
		</div>
	);
};

export default Illustration;
