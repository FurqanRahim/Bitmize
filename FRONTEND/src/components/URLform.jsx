import axios from "axios";
import React, { useState } from 'react'
import Post from "../api/url.api.js";

const URLform = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSubmit =  (e) => {
    e.preventDefault()
    
    if (!url) {
      alert('Please enter a URL')
      return
    }
    
    // Simulate API call
    setIsLoading(true)
    
    setTimeout(async () => {
      // Generate a random short URL (in a real app, this would come from your backend)
      
    
    const response = await Post({url})
    
    setShortUrl(response.data.url_short) // Assuming your backend returns the short URL in respons
      setIsLoading(false)
    }, 1000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className=" p-6 animate-fadeInUp">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-bold text-gray-700 mb-1">
            Enter your long URL
          </label>
          <input
            type="url"
            id="url"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus"
            placeholder="https://www.example.com/"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white font-medium btn-hover-lift
            ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>
      
      {shortUrl && (
        <div className="mt-6 animate-slideIn">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Your shortened URL:</h2>
          <div className="flex">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
              value={shortUrl}
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-700"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Share this shortened URL with anyone!
          </p>
        </div>
      )}
    </div>
  )
}

export default URLform