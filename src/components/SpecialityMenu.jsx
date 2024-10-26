import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='bg-green-200'>
        <h1>Find by Speciality</h1>
        <p>Simply browse through our extensive list of trusted doctors, shedule your appointment hassle-free.</p>
        <div>
            {specialityData.map((item,index)=>(
                <Link key={index} to={`/doctors/${item.speciality}`}>
                    <img src={item.image} alt="" />
                    <p>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu