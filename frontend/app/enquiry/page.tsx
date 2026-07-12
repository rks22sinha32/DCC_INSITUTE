"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EnquiryForm() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form submit handle karne ka logic (Abhi ke liye sirf UI Success dikhayega)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Yahan hum baad mein Django backend API ko data bhejenge
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-900 flex flex-col">
      
      {/* ── SIMPLE NAVBAR ── */}
      <nav className="p-6 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <button onClick={() => router.back()} className="text-slate-400 hover:text-emerald-400 font-semibold flex items-center gap-2 transition">
            <span>&larr;</span> Back
          </button>
            <span className="text-2xl font-black tracking-tight text-white flex">
              <span className="text-blue-500">D</span><span className="text-red-500">CC</span><span className="ml-2">INSTITUTE</span>
            </span>
        </div>
      </nav>

      {/* ── FORM CONTAINER ── */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-slate-800/50 p-8 md:p-10 rounded-2xl border border-slate-700 w-full max-w-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
          
          {isSubmitted ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-white mb-2">Request Submitted!</h2>
              <p className="text-slate-400">Thank you for your interest. Our team will contact you shortly.</p>
              <p className="text-emerald-400 text-sm mt-6 font-semibold animate-pulse">Redirecting to homepage...</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-white mb-2">Enrollment Enquiry</h1>
                <p className="text-slate-400 text-sm">Fill your details and our team will get back to you with batch timings and fee structure.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1">Which course are you interested in?</label>
                  <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition">
                    <option value="">Select a course...</option>
                    <option value="python">Python Full Stack</option>
                    <option value="java">Java Backend</option>
                    <option value="data">Data Analytics</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-blue-500 text-slate-900 font-bold py-3.5 rounded-lg hover:bg-blue-400 transition shadow-lg shadow-emerald-500/20 mt-4">
                  Submit Enquiry
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}