import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, NavLink, json } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { CgProfile } from "react-icons/cg";
import { GoGraph } from "react-icons/go";
import { FaUserDoctor } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import { BarChart } from '@mui/x-charts/BarChart';

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData, load, doctors } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const [image, setImage] = useState(false)

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const navigate = useNavigate()

  const updateUserProfileData = async () => {
    try {

      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setImage(false)
        setIsEdit(false)
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }




  //tabs
  const [activeTab, setActiveTab] = useState("profile");

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload()
  }

  //for states

  const generalPhysicians = doctors.filter(doc => doc.speciality === "General physician").length;
  const gynecologist = doctors.filter(doc => doc.speciality === "Gynecologist").length;
  const dermatologist = doctors.filter(doc => doc.speciality === "Dermatologist").length;
  const pediatricians = doctors.filter(doc => doc.speciality === "Pediatricians").length;
  const neurologist = doctors.filter(doc => doc.speciality === "Neurologist").length;
  const gastroenterologist = doctors.filter(doc => doc.speciality === "Gastroenterologist").length;



  useEffect(() => {
    console.log(userData)
    console.log(doctors)

  }, [])



  return (
    <div>
      {
        load
          ? (
            <div className=' min-h-[60vh] flex justify-center items-center'>
              <svg class="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="24"></line>
                <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                </line>
                <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="24"></line>
                <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                </line>
                <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="24"></line>
                <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                </line>
              </svg>
              <span class="text-4xl font-medium text-gray-500">Loading...</span>

            </div>
          )
          : (
            <div className='my-2'>
              <div className='flex my-2'>
                <p className='text-blue-600' onClick={() => navigate('/')}>Home /</p>
                <p> My Profile</p>
              </div>

              <div className='flex w-full min-h-[83vh]'>
                <div className='w-1/6 border-x-2 dark:border-dar2 flex items-center flex-col'>
                  <div className=' w-full flex flex-col gap-1'>
                    <div className={`flex items-center gap-2 justify-center md:justify-start hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-2 cursor-pointer ${activeTab === 'profile' ? 'border-l-4 border-primary bg-slate-200 dark:bg-slate-700' : ''}`} onClick={() => setActiveTab('profile')}>
                      <CgProfile className='text-primary text-md' />
                      <p className='text-dar  hidden md:block hover:text-blue-600 text-md dark:text-whi'>Profile</p>
                    </div>
                    <div className={`flex items-center justify-center md:justify-start dark:hover:bg-slate-800 gap-2 hover:bg-slate-300 px-3 py-2 cursor-pointer ${activeTab === 'mystates' ? 'border-l-4 border-primary bg-slate-200 dark:bg-slate-700' : ''}`} onClick={() => setActiveTab('mystates')}>
                      <GoGraph className='text-primary text-md' />
                      <p className='text-dar hidden md:block hover:text-blue-600 text-md dark:text-whi'>My States</p>
                    </div>
                    <NavLink className='flex items-center justify-center md:justify-start dark:hover:bg-slate-800 gap-2 hover:bg-slate-300 px-3 py-2 cursor-pointer' to={'/my-appointments'}>
                      <FaUserDoctor className='text-primary text-md' />
                      <p className='text-dar hidden md:block hover:text-blue-600 text-md dark:text-whi'>Appointments</p>
                    </NavLink>
                    <div className='flex items-center gap-2 justify-center md:justify-start dark:hover:bg-slate-800 hover:bg-slate-300 px-3 py-2 cursor-pointer ' onClick={logout}>
                      <MdLogout className='text-red-600 text-md' />
                      <p className='text-dar hidden md:block hover:text-blue-600 text-md dark:text-whi'>Logout</p>
                    </div>
                  </div>
                </div>

                {
                  activeTab === 'profile' && (
                    <div className='flex-col gap-2 text-sm p-3  w-5/6 '>

                      <div className='mb-2 flex justify-end'>
                        {
                          isEdit
                            ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all dark:text-whi' onClick={updateUserProfileData}>Save</button>
                            : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all dark:text-whi' onClick={() => setIsEdit(true)}>Edit</button>
                        }
                      </div>

                      <div className='bg-red-200 relative'>
                        <img className='w-full h-48' src={darkMode ? assets.profilebg2 : assets.profilebg} alt="" />

                        {
                          isEdit ?
                            <label htmlFor='image' className='flex flex-col '>
                              <div className='inline-block  cursor-pointer'>
                                <img className='max-w-36 min-w-36 max-h-44 min-h-44 rounded-xl absolute top-12 left-5 border-2 border-slate-300 opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                                {/* <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" /> */}
                                <img className='max-w-36 min-w-36 max-h-44 min-h-44 rounded-xl absolute top-12 left-5 border-2 border-slate-300' src={image} alt="" />
                              </div>
                              <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
                            </label>
                            : <img className='max-w-36 min-w-36 max-h-44 min-h-44 object-contain rounded-xl absolute top-12 left-5 ' src={userData.image} alt="" />
                        }
                      </div>


                      {
                        isEdit
                          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-10 p-1 outline-none dark:bg-gray-900 dark:text-whi rounded-r-lg' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                          : <p className=' font-medium text-3xl text-neutral-800 mt-10 dark:text-whi flex items-center gap-2 justify-center'>
                            <span>{userData.name}</span>
                            <BsPatchCheckFill className='text-xl text-blue-600 mt-1' />
                          </p>
                      }

                      <div className='flex justify-center w-full '>
                        <div className='grid grid-cols-[2fr_2fr] gap-y-2.5 mt-3  w-[70%] text-neutral-700'>
                          <p className='font-medium dark:text-whi2 bg-slate-200 py-2 pl-3 rounded-l-full'>Email id</p>
                          <p className='text-blue-500 bg-slate-200 py-2 rounded-r-full'>: {userData.email}</p>
                          <p className='font-medium dark:text-whi2 bg-slate-200 py-2 pl-3 rounded-l-full'>Phone:</p>
                          {
                            isEdit
                              ? <input className='bg-gray-100 max-w-52 outline-none dark:bg-gray-900 p-1 rounded-r-lg dark:text-whi' type="number" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                              : <p className='text-blue-400 bg-slate-200 py-2 rounded-r-full'>: {userData.phone}</p>
                          }
                          <p className='font-medium dark:text-whi2 bg-slate-200 py-2 pl-3 rounded-l-full'>Address</p>
                          {
                            isEdit
                              ? <p>
                                <input className='bg-gray-50 outline-none dark:bg-gray-900 p-1 rounded-tr-lg dark:text-whi' value={userData.address.line1} onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} type="text" />

                                <input className='bg-gray-50 outline-none dark:bg-gray-900 p-1 rounded-br-lg dark:text-whi' value={userData.address.line2} onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} type="text" />
                              </p>
                              : <p className='dark:text-whi2 bg-slate-200 py-2 flex gap-2 rounded-r-full'>:
                                <span>{userData.address.line1}</span>

                                <span>{userData.address.line2}</span>
                              </p>
                          }
                        </div>
                      </div>

                      <div className='flex justify-center w-full '>
                        <div className='grid grid-cols-[2fr_2fr] gap-y-2.5 mt-3 w-[70%] text-neutral-700'>
                          <p className='font-medium dark:text-whi2 bg-slate-200 py-2 pl-3 rounded-l-full'>Gender</p>
                          {
                            isEdit
                              ? <select className='max-w-20 bg-gray-100 p-1 dark:bg-gray-900 dark:text-whi' value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                              : <p className='text-dar bg-slate-200 py-2 rounded-r-full'>: {userData.gender}</p>
                          }
                          <p className='font-medium dark:text-whi2 bg-slate-200 py-2 pl-3 rounded-l-full'>Birthday</p>
                          {
                            isEdit ? <input className='max-w-28 p-1 bg-gray-100 outline-none dark:bg-gray-800 dark:text-whi' type='date' value={userData.dob} onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
                              : <p className='text-dar bg-slate-200 py-2 rounded-r-full'>: {userData.dob}</p>
                          }
                        </div>
                      </div>



                    </div>
                  )
                }




                {
                  activeTab === 'mystates' && (
                    <div className='flex-col gap-2 text-sm bg-green-100 w-5/6 '>
                      <BarChart
                        xAxis={[{
                          scaleType: 'band',
                          data: ['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'],
                          tickLabelStyle: { fontSize: 12, angle: -20 }, // Rotates labels for better spacing
                          padding: 0.5 // Adds space on the left & right of the axis
                        }]}
                        series={[{
                          data: [generalPhysicians, gynecologist, dermatologist, pediatricians, neurologist, gastroenterologist],
                          itemStyles: [
                            { color: '#ff5733' },
                            { color: '#33ff57' },
                            { color: '#3357ff' },
                            { color: '#ff33a8' },
                            { color: '#a833ff' },
                            { color: '#33fff6' }
                          ]
                        }]}
                        width={600} // Increase width for better spacing
                        height={300}
                        barCategoryGap={30} // Increase space between bars
                        barGap={10} // Space between bars in a group
                      />

                      <p>
                        <span>Doctors :</span>
                        <span>{doctors.length}</span>
                      </p>
                      <p>
                        <span>General physicia :</span>
                        <span>{generalPhysicians}</span>
                      </p>
                      <p>
                        <span>Gynecologist :</span>
                        <span>{gynecologist}</span>
                      </p>


                      <p>
                        <span>Dermatologist :</span>
                        <span>{dermatologist}</span>
                      </p>
                      <p>
                        <span>Pediatricians :</span>
                        <span>{pediatricians}</span>
                      </p>
                      <p>
                        <span>Neurologist :</span>
                        <span>{neurologist}</span>
                      </p>
                      <p>
                        <span>Gastroenterologist :</span>
                        <span>{gastroenterologist}</span>
                      </p>

                    </div>
                  )
                }


              </div>
            </div>
          )
      }
    </div>
  )
}

export default MyProfile