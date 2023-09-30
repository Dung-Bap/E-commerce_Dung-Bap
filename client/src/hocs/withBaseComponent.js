import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const withBaseComponent = Component => props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    return <Component {...props} navigate={navigate} dispatch={dispatch} location={location} />;
};

export default withBaseComponent;

// const ahihi = props => {
//     console.log(props);
// };

// const ahuhu = ahihi => hehe => {
//     const x = 'abc';
//     ahihi(hehe + x);
// };

// ahuhu(ahihi)('props');

// hoc là một hàm và trả về 1 hàm khác (ahihi), đối số của hàm (ahihi) là (hehe) : để có thể xử lý và thêm biến trong hàm ahihi
