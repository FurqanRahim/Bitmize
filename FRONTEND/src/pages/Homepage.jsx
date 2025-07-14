import React from 'react'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header' // Make sure you have this component
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'

const Homepage = () => {
  return (
    <>
      
      {/* Header */}
      <Header />
      
      {/* Hero section */}
      <HeroSection/>

      {/* CSS for floating animation */}
      

      {/* Footer */}
      <Footer />
    </>
  )
}

export default Homepage