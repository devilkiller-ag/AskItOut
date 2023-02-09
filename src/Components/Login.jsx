import React from 'react';
import check from '../Assets/Icons/check.svg'

export default function login() {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-[#f2f2f2]'>
      <div className='flex flex-col justify-center items-center px-4 py-5 rounded-[30px] max-w-[300px] sm:max-w-[400px] max-h-[600px] bg-white shadow-lg'>
        <form>
            <h2 className='text-3xl font-semibold mb-1'>Log In</h2>
            <p className='text-base font-semibold mb-4 text-[#727986]'>Enter your details to log into your Brainout Account:</p>
            <div className='flex flex-col mb-4'>
                <label className='text-sm font-semibold mb-2.5'>Phone Number or Email*</label>
                <input className='border p-2 rounded-[10px] text-sm font-light h-[30px]' type="text" placeholder='natasha.malkova@outlook.com' />
            </div>
            <div className='flex flex-col mb-4'>
                <label className='text-sm font-semibold mb-2.5'>Password*</label>
                <input className='border p-2 rounded-[10px] text-sm font-light h-[30px]' type="password" placeholder='*********' />
            </div>
            <div className='flex items-center'>
                <label htmlFor="remember-checkbox" className='cursor-pointer relative'>
                    <input type="checkbox" id="remember-checkbox" className='appearance-none w-4 h-4 border-[1.5px] border-black rounded'/>
                    <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute left-1 top-[6px] hidden'>
                        <path d="M1.05261 5.05263C1.05261 5.05263 2.39998 5.82107 3.07367 6.94736C3.07367 6.94736 5.09472 2.52631 7.78945 1.05263" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>
                <p className='text-xs ml-1'>Remember me on this device.</p>
            </div>
            <button className='w-full py-1 bg-[#339AF0] my-4 rounded-full'><span className='text-base font-semibold text-white'>Log In</span></button>
            <p className='text-xs text-center'><a href="/" className='text-[#0090FC] visited:text-[#0090FC]'>Forgot Password?</a></p>
            <p className='text-xs text-center'>Don't have a Brainout account? <a href="/" className='text-[#0090FC] visited:text-[#0090FC]'>Sign Up</a></p>
        </form>
      </div>
    </div>
  )
}
