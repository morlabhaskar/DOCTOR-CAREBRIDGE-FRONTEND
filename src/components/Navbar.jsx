import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from "../assets/assets_frontend/assets"
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const navigate = useNavigate()

    const { token, setToken, userData } = useContext(AppContext)

    // const [token,setToken] = useState(true)
    const [showMenu, setShowMenu] = useState(false)

    const HandleLogout = () => {
        setToken(false)
        localStorage.removeItem('token')

    }


    return (
        <div className='flex justify-between items-center py-5 px-2 text-sm rounded-sm border-slate-500 border-solid border-b-4'>
            {/* <h1 onClick={()=>navigate('/')} className='cursor-pointer'>Doctor</h1> */}
            <div onClick={() => navigate('/')} className="mb-6 md:mb-0 cursor-pointer">
                <a href="#" className="flex items-center">
                    <img src={assets.logo1} className="h-8 me-3 mt-1" alt="FlowBite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Prescript</span>
                </a>
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
                            <img className='rounded-full w-8' src={userData.image} alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-0 -left-28 pt-14 text-base font-medium text-grey-600 z-20 hidden group-hover:block '>
                                <div className='bg-gray-100 min-w-44 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/my-profile')} className='text-slate-500 hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointments')} className='text-slate-500 hover:text-black cursor-pointer'>My Appointments</p>
                                    {/* <p onClick={()=>setToken(false)} className='text-slate-500 hover:text-black cursor-pointer'>Logout</p> */}
                                    <p onClick={HandleLogout} className='text-slate-500 hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                        :
                        <button onClick={() => navigate('/login')} className='cursor-pointer'>Create Account</button>
                }
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                {/* Mobile Menu */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
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