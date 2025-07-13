"use client";

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductSection({ title, category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`);
        const data = await res.json();
        console.log('Fetched items:', data);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <div className="py-8 text-center text-gray-500">Loading...</div>;
  }

  if (!products.length) {
    return <div className="py-8 text-center text-gray-500">No items found.</div>;
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> {/* Updated grid columns */}
        {products
          .slice(0, 4)              
          .map(product => (
            <ProductCard key={product._id} item={product} />
          ))
        }
      </div>
    </section>
  );
}