/** @format */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Login, Public } from './pages/public';
import path from './ultils/path';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from './store/app/asyncActions';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div className="min-h-screen font-main ">
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.LOGIN} element={<Login />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
