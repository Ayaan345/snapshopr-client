// 'use client';

// import { useState, useEffect, useRef } from "react";

// const banners = [
//   { id: 1, image: "/images/banner1.jpg", alt: "Big Sale" },
//   { id: 2, image: "/images/banner2.jpg", alt: "New Arrivals" },
//   { id: 3, image: "/images/banner3.jpg", alt: "Festive Offers" },
// ];

// export default function BannerCarousel() {
//   const [current, setCurrent] = useState(0);
//   const timeoutRef = useRef();

//   useEffect(() => {
//     timeoutRef.current = setTimeout(
//       () => setCurrent((current + 1) % banners.length),
//       4000
//     );
//     return () => clearTimeout(timeoutRef.current);
//   }, [current]);

//   const goTo = idx => setCurrent(idx);

//   return (
//     <div
//       className="relative w-full h-56 md:h-72 lg:h-80 overflow-hidden rounded-lg shadow mb-6"
//       aria-label="Promotional Banners"
//     >
//       {banners.map((banner, idx) => (
//         <img
//           key={banner.id}
//           src={banner.image}
//           alt={banner.alt}
//           className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
//             idx === current ? "opacity-100" : "opacity-0"
//           }`}
//           loading="lazy"
//         />
//       ))}

//       <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {banners.map((_, idx) => (
//           <button
//             key={idx}
//             className={`w-3 h-3 rounded-full ${
//               idx === current ? "bg-yellow-400" : "bg-white/70"
//             }`}
//             onClick={() => goTo(idx)}
//             aria-label={`Go to banner ${idx + 1}`}
//           />
//         ))}
//       </div>

//       <button
//         className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1"
//         onClick={() => setCurrent((current - 1 + banners.length) % banners.length)}
//         aria-label="Previous banner"
//       >
//         ‹
//       </button>
//       <button
//         className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1"
//         onClick={() => setCurrent((current + 1) % banners.length)}
//         aria-label="Next banner"
//       >
//         ›
//       </button>
//     </div>
//   );
// }


'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image"; // Import Image component

const banners = [
  { id: 1, image: "/images/banner1.jpg", alt: "Big Sale" },
  { id: 2, image: "/images/banner2.jpg", alt: "New Arrivals" },
  { id: 3, image: "/images/banner3.jpg", alt: "Festive Offers" },
];

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setCurrent((current + 1) % banners.length),
      4000
    );
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const goTo = idx => setCurrent(idx);

  return (
    <div
      className="relative w-full h-48 sm:h-56 md:h-72 lg:h-80 overflow-hidden rounded-lg shadow mb-6" /* Adjusted height */
      aria-label="Promotional Banners"
    >
      {banners.map((banner, idx) => (
        <Image // Changed img to Image
          key={banner.id}
          src={banner.image}
          alt={banner.alt}
          fill // Added fill prop
          width={1600}             // ← replace with your actual image width
          height={400}             // ← replace with your actual image height
          className={`object-cover transition-opacity duration-700 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
          sizes="100vw"
          priority={idx === 0}    
        />
      ))}

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-yellow-400" : "bg-white/70"
            }`}
            onClick={() => goTo(idx)}
            aria-label={`Go to banner ${idx + 1}`}
          />
        ))}
      </div>

      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1"
        onClick={() => setCurrent((current - 1 + banners.length) % banners.length)}
        aria-label="Previous banner"
      >
        ‹
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1"
        onClick={() => setCurrent((current + 1) % banners.length)}
        aria-label="Next banner"
      >
        ›
      </button>
    </div>
  );
}