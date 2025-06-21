import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import { Code, User, LogOut } from 'lucide-react';
import LogoutButton from './LogoutButton.jsx';

const Navbar = () => {
    const { authUser } = useAuthStore();

    console.log("AUTH_USER", authUser);

    return (
        <nav className='sticky top-0 z-50 w-full py-3'>
            {/* Logo */}
            <div className='flex w-screen justify-between mx-auto max-w-4xl bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-4 rounded-2xl'>
                <Link to="/" className='flex items-center cursor-pointer gap-3'>
                    <img src="/leetx.svg" className='h-18 w-18 bg-primary/20 px-2 py-2 rounded-full' />
                    <span className='text-lg md:text-2xl font-bold tracking-tight text-white  md:block'>LeetX</span>
                </Link>


                {/* User profile and dropdown */}

                <div className='flex items-center gap-8'>
                    <div className='dropdown dropdown-end'>

                        <div tabIndex={0} className='w-10 rounded-full btn btn-ghost btn-circle'>
                            <img src={
                                authUser?.image || "https://avatar.iran.liara.run/public/boy"
                            }
                                alt="User"
                                className='object-cover'
                            />
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3">
                            <li>
                                <p className="text-base font-semibold">
                                    {authUser?.name || 'nandini'}
                                </p>

                                <hr className="border-gray-200/20" />
                            </li>

                            <li>
                                <Link
                                    to='/profile'
                                    className="hover:bg-primary hover:text-white text-base font-semibold"
                                >
                                    <User className='w-4 h-4 mr-2' />
                                    My Profile
                                </Link>
                            </li>

                            {authUser?.role !== "ADMIN" && (
                                <li>
                                    <Link
                                        to='/add-problem'
                                        className="hover:bg-primary hover:text-white text-base font-semibold"
                                    >
                                        <Code className='w-4 h-4 mr-1' />
                                        Add Problem
                                    </Link>
                                </li>
                            )}


                            <li>
                                <LogoutButton>
                                    <LogOut className='w-4 h-4 mr-2' />
                                    Logout
                                </LogoutButton>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar