import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-red-600 text-4xl font-bold">
      🚨 404 - Page Not Found 🚨
      <img src={assets.error} className='h-100' alt="" />
    </div>
  )
}

export default Error