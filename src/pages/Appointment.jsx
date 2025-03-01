
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

  const navigate = useNavigate()

  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)

  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  // const [bookedSlots, setBookedSlots] = useState([]);


  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    console.log(docInfo)
  }


  // Fetch booked slots from backend
  //  const fetchBookedSlots = async () => {
  //   try {
  //     const { data } = await axios.get(`${backendUrl}/api/user/booked-slots/${docId}`)
  //     if (data.success) {
  //       setBookedSlots(data.bookedSlots) // Assume bookedSlots is an array of ISO strings of booked datetimes
  //     }
  //   } catch (error) {
  //     console.log(error.message)
  //     toast.error("Failed to fetch booked slots.")
  //   }
  // }



  const getAvailableSlots = async () => {
    if (!docInfo) {
      console.log("Doctor information not found!");
      return;
    }
    setDocSlots([])

    //getting current date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      //setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }
      else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formatedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        // hide the booked slots
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = `${day < 10 ? '0' + day : day}_${month < 10 ? '0' + month : month}_${year}`;
        const slotTime = formatedTime

        const isSlotAvailable = docInfo.slot_booked[slotDate] && docInfo.slot_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {
        //add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formatedTime
        })
        }

        //Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book Appointment")
      return navigate('/login')

    }

    try {

      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = `${day < 10 ? '0' + day : day}_${month < 10 ? '0' + month : month}_${year}`;
      console.log("Selected Slot Date:", slotDate);

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })


      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error.message)
      toast.error(error.message)

    }
  }




  useEffect(() => {
    fetchDocInfo()
    // fetchBookedSlots()
  }, [doctors, docId])

  // useEffect(() => {
  //   fetchBookedSlots()
  // }, [docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])


  return docInfo && (
    <div>
      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4 mt-4'>
        <div>
          <img className='w-full sm:max-w-72 min-h-64 max-h-64 min-w-44 max-w-44 border object-contain rounded-lg dark:bg-whi2' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 dark:bg-dar'>
          {/* name,degree,experience */}
          <p className='flex items-center gap-2 text-sxl font-medium text-gray-900 dark:text-whi'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600 dark:text-whi2'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          {/* Doctor About */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3 dark:text-whi'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1 dark:text-whi2'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4 dark:text-whi'>
            Appointment fee: <span className='text-gray-600 dark:text-whi2'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}

      <div className='sm:ml-52 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p className='dark:text-whi'>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div key={index} onClick={() => setSlotIndex(index)} className={`text-center py-3 min-w-20 rounded-tr-3xl rounded-bl-3xl cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200 dark:text-whi2'}`}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots[slotIndex].map((item, index) => (
              <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                {item.time.toLowerCase()}

              </p>
            ))
          }
        </div>

        {/* <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => {
            const isBooked = !item.isAvailable; // Assuming isAvailable flag set in getAvailableSlots

            return (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer 
          ${item.time === slotTime && !isBooked ? 'bg-primary text-white' : ''} 
          ${isBooked ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'text-gray-400 border border-gray-300'}`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            );
          })}
        </div> */}
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
      </div>
      {/* Listing Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment


