import React from 'react';
import { FiLink, FiCopy, FiCheck, FiEdit2 } from 'react-icons/fi';

const UrlShortenerForm = ({ 
  originalUrl, 
  setOriginalUrl, 
  customSlug, 
  setCustomSlug, 
  shortenedUrl, 
  error, 
  isLoading, 
  copied, 
  onShorten, 
  onCopy,
  onReset
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6 md:mb-8">
    <div className="flex items-center justify-between mb-4 md:mb-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
        <FiLink className="mr-2 text-blue-500" /> Create New Short Link
      </h2>
      {shortenedUrl && (
        <button
          onClick={onReset}
          className="text-xs md:text-sm text-blue-600 hover:text-blue-800"
        >
          Create Another
        </button>
      )}
    </div>

    {!shortenedUrl ? (
      <form onSubmit={onShorten} className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Original URL</label>
          <div className="relative">
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-2.5 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Custom Short URL (optional)</label>
          <div className="flex">
            <input
              type="text"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value.replace(/[^\w-]/g, ''))}
              placeholder="custom-name"
              className="flex-1 p-2.5 md:p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 md:mt-2">
            Letters, numbers, hyphens and underscores only. Leave blank for random.
          </p>
        </div>

        {error && (
          <div className="p-2 md:p-3 bg-red-50 text-red-600 rounded-lg text-xs md:text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-3 bg-blue-600 text-white rounded-lg font-medium text-sm md:text-base ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'} transition-colors`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Shortening...
            </span>
          ) : 'Shorten URL'}
        </button>
      </form>
    ) : (
      <div className="space-y-4 md:space-y-6">
        <div className="p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-xs md:text-sm font-medium text-blue-800 mb-2 md:mb-3">Your Short URL is ready!</h3>
          <div className="flex flex-col sm:flex-row">
            <input
              value={shortenedUrl}
              readOnly
              className="flex-1 p-2 md:p-2.5 border border-gray-300 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none bg-white focus:outline-none"
            />
            <button
              onClick={onCopy}
              className={`px-4 py-2.5 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none font-medium ${copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'} transition-colors`}
            >
              {copied ? (
                <span className="flex items-center justify-center text-xs md:text-sm">
                  <FiCheck className="mr-1" /> Copied!
                </span>
              ) : (
                <span className="flex items-center justify-center text-xs md:text-sm">
                  <FiCopy className="mr-1" /> Copy
                </span>
              )}
            </button>
          </div>
          <div className="flex items-center mt-2 text-xs md:text-sm text-gray-600">
            <FiEdit2 className="mr-1 md:mr-2 text-gray-400" />
            <span className="truncate">Original: {originalUrl}</span>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default UrlShortenerForm;