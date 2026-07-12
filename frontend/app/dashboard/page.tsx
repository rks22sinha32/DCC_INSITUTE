"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  // Page load hote hi token check karenge, agar nahi hai toh login par bhej denge
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      fetchMyCourses();
    }
  }, [router]);

  // Backend se courses fetch karna (Abhi ke liye saare courses dikha rahe hain, baad mein 'My Courses' filter lagayenge)
  const fetchMyCourses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/courses/');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error("Dashboard courses fetch error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/login');
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-emerald-400 font-bold">Verifying Student...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-900">
      
      {/* ── STUDENT NAVBAR ── */}
      <nav className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-950">
        <div className="text-xl font-black text-emerald-400 tracking-tighter">
          DCC<span className="text-white">Insitute</span> <span className="text-slate-500 font-normal text-sm ml-2">| Student Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-bold border border-emerald-500/30">
            S
          </div>
          <button 
            onClick={handleLogout} 
            className="text-sm font-bold text-red-400 bg-red-400/10 px-4 py-2 rounded hover:bg-red-400 hover:text-slate-900 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ── DASHBOARD CONTENT ── */}
      <div className="p-6 max-w-6xl mx-auto py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-white mb-2">Welcome Back! 🚀</h1>
          <p className="text-slate-400">Yahan aapke saare enrolled courses hain. Padhai shuru karein!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 flex flex-col hover:border-emerald-500/50 transition-all group">
                <div className="text-3xl mb-4 bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center border border-slate-700">📚</div>
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-sm text-slate-400 mb-6 flex-grow line-clamp-2">{course.description}</p>
                
                {/* Ab yeh button unhe unke private 'Learning Area' mein le jayega */}
                <Link href={`/dashboard/learn/${course.id}`} className="w-full text-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-3 rounded-lg font-bold hover:bg-emerald-500 hover:text-slate-900 transition">
                  Continue Learning &rarr;
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16 bg-slate-800/20 border border-dashed border-slate-700 rounded-2xl">
              <p className="text-slate-400 mb-4">Aapne abhi tak koi course kharida nahi hai.</p>
              <Link href="/" className="text-emerald-400 font-bold hover:underline">Explore Courses</Link>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}