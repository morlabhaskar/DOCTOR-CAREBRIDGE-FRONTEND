import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from "../assets/assets_frontend/assets"
import { AppContext } from '../context/AppContext'
import { MdOutlineSupervisorAccount } from "react-icons/md";


const Navbar = () => {
    const navigate = useNavigate()

    const { token, setToken, userData } = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false)

    // Dark mode state is initialized from localStorage (if any)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true'
    })

    // When dark mode state changes, update the root element class and localStorage
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('darkMode', isDarkMode)
    }, [isDarkMode])

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode)
    }

    const HandleLogout = () => {
        setToken(false)
        localStorage.removeItem('token')

    }


    return (
        <div className='flex justify-between items-center py-5 px-2 text-sm rounded-sm border-slate-500 border-solid border-b-4 dark:bg-dar dark:text-white '>
            {/* <h1 onClick={()=>navigate('/')} className='cursor-pointer'>Doctor</h1> */}
            <div onClick={() => navigate('/')} className="mb-6 md:mb-0 cursor-pointer">
                <div className="flex items-center">
                    <img src={assets.logo1} className="h-8 me-3 mt-1 border-[2px] border-teal-600 rounded-b-full" alt="FlowBite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">CareBridge</span>
                </div>
            </div>
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to="/">
                    <li>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ' />
                </NavLink>
                <NavLink to="/doctors">
                    <li>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to="/about">
                    <li>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to="/contact">
                    <li>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token && userData ?
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <div className='flex items-center gap-2 bg-slate-200 dark:bg-dar2 px-2 py-1 rounded-full'>
                                <img className='rounded-full w-8 h-8' src={userData.image} alt="" />
                                <p className='text-sm'>{userData.name}</p>
                                <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            </div>
                            <div className='absolute top-0 -left- pt-14 text-base font-medium text-grey-600 z-20 hidden group-hover:block '>
                                <div className='bg-gray-100 min-w-44 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/my-profile')} className='text-slate-500 hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointments')} className='text-slate-500 hover:text-black cursor-pointer'>My Appointments</p>
                                    <p className='flex gap-2'>
                                        <label htmlFor="toggleDarkMode" className="relative inline-block w-12 h-6 cursor-pointer items-center">
                                            <input
                                                id="toggleDarkMode"
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={isDarkMode}
                                                onChange={toggleDarkMode}
                                            />
                                            <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded-full peer-focus:ring-2 peer-focus:ring-blue-300 transition-colors duration-300"></div>
                                            <div className="absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform duration-300 transform peer-checked:translate-x-6"></div>
                                        </label>
                                        <p>{isDarkMode ? <p className='text-slate-500'>Light</p> : <p className='text-slate-500'>Dark</p>}</p>
                                    </p>
                                    <p onClick={HandleLogout} className='text-slate-500 hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                        :
                        <button onClick={() => navigate('/login')} className='cursor-pointer flex items-center gap-2 bg-primary px-5 py-2 text-whi rounded-full hover:bg-teal-800 hover:scale-105 transition-all duration-300'><MdOutlineSupervisorAccount className='text-xl' /><span>Login</span></button>
                }
                {/* <button onClick={() => navigate('/login')} className='cursor-pointer'>Create Account</button> */}
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                {/* Mobile Menu */}
                <div className={`${showMenu ? 'fixed w-full dark:bg-dar' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-7 cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar