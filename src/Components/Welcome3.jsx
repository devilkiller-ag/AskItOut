import React from 'react'
import Welcome_image_3 from '../Assets/images/Welcome_image_3.png'

export default function Welcome1() {
  return (
    <div className='flex flex-col justify-around items-center w-full h-screen'>
      <h2 className='text-3xl font-semibold text-center'>AskItOut</h2>
      <img src={Welcome_image_3} alt="Welcome Home Page 3" className='max-w-[350px] max-h-[261.85px] sm:max-w-[600px] sm:max-h-[448.8px] content-center' />
      <div>
        <p className='text-2xl text-center'>Earn Points For</p>
        <p className='text-2xl text-center'>Helping Your Juniors</p>
      </div>
    </div>
  )
}
