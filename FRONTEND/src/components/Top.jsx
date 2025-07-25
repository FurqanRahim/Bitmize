import React from 'react';

const Top = ({ title, description }) => (
  <header className="mb-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </div>
  </header>
);

export default Top;