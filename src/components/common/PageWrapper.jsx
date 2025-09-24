import React, { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/all'
import BackToHome from './BackToHome'

gsap.registerPlugin(ScrollTrigger)

const PageWrapper = ({ children, className = '' }) => {
  const pageRef = useRef(null)
  const location = useLocation()

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    // Force refresh ScrollTrigger whenever route changes
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }, [location.pathname])

  useGSAP(() => {
    gsap.set(pageRef.current, { opacity: 1 })

    gsap.fromTo(
      pageRef.current.children,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.98,
        filter: 'blur(5px)'
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.15,
        delay: 0.2,
      }
    )
  }, [location.pathname])

  return (
    <>
      <BackToHome />
      <div ref={pageRef} className={`min-h-screen ${className} gpu-accelerated`} style={{ opacity: 1 }}>
        {children}
      </div>
    </>
  )
}

export default PageWrapper
