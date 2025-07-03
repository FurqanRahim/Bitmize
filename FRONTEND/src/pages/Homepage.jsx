
import React from 'react'
import URLform from '../components/URLform'

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-black-800 mb-6">URL Shortener</h1>
        <URLform />
      </div>
    </div>
  )
}

export default Homepage