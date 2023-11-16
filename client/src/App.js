/** @format */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Cart, CartDetail, CheckOut, FinalRegister, Home, Login, Menu, Public, ResetPassword } from './pages/public';
import path from './ultils/path';
import { getCategories } from './store/app/asyncActions';
import { Products, DetailProduct, Blogs, FAQs, Services } from './pages/public';
import Modal from './components/modal/Modal';
import { AdminLayout, CreateProducts, Dashboard, ManageOrder, ManageProduct, ManageUser } from './pages/admin';
import { BuyHistory, MemberLayout, MyCart, Personal, Wishlist } from './pages/member';
import { showCart, showMenu } from './store/app/appSlice';

function App() {
    const { isShowModal, childrenModal, isShowCart, isShowMenu } = useSelector(state => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div className="font-main h-full min-h-screen relative">
            {isShowCart && (
                <div
                    onClick={() => dispatch(showCart())}
                    className="absolute z-50 inset-0 bg-[rgba(0,0,0,0.5)] flex flex-row-reverse"
                >
                    <Cart />
                </div>
            )}
            {isShowMenu && (
                <div onClick={() => dispatch(showMenu())} className="absolute z-50 inset-0 bg-[rgba(0,0,0,0.5)]">
                    <Menu />
                </div>
            )}
            {isShowModal && <Modal>{childrenModal}</Modal>}
            <Routes>
                <Route path={path.CHECKOUT} element={<CheckOut />} />
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.PRODUCTS__CATEGORY} element={<Products />} />
                    <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
                    <Route path={path.OUT_SERVICES} element={<Services />} />
                    <Route path={path.FAQS} element={<FAQs />} />
                    <Route path={path.BLOGS} element={<Blogs />} />
                    <Route path={path.CART_DETAIL} element={<CartDetail />} />
                </Route>
                <Route path={path.ADMIN} element={<AdminLayout />}>
                    <Route path={path.CREATE_PRODUCTS} element={<CreateProducts />} />
                    <Route path={path.DASHBOARD} element={<Dashboard />} />
                    <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
                    <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
                    <Route path={path.MANAGE_USER} element={<ManageUser />} />
                </Route>
                <Route path={path.MEMBER} element={<MemberLayout />}>
                    <Route path={path.PERSONAL} element={<Personal />} />
                    <Route path={path.MY_CART} element={<MyCart />} />
                    <Route path={path.WHISHLIST} element={<Wishlist />} />
                    <Route path={path.BUY_HISTORY} element={<BuyHistory />} />
                </Route>
                <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path={path.LOGIN} element={<Login />} />
                <Route path={path.FINALREGISTER} element={<FinalRegister />} />
            </Routes>
        </div>
    );
}

export default App;
