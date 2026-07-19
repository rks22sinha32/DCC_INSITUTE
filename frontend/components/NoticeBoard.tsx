"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
}

export default function NoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const scrollRef = useRef<HTMLUListElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/notices/')
      .then(res => res.json())
      .then(data => setNotices(data))
      .catch(err => console.error(err));
  }, []);

  // 👇 FIXED: Ultra-Smooth Logic (Decimals ka use kiya hai)
  useEffect(() => {
    if (notices.length === 0) return;

    const scrollContainer = scrollRef.current;
    let animationFrameId: number;
    let scrollPos = 0; // Exact position track karne ke liye

    const smoothScroll = () => {
      if (!isHovered && scrollContainer) {
        scrollPos += 0.5; // 👇 Speed control (1 ki jagah 0.5px, ekdum smooth floating ke liye)
        scrollContainer.scrollTop = scrollPos;

        // Reset if we reach the bottom
        if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
          scrollPos = 0;
          scrollContainer.scrollTop = 0;
        }
      }
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, notices]);

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#111827] border border-slate-800 flex items-center justify-center text-blue-500 text-xl">
          🔔
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Notice Board</h2>
          <p className="text-blue-500 font-semibold text-xs tracking-wider uppercase">Latest Announcements</p>
        </div>
      </div>

      <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 pb-4 border-b border-slate-800">
          <span>Notice Title & Details</span>
          <span>Date</span>
        </div>

        {/* 👇 YAHAN SE 'scrollBehavior: smooth' HATA DIYA HAI */}
        <ul 
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
          className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
        >
          {notices.map((notice, index) => (
            <li key={notice.id} className="flex flex-col py-3 border-b border-slate-800/50">
              <div className="flex justify-between items-start mb-1">
                <span className={`font-semibold text-sm ${index === 0 ? 'text-orange-500' : 'text-slate-300'}`}>
                  {notice.title}
                </span>
                <span className="text-slate-500 text-xs ml-4 whitespace-nowrap">{notice.date || "Just now"}</span>
              </div>
              {notice.content && (
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                  {notice.content}
                </p>
              )}
            </li>
          ))}
        </ul>

        <button className="w-full mt-6 text-sm font-bold text-blue-500 hover:text-blue-400 transition">
          VIEW ALL NOTICES &rarr;
        </button>
      </div>
    </div>
  );
}