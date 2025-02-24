import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

  const navigate = useNavigate()
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  const { doctors } = useContext(AppContext)
  console.log(doctors)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else {
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='my-6'>
      <p className='text-gray-600 dark:text-whi'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all lg:hidden sm:hidded ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer dark:text-whi2 dark:border-gray-600 ${speciality === "General physician" ? "text-black border-primary border-r-4 border-l-[0.5px] border-y-[0.5px] dark:border-teal-400" : ""}`}>General Physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer dark:text-whi2 dark:border-gray-600 ${speciality === "Gynecologist" ? "text-black border-primary border-r-4 border-l-[0.5px] border-y-[0.5px] dark:border-teal-400" : ""}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer dark:text-whi2 dark:border-gray-600 ${speciality === "Dermatologist" ? "text-black border-primary border-r-4 border-l-[0.5px] border-y-[0.5px] dark:border-teal-400" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer dark:text-whi2 dark:border-gray-600 ${speciality === "Pediatricians" ? "text-black border-primary border-r-4 border-l-[0.5px] border-y-[0.5px] dark:border-teal-400" : ""}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer dark:text-whi2 dark:border-gray-600 ${speciality === "Neurologist" ? "text-black border-primary border-r-4 border-l-[0.5px] border-y-[0.5px] dark:border-teal-400" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer dark:text-whi2 dark:border-gray-600 ${speciality === "Gastroenterologist" ? "text-black border-primary border-r-4 border-l-[0.5px] border-y-[0.5px] dark:border-teal-400" : ""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div key={index} onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '>
                <img className='dark:bg-slate-600 max-h-56 min-h-56 w-full object-contain' src={item.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-center'>
                    {
                      item.available
                        ? <p className='flex items-center gap-2 text-green-500'><p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p></p>
                        : <p className='flex items-center gap-2 text-red-500'><p className='w-2 h-2 bg-red-500 rounded-full'></p><p>Unavailable</p></p>
                    }
                  </div>
                  <p className='text-gray-900 text-lg font-medium dark:text-whi'>{item.name}</p>
                  <p className='text-gray-600 text-sm dark:text-whi2'>{item.speciality}</p>
                  <button className='border w-full rounded-lg bg-teal-600 mt-2 py-1 text-whi hover:bg-teal-800 border-none'>Book Now</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors