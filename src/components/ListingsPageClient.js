// components/ListingsPageClient.js
'use client'; // This component uses client-side hooks

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ItemGrid from './ItemGrid'; // Adjust the path if ItemGrid is in a different directory
import { fetchItems } from '@/lib/api';

export default function ListingsPageClient() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search');

  useEffect(() => {
    const getItems = async () => {
      setLoading(true); // Set loading to true when starting to fetch
      try {
        const response = await fetchItems(searchTerm || '');
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
        setItems([]); // Set items to empty array on error
      } finally {
        setLoading(false); // Set loading to false after fetch completes (success or error)
      }
    };

    getItems();
  }, [searchTerm]); // Re-run effect when searchTerm changes

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