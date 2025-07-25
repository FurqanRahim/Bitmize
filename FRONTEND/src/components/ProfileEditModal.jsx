import React from 'react';
import { FiX, FiUser } from 'react-icons/fi';

const ProfileEditModal = ({ 
  show, 
  profileForm, 
  profileError, 
  onClose, 
  onProfileChange, 
  onAvatarChange, 
  onSubmit 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white-500 rounded-xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="p-6">
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
                onChange={onAvatarChange}
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
              onChange={onProfileChange}
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
              onChange={onProfileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
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
  );
};

export default ProfileEditModal;