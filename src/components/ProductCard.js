// import { FaStar } from "react-icons/fa";

// export default function ProductCard({ product, onAddToCart }) {
//   return (
//     <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col h-full group">
//       <img
//         src={product.imageUrl || product.image || "/images/placeholder.png"}
//         alt={product.title}
//         className="w-full h-40 object-contain mb-2 rounded"
//         loading="lazy"
//       />
//       {/* <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-64 object-cover"
//       /> */}
//       <h3 className="font-semibold text-lg mb-1 truncate">{product.title}</h3>
//       <div className="flex items-center mb-1">
//         <span className="text-yellow-500 flex items-center">
//           {Array.from({ length: 5 }, (_, i) => (
//             <FaStar key={i} className={i < Math.round(product.rating) ? "" : "text-gray-300"} />
//           ))}
//         </span>
//         <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
//       </div>
//       <div className="font-bold text-blue-700 text-xl mb-2">₹{product.price}</div>
//       <button
//         className="mt-auto bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold py-2 rounded transition"
//         onClick={() => onAddToCart(product)}
//         aria-label={`Add ${product.title} to cart`}
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }





'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';          // ← import Link

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
          <p className="text-2xl font-light mt-2 font-amazon-ember">
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