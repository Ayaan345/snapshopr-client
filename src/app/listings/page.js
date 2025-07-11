// "use client";
// import { useState, useEffect } from 'react';
// import { fetchItems } from '@/lib/api';
// import ItemCard from '@/components/ItemCard';

// export default function ListingsPage() {
//   const [items, setItems] = useState([]);
//   useEffect(()=> { fetchItems().then(r=>setItems(r.data)); }, []);
//   return (
//     <section>
//       <h1>All Listings</h1>
//       {items.map(i => <ItemCard key={i._id} item={i} />)}
//     </section>
//   );
// }

'use client';


import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ItemGrid from '../../components/ItemGrid';
import { fetchItems } from '@/lib/api';

export default function ListingsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search');

  useEffect(() => {
    fetchItems({ page: 1, limit: 100 })
      .then(response => {
    setLoading(true); // Set loading to true when a new search starts
    fetchItems(searchTerm || '')
      .then((response) => {
        setItems(response.data);
      })
      .finally(() => setLoading(false));
  }, []);
  }, [searchTerm]); // Re-run when searchTerm changes

  if (loading) return <p className="p-8 text-center">Loading Listings...</p>;
  if (loading) {
    return <p className="p-8 text-center text-gray-500">Loading listings...</p>;
  }

  return (
    <main className="p-8">
      <h2 className="font-bold text-2xl mb-4 font-amazon-ember">
        {searchTerm ? `Results for "${searchTerm}"` : 'All Listings'}
      </h2>
      {items.length > 0 ? (
        <ItemGrid items={items} />
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No items found {searchTerm ? `for "${searchTerm}"` : ''}.
        </p>
      )}
    </main>
  );
}