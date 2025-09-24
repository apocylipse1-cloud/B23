import React, { useRef, useContext, useEffect } from 'react'
import Video from '../components/home/Video'
import HomeHeroText from '../components/home/HomeHeroText'
import HomeBottomText from '../components/home/HomeBottomText'
import Header from '../components/common/Header'
import WhyUsSection from '../components/home/WhyUsSection'
import PortfolioSection from '../components/home/PortfolioSection'
import StatsSection from '../components/home/StatsSection'
import PricingSection from '../components/home/PricingSection'
import ServicesSection from '../components/home/ServicesSection'
import ProcessSection from '../components/home/ProcessSection'
import CTASection from '../components/home/CTASection'
import AboutSection from '../components/home/AboutSection'
import ContactSection from '../components/home/ContactSection'
import Footer from '../components/home/Footer'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Home = () => {
  const heroSectionRef = useRef(null)

  // iOS video autoplay optimization
  useEffect(() => {
    const handleUserInteraction = () => {
      // Find all videos and attempt to play them after user interaction
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        if (video.paused) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.warn('Video play failed after user interaction:', error);
            });
          }
        }
      });
      
      // Remove event listeners after first interaction
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };

    // Add event listeners for user interaction on iOS
    document.addEventListener('touchstart', handleUserInteraction, { passive: true });
    document.addEventListener('click', handleUserInteraction, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Enhanced hero content animation with spring physics
      gsap.fromTo('.hero-content', 
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
          filter: 'blur(20px)'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 2,
          ease: "expo.out",
          delay: 0.1,
          force3D: true
        }
      )
      
      // Enhanced text elements with better stagger
      gsap.fromTo('.animate-fade-in-up', 
        {
          opacity: 0,
          y: 80,
          rotationX: 20,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
          stagger: 0.25,
          delay: 0.6,
          force3D: true
        }
      )
      
      // Enhanced video container with elastic bounce
      gsap.fromTo('.animate-fade-in-scale', 
        {
          opacity: 0,
          scale: 0.7,
          rotationY: 30,
          rotationZ: 5
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          rotationZ: 0,
          duration: 1.8,
          ease: "elastic.out(1, 0.6)",
          stagger: 0.2,
          delay: 1,
          force3D: true
        }
      )
    }, heroSectionRef)

    return () => ctx.revert()
  })

  return (
    <div className='text-white relative overflow-x-hidden gpu-accelerated'>
      {/* Cinematic Header Overlay */}
      <Header />
      
      {/* Fixed video background */}
      <div className='h-screen h-[100dvh] w-screen fixed top-0 left-0 z-0 overflow-hidden gpu-accelerated' style={{ willChange: 'transform' }}>
        <Video />
        {/* Dark overlay for better text readability */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50 z-10 gpu-accelerated' style={{ willChange: 'opacity' }}></div>
      </div>
      
      {/* Scrollable content */}
      <div className='relative z-20 gpu-accelerated'>
        {/* Hero Section */}
        <div ref={heroSectionRef} className='h-screen h-[100dvh] w-screen relative flex flex-col hero-content gpu-accelerated' style={{ willChange: 'transform, opacity' }}>
          <HomeHeroText />
        </div>
        
        {/* Portfolio Section */}
        <PortfolioSection />
        
        {/* Why Us Section */}
        <WhyUsSection />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* Pricing Section */}
        <PricingSection />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Process Section */}
        <ProcessSection />
        
        {/* Call-to-Action Section */}
        <CTASection />
        
        {/* About Us Section */}
        <AboutSection />
        
        {/* Contact Section */}
        <ContactSection />
        
        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  )
}

export default Home