import React from 'react';
import { 
  FiLink, 
  FiActivity, 
  FiBarChart2, 
  FiTrendingUp 
} from 'react-icons/fi';

const iconMap = {
  FiLink,
  FiActivity,
  FiBarChart2,
  FiTrendingUp
};

const StatsCard = ({ title, value, icon, trend }) => {
  const Icon = iconMap[icon];
  return (
    <div className="bg-white p-2 xs:p-3 sm:p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow w-full">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-[0.7rem] xs:text-xs sm:text-sm font-medium truncate">{title}</p>
          <p className={`${
            icon === 'FiTrendingUp' 
              ? 'text-sm xs:text-base sm:text-lg' 
              : 'text-base xs:text-lg sm:text-xl font-bold'
            } mt-1 text-gray-800 truncate`}>
            {value}
          </p>
        </div>
        <div className="p-1 xs:p-[6px] sm:p-2 bg-gray-100 rounded-lg flex-shrink-0 ml-1 xs:ml-2">
          <Icon className={`${
            icon === 'FiLink' ? 'text-blue-500' :
            icon === 'FiActivity' ? 'text-green-500' :
            icon === 'FiBarChart2' ? 'text-purple-500' : 
            'text-orange-500'
          } text-sm xs:text-base sm:text-lg`} />
        </div>
      </div>
    </div>
  );
};

const StatsCards = ({ stats }) => (
  <div className="grid grid-cols-1 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-5 mb-4 xs:mb-6">
    {stats.map((stat, index) => (
      <StatsCard key={index} {...stat} />
    ))}
  </div>
);

export default StatsCards;