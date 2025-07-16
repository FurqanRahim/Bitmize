import React,{useState} from 'react'

const WithOUTUSER = () => {

  const [originalUrl, setOriginalUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [links, setLinks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate URL
    if (!/^https?:\/\//i.test(originalUrl)) {
      setError('URL must start with http:// or https://');
      return;
    }
    
    // Generate short URL
    const shortPath = customUrl || Math.random().toString(36).substring(2, 9);
    const shortUrl = `https://short.link/${shortPath}`;
    
    setShortenedUrl(shortUrl);
    
    // Show modal if not logged in
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      // Save to dashboard
      setLinks([...links, { original: originalUrl, short: shortUrl }]);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowModal(false);
    
    // Save the URL after login
    if (shortenedUrl) {
      setLinks([...links, { original: originalUrl, short: shortenedUrl }]);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Original URL*
          </label>
          <input
            id="originalUrl"
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="customUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Custom URL (optional)
          </label>
          <input
            id="customUrl"
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="my-custom-link"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Don't include http/https - e.g. "my-page"
          </p>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Shorten URL
        </button>
      </form>

      {shortenedUrl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-700">Shortened URL:</p>
          <a 
            href={shortenedUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {shortenedUrl}
          </a>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-sm w-full p-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Login Required</h3>
            <p className="text-gray-500">
              Please login to save this link to your dashboard and monitor its performance
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Continue without saving
              </button>
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoggedIn && links.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Your Links</h2>
          <ul className="space-y-4">
            {links.map((link, index) => (
              <li key={index} className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600 break-all">
                  <span className="font-medium">Original:</span> {link.original}
                </p>
                <p className="mt-1 text-sm text-blue-600 break-all">
                  <span className="font-medium text-gray-600">Short:</span>{' '}
                  <a 
                    href={link.short} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {link.short}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>


  )}


export default WithOUTUSER

