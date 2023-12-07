import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import icons from '../../ultils/icons';
import path from '../../ultils/path';
import Swal from 'sweetalert2';
import { logout } from '../../store/user/userSlice';
import { showCart, showMenu } from '../../store/app/appSlice';

const Header = () => {
    const { MdPhone, GrMail, FaOpencart, IoLogOut, CgProfile, MdOutlineAdminPanelSettings, IoMenu } = icons;
    const { userData } = useSelector(state => state.user);
    const [detailProfile, setDetailProfile] = useState(false);
    const dispatch = useDispatch();

    const profiles = [
        {
            id: 1,
            title: 'Detail Profile',
            path: `/${path.MEMBER}/${path.PERSONAL}`,
            icon: <CgProfile size={20} />,
            role: 2001,
        },
        {
            id: 2,
            title: 'Admin Workspace ',
            path: `/${path.ADMIN}/${path.DASHBOARD}`,
            icon: <MdOutlineAdminPanelSettings size={20} />,
        },
        {
            id: 3,
            title: 'Log out',
            icon: <IoLogOut size={20} />,
            role: 2001,
        },
    ];

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to log out !',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes !',
        }).then(rs => {
            if (rs.isConfirmed) {
                dispatch(logout());
            }
        });
    };
    return (
        <div className="flex w-full items-center justify-between sm:border-b lg:w-main md:w-full px-[20px] lg:px-0 h-[110px] py-[20px] sm:py-[35px]">
            <div onClick={() => dispatch(showMenu())} className="sm:hidden cursor-pointer">
                <IoMenu size={26} color="red" />
            </div>

            <Link to={`/${path.HOME}`}>
                <img
                    loading="lazy"
                    className="max-w-[193px] sm:w-full"
                    alt=""
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/logo_digital_new_250x.png?v=1613166683"
                />
            </Link>

            <div className="flex items-center text-center">
                <div className="px-5 border-r-2 hidden flex-col lg:flex">
                    <span className="text-[13px] flex items-center font-medium">
                        <span className="mr-2 text-main">
                            <MdPhone />
                        </span>
                        (+1800) 000 8808
                    </span>
                    <span className="text-[12px] font-light">Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className={`px-5 hidden lg:flex ${userData ? 'border-r-2' : ''} flex flex-col `}>
                    <span className="text-[13px] font-medium flex items-center">
                        <span className="mr-2 text-main">
                            <GrMail />
                        </span>
                        SUPPORT@TADATHEMES.COM
                    </span>
                    <span className="text-[12px] font-light">Online Support 24/7</span>
                </div>
                {userData && (
                    <>
                        <div className="sm:px-5 lg:border-r-2 h-[37.5px] flex items-center">
                            <span
                                onClick={() => dispatch(showCart())}
                                className="text-[13px] font-medium flex items-center cursor-pointer relative"
                            >
                                <div className="text-[20px] mr-2 text-main">
                                    <FaOpencart />
                                    <span className="absolute flex justify-center items-center rounded-full border top-[-15px] right-[-5px] w-[20px] h-[20px] bg-slate-100 text-[10px]">
                                        {userData?.cart?.length}
                                    </span>
                                </div>
                            </span>
                        </div>
                        <div
                            onMouseEnter={() => setDetailProfile(true)}
                            onMouseLeave={() => setDetailProfile(false)}
                            className="px-5 cursor-pointer relative hidden lg:block"
                        >
                            <img
                                loading="lazy"
                                className="w-[30px] h-[30px] rounded-full object-cover mr-[5px]"
                                alt=""
                                src={
                                    userData.avatar ||
                                    'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'
                                }
                            />

                            {detailProfile && (
                                <>
                                    <div
                                        onClick={e => e.stopPropagation()}
                                        className="absolute left-[-30px] top-[40px] flex flex-col bg-white min-w-[190px] text-[15px] border rounded-md overflow-hidden"
                                    >
                                        {+userData.role === 1998
                                            ? profiles.map(profile => (
                                                  <Link
                                                      key={profile.id}
                                                      to={profile.path}
                                                      onClick={() => profile.id === 3 && handleLogout()}
                                                      className="flex items-center font-light w-full px-2 py-1 hover:bg-red-300 z-10"
                                                  >
                                                      <span className="mr-[10px]">{profile.icon}</span>
                                                      {profile.title}
                                                  </Link>
                                              ))
                                            : profiles.map(
                                                  profile =>
                                                      profile.role === 2001 && (
                                                          <Link
                                                              key={profile.id}
                                                              to={profile.path}
                                                              onClick={() => profile.id === 3 && handleLogout()}
                                                              className="flex items-center font-light w-full px-2 py-1 hover:bg-red-300 z-10"
                                                          >
                                                              <span className="mr-[10px]">{profile.icon}</span>
                                                              {profile.title}
                                                          </Link>
                                                      ),
                                              )}
                                    </div>
                                    <div className="left-[35px] absolute bottom-[-11px] transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-white border-l border-t "></div>
                                    <div className="left-[16px] absolute bottom-[-11px] w-12 h-6"></div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
