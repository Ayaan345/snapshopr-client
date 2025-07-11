'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image component

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (res.error) {
        throw new Error(res.error);
      }

      const session = await getSession();
      if (session?.user) {
        localStorage.setItem('currentUser', JSON.stringify(session.user));
      }

      router.push('/');
    } catch (err) {
      alert(err.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handle} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          className="px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
          className="px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Log In
        </button>
      </form>

      <div className="flex items-center justify-center gap-2 text-gray-400">
        <span>or</span>
      </div>

      <button
        type="button"
        onClick={() => signIn('google')}
        className="flex items-center justify-center gap-3 rounded py-2 hover:bg-gray-100 transition"
      >
        <div className="relative w-5 h-5"> {/* Wrapper for Image */}
          <Image src="/icons/google.svg" alt="Google" fill style={{ objectFit: 'contain' }} sizes="20px" /> {/* Changed img to Image */}
        </div>
        Sign in with Google
      </button>

      <button
        type="button"
        onClick={() => signIn('github')}
        className="flex items-center justify-center gap-3 rounded py-2 hover:bg-gray-100 transition"
      >
        <div className="relative w-5 h-5"> {/* Wrapper for Image */}
          <Image src="/icons/github.svg" alt="GitHub" fill style={{ objectFit: 'contain' }} sizes="20px" /> {/* Changed img to Image */}
        </div>
        Sign in with GitHub
      </button>

      <p className="text-center text-gray-500 text-sm mt-2">
        {"Don't have an account?"}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}