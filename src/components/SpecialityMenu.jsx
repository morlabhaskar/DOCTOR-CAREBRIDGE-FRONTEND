import React from 'react'
import { specialityData1 } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-10 text-gray-800'>
      <h1 className='text-3xl font-medium dark:text-whi'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm dark:text-whi2'>Simply browse through our extensive list of trusted doctors, shedule your appointment hassle-free.</p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {specialityData1.map((item, index) => (
          <Link onClick={() => scrollTo(0, 0)} className='flex flex-col items-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
            <p className=' bg-slate-200 flex flex-col justify-center items-center p-2 rounded-2xl'>
              <img className='w-16 sm:w-14 mb-2' src={item.image} alt="" />
              <p className='dark:text-whi2'>{item.speciality}</p>
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu