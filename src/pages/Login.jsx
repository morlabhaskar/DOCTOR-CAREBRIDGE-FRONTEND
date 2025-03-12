import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets.js'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)

  const [state, setState] = useState('login')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {

      if (state === 'login') {

        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          toast.success(data.message)
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
        else {
          toast.error(data.message)
        }

      }
      else {

        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          console.log(data.token)
          localStorage.setItem('token', data.token)
          setToken(data.token)

        }
        else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)

    }
  }
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] mx-[5%] lg:flex items-center my-3'>
      <div className='flex justify-center lg:justify-end lg:ml-8'>
        <img className='h-80' src={assets.login_banner} alt="" />
      </div>
      <div className='flex flex-col bg-slate-50 gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>

        <div onClick={() => navigate('/')} className="mb-5 md:mb-0 cursor-pointer w-full flex justify-center mb-2">
          <a href="#" className="flex items-center">
            <img src={assets.logo1} className="h-8 me-3 mt-1 border-[2px] border-teal-600 rounded-b-full" alt="FlowBite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">CareBridge</span>
          </a>
        </div>

        <p className='text-xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'Login'} to book appointment</p>
        {
          state === "Sign Up" &&
          <div className='w-full'>
            <p>Full Name</p>
            <input type="text" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e) => setName(e.target.value)} value={name} required />
          </div>

        }
        <div className='w-full'>
          <p>Email</p>
          <input type="email" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input type="password" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 hover:bg-teal-800 rounded-full text-base hover:scale-105 transition-all duration-300 mt-2'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        <div className='w-full flex items-center justify-center gap-2'>
          <p className='min-h-[2px] max-h-[2px] min-w-[40%] bg-fuchsia-500'></p>
          <p className='mb-[1px]'>or</p>
          <p className='min-h-[2px] max-h-[2px] min-w-[40%] bg-fuchsia-500'></p>
        </div>
        <a href='' className='text-dar w-full py-2 hover:bg-slate-200 flex border border-dar2 justify-center items-center gap-2 rounded-full text-base hover:scale-105 transition-all duration-300'><img src={assets.google} alt="" /><p>Sign in With Google</p></a>
        {
          state === "Sign Up"
            ? <p className='w-full flex justify-center'>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
            : <p className='w-full flex justify-center'>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login