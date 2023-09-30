import React, { useState } from 'react';
import icons from '../../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../../ultils/path';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { logout } from 'store/user/userSlice';

const Header = () => {
    const { MdPhone, GrMail, FaOpencart, IoLogOut, CgProfile, MdOutlineAdminPanelSettings } = icons;
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
        <div className="flex justify-between border-b w-main h-[110px] py-[35px]">
            <Link to={`/${path.HOME}`}>
                <img
                    alt=""
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/logo_digital_new_250x.png?v=1613166683"
                />
            </Link>
            <div className="flex items-center text-center">
                <div className="px-5 border-r-2 flex flex-col ">
                    <span className="text-[13px] flex items-center font-medium">
                        <span className="mr-2 text-main">
                            <MdPhone />
                        </span>
                        (+1800) 000 8808
                    </span>
                    <span className="text-[12px]  font-light">Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className={`px-5  ${userData ? 'border-r-2' : ''} flex flex-col `}>
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
                        <div className="px-5 border-r-2 leading-[37.5px]">
                            <span className="text-[13px] font-medium flex items-center">
                                <span className="text-[20px] mr-2 text-main">
                                    <FaOpencart />
                                </span>
                                0 item
                            </span>
                        </div>
                        <div
                            onMouseEnter={() => setDetailProfile(true)}
                            onMouseLeave={() => setDetailProfile(false)}
                            className="px-5 cursor-pointer relative"
                        >
                            <img
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
