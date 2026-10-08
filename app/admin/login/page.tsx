'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success) {
        // সফলভাবে লগইন হলে অ্যাডমিন প্যানেলে রিডাইরেক্ট হবে
        router.push('/admin');
      } else {
        setError(data.message || 'ভুল ইউজারনেম বা পাসওয়ার্ড!');
      }
    } catch (err) {
      setError('সার্ভার এরर! আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex items-center justify-center p-4 font-sans text-gray-900">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full border border-pink-200">
        <div className="text-center mb-8">
          <span className="bg-pink-100 text-pink-700 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-pink-200 mb-3 inline-block">
            🔒 Secure Portal
          </span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Duo Corner Admin</h1>
          <p className="text-xs text-gray-500 mt-1">Sign in to manage store and orders</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Username (ইউজারনেম)</label>
            <input 
              type="text" 
              required 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Enter username" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-xs font-bold bg-white focus:ring-2 focus:ring-pink-500 focus:outline-none" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Password (পাসওয়ার্ড)</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-xs font-bold bg-white focus:ring-2 focus:ring-pink-500 focus:outline-none" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-3.5 rounded-2xl transition shadow-lg text-sm cursor-pointer transform active:scale-95 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Logging in...' : '🚀 Sign In (লগইন করুন)'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-xs font-semibold text-pink-600 hover:underline">
            ← Back to Store (হোম পেজে যান)
          </a>
        </div>
      </div>
    </main>
  );
}