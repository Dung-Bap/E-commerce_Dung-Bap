import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../store/app/appSlice';

const Modal = ({ children }) => {
    const dispatch = useDispatch();
    const { isShowModal } = useSelector(state => state.app);
    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, [isShowModal]);
    return (
        <div
            onClick={() => {
                dispatch(showModal({ isShowModal: false, childrenModal: null }));
                document.body.style.overflow = 'overlay';
            }}
            className="absolute z-50 inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
        >
            {children}
        </div>
    );
};

export default Modal;
