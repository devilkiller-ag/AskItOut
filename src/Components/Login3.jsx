import React from 'react'
import LoginPic from '../Assets/LoginPic.jpg'

export default function Login3() {
    return (
        <div className='w-full h-screen flex'>
            <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
                <div className='hidden md:block w-full h-[550px]'>
                    <img className='w-full h-full' src={LoginPic} alt="/" />
                </div>
                <div className='flex flex-col justify-center items-center p-4'>
                    <form>
                        <h2 className='text-4xl font-bold text-center mb-8'>BRAND.</h2>
                        <div>
                            <input className='border p-2 mr-3' type="text" placeholder='Username' />
                            <input className='border p-2' type="password" placeholder='Password' />
                        </div>
                        <button className='w-full py-2 bg-green-600 hover:bg-green-500
                         my-8'>Sign In</button>
                        <p className='text-center'>Forgot Username or Password?</p>
                        <p className='text-center'>Sign Up</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
