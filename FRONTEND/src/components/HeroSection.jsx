import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { getUrlWithoutUser } from "../api/url.api.js";

const HeroSection = () => {
  const navigate = useNavigate();
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectToAuthPage = () => {
    navigate({ to: '/dashboard' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    // Validate URL (custom alias not required to have http/https)
    if (!originalUrl.match(/^https?:\/\//)) {
      setError('URL must start with http:// or https://');
      return;
    }

    if (customAlias.match("https")) {
      setError('Custom Url have no start with http:// or https://');
      return;
    }

    if (customAlias.match("http")) {
      setError('Custom Url have no start with http:// or https://');
      return;
    }

    setLoading(true);

    try {
      console.log("RESPONSE OF HERO SECTION ===============================> STARTING")
      const response = await getUrlWithoutUser(originalUrl, customAlias)
      console.log("response ==+++___++++>>>>> ==> ", response)
      console.log("RESPONSE OF HERO SECTION ===============================>", response.data)
      if (response.data.status == 200) {
        setShortUrl(response.data.url);
      } else {
        console.log("The console.log of Hero section is ", response.data.message)
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-20 lg:px-8">
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
            <div className="relative font-bold  rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 backdrop-blur-sm bg-white/50">
              Announcing Our Next Round of Service.{' '}
              <Link to="/about" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more →
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Turn every URL into <span className="text-indigo-600">actionable insights</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade URL shortening with detailed analytics and custom branding
            </p>

            {/* URL Shortening Form */}
            <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl mx-auto">
              <div className="flex flex-col gap-3 w-full">
                {/* Original URL Field */}
                <div className="w-full">
                  <input
                    type="url"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="Enter Link here"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Custom Alias + Dashboard Access Row */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="w-full">
                      <input
                        type="text"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                        placeholder="Custom Url (optional)"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    {/* Dashboard Access Button - Positioned below custom alias */}
                    <button
                      type="button"
                      onClick={redirectToAuthPage}
                      className="w-full sm:w-auto cursor-pointer rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:shadow-md"
                    >
                      Dashboard Access
                    </button>
                  </div>

                  {/* Shorten Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`self-end w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-white shadow-sm transition-all ${loading
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      }`}
                  >
                    {loading ? 'Shortening...' : 'Shorten URL'}
                  </button>
                </div>
              </div>

              {error && (
                <p className="mt-3 text-sm text-red-600 text-left">{error}</p>
              )}

              {shortUrl && (
                <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100 transition-all animate-fadeIn">
                  <p className="text-gray-700 mb-2">Your shortened URL:</p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 font-medium break-all hover:underline"
                    >
                      {shortUrl}
                    </a>
                    <button
                      onClick={() => navigator.clipboard.writeText(shortUrl)}
                      className="px-4 py-2 text-sm bg-white border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <section className="bg-white -mt-42 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Our URL Shortener
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade features designed to enhance your links and provide valuable insights
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Detailed Analytics</h3>
              <p className="text-gray-600">
                Track clicks, locations, devices, and referral sources in real-time
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Branding</h3>
              <p className="text-gray-600">
                Use your own domain and customize links to match your brand identity
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Link Management</h3>
              <p className="text-gray-600">
                Organize and manage all your links in one convenient dashboard
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Security & Reliability</h3>
              <p className="text-gray-600">
                Enterprise-grade security with 99.9% uptime guarantee
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/about"
              className="inline-flex font-bold items-center text-indigo-600 font-medium hover:text-indigo-500"
            >
              Explore all features
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;