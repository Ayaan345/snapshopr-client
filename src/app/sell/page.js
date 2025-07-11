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
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const handleCreate = async data => {
    try {
      console.log('Full session data:', JSON.stringify(session, null, 2));
      console.log('Session user:', session?.user);
      console.log('Session user token:', session?.user?.token);
      
      if (!session?.user) {
        alert('You must be logged in to create an item.');
        return;
      }
      
      // Use the backend token if available, otherwise use a placeholder for OAuth
      const token = session.user.token || 'oauth-user';
      console.log('Using token:', token);
      
      await createItem(data, token);
      router.push('/profile');
    } catch (error) {
      console.error('Error creating item:', error);
      console.error('Error details:', error.response?.data);
      alert('Failed to create item. Please try again.');
    }
  };

  return (
    <section>
      <h1>List a New Product</h1>
      <ItemForm onCreate={handleCreate} />
    </section>
  );
}

