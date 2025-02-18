import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>
      <div className='flex flex-col md:flex-row flex-wrap my-3'>
        <div className='md:w-1/2 flex-col align-center justify-start'>
          <img className='h-100 rounded-r-full' src={assets.contact_image} alt="" />
        </div>
        <div className='md:w-1/2 p-4 flex flex-col justify-center'>
          <h1 className='text-[50px] font-bold'>Contact Us</h1>
          <p className='w-full my-2'>
            <p className='text-md'>Name</p>
            <input type="text" className='border-b-[1px] border-slate-700 w-full outline-none' />
          </p>
          <p className='w-full my-2'>
            <p className='text-md'>Email</p>
            <input className='border-b-[1px] border-slate-700 w-full outline-none' type="email" />
          </p>
          <p className='w-full my-2'>
            <p className='text-md'>Message</p>
            <textarea name="" className='border-b-[1px] border-slate-700 w-full outline-none' id=""></textarea>
          </p>
          <p className='flex align-center'>
            <input className='mr-2' type="checkbox" name="" id="" />
            <span>I accept the <span className='text-orange-500'>Terms of Services</span></span>
          </p>
          <p className='w-full my-3 '>
            <button className='bg-teal-800 rounded-lg w-full text-white py-3'>SUBMIT</button>
          </p>
        </div>
      </div>
      <div className='w-full flex flex-col justify-between gap-4 my-4 px-5 py-2 md:flex-row'>
        <div className='bg-teal-600 text-white w-full p-3 rounded-lg'>
          <h1 className='text-lg font-bold'>CALL US</h1>
          <p className='text-sm text-slate-300'>+91 9327530262</p>
        </div>
        <div className='bg-teal-600 text-white w-full p-3 rounded-lg'>
          <h1 className='text-lg font-bold'>LOCATION</h1>
          <p className='text-sm text-slate-300'>Road No:62,Kachiguda</p>
          <p className='text-sm text-slate-300'>Hyderabad</p>
        </div>
        <div className='bg-teal-600 text-white w-full p-3 rounded-lg'>
          <h1 className='text-lg font-bold'>HOURS</h1>
          <p className='text-sm text-slate-300'>Mon-Fri.... 10 AM - 07 PM</p>
          <p className='text-sm text-slate-300'>Sat,Sun.... 08 AM - 06 PM</p>
        </div>
      </div>
    </div>
  )
}

export default Contact