'use client';

import React, { useMemo } from 'react';
import Link from 'next/link'; 
import Image from 'next/image'; // Import Image component

function ItemCardInner({ item, children }) {
  const backendBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

  const { rupees, paisas } = useMemo(() => {
    const priceNum =
      typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
    return {
      rupees: Math.floor(priceNum).toLocaleString(),
      paisas: (priceNum % 1).toFixed(2).substring(2),
    };
  }, [item.price]);

  return (
    <Link href={`/listings/${item._id}`} className="block w-full">
      <div className="flex flex-col p-4 rounded-lg shadow-sm hover:shadow-md mb-4 bg-white cursor-pointer h-full">
        {item.imageUrl && (
          <div className="w-full h-40 pl-5 sm:h-56 flex sm:justify-center sm:pl-10 relative mb-3 rounded-md overflow-hidden mx-auto"> {/* Added mx-auto to center the image container */}
            <Image // Changed img to Image
              src={`${backendBaseUrl}${item.imageUrl}`}
              alt={item.title}
              fill // Added fill prop
              style={{ objectFit: 'contain' }} // Equivalent to object-contain
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // Example sizes, adjust as needed
            />
          </div>
        )}

        <div className="flex flex-col flex-grow items-center text-center">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-xs sm:text-sm text-gray-700 mb-1 line-clamp-3">
              {item.description}
            </p>
          )}

          <div className="flex-grow" />

          {/* price*/}
          <p className="text-xl sm:text-2xl font-light mt-2 font-amazon-ember">
            <span className="align-top text-xs sm:text-sm mr-0.5">PKR</span>
            {rupees}
            <span className="align-top text-xs sm:text-sm">{paisas}</span>
          </p>

          {/* location*/}
          {item.location && (
            <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
              <span className="font-semibold">Location:</span> {item.location}
            </p>
          )}
        </div>

        {children}
      </div>
    </Link>
  );
}

export const ItemCard = React.memo(ItemCardInner);