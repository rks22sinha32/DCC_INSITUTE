"use client";
import React, { useState, useEffect, useRef } from 'react';

interface Batch {
  id: number;
  title: string;
  time_schedule: string;
  status: string;
}

export default function BatchList() {
  const [batches, setBatches] = useState<Batch[]>([]);
  
  // 👇 NAYA: Scroll tracking ke liye
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Data Fetching
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/batches/')
      .then(res => res.json())
      .then(data => setBatches(data))
      .catch(err => console.error(err));
  }, []);

  // 👇 NAYA: 60FPS Ultra-Smooth Auto-scroll Logic
  useEffect(() => {
    if (batches.length === 0) return;

    const scrollContainer = scrollRef.current;
    let animationFrameId: number;
    let scrollPos = 0;

    const smoothScroll = () => {
      if (!isHovered && scrollContainer) {
        scrollPos += 0.5; // Smooth floating speed
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
  }, [isHovered, batches]);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Current Batches</h2>
        <p className="text-blue-500 font-semibold text-sm tracking-wider uppercase">Ongoing & Upcoming</p>
      </div>

      {/* 👇 NAYA: Yahan ref, hover events, aur max-height lagaya hai */}
      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
      >
        {batches.map((batch) => (
          <div key={batch.id} className="bg-[#0B1120] border border-slate-800 rounded-xl p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-blue-500/50 transition cursor-pointer">
            <div>
              <h4 className="text-lg font-bold text-white mb-1">{batch.title}</h4>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span> {batch.time_schedule}
              </div>
            </div>
            
            <span className={`px-3 py-1 rounded-full border text-xs font-bold text-center w-max ${
              batch.status.toLowerCase() === 'running' 
                ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' 
                : 'border-orange-500/30 text-orange-400 bg-orange-500/10'
            }`}>
              {batch.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}