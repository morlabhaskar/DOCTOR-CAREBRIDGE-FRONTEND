import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,docId}) => {

    const {doctors} = useContext(AppContext)

    const navigate = useNavigate()

    const [relDoc,setRelDocs] = useState([])

    useEffect(()=>{
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc)=>doc.speciality === speciality && doc._id !== docId)
            setRelDocs(doctorsData)
        }
    },[doctors,speciality,docId])

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 dark:text-whi'>
        <h1 className='text-3xl font-medium'>Related Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm dark:text-whi2'>Simply browse through our extensive list of trusted doctors.</p>
        {/* <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0 bg-red-100'> */}
        <div className='md:w-full w-[70%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-4 gap-y-6 px-3 sm:px-0 justify-center items-center'>
            {relDoc.slice(0,5).map((item,index)=>(
                <div key={index} onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='dark:bg-slate-600 max-h-56 min-h-56 w-full object-contain' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium dark:text-whi'>{item.name}</p>
                        <p className='text-gray-600 text-sm dark:text-whi2'>{item.speciality}</p>
                        <button className='border w-full rounded-lg bg-teal-600 mt-2 py-1 text-whi hover:bg-teal-800 border-none'>Book Now</button>

                    </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className='bg-primary text-white px-12 py-3 rounded-full mt-10'>more...</button>
    </div>
  )
}

export default RelatedDoctors