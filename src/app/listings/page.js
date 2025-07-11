// 'use client';


// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import ItemGrid from '../../components/ItemGrid';
// import { fetchItems } from '@/lib/api';

// export default function ListingsPage() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const searchParams = useSearchParams();
//   const searchTerm = searchParams.get('search');

//   useEffect(() => {
//     fetchItems({ page: 1, limit: 100 })
//       .then(response => {
//     setLoading(true); 
//     fetchItems(searchTerm || '')
//       .then((response) => {
//         setItems(response.data);
//       })
//       .finally(() => setLoading(false));
//   }, []);
//   }, [searchTerm]); 

//   if (loading) return <p className="p-8 text-center">Loading Listings...</p>;
//   if (loading) {
//     return <p className="p-8 text-center text-gray-500">Loading listings...</p>;
//   }

//   return (
//     <main className="p-8">
//       <h2 className="font-bold text-2xl mb-4 font-amazon-ember">
//         {searchTerm ? `Results for "${searchTerm}"` : 'All Listings'}
//       </h2>
//       {items.length > 0 ? (
//         <ItemGrid items={items} />
//       ) : (
//         <p className="text-center text-gray-500 mt-10">
//           No items found {searchTerm ? `for "${searchTerm}"` : ''}.
//         </p>
//       )}
//     </main>
//   );
// }


// app/listings/page.js
// This is now a Server Component (no 'use client' at the top)

import { Suspense } from 'react';
import ListingsPageClient from '../../components/ListingsPageClient'; // Adjust the path based on where you put the new file

export default function ListingsPage() {
  return (
    <Suspense fallback={<p className="p-8 text-center text-gray-500">Loading listings page...</p>}>
      <ListingsPageClient />
    </Suspense>
  );
}