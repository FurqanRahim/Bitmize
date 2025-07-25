
import React from 'react'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header' // Make sure you have this component
import Footer from '../components/Footer'
import About from "../components/About.jsx";

const AboutPage = () => {
    return (
        <>

            {/* Header */}

            <Header />

            {/* Hero section */}

            <About />


            {/* Footer */}

            <Footer />

        </>
    )
}

export default AboutPage