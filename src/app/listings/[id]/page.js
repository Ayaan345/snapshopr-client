// client/src/app/listings/[id]/page.js
import { notFound } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import ChatStarter from '@/components/ChatStarter';   // <-- plain import

const dummyFeatures = [
  'High-quality material for durability',
  'Ergonomic design for comfort',
  'Compatible with all standard devices',
  'Easy to clean and maintain',
];

export const revalidate = 60; // ISR

export default async function ListingDetail({ params }) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items/${id}`,
    { next: { revalidate } }
  );
  if (!res.ok) return notFound();
  const item = await res.json();

  const price = Number(item.price) || 0;
  const [rupees, paisas] = [
    Math.floor(price).toLocaleString(),
    ((price % 1).toFixed(2).slice(2)),
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {item.imageUrl && (
          <div className="relative w-full aspect-square bg-gray-100">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.imageUrl}`}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
        )}

        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">{item.title}</h1>
          <hr className="my-4" />

          <div className="mb-4">
            <p className="text-2xl font-light mt-2">
              <span className="align-top text-sm mr-0.5">PKR</span>
              {rupees}
              <span className="align-top text-sm">{paisas}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">(Inclusive of all taxes)</p>
          </div>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About this item</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {dummyFeatures.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </section>

          {/* ChatStarter is a client component, Next will handle the split */}
          <div className="mb-6">
            <ChatStarter sellerId={item.createdBy} />
          </div>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Product Description</h2>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </section>

          <div className="border-t pt-4">
            <h3 className="text-md font-semibold mb-2">Share this product</h3>
            <div className="flex space-x-3 text-gray-500">
              {/* your social icons here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
