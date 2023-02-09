import React from 'react'
import loginBg from '../Assets/LoginBg.jpg'
import { FcGoogle } from 'react-icons/fc'
import { ImFacebook2 } from 'react-icons/im'

export default function Login2() {
  return (
    <div className='relative w-full h-screen bg-zinc-700/90'>
      <img className='absolute w-full h-full object-cover mix-blend-overlay' src={loginBg} alt="/" />

      <div className='flex justify-center items-center h-full'>
        <form className='max-w-[400px] w-full mx-auto bg-white p-8'>
          <h2 className='text-4xl font-bold text-center py-8'>BRAND.</h2>
          <div className='flex justify-between p-8'>
            <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center '><ImFacebook2 className='mr-2' /> Facebook</p>
            <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center '><FcGoogle className='mr-2' /> Google</p>
          </div>
          <div className='flex flex-col mb-4'>
            <label>Username</label>
            <input className='border relative bg-gray-100 p-2' type="text" />
          </div>
          <div className='flex flex-col'>
            <label>Password</label>
            <input className='border relative bg-gray-100 p-2' type="password" />
          </div>
          <button className='w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white
             relative my-4'>Sign In</button>
          <div>
            <p className='flex items-center mt-2'><input className='mr-2' type="checkbox" />Remember Me</p>
            <p className='text-center mt-4'>Not Remember? Sign Up</p>
          </div>
        </form>
      </div>
    </div>
  )
}
