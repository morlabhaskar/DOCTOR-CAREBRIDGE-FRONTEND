import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  return (
    <div className='bg-red-100'>
        <div>
            <p>
                Book Appointment <br /> with Trusted Doctors
            </p>
            <div>
                <img src={assets.group_profiles} alt="" />
                <p>Simply browse through our extensive list of trusted doctors, <br /> shedule your appointment hassle-free.</p>
            </div>
            <a href="">
                Book appointment <img src={assets.arrow_icon} alt="" />
            </a>
        </div>

        <div>
            <img src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header