import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BackToHome = () => {
  const location = useLocation()
  
  // Don't show on home page
  if (location.pathname === '/') {
    return null
  }

  return (
    <div className='fixed top-4 left-4 sm:top-6 sm:left-6 depth-5 z-50 gpu-accelerated animate-fade-in-scale'>
      <Link 
        to='/'
        className='group flex items-center space-x-2 sm:space-x-3 lg:space-x-4 glass glass-hover glass-click px-4 sm:px-6 lg:px-8 py-3 sm:py-4 gpu-accelerated micro-lift'
      >
        <span className='text-lg sm:text-xl micro-bounce glow-accent gpu-accelerated'>
          ←
        </span>
        <span className='font-[font2] text-xs sm:text-sm lg:text-base uppercase text-layer-2 hidden sm:inline gpu-accelerated'>
          Home
        </span>
      </Link>
    </div>
  )
}

export default BackToHome