// This is NOT a complete file to copy-paste, but rather an illustration of the concepts.
// You would need to set up Tailwind CSS in your Next.js project first.

"use client";
import ItemForm from '@/components/ItemForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createItem } from '@/lib/api';

export default function SellPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    // Modern loading state with a simple spinner or skeleton
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // The useEffect will handle the redirect
  }

  const handleCreate = async data => {
    try {
      console.log('Full session data:', JSON.stringify(session, null, 2));
      console.log('Session user:', session?.user);
      console.log('Session user token:', session?.user?.token);

      if (!session?.user) {
        alert('You must be logged in to create an item.'); // Consider a more user-friendly modal/toast
        return;
      }

      const token = session.user.token || 'oauth-user';
      console.log('Using token:', token);

      await createItem(data, token);
      router.push('/profile');
    } catch (error) {
      console.error('Error creating item:', error);
      console.error('Error details:', error.response?.data);
      alert('Failed to create item. Please try again.'); // Consider a more user-friendly modal/toast
    }
  };

  return (
    // Main container for the page
    <section className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* Content wrapper with max-width and centering for larger screens */}
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          List a New Product
        </h1>
        {/* ItemForm component will also need styling applied internally */}
        <ItemForm onCreate={handleCreate} />
      </div>
    </section>
  );
}