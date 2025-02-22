import React, { useContext } from 'react';
import taskifyLogo from "../assets/taskifyLogo.svg"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const NavBar = () => {

    const { user, loading, signOutFromAccount } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOutFromAccount()
            .then(() => {
                navigate("/login")

            }).catch((error) => {
                console.log(error);
            });
    }

    console.log (user);

    return (
        <div className='bg-base-100 shadow-sm'>
            <div className="navbar max-w-7xl p-4 mx-auto">
                <div className="flex-1">
                    <Link className="inline-flex items-center justify-center gap-2">
                        <div className="max-w-6">
                            <img className="w-full" src={taskifyLogo} alt="" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl text-base-content/80 font-semibold">taskify</h1>
                        </div>
                    </Link>
                </div>
                <div className="flex gap-4">

                    {
                        loading ?
                            <>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
                                        <div className="flex flex-col gap-2">
                                            <div className="skeleton h-3 w-16"></div>
                                            <div className="skeleton h-2 w-20"></div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="profile"
                                            src={user?.photoURL} />
                                    </div>
                                </div>
                                <button onClick={handleLogout} className='btn'>Logout</button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;