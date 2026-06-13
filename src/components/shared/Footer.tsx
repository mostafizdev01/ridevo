import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bg-[#0B0B0B] text-white text-center py-4 mt-10'>
      <p className='text-sm'>&copy; {new Date().getFullYear()} Ridevo. All rights reserved.</p>
    </div>
  )
}

export default Footer