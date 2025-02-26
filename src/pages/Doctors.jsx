import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { IoGrid } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { IoBagAdd } from "react-icons/io5";
import { HiAcademicCap } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { assets } from '../assets/assets_frontend/assets';

const Doctors = () => {

  const navigate = useNavigate()
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  // const [showFilter, setShowFilter] = useState(false)
  const [grid, setGrid] = useState(true)
  const [searchQuery, setSearchQuery] = useState("");

  const { doctors } = useContext(AppContext)
  console.log(doctors)


  // Apply filters based on speciality and search query
  useEffect(() => {
    let filtered = doctors;

    if (speciality) {
      filtered = filtered.filter((doc) => doc.speciality === speciality);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilterDoc(filtered);
    console.log(filterDoc)
  }, [doctors, speciality, searchQuery]);

  return (
    <div className='my-6'>

      <div className='mb-3 flex text-md dark:text-whi'>
        <p className='cursor-pointer text-blue-600' onClick={() => navigate('/')}>Home /</p>
        <p className=''>doctors</p>
      </div>

      <div className='bg-slate-100 dark:bg-dar2 py-2 px-2 min-h-14 flex md:flex-row gap-2 flex-col justify-between items-center'>
        <div className='flex items-center gap-2'>
          <p className='bg-slate-100 text-black dark:text-whi dark:bg-dar2  p-1 rounded-md'><FiFilter className='text-xl' /></p>
          <p className='text-black dark:text-whi font-bold'>All Doctors : <span className='text-blue-700 dark:text-blue-400'>{doctors.length}</span></p>
        </div>
        <div className='flex items-center'>
          <p className='text-whi bg-slate-400 min-h-8 max-h-8 px-2 rounded-l-md flex justify-center items-center'><CiSearch className='text-xl font-bold' /></p>

          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-3 rounded-r-md min-h-8 max-h-8 outline-none text-black"
          />
        </div>
        <div className='flex gap-2 '>
          <div className='flex items-center'>


            <select
              onChange={(e) =>
                navigate(e.target.value === "all" ? "/doctors" : `/doctors/${e.target.value}`)
              }
              className="border px-2 py-1 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
            >
              <option value="all">All Specialities</option>
              <option value="General physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>
          <div>
            {
              grid
                ? <p className=' p-2 rounded-md cursor-pointer border-[1px] border-black dark:border-whi hover:scale-105 transition-all duration-300' onClick={() => setGrid((prev) => !prev)}><FaBars className='text-dar dark:text-whi' /></p>
                : <p className=' p-2 rounded-md cursor-pointer border-[1px] border-black dark:border-whi hover:scale-105 transition-all duration-300' onClick={() => setGrid((prev) => !prev)}><IoGrid className='text-dar dark:text-whi' /></p>
            }
          </div>
        </div>
      </div>

      <p className='text-gray-600 dark:text-whi mt-2'>Browse through the doctors specialist.</p>
      


{
  grid ? (
    <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
      {filterDoc.length === 0 ? (
        <div className=' w-full flex justify-center'>
        <img className='h-72' src={assets.nodata} alt="" />
      </div>
      ) : (
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div key={index} onClick={() => navigate(`/appointment/${item._id}`)} 
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <img className='dark:bg-slate-600 max-h-56 min-h-56 w-full object-contain' src={item.image} alt="" />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center'>
                  {item.available ? (
                    <p className='flex items-center gap-2 text-green-500'>
                      <span className='w-2 h-2 bg-green-500 rounded-full'></span> Available
                    </p>
                  ) : (
                    <p className='flex items-center gap-2 text-red-500'>
                      <span className='w-2 h-2 bg-red-500 rounded-full'></span> Unavailable
                    </p>
                  )}
                </div>
                <p className='text-gray-900 text-lg font-medium dark:text-whi'>{item.name}</p>
                <p className='text-gray-600 text-sm dark:text-whi2'>{item.speciality}</p>
                <button className='border w-full rounded-lg bg-teal-600 mt-2 py-1 text-whi hover:bg-teal-800 border-none'>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div className=''>
      {filterDoc.length === 0 ? (
        <div className=' w-full flex justify-center'>
        <img className='h-72' src={assets.nodata} alt="" />
      </div>
      ) : (
        <div className=''>
          {filterDoc.map((item, index) => (
            <div key={index} className='flex my-2 bg-whi dark:bg-dar rounded-lg'>
              <img className='min-h-48 max-h-48 min-w-40 max-w-40 object-contain border border-slate-600 rounded-l-lg dark:border-slate-300' src={item.image} alt="" />
              <div className='w-full border-2 rounded-r-lg max-h-48 flex flex-col '>
                <div className='p-4 w-full flex flex-col gap-1'>
                  <div className='flex justify-between mx-2 items-center'>
                    <p className='text-gray-900 text-3xl font-medium dark:text-whi'>{item.name}</p>
                    <div className='flex items-center gap-2 text-sm text-center'>
                      {item.available ? (
                        <p className='flex items-center gap-2 text-green-500'>
                          <span className='w-2 h-2 bg-green-500 rounded-full'></span> Available
                        </p>
                      ) : (
                        <p className='flex items-center gap-2 text-red-500'>
                          <span className='w-2 h-2 bg-red-500 rounded-full'></span> Unavailable
                        </p>
                      )}
                    </div>
                  </div>
                  <p className='text-gray-600 text-lg dark:text-whi2 flex items-center gap-2'>
                    <span><HiAcademicCap className='text-dar dark:text-whi text-xl' /></span>
                    <span>{item.degree}</span>
                  </p>
                  <p className='text-gray-600 text-lg dark:text-whi2 flex items-center gap-2'>
                    <span><IoBagAdd className='text-dar dark:text-whi text-xl' /></span>
                    <span>{item.experience} Experience</span>
                  </p>
                </div>
                <div className='flex justify-end mx-2'>
                  <button className='border rounded-lg bg-teal-600 mt-2 text-whi hover:bg-teal-800 hover:scale-105 transition-all duration-300 border-none px-3 py-1'>Book Appointment</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

    </div>
  )
}

export default Doctors