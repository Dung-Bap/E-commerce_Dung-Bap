/** @format */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FinalRegister, Home, Login, Public, ResetPassword } from './pages/public';
import path from './ultils/path';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from './store/app/asyncActions';
import { Products, DetailProduct, Blogs, FAQs, Services } from './pages/public';
import Modal from './components/Modal/Modal';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const { isShowModal, childrenModal } = useSelector(state => state.app);

    return (
        <div className="font-main relative">
            {isShowModal && <Modal>{childrenModal}</Modal>}
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.PRODUCTS} element={<Products />} />
                    <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
                    <Route path={path.OUT_SERVICES} element={<Services />} />
                    <Route path={path.FAQS} element={<FAQs />} />
                    <Route path={path.BLOGS} element={<Blogs />} />
                </Route>
                <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path={path.LOGIN} element={<Login />} />
                <Route path={path.FINALREGISTER} element={<FinalRegister />} />
            </Routes>
        </div>
    );
}

export default App;
