import React, { useRef, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Header = () => {
  const headerRef = useRef(null)
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll state for subtle background changes
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])
  useGSAP(() => {
    // Smooth header entrance animation
    const ctx = gsap.context(() => {
      // Enhanced header entrance with spring physics
      gsap.fromTo(headerRef.current,
        {
          opacity: 0,
          y: -30,
          scale: 0.95,
          filter: 'blur(15px)'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: "expo.out",
          delay: 0.2,
          force3D: true
        }
      )

      // Enhanced navigation items with elastic easing
      gsap.fromTo('.nav-item-animate',
        {
          opacity: 0,
          y: -25,
          scale: 0.8,
          rotationY: 20
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          stagger: 0.1,
          delay: 0.8,
          force3D: true
        }
      )
    }, headerRef)

    return () => ctx.revert()
  }, [])

  const navigationItems = [
    { name: 'Portfolio', href: '/projects' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact Us', href: '/contact' }
  ]

  const handleSmoothScroll = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out w-full ${
          isScrolled ? 'backdrop-blur-xl bg-black/30' : 'bg-transparent'
        } gpu-accelerated`}
        style={{ zIndex: isMobileMenuOpen ? 30 : 1000 }}
      >
        {/* Subtle gradient fade for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent pointer-events-none gpu-accelerated" />
        
        <div className={`container mx-auto py-4 sm:py-6 lg:py-8 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-50' : 'opacity-100'
        } gpu-accelerated`}>
          <nav className="flex items-center justify-between relative z-10">
            {/* Logo Area */}
            <div className="nav-item-animate flex-shrink-0 gpu-accelerated">
              <Link 
                to="/"
                className="flex items-center space-x-3 group micro-lift gpu-accelerated"
              >
                {/* Logo container - replace logo.png in public folder to change logo */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center micro-bounce gpu-accelerated">
                  <img 
                    src="/logo.png" 
                    alt="Amoura Works Logo" 
                    className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3 gpu-accelerated"
                    style={{ willChange: 'transform' }}
                    onError={(e) => {
                      // Fallback if logo file is missing
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback placeholder (hidden by default) */}
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img 
                      src="/logo.png" 
                      alt="Amoura Works Logo" 
                      className="w-full h-full object-contain gpu-accelerated"
                      onError={(e) => {
                        // Mobile fallback
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-[#D3FD50] to-[#b8e03e] rounded-full flex items-center justify-center glow-accent hidden gpu-accelerated">
                      <span className="font-[font2] text-black text-sm">A</span>
                    </div>
                  </div>
                </div>
                <span className="font-[font2] text-lg sm:text-xl lg:text-2xl text-white uppercase tracking-wide transition-all duration-300 group-hover:text-[#D3FD50] gpu-accelerated">
                  Amoura Works
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              {navigationItems.map((item, index) => (
                <div key={index} className="nav-item-animate gpu-accelerated">
                  {item.href.startsWith('#') ? (
                    <button
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className="nav-link font-[font2] text-sm lg:text-base xl:text-lg text-white uppercase tracking-wide relative group micro-lift gpu-accelerated"
                    >
                      {item.name}
                      <span className="nav-underline absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D3FD50] to-[#b8e03e] transition-all duration-500 ease-out group-hover:w-full glow-accent gpu-accelerated" />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="nav-link font-[font2] text-sm lg:text-base xl:text-lg text-white uppercase tracking-wide relative group micro-lift gpu-accelerated"
                    >
                      {item.name}
                      <span className="nav-underline absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D3FD50] to-[#b8e03e] transition-all duration-500 ease-out group-hover:w-full glow-accent gpu-accelerated" />
                    </Link>
                  )}
                </div>
              ))}

              {/* Become an Affiliate Button */}
              <div className="nav-item-animate gpu-accelerated">
                <Link
                  to="/affiliate-program"
                  className="affiliate-btn font-[font2] text-xs lg:text-sm xl:text-base text-white uppercase tracking-wide px-4 lg:px-6 py-2 lg:py-3 border border-gray-400 rounded-full transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-[#D3FD50]/20 hover:border-[#D3FD50] hover:text-[#D3FD50] active:scale-95 micro-glow gpu-accelerated"
                >
                  Become an Affiliate
                </Link>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden nav-item-animate mobile-menu-container gpu-accelerated">
              <button 
                onClick={toggleMobileMenu}
                className="w-12 h-12 flex flex-col items-center justify-center space-y-1.5 group p-2 relative z-50 micro-lift gpu-accelerated"
                aria-label="Toggle mobile menu"
              >
                <span className={`w-5 h-0.5 bg-white transition-all duration-500 ease-out gpu-accelerated ${isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-[#D3FD50]' : 'group-hover:w-6 group-hover:bg-[#D3FD50]'}`} />
                <span className={`w-5 h-0.5 bg-white transition-all duration-500 ease-out gpu-accelerated ${isMobileMenuOpen ? 'opacity-0' : 'group-hover:w-6 group-hover:bg-[#D3FD50]'}`} />
                <span className={`w-5 h-0.5 bg-white transition-all duration-500 ease-out gpu-accelerated ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-[#D3FD50]' : 'group-hover:w-6 group-hover:bg-[#D3FD50]'}`} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ease-out ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      } gpu-accelerated`}>
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-all duration-500 gpu-accelerated"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Menu Content */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-700 ease-out z-60 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } gpu-accelerated`}>
          {/* Menu Header */}
          <div className="pt-20 pb-8 px-6 border-b border-white/10 gpu-accelerated">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#D3FD50] to-[#b8e03e] rounded-full flex items-center justify-center glow-accent gpu-accelerated">
                <span className="font-[font2] text-black text-sm">K</span>
              </div>
              <span className="font-[font2] text-lg text-white uppercase tracking-wide">
                Amoura Works
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="px-6 py-8 space-y-6 gpu-accelerated">
            {navigationItems.map((item, index) => (
              <div key={index} className="mobile-nav-item gpu-accelerated">
                {item.href.startsWith('#') ? (
                  <button
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="w-full text-left font-[font2] text-lg text-white uppercase tracking-wide py-3 px-4 rounded-lg transition-all duration-500 hover:bg-white/5 hover:text-[#D3FD50] relative group micro-lift gpu-accelerated"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-4 w-0 h-0.5 bg-[#D3FD50] transition-all duration-500 group-hover:w-8 glow-accent gpu-accelerated" />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="block font-[font2] text-lg text-white uppercase tracking-wide py-3 px-4 rounded-lg transition-all duration-500 hover:bg-white/5 hover:text-[#D3FD50] relative group micro-lift gpu-accelerated"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-4 w-0 h-0.5 bg-[#D3FD50] transition-all duration-500 group-hover:w-8 glow-accent gpu-accelerated" />
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Affiliate Button */}
            <div className="pt-4 border-t border-white/10 gpu-accelerated">
              <Link
                to="/affiliate-program"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center font-[font2] text-sm text-white uppercase tracking-wide px-6 py-3 border border-gray-400 rounded-full transition-all duration-500 hover:bg-[#D3FD50] hover:text-black hover:border-[#D3FD50] micro-scale gpu-accelerated"
              >
                Become an Affiliate
              </Link>
            </div>
          </div>

          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 gpu-accelerated">
            <p className="text-xs text-gray-400 text-center">
              © 2025 Amoura Works
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header