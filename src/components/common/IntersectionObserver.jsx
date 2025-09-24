import { useEffect, useRef } from 'react'

const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          // Unobserve after animation to improve performance
          observer.unobserve(entry.target)
        }
      })
    }, defaultOptions)

    // Observe all fade-in-observer elements within the component
    const observableElements = element.querySelectorAll('.fade-in-observer')
    observableElements.forEach((el) => observer.observe(el))

    return () => {
      observableElements.forEach((el) => observer.unobserve(el))
    }
  }, [options])

  return elementRef
}

export default useIntersectionObserver