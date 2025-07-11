'use client';

import dynamic from 'next/dynamic';

const _BannerCarousel = dynamic(
  () => import('./BannerCarousel'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-56 bg-gray-200 animate-pulse mb-6 rounded-lg" />
    ),
  }
);

export default _BannerCarousel;
