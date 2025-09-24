import React from 'react';

const HomeHeroText = () => {
  return (
    <div className="font-[font1] text-center relative depth-4 px-4 flex-1 flex items-center justify-center motion-safe">
      <div className="w-full">
        <div className="text-[12vw] sm:text-[9vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[7.5vw] lg:leading-[8vw] text-layer-3 mb-2 sm:mb-0 animate-fade-in-up stagger-1">
          You do the work
        </div>
        <div className="text-[12vw] sm:text-[9vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[7.5vw] lg:leading-[8vw] text-layer-3 flex-wrap justify-center mb-2 sm:mb-0 animate-fade-in-up stagger-2">
          <span className="animate-fade-in-scale stagger-1">we</span>
          <div className="h-[8vw] w-[20vw] sm:h-[7vw] sm:w-[16vw] rounded-full overflow-hidden mx-2 sm:mx-2 glass glow-accent flex-shrink-0 my-1 sm:my-0 micro-scale animate-fade-in-scale stagger-2">
            <video
              className="h-full w-full object-cover hero-inline-video ios-video-fix gpu-accelerated"
              autoPlay
              playsInline
              loop
              muted
              preload="auto"
              webkit-playsinline="true"
              onLoadedData={(e) => {
                // Force play on iOS after video loads
                const video = e.target;
                const playPromise = video.play();
                if (playPromise !== undefined) {
                  playPromise.catch(error => {
                    console.warn('Inline video autoplay failed:', error);
                  });
                }
              }}
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
          </div>
          <span className="animate-fade-in-scale stagger-3">do the</span>
        </div>
        <div className="text-[12vw] sm:text-[9vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[7.5vw] lg:leading-[8vw] text-layer-3 animate-fade-in-up stagger-3">
          stitches
        </div>
      </div>
    </div>
  );
};

export default HomeHeroText;