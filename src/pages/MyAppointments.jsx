import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FcApproval } from "react-icons/fc";
import { assets } from '../assets/assets_frontend/assets';

//for charts
import { PieChart } from '@mui/x-charts';

const MyAppointments = () => {
  const [load, setLoad] = useState(true)
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }



  //For charts
  const [cancelledCount, setCancelledCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const countAppointments = (appointments) => {
    let cancelled = 0;
    let completed = 0;

    appointments.forEach((appointment) => {
      if (appointment.cancelled) cancelled++;
      if (appointment.isCompleted) completed++;
    });

    setCancelledCount(cancelled);
    setCompletedCount(completed);
  };
  useEffect(() => {
    countAppointments(appointments);
  }, [appointments]);




  const getUserAppointments = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log("My :", data.appointments)
        console.log("Cancelled Count:", cancelledCount);
        console.log("Completed Count:", completedCount);
        setLoad(false)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {

      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()

      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getUserAppointments()

  }, [token])


  return (

    <div className='my-4'>
      <div className='mb-3 flex text-md dark:text-whi'>
        <p className='cursor-pointer text-blue-600' onClick={() => navigate('/')}>Home /</p>
        <p className=''>My Appointments</p>
      </div>
      <h1 className='pb-3 font-bold text-primary border-b text-xl'>My appointments</h1>
      {load ? (
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
      ) : appointments.length > 0 ? (
        <div className='flex flex-col-reverse md:flex md:flex-row'>
          <div className='md:w-3/4'>
            {appointments.map((item, index) => (
              <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                <div>
                  <img className='max-w-32 min-w-32 max-h-36 object-contain dark:bg-slate-600 rounded-xl' src={item.docData.image} alt="" />
                </div>
                <div className='flex-1 text-sm text-zinc-600'>
                  <p className='text-neutral-800 font-semibold dark:text-whi'>{item.docData.name}</p>
                  <p className='dark:text-whi2'>{item.docData.speciality}</p>
                  <p className='text-zinc-700 font-medium mt-1 dark:text-whi'>Address:</p>
                  <p className='text-xs dark:text-whi2'>{item.docData.address.line1}</p>
                  <p className='text-xs dark:text-whi2'>{item.docData.address.line2}</p>
                  <p className='text-xs mt-1 dark:text-whi2'>
                    <span className='text-sm text-neutral-700 font-medium dark:text-whi'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
                <div></div>
                <div className='flex flex-col gap-2 justify-end'>
                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300'>
                      Cancel appointment
                    </button>
                  )}
                  {item.cancelled ?
                    (
                      <button className='text-sm text-stone-500 bg-red-200 cursor-not-allowed text-center sm:min-w-48 py-2 border rounded hover:bg-red-300 hover:text-stone-500 transition-all duration-300'>
                        Cancelled
                      </button>
                    )
                    : (
                      ""
                    )}
                  {item.isCompleted && !item.cancelled ?
                    (
                      <p className='text-stone-500 bg-green-50 text-center sm:min-w-48 py-2 border rounded flex items-center gap-1 justify-center'>
                        <span className='text-bleck'>Completed</span><FcApproval className='text-xl' />
                      </p>
                    )
                    : (
                      ""
                    )}
                </div>
              </div>
            ))}
          </div>
          <div className='md:w-1/4 flex items-center flex-col'>
            <div className=" flex items-center justify-center w-[250px] h-[250px]">
              <PieChart
                series={[
                  {
                    innerRadius: 30, // Donut effect
                    outerRadius: 100, // Controls pie size
                    labelPosition: "none", // Ensures labels don't take up space
                    labelLine: false, // Removes label connector lines
                    paddingAngle: 5, // Avoid unnecessary spacing between slices
                    startAngle: 0, // Resets any rotation
                    endAngle: 360, // Ensures full circle

                    data: [
                      { id: 0, value: appointments.length, color: "#1B0AFC" },
                      { id: 1, value: completedCount, color: "#15FC0A" },
                      { id: 2, value: cancelledCount, color: "#FC150A" },
                    ],
                  },
                ]}
                width={250}
                height={250}
                margin={{ top: 0, bottom: 0, left: 0, right: 0 }} // Remove extra space
              />
            </div>
            <div className='flex justify-center'>
              <p className=''>
                <p className='flex gap-2 items-center text-dar dark:text-whi'><span className='h-[15px] bg-[#1B0AFC] w-[3px] px-[8px] '></span><span>Appointments : </span><span>{appointments.length}</span></p>
                <p className='flex gap-2 items-center text-dar dark:text-whi'><span className='h-[15px] bg-[#15FC0A] w-[3px] px-[8px] '></span><span>Completed : </span><span>{completedCount}</span></p>
                <p className='flex gap-2 items-center text-dar dark:text-whi'><span className='h-[15px] bg-[#FC150A] w-[3px] px-[8px] '></span><span>Cancelled : </span><span>{cancelledCount}</span></p>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className='min-h-[70vh] max-h-[70vh] flex justify-center items-center'>
          <img className='h-[60vh]' src={assets.nodata} alt="" />
        </div>

      )}
    </div>

  )
}

export default MyAppointments