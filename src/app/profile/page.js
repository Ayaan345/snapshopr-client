"use client";
import { useState, useEffect } from 'react';
import { fetchItems, deleteItem } from '@/lib/api'; 
import { useSession } from 'next-auth/react'; 
import { useRouter } from 'next/navigation'; 
import ItemGrid from '../../components/ItemGrid';
import Image from 'next/image'; // Import Image component


export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [mine, setMine] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Redirect unauthenticated users to the login page
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    // Fetch items created by the current user when session is available
    if (session?.user?.id) {
      fetchItems().then(res => {
        // Filter items to show only those created by the current user
        setMine(res.data.filter(i => i.createdBy._id === session.user.id));
        // Assuming other items are seller products for demonstration.
        // Adjust this logic if you have a different way to categorize.
        setSellerProducts(res.data.filter(i => i.createdBy._id !== session.user.id));
      }).catch(error => {
        console.error('Error fetching items:', error);
        // Implement user-friendly error display here
      });
    }
  }, [session]);

  const remove = async id => {
    try {
      if (!session?.user?.token) {
        alert('Authentication required');
        return;
      }
      await deleteItem(id, session.user.token);
      setMine(mine.filter(i => i._id !== id)); // Update the state to remove the deleted item
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  // Show loading while session is being determined
  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen text-lg font-amazon-ember">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <section className="min-h-screen bg-gray-100 font-inter">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-none"> {/* Wrapper for Image */}
              <Image // Changed img to Image
                src="/icons/user-icon.svg"
                alt="Profile"
                fill // Added fill prop
                style={{ objectFit: 'contain' }} // Equivalent to object-contain
                sizes="96px" // Specific size for this image
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 font-amazon-ember">
                {session?.user?.name || "Your Profile"}
              </h1>
              <p className="text-gray-600 text-lg">Your Public Profile</p>
            </div>
          </div>
        </div>

        {/* Your Products Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="font-bold text-2xl mb-4 text-gray-800 font-amazon-ember">Your Products</h2>
          <span className="text-sm font-light mb-4 block text-gray-600 font-amazon-ember">
            Check each product page for other buying options.
          </span>
          {mine.length > 0 ? (
            <ItemGrid items={mine} onRemove={remove} showRemoveButton={true} />
          ) : (
            <p className="text-gray-500">{"You haven't listed any products yet."}</p>
          )}
        </div>
        
      </div>
    </section>
  );
}