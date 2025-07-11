// "use client";
// import { useState } from 'react';
// import axios from 'axios';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// export default function SignupForm() {
//   const [form, setForm] = useState({ name:'', email:'', password:'' });
//   const router = useRouter();

// const handle = async e => {
//   e.preventDefault();
//   try {
//     await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, form);
//     await signIn('credentials', { email: form.email, password: form.password, redirect: false });
//     router.push('/');
//   } catch (err) {
//     alert(err.response?.data?.error || "Registration failed");
//   }
// };

//   return (
//     <form onSubmit={handle}>
//       <input placeholder="Name"    value={form.name}    onChange={e=>setForm({...form, name:e.target.value})} required />
//       <input placeholder="Email"   value={form.email}   onChange={e=>setForm({...form, email:e.target.value})} required />
//       <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// }

'use client';

import { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handle = async e => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, form);
      await signIn('credentials', { email: form.email, password: form.password, redirect: false });
      router.push('/');
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <form onSubmit={handle} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
        className="px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
        className="px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
        className="px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
      >
        Sign Up
      </button>
    </form>
  );
}
