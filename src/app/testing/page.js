// ItemCard.js
"use client";

import React from "react";

export default function ItemCard({ item, children }) {
  // The backendBaseUrl and item data will be ignored based on your request
  // as we're using random words for display purposes.
  // const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

  const randomTitle = "Fantastic Widget Pro Max";
  const randomDescription = "Experience unparalleled performance with this cutting-edge device, designed for modern living and ultimate convenience. Limited stock available!";
  const randomLocation = "Global Warehouse";
  const randomPrice = "$199.99"; // Fixed price string
  const randomImageUrl = "https://via.placeholder.com/150"; // A placeholder image URL

  return (
    <div className="flex flex-col p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 mb-4 bg-white w-64">
      <div className="w-full h-48 overflow-hidden rounded-md mb-3 flex items-center justify-center">
        <img
          src={randomImageUrl}
          alt={randomTitle}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-2">
          {randomTitle}
        </h3>
        <p className="text-sm text-gray-700 mb-1 line-clamp-3">
          {randomDescription}
        </p>
        <p className="text-xs text-gray-500 mb-2">
          Location: {randomLocation}
        </p>
        <div className="flex-grow"></div>
        <p className="text-2xl font-bold text-gray-900 mt-2">
          {randomPrice}
        </p>
        <div className="mt-2">
          {/* Children will still render if passed, e.g., a button */}
          {children}
        </div>
      </div>
    </div>
  );
}