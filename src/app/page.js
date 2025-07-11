// import BannerCarousel from "@/components/BannerCarousel";
// import ProductSection from "@/components/ProductSection";
// import Footer from "@/components/Footer";

// export default function Home() {
//   return (
//     <div className="min-h-screen  w-full flex flex-col bg-gray-50 font-sans">
//       <main className="flex-1 max-w-7xl ">
//         {/* Banner Carousel */}
//         <div className="w-[85%] mx-auto mt-6">
//           <BannerCarousel />
//         </div>
//         {/* Product Sections */}
//         <ProductSection title="Best Sellers" category="Best Sellers" />
//         <ProductSection title="Deals of the Day" category="Deals of the Day" />
//         {/* Add more sections as needed */}
//       </main>
//       <Footer />
//     </div>
//   );
// }
import BannerCarousel from '@/components/BannerCarousel';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';

export const revalidate = 60; // ISR every 60s

export default async function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 font-sans">
      <main className="flex-1 max-w-7xl ml-8 mt-4">
        {/* Carousel only on client */}
        <BannerCarousel />

        {/* Server‑rendered sections */}
        <ProductSection
          title="Mobiles"
          category="Mobiles"
        />
        <ProductSection
          title="Deals of the Day"
          category="Deals of the Day"
        />
      </main>
      <Footer />
    </div>
  );
}
