// 'use client';

// import React, { useMemo } from 'react';
// import Link from 'next/link';          // ← import Link

// function ProductCard({ item, children }) {
//   const backendBaseUrl =
//     process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

//   const { rupees, paisas } = useMemo(() => {
//     const priceNum =
//       typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
//     return {
//       rupees: Math.floor(priceNum).toLocaleString(),
//       paisas: (priceNum % 1).toFixed(2).substring(2),
//     };
//   }, [item.price]);

//   return (
//     // Wrap the entire card in Link
//     <Link href={`/listings/${item._id}`} className="block">
//       <div className="flex flex-col p-4 rounded-lg shadow-sm hover:shadow-md mb-4 bg-white w-64 cursor-pointer">
//         {item.imageUrl && (
//           <div className="w-full h-48 relative mb-3 rounded-md overflow-hidden">
//             <img
//               src={`${backendBaseUrl}${item.imageUrl}`}
//               alt={item.title}
//               loading="lazy"
//               className="object-contain max-w-full max-h-full"
//             />
//           </div>
//         )}
//         <div className="flex flex-col flex-grow">
//           <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-2">
//             {item.title}
//           </h3>
//           {item.description && (
//             <p className="text-sm text-gray-700 mb-1 line-clamp-3">
//               {item.description}
//             </p>
//           )}
//           <div className="flex-grow" />
//           <p className="text-2xl font-light mt-2 font-amazon-ember">
//             <span className="align-top text-sm mr-0.5">PKR</span>
//             {rupees}
//             <span className="align-top text-sm">{paisas}</span>
//           </p>
//         </div>
//         {children}
//       </div>
//     </Link>
//   );
// }

// export default React.memo(ProductCard);

// ProductCard.js
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';

function ProductCard({ item, children }) {
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
    // Wrap the entire card in Link
    <Link href={`/listings/${item._id}`} className="block">
      <div className="flex flex-col p-4 pl-10 rounded-lg shadow-sm hover:shadow-md mb-4 bg-white cursor-pointer"> {/* Removed w-64 */}
        {item.imageUrl && (
          <div className="w-full h-32 sm:h-48 flex sm:justify-center relative mb-3 rounded-md overflow-hidden"> {/* Adjusted height */}
            <img
              src={`${backendBaseUrl}${item.imageUrl}`}
              alt={item.title}
              loading="lazy"
              className="object-contain max-w-full max-h-full"
            />
          </div>
        )}
        <div className="flex flex-col flex-grow">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2"> {/* Adjusted font size */}
            {item.title}
          </h3>
          {item.description && (
            <p className="text-sm text-gray-700 mb-1 line-clamp-3">
              {item.description}
            </p>
          )}
          <div className="flex-grow" />
          <p className="text-xl sm:text-2xl font-light mt-2 font-amazon-ember"> {/* Adjusted font size */}
            <span className="align-top text-sm mr-0.5">PKR</span>
            {rupees}
            <span className="align-top text-sm">{paisas}</span>
          </p>
        </div>
        {children}
      </div>
    </Link>
  );
}

export default React.memo(ProductCard);

