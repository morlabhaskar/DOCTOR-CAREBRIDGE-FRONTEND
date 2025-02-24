import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const [image, setImage] = useState(false)

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

  return userData && (
    <div className='max-w-lg flex-col gap-2 text-sm mt-4 my-3'>

      {
        isEdit ?
          <label htmlFor='image' className='flex flex-col '>
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              {/* <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" /> */}
              <img className='w-10 absolute bottom-12 right-12' src={image} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
          </label>
          : <img className='w-36 rounded' src={userData.image} alt="" />
      }


      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 p-1 outline-none dark:bg-gray-900 dark:text-whi rounded-r-lg' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4 dark:text-whi'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-950 underline mt-3 dark:text-whi'>CONTACT INFORMATION :</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium dark:text-whi2'>Email id:</p>
          <p className='text-blue-500 '>{userData.email}</p>
          <p className='font-medium dark:text-whi2'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-52 outline-none dark:bg-gray-900 p-1 rounded-r-lg dark:text-whi' type="number" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium dark:text-whi2'>Address:</p>
          {
            isEdit
              ? <p>
                <input className='bg-gray-50 outline-none dark:bg-gray-900 p-1 rounded-tr-lg dark:text-whi' value={userData.address.line1} onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} type="text" />
                <br />
                <input className='bg-gray-50 outline-none dark:bg-gray-900 p-1 rounded-br-lg dark:text-whi' value={userData.address.line2} onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} type="text" />
              </p>
              : <p className='dark:text-whi2'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-950 underline mt-3 dark:text-whi'>BASIC INFORMATION :</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium dark:text-whi2'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-100 p-1 dark:bg-gray-900 dark:text-whi' value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium dark:text-whi2'>Birthday:</p>
          {
            isEdit ? <input className='max-w-28 p-1 bg-gray-100 outline-none dark:bg-gray-800 dark:text-whi' type='date' value={userData.dob} onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
              : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit
            ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all dark:text-whi' onClick={updateUserProfileData}>Save</button>
            : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all dark:text-whi' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>

    </div>
  )
}

export default MyProfile