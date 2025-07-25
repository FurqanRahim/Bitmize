import React from 'react';
import { FiDownload } from 'react-icons/fi';

const RecentLinksTable = ({ recentLinks, onExport }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    {/* Header Section */}
    <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-base md:text-lg font-semibold text-gray-800">Recent Links</h2>
        <button
          onClick={onExport}
          className="flex items-center text-xs md:text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded transition-colors"
        >
          <FiDownload className="mr-1.5" /> Export
        </button>
      </div>
      <span className="text-xs md:text-sm text-gray-500">Showing {recentLinks.length} most recent links</span>
    </div>

    {/* Mobile Card View */}
    <div className="md:hidden">
      <div className="divide-y divide-gray-200">
        {recentLinks.map((link) => (
          <div key={link.id} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${link.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {link.status}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {link.clicks} clicks
                  </span>
                </div>
                
                <a 
                  href={link.shortUrl} 
                  className="text-blue-600 hover:text-blue-800 font-medium truncate block"
                  title={link.shortUrl}
                >
                  {link.shortUrl}
                </a>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="text-sm text-gray-500 mb-1">Original URL:</div>
              <div className="text-gray-700 truncate" title={link.originalUrl}>
                {link.originalUrl}
              </div>
            </div>
            
            <div className="mt-3 text-xs text-gray-500">
              Created: {link.createdAt}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Desktop Table View */}
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Short URL
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Original URL
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clicks
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recentLinks.map((link) => (
            <tr key={link.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 max-w-[160px] truncate" title={link.shortUrl}>
                <a href={link.shortUrl} className="text-blue-600 hover:text-blue-800 font-medium">
                  {link.shortUrl}
                </a>
              </td>
              <td className="px-4 py-3 max-w-[240px] truncate text-gray-500" title={link.originalUrl}>
                {link.originalUrl}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {link.clicks}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                {link.createdAt}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${link.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {link.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentLinksTable;