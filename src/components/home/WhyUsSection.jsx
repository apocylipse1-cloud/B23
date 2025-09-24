import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Link } from 'react-router-dom';
import useIntersectionObserver from '../common/IntersectionObserver';

const WhyUsSection = () => {
  const sectionRef = useRef(null);
  const observerRef = useIntersectionObserver();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Enhanced animations with better easing
    const ctx = gsap.context(() => {
      // Animate section title with spring easing
      gsap.fromTo(
        '.why-us-title',
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'back.out(1.7)',
          force3D: true,
          scrollTrigger: {
            trigger: '.why-us-title',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate intro text with smooth easing
      gsap.fromTo(
        '.intro-text',
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          delay: 0.3,
          force3D: true,
          scrollTrigger: {
            trigger: '.intro-text',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate benefit cards with enhanced stagger
      gsap.fromTo(
        '.benefit-card',
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
          rotationY: 15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: 'back.out(1.7)',
          force3D: true,
          stagger: {
            amount: 0.6,
            from: 'start',
          },
          scrollTrigger: {
            trigger: '.benefits-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  });

  const benefits = [
    {
      icon: '⚡',
      title: 'Creative Spark',
      description:
        'We ignite the creative process with innovative thinking that transforms brands into memorable experiences.',
    },
    {
      icon: '🎯',
      title: 'Strategic Focus',
      description:
        'Every decision is made with long-term brand building in mind, ensuring sustainable growth and influence.',
    },
    {
      icon: '🔥',
      title: 'Authentic Friction',
      description:
        'We create the right tension that generates emotion and builds genuine connections with your audience.',
    },
    {
      icon: '💎',
      title: 'Unfiltered Honesty',
      description:
        'We tell you what needs to be said and do what needs to be done, ensuring transparent partnerships.',
    },
  ];

  return (
    <section
      ref={observerRef}
      id="why-us"
      className="min-h-screen section-dark text-white relative depth-3 section-transition gpu-accelerated"
    >
      <div className="cinematic-overlay"></div>
      <div className="container mx-auto section-padding">
        {/* Section Header */}
        <div className="text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8">
          <h2 className="why-us-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow fade-in-observer gpu-accelerated">
          Get to Know the Amoura Promise
          </h2>
          <div className="floating-panel-dark max-width-content fade-in-observer gpu-accelerated">
            <p className="intro-text font-[font1] text-responsive leading-relaxed text-layer-2">
            Creative • Reliable • Timely
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="benefits-grid responsive-grid-2 max-width-wide fade-in-observer">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card group floating-panel-dark glass-hover glass-click gpu-accelerated fade-in-observer"
            >
              {/* Icon */}
              <div className="text-5xl sm:text-6xl lg:text-7xl mb-6 sm:mb-8 micro-bounce glow-accent">
                {benefit.icon}
              </div>

              {/* Content */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="font-[font2] heading-responsive-md uppercase text-layer-2">
                  {benefit.title}
                </h3>
                <p className="font-[font1] text-responsive leading-relaxed text-layer-1">
                  {benefit.description}
                </p>
              </div>

              {/* Hover accent line */}
              <div className="w-full accent-line mt-6 sm:mt-8 rounded-full glow-accent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
