"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function WriteReviewPage() {
  // Star rating ke liye state
  const [rating, setRating] = useState(5);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans selection:bg-blue-500 selection:text-slate-900">
      
      {/* ── NAVBAR ── */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-800 bg-[#0B1120]/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img src="/dcc logo.png" alt="DCC Institute" className="w-12 h-12 bg-white rounded-full p-0.5" />
          <div className="flex flex-col">
            <Link href="/" className="text-2xl font-black tracking-tight text-white flex">
              <span className="text-blue-500">D</span><span className="text-red-500">CC</span><span className="ml-2">INSTITUTE</span>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/courses" className="hover:text-blue-400 transition">Courses</Link>
        </div>
      </nav>

      {/* ── WRITE REVIEW FORM SECTION ── */}
      <section className="py-20 px-8 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Share Your Experience</h1>
          <p className="text-slate-400">Your feedback helps us improve and helps other students make the right choice.</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <form className="space-y-6">
            
            {/* Rating Stars */}
            <div className="flex flex-col items-center mb-8 border-b border-slate-800 pb-8">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Rate Your Experience</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-4xl transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-500' : 'text-slate-700'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="text-blue-400 text-xs font-bold uppercase mt-4">
                {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good!' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input type="text" placeholder="E.g. Rahul Kumar" className="w-full bg-[#0B1120] border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Role / Company</label>
                <input type="text" placeholder="E.g. Student / Developer at TCS" className="w-full bg-[#0B1120] border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Review</label>
              <textarea rows={5} placeholder="Tell us about your learning journey, trainers, and placement support..." className="w-full bg-[#0B1120] border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition resize-none" required></textarea>
            </div>

            <button type="button" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 rounded-lg transition-all flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
              Submit Review <span>✨</span>
            </button>

          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#050810] py-10 px-8 border-t border-slate-800/50 text-center text-slate-500 text-xs mt-auto">
         <p>© 2026 DCC Institute. All rights reserved.</p>
      </footer>
      
    </div>
  );
}