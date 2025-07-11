// import BannerCarousel from '@/components/BannerCarousel';
// import ProductSection from '@/components/ProductSection';
// import Footer from '@/components/Footer';

// export const revalidate = 60; 

// export default async function Home() {
//   return (
//     <div className="min-h-screen w-full flex flex-col bg-gray-50 font-sans">
//       <main className="flex-1 max-w-7xl ml-8 mt-4">
//         {/* carousel*/}
//         <BannerCarousel />

//         {/* server render*/}
//         <ProductSection
//           title="Mobiles"
//           category="Mobiles"
//         />
//         <ProductSection
//           title="Deals of the Day"
//           category="Deals of the Day"
//         />
//       </main>
//       <Footer />
//     </div>
//   );
// }


// page.js
import BannerCarousel from '@/components/BannerCarousel';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';

export const revalidate = 60; 

export default async function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 font-sans">
      <main className="flex-1 max-w-full  px-4 mt-4"> {/* Changed max-w-7xl ml-8 to max-w-full mx-auto px-4 */}
        {/* carousel*/}
        <BannerCarousel />

        {/* server render*/}
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
