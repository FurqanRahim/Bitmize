import React from 'react';
import { FiHome, FiUser, FiSettings, FiLogOut, FiEdit2 } from 'react-icons/fi';

const Sidebar = ({ 
  name, 
  email, 
  profileImage, 
  recentLinksCount, 
  totalClicks, 
  onProfileEdit,
  onLogout 
}) => (
  <div className="w-64 fixed inset-y-0 left-0 bg-white shadow-md z-10">
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-xl font-bold text-gray-800">Bitmize</h1>
    </div>
    
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
          onClick={onProfileEdit}
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
          <span className="font-semibold">{recentLinksCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Total Clicks</span>
          <span className="font-semibold">{totalClicks}</span>
        </div>
      </div>
    </div>
    
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
          onClick={onLogout}
        >
          <FiLogOut className="mr-3" />
          <span>Logout</span>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;