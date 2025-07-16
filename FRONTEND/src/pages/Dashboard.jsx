import React, { useState, useEffect } from 'react';
import { FiCopy, FiLink, FiEdit2, FiCheck, FiBarChart2, FiClock, FiActivity, FiTrendingUp, FiDownload } from 'react-icons/fi';
import { Post, getURLS } from '../api/url.api.js';
import { getCurrentUser } from "../api/auth.instance.js";
import * as XLSX from 'xlsx';

const Dashboard = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recentLinks, setRecentLinks] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [name, setname] = useState()
  const [profileImage, setprofileImage] = useState();

  useEffect(() => {
    const fetchURLs = async () => {
      try {
        const response = await getURLS();
        if (response.data.status === 200) {
          // Sort by createdAt date in descending order (newest first)
          const sortedLinks = response.data.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

          const currentUser = await getCurrentUser();
          console.log("PROFILE OF CURRENT USER", currentUser)

          setname(currentUser.data.name);
          setprofileImage(currentUser.data.avatar);

          // Calculate total clicks
          const clicksSum = sortedLinks.reduce((total, url) => total + url.clicks, 0);
          setTotalClicks(clicksSum);

          const formattedLinks = sortedLinks.map((url) => ({
            id: url._id,
            shortUrl: `http://localhost:5000/api/url/${url.short_url}`,
            originalUrl: url.original_url,
            clicks: url.clicks,
            createdAt: new Date(url.createdAt).toLocaleDateString(),
            status: 'Active'
          }));
          setRecentLinks(formattedLinks);
        }
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchURLs();
  }, []);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    setError('');
    setCopied(false);
    console.log("RESPONSE URL GET URLS DASHBOARD =======================================>")
    const getURL_Response = await getURLS()
    console.log("RESPONSE URL GET URLS DASHBOARD =======================================>", getURL_Response.data)

    if (!originalUrl) return setError('Please enter a URL');
    if (!isValidUrl(originalUrl)) return setError('Please include http:// or https://');

    setIsLoading(true);

    try {
      console.log("ORIGINAL URL ============================> ", originalUrl);
      console.log("SLUG ============================> ", customSlug);
      const response = await Post({ url: originalUrl, slug: customSlug });
      console.log(response.data);
      setShortenedUrl(response.data.url);
      if (response.data.status == 200) {
        setShortenedUrl(response.data.url);
        // Refresh the recent links after creating a new one
        const newResponse = await getURLS();
        if (newResponse.data.status === 200) {
          // Sort by createdAt date in descending order (newest first)
          const sortedLinks = newResponse.data.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

          // Calculate total clicks
          const clicksSum = sortedLinks.reduce((total, url) => total + url.clicks, 0);
          setTotalClicks(clicksSum);

          const formattedLinks = sortedLinks.map((url) => ({
            id: url._id,
            shortUrl: `http://localhost:5000/api/url/${url.short_url}`,
            originalUrl: url.original_url,
            clicks: url.clicks,
            createdAt: new Date(url.createdAt).toLocaleDateString(),
            status: 'Active'
          }));
          setRecentLinks(formattedLinks);

        }
      } else {
        setError(response.data.message);
      }
    } catch {
      setError('Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!shortenedUrl) return;
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToExcel = () => {
    // Prepare data for Excel export
    const excelData = recentLinks.map(link => ({
      'Short URL': link.shortUrl,
      'Original URL': link.originalUrl,
      'Clicks': link.clicks,
      'Created Date': link.createdAt,
      'Status': link.status
    }));

    // Create Excel file
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Recent Links");

    // Export the workbook
    XLSX.writeFile(workbook, "recent_links.xlsx", {
      bookType: 'xlsx',
      type: 'array'
    });
  };


  const stats = [
    { title: 'Total Shortened', value: recentLinks.length.toString(), icon: <FiLink className="text-blue-500" />, trend: '12% ↑' },
    { title: 'Total Clicks ', value: totalClicks.toString(), icon: <FiActivity className="text-green-500" />, trend: '5% ↑' },
    { title: 'Active Links', value: recentLinks.length.toString(), icon: <FiBarChart2 className="text-purple-500" />, trend: '3% ↓' },
    { title: 'Top Link', value: recentLinks[0]?.shortUrl || 'No links', icon: <FiTrendingUp className="text-orange-500" />, trend: '32% ↑' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Bitmize</h1>
            <p className="text-gray-500">URL Shortener Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <img src={profileImage} alt="Profile Image" className="h-8 w-8 rounded-full" />
                </div>
                <span className="font-medium">{name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <p className={`${index === 3 ? 'text-lg' : 'text-2xl font-bold'} mt-2 text-gray-800`}>
                    {stat.value}
                  </p>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* URL Shortener Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <FiLink className="mr-2 text-blue-500" /> Create New Short Link
            </h2>
            {shortenedUrl && (
              <button
                onClick={() => {
                  setOriginalUrl('');
                  setCustomSlug('');
                  setShortenedUrl('');
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Create Another
              </button>
            )}
          </div>

          {!shortenedUrl ? (
            <form onSubmit={handleShorten} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Original URL</label>
                <div className="relative">
                  <input
                    type="url"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder=""
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Short URL (optional)</label>
                <div className="flex">
                  <input
                    type="text"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value.replace(/[^\w-]/g, ''))}
                    placeholder=""
                    className="flex-1 p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Letters, numbers, hyphens and underscores only. Leave blank for random.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full p-3.5 bg-blue-600 text-white rounded-lg font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'} transition-colors`}
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
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-sm font-medium text-blue-800 mb-3">Your Short URL is ready!</h3>
                <div className="flex">
                  <input
                    value={shortenedUrl}
                    readOnly
                    className="flex-1 p-2.5 border border-gray-300 rounded-l-lg bg-white focus:outline-none"
                  />
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-2.5 rounded-r-lg font-medium ${copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'} transition-colors`}
                  >
                    {copied ? (
                      <span className="flex items-center">
                        <FiCheck className="mr-1" /> Copied!
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FiCopy className="mr-1" /> Copy
                      </span>
                    )}
                  </button>
                </div>
                <div className="flex items-center mt-3 text-sm text-gray-600">
                  <FiEdit2 className="mr-2 text-gray-400" />
                  <span className="truncate">Original: {originalUrl}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Links Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-gray-800">Recent Links</h2>
              <button
                onClick={exportToExcel}
                className="ml-4 flex items-center text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                <FiDownload className="mr-1" /> Export to Excel
              </button>
            </div>
            <span className="text-sm text-gray-500">Showing {recentLinks.length} most recent links</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Short URL
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Original URL
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={link.shortUrl} className="text-blue-600 hover:text-blue-800 font-medium">
                        {link.shortUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                      {link.originalUrl}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {link.clicks}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {link.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${link.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {link.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500 pb-8">
          © {new Date().getFullYear()} Bitmize URL Shortener. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;