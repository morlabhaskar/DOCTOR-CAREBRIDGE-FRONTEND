import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets_frontend/assets";
import axios from 'axios'
import { toast } from "react-toastify";





export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false)
    const [load, setLoad] = useState(true)



    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }

    const loadUserProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
                setLoad(false)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        setLoad,
        load
    }

    useEffect(() => {
        getDoctorsData()
    }, [token])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
        else {
            setUserData(false)
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider