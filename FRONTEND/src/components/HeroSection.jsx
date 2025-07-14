import React from 'react'
import { useNavigate } from '@tanstack/react-router';


const HeroSection = () => {

  
 
  const navigate = useNavigate();
  
  const redirectToAuthPage = () => {
    navigate({ to: '/dashboard' });
  };

  return (
          <div className="relative isolate px-6 pt-24 lg:px-8">
        {/* Floating gradient background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[80vh] w-full -translate-x-1/2 bg-gradient-to-b from-indigo-50 to-transparent opacity-30" />
        </div>
        
        {/* Animated floating elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-indigo-100 opacity-20"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(40px)',
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out ${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 backdrop-blur-sm bg-white/50">
              Announcing Our Next Round of Service.{' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more →
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Turn every URL into <span className="text-indigo-600">actionable insights</span>
            </h1>
            <p className="mt-8 text-lg leading-8 text-gray-600">
              We're thrilled to share that we've secured new funding to accelerate the growth of our enterprise URL shortening platform!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <span
                onClick={redirectToAuthPage}
                className="cursor-pointer  rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:shadow-md"
              >
                Get started
              </span>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-all">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
  )
}

export default HeroSection