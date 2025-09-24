import React from 'react'

const VideoCard = ({ videoId, aspectRatio, index }) => {
  return (
    <div className={`video-container group relative ${aspectRatio || 'aspect-video'} video-glass gpu-accelerated w-full micro-scale fade-in-observer`}>
      {/* YouTube iframe embed with responsive 16:9 aspect ratio */}
      <iframe
        className='absolute top-0 left-0 w-full h-full rounded-lg sm:rounded-xl gpu-accelerated'
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0&showinfo=0`}
        title={`Project Video ${index + 1}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
      
      {/* Subtle hover effect overlay - minimal to not interfere with video controls */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out pointer-events-none rounded-lg sm:rounded-xl' />
    </div>
  )
}

export default VideoCard