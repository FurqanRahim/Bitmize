import React, { useState, useEffect } from 'react';
import { 
  FiCopy, FiLink, FiEdit2, FiCheck, FiBarChart2, 
  FiClock, FiActivity, FiTrendingUp, FiDownload,
  FiHome, FiUser, FiSettings, FiLogOut, FiX
} from 'react-icons/fi';
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
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [email, setEmail] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    avatar: null,
    preview: ''
  });
  const [profileError, setProfileError] = useState('');

  useEffect(() => {
    const fetchURLs = async () => {
      try {
        const response = await getURLS();
        if (response.data.status === 200) {
          const sortedLinks = response.data.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

          const currentUser = await getCurrentUser();
          setName(currentUser.data.name);
          setEmail(currentUser.data.email);
          setProfileImage(currentUser.data.avatar);

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
    
    if (!originalUrl) return setError('Please enter a URL');
    if (!isValidUrl(originalUrl)) return setError('Please include http:// or https://');

    setIsLoading(true);

    try {
      const response = await Post({ url: originalUrl, slug: customSlug });
      if (response.data.status == 200) {
        setShortenedUrl(response.data.url);
        const newResponse = await getURLS();
        if (newResponse.data.status === 200) {
          const sortedLinks = newResponse.data.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

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
    const excelData = recentLinks.map(link => ({
      'Short URL': link.shortUrl,
      'Original URL': link.originalUrl,
      'Clicks': link.clicks,
      'Created Date': link.createdAt,
      'Status': link.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Recent Links");
    XLSX.writeFile(workbook, "recent_links.xlsx");
  };

  const handleProfileEdit = () => {
    setProfileForm({
      name: name,
      email: email,
      avatar: null,
      preview: profileImage
    });
    setShowProfileModal(true);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm(prev => ({
          ...prev,
          avatar: file,
          preview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');

    if (!profileForm.name) {
      return setProfileError('Name is required');
    }

    try {
      const formData = new FormData();
      formData.append('name', profileForm.name);
      formData.append('email', profileForm.email);
      if (profileForm.avatar) {
        formData.append('avatar', profileForm.avatar);
      }

      const response = await updateUserProfile(formData);
      if (response.data.status === 200) {
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setProfileImage(response.data.user.avatar);
        setShowProfileModal(false);
      } else {
        setProfileError(response.data.message || 'Profile update failed');
      }
    } catch (error) {
      setProfileError('Error updating profile');
      console.error('Profile update error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const stats = [
    { title: 'Total Shortened', value: recentLinks.length.toString(), icon: <FiLink className="text-blue-500" />, trend: '12% ↑' },
    { title: 'Total Clicks ', value: totalClicks.toString(), icon: <FiActivity className="text-green-500" />, trend: '5% ↑' },
    { title: 'Active Links', value: recentLinks.length.toString(), icon: <FiBarChart2 className="text-purple-500" />, trend: '3% ↓' },
    { title: 'Top Link', value: recentLinks[0]?.shortUrl || 'No links', icon: <FiTrendingUp className="text-orange-500" />, trend: '32% ↑' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar with Profile Section */}
      <div className="w-64 fixed inset-y-0 left-0 bg-white shadow-md z-10">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Bitmize</h1>
        </div>
        
        {/* Profile Section */}
        <div className="p-6 flex flex-col items-center">
          <div className="relative mb-4">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              />
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 flex items-center justify-center">
                <FiUser className="text-gray-400 text-2xl" />
              </div>
            )}
            <button 
              onClick={handleProfileEdit}
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600 transition"
            >
              <FiEdit2 size={14} />
            </button>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600 text-sm mb-6">{email}</p>
          
          <div className="w-full bg-gray-100 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Shortened URLs</span>
              <span className="font-semibold">{recentLinks.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Total Clicks</span>
              <span className="font-semibold">{totalClicks}</span>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-4">
          <ul>
            <li className="px-6 py-3 flex items-center text-blue-600 bg-blue-50 border-l-4 border-blue-500">
              <FiHome className="mr-3" />
              <span>Dashboard</span>
            </li>
            <li className="px-6 py-3 flex items-center text-gray-600 hover:bg-gray-100">
              <FiUser className="mr-3" />
              <span>My Profile</span>
            </li>
            <li className="px-6 py-3 flex items-center text-gray-600 hover:bg-gray-100">
              <FiSettings className="mr-3" />
              <span>Settings</span>
            </li>
            <li 
              className="px-6 py-3 flex items-center text-gray-600 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              <FiLogOut className="mr-3" />
              <span>Logout</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans">
          {/* Header */}
          <header className="mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-500">URL Shortener Analytics</p>
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
                      placeholder="https://example.com"
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
                      placeholder="custom-name"
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

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form onSubmit={handleProfileSubmit} className="p-6">
              {profileError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {profileError}
                </div>
              )}
              
              <div className="mb-6 flex justify-center">
                <label className="cursor-pointer">
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleAvatarChange}
                    accept="image/*"
                  />
                  {profileForm.preview ? (
                    <img 
                      src={profileForm.preview} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 flex items-center justify-center">
                      <FiUser className="text-gray-400 text-3xl" />
                    </div>
                  )}
                  <div className="text-center mt-2 text-blue-600 text-sm">
                    Change Photo
                  </div>
                </label>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;