'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  useEffect(() => {
    if (localStorage.getItem('br02_token')) {
      router.replace('/admin/dashboard');
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('br02_token', data.token);
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-white/10 w-full max-w-md space-y-4">
        <h1 className="font-display text-3xl text-white text-center">Admin Login</h1>
        <label className="space-y-2 block text-sm text-muted">
          Admin ID
          <input className="w-full p-3 rounded-xl bg-white/5 border border-white/10" value={adminId} onChange={(e) => setAdminId(e.target.value)} required />
        </label>
        <label className="space-y-2 block text-sm text-muted">
          Password
          <input type="password" className="w-full p-3 rounded-xl bg-white/5 border border-white/10" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button type="submit" className="button-primary w-full">Login</button>
      </form>
    </div>
  );
}
