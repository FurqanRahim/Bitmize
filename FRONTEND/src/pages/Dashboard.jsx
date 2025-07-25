// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StatsCards from '../components/StatsCards';
import UrlShortenerForm from '../components/UrlShortenerForm';
import RecentLinksTable from '../components/RecentLinksTable';
import ProfileEditModal from '../components/ProfileEditModal';
import { Post, getURLS } from '../api/url.api.js';
import { getCurrentUser } from "../api/auth.instance.js";
import * as XLSX from 'xlsx';
import Bottom from '../components/Bottom.jsx';
import Top from '../components/Top.jsx';

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
    { title: 'Total Shortened', value: recentLinks.length.toString(), icon: 'FiLink', trend: '12% ↑' },
    { title: 'Total Clicks ', value: totalClicks.toString(), icon: 'FiActivity', trend: '5% ↑' },
    { title: 'Active Links', value: recentLinks.length.toString(), icon: 'FiBarChart2', trend: '3% ↓' },
    { title: 'Top Link', value: recentLinks[0]?.shortUrl || 'No links', icon: 'FiTrendingUp', trend: '32% ↑' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        name={name}
        email={email}
        profileImage={profileImage}
        recentLinksCount={recentLinks.length}
        totalClicks={totalClicks}
        onProfileEdit={handleProfileEdit}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 ml-64">
        <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans">
          <Top 
            title="Dashboard"
            description="URL Shortener Analytics"
          />
          
          <StatsCards stats={stats} />
          
          <UrlShortenerForm 
            originalUrl={originalUrl}
            setOriginalUrl={setOriginalUrl}
            customSlug={customSlug}
            setCustomSlug={setCustomSlug}
            shortenedUrl={shortenedUrl}
            error={error}
            isLoading={isLoading}
            copied={copied}
            onShorten={handleShorten}
            onCopy={copyToClipboard}
            onReset={() => {
              setOriginalUrl('');
              setCustomSlug('');
              setShortenedUrl('');
            }}
          />
          
          <RecentLinksTable 
            recentLinks={recentLinks} 
            onExport={exportToExcel} 
          />
          
          <Bottom />
        </div>
      </div>
      
      <ProfileEditModal 
        show={showProfileModal}
        profileForm={profileForm}
        profileError={profileError}
        onClose={() => setShowProfileModal(false)}
        onProfileChange={handleProfileChange}
        onAvatarChange={handleAvatarChange}
        onSubmit={handleProfileSubmit}
      />
    </div>
  );
};

export default Dashboard;