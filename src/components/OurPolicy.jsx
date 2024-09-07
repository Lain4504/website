import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2 xxs:grid-cols-2  gap-12 sm:gap-4 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="Easy Exchange Policy Icon" />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle-free exchange policy</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="7 Days Return Policy Icon" />
        <p className='font-semibold'>7 Days Return Policy</p>
        <p className='text-gray-400'>We offer 7 days free return policy</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="Best Customer Support Icon" />
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We provide 24/7 customer support</p>
      </div>
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="Easy Exchange Policy Icon" />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle-free exchange policy</p>
      </div>
    </div>
  )
}

export default OurPolicy
