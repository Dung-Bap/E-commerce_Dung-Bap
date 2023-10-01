import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/app/appSlice';

const Modal = ({ children }) => {
    const dispatch = useDispatch();
    return (
        <div
            onClick={() => {
                dispatch(showModal({ isShowModal: false, childrenModal: null }));
            }}
            className="absolute z-50 inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
        >
            {children}
        </div>
    );
};

export default memo(Modal);
