import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Error from './pages/Error'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './pages/MainLayout'

const App = () => {


  return (
    <div className='dark:bg-dar'>
      <div className='mx-4 sm:mx-[10%]'>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          {/* <Route path='/' element={<Home />}/> */}
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/appointment/:docId' element={<Appointment />} />

          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App