import React, { useRef } from 'react';
import './Modal.scss';

// assets
import loader from '../../assets/loader-green.svg';

// helpers
import useOnClickOutside from '../../helpers/useOnClickOutside';

const Modal = ({
	setShowModal = () => {},
	title = 'Title',
	children = <></>,
	loading = false,
	maxWidth = '50vw',
	showEditButton = false,
	editMode = false,
	setEditMode = () => {},
}) => {
	const modalRef = useRef(null);
	useOnClickOutside(modalRef, () => setShowModal(false));
	return (
		<div className='modal'>
			<div
				className='modal-content'
				ref={modalRef}
				style={{ maxWidth: maxWidth }}
			>
				<div className='modal-header'>
					<span onClick={() => setShowModal(false)} className='close'>
						&times;
					</span>
					<h2 className='modal-title'> {title}</h2>
					{showEditButton && !editMode && (
						<button
							className='modal__edit-button'
							onClick={() => setEditMode((prev) => !prev)}
						>
							Edit
						</button>
					)}
				</div>
				{loading ? (
					<div className='modal-loading'>
						<img src={loader} alt='loading' />
					</div>
				) : (
					<div style={{ padding: '20px' }}>{children}</div>
				)}
			</div>
		</div>
	);
};

export default Modal;
