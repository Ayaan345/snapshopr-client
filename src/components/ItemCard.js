"use client";


// import React from "react";

// export default function ItemCard({ item, children }) {
//   const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
//   return (
//     <div className="flex " style={{
//       border: "1px solid #ddd",
//       padding: "1rem",
//       marginBottom: "1rem",
//       borderRadius: "4px"
//     }}>
//       {item.imageUrl && (
//         <div className="rounded-3xl" style={{ width: '200px', height: '200px', overflow: 'hidden', marginBottom: '1rem',}}>
//           <img 
//             src={`${backendBaseUrl}${item.imageUrl}`} 
//             alt={item.title} 
//             style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//           />
//         </div>
//       )}
//       <div className="flex flex-col ml-10">
//       <h3 style={{ margin: "0 0 0.5rem" }}>{item.title}</h3>
//       <p style={{ margin: "0 0 0.5rem" }}>{item.description}</p>
//       <p style={{ margin: "0 0 0.5rem", fontWeight: "bold" }}>
//         Price: {item.price}
//       </p>
//       {item.location && (
//         <p style={{ margin: "0 0 0.5rem", fontStyle: "italic" }}>
//           Location: {item.location}
//         </p>
//       )}
//       {children /* e.g. a Remove button passed from ProfilePage */}
//     </div>
//     </div>
//   );
// }

// ItemCard.js
// 'use client';
// import React, { useMemo } from 'react';

// function ItemCardInner({ item, children }) {
//   const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//   const { rupees, paisas } = useMemo(() => {
//     const priceNum = typeof item.price === 'number'
//       ? item.price
//       : parseFloat(item.price) || 0;
//     return {
//       rupees: Math.floor(priceNum).toLocaleString(),
//       paisas: (priceNum % 1).toFixed(2).substring(2)
//     };
//   }, [item.price]);

//   return (
//     <div className="flex flex-col p-4 border rounded-lg shadow-sm hover:shadow-md mb-4 bg-white w-64">
//       {item.imageUrl && (
//         <div className="w-full h-48 overflow-hidden rounded-md mb-3 flex items-center justify-center">
//           <img
//             src={`${backendBaseUrl}${item.imageUrl}`} 
//             alt={item.title}

//             className="object-contain max-w-full max-h-full"
//           />
//         </div>
//       )}
//       <div className="flex flex-col flex-grow">
//         <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-2">
//           {item.title}
//         </h3>
//         {item.description && (
//           <p className="text-sm text-gray-700 mb-1 line-clamp-3">
//             {item.description}
//           </p>
//         )}
//         <div className="flex-grow" />
//         <p className="text-2xl font-light mt-2 font-amazon-ember">
//           <span className="align-top text-sm mr-0.5">PKR</span>
//           {rupees}
//           <span className="align-top text-sm">{paisas}</span>
//         </p>
//         <div className="mt-2">{children}</div>
//       </div>
//     </div>
//   );
// }

// export const ItemCard = React.memo(ItemCardInner);

// client/src/components/ItemCard.js




// import React, { useMemo } from 'react';
// import Image from 'next/image';

// function ItemCardInner({ item, children }) {
//   const backendBaseUrl =
//     process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

//   const { rupees, paisas } = useMemo(() => {
//     const priceNum = typeof item.price === 'number'
//       ? item.price
//       : parseFloat(item.price) || 0;
//     return {
//       rupees: Math.floor(priceNum).toLocaleString(),
//       paisas: (priceNum % 1).toFixed(2).substring(2),
//     };
//   }, [item.price]);

//   return (
//     <div className="flex flex-col p-4  rounded-lg shadow-sm hover:shadow-md mb-4 bg-white w-64">
//       {item.imageUrl && (
//         <div className="w-full h-48 relative mb-3 rounded-md overflow-hidden">
//           <Image
//             src={`${backendBaseUrl}${item.imageUrl}`}
//             alt={item.title}
//             fill                           // makes the image fill its parent div
//             className="object-contain"
//             sizes="(max-width: 768px) 100vw, 280px"
//             unoptimized={false}           // default; let Next.js optimize
//           />
//         </div>
//       )}
//       <div className="flex flex-col flex-grow">
//         <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-2">
//           {item.title}
//         </h3>
//         {item.description && (
//           <p className="text-sm text-gray-700 mb-1 line-clamp-3">
//             {item.description}
//           </p>
//         )}
//         <div className="flex-grow" />
//         <p className="text-2xl font-light mt-2 font-amazon-ember">
//           <span className="align-top text-sm mr-0.5">PKR</span>
//           {rupees}
//           <span className="align-top text-sm">{paisas}</span>
//         </p>
//         <div className="mt-2">{children}</div>
//       </div>
//     </div>
//   );
// }

// export const ItemCard = React.memo(ItemCardInner);

// client/src/components/ItemCard.js
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';  // ← import Link for client-side navigation

function ItemCardInner({ item, children }) {
  const backendBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

  // Memoize price formatting
  const { rupees, paisas } = useMemo(() => {
    const priceNum =
      typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
    return {
      rupees: Math.floor(priceNum).toLocaleString(),
      paisas: (priceNum % 1).toFixed(2).substring(2),
    };
  }, [item.price]);

  return (
    <Link href={`/listings/${item._id}`} className="block">
      <div className="flex flex-col p-4 rounded-lg shadow-sm hover:shadow-md mb-4 bg-white w-64 cursor-pointer">
        {item.imageUrl && (
          <div className="w-full h-48 relative mb-3 rounded-md overflow-hidden">
            <img
              src={`${backendBaseUrl}${item.imageUrl}`}
              alt={item.title}
              loading="lazy"
              className="object-contain max-w-full max-h-full"
            />
          </div>
        )}

        <div className="flex flex-col flex-grow">
          <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-2">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-sm text-gray-700 mb-1 line-clamp-3">
              {item.description}
            </p>
          )}

          <div className="flex-grow" />

          {/* Price Display */}
          <p className="text-2xl font-light mt-2 font-amazon-ember">
            <span className="align-top text-sm mr-0.5">PKR</span>
            {rupees}
            <span className="align-top text-sm">{paisas}</span>
          </p>

          {/* Location Display Under Price */}
          {item.location && (
            <p className="text-sm text-gray-500 mt-1 truncate">
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
