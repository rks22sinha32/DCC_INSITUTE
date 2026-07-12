"use client"; // Next.js mein 'useState' use karne ke liye ye top par likhna zaruri hai

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // <-- Nayi line

export default function LoginPage() {
    const router = useRouter(); // <-- Nayi line
  // 1. User jo type karega, use yahan save karenge
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 2. Button click hone par ye function chalega
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Page ko reload hone se rokta hai
    setError(''); // Purane errors hata deta hai

    try {
      // Django API ko data bhej rahe hain
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

     if (response.ok) {
        // 1. Token ko browser mein save kar rahe hain
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        
        alert('Login Successful! 🎉 VIP Pass saved.');
        
        // 2. User ko Dashboard par bhej rahe hain
        router.push('/dashboard'); 
      } else {
        setError('Galat Username ya Password!');
      }
    } catch (err) {
      setError('Backend server band hai ya connect nahi ho raha.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
          <p className="text-slate-500 mt-2 text-sm">Please enter your details to sign in.</p>
        </div>

        {/* Agar koi error aaye toh yahan red color mein dikhega */}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm text-center">{error}</div>}

        {/* Form ko humare function se connect kar diya */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Type karte hi state update hogi
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="Enter your username" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Type karte hi state update hogi
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="••••••••" 
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}