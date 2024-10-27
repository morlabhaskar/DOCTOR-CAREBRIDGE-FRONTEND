import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from "../assets/assets_frontend/assets"

const Navbar = () => {
    const navigate = useNavigate()
    
    const [token,setToken] = useState(true)
    const [showMenu,setShowMenu] = useState(false)


    return (
        <div className='bg-gray-200 flex justify-between items-center p-2 text-sm'>
            <h1 onClick={()=>navigate('/')} className='cursor-pointer'>Doctor</h1>
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
                    token?
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='rounded-full w-8' src={assets.profile_pic} alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-0 -left-28 pt-14 text-base font-medium text-grey-600 z-20 hidden group-hover:block '>
                                <div className='bg-gray-100 min-w-44 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={()=>navigate('/my-profile')} className='text-slate-500 hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={()=>navigate('/my-appointments')} className='text-slate-500 hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={()=>setToken(false)} className='text-slate-500 hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                        :
                        <button onClick={()=>navigate('/login')} className='cursor-pointer'>Create Account</button>
                }
                
            </div>
        </div>
    )
}

export default Navbar