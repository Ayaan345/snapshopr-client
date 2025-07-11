"use client";
import { useState } from 'react';
import axios from 'axios';

export default function AccountForm({ info, setInfo, token }) {
  const [form, setForm] = useState(info);

  const handle = async e => {
    e.preventDefault();
    await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, form, {
      headers:{ Authorization:`Bearer ${token}` }
    });
  };

  return (
    <form onSubmit={handle}>
      <input placeholder="Username"   value={form.username}    onChange={e=>setForm({...form, username:e.target.value})} />
      <input placeholder="Location"  value={form.location}    onChange={e=>setForm({...form, location:e.target.value})} />
      <input placeholder="Postal Code"  value={form.postalCode}  onChange={e=>setForm({...form, postalCode:e.target.value})} />
      <button type="submit">Save</button>
    </form>
  );
}
