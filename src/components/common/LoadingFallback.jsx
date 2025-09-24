import React from 'react'

const LoadingFallback = () => {
  return (
    <div className='min-h-screen min-h-[100dvh] section-dark flex items-center justify-center px-4 gpu-accelerated'>
      <div className="cinematic-overlay"></div>
      <div className='floating-panel-dark text-center space-y-6 sm:space-y-8 gpu-accelerated animate-fade-in-scale'>
        <div className='loading-responsive border-[#D3FD50] border-t-transparent rounded-full animate-spin mx-auto glow-accent animate-glow-pulse gpu-accelerated' style={{ willChange: 'transform' }}></div>
        <p className='font-[font2] text-lg sm:text-xl uppercase text-layer-2 text-glow gpu-accelerated animate-fade-in-up stagger-1'>Loading...</p>
      </div>
    </div>
  )
}

export default LoadingFallback