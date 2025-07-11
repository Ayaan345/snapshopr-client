"use client";
import { useState, useEffect } from 'react';
import AccountForm from '@/components/AccountForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [info, setInfo] = useState({ username:'', location:'', postalCode:'' });
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.token) {
      // fetch profile details from backend /users/profile
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        headers:{ Authorization:`Bearer ${session.user.token}` }
      }).then(res => setInfo(res.data))
        .catch(error => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <section>
      <h1>Account Info</h1>
      <AccountForm info={info} setInfo={setInfo} token={session?.user.token} />
    </section>
  );
}
