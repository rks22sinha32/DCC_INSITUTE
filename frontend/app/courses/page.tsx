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

export default function AllCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Saare courses fetch karna (bina kisi limit ke)
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await fetch('http://15.164.163.3:8000/api/courses/');
        if (response.ok) {
          const data = await response.json();
          setCourses(data); // Pura data set kar diya, no slice!
        }
      } catch (error) {
        console.error("Courses fetch fail ho gaya", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-900 flex flex-col">
      
      {/* ── NAVBAR ── */}
      <nav className="p-6 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-50 backdrop-blur-sm flex justify-between items-center">
        <button onClick={() => router.push('/')} className="text-slate-400 hover:text-blue-400 font-semibold flex items-center gap-2 transition">
          <span>&larr;</span> Home
        </button>
        <div className="text-xl font-black text-blue-400 tracking-tighter">
          <span className="text-blue-500">D</span>
            <span className="text-red-500">CC</span> <span className="text-white">Institute</span>
        </div>
      </nav>

      <div className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        
        <div className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Explore All Courses</h1>
          <p className="text-slate-400 text-lg">Browse our complete catalog of industry-ready offline classes. Choose your path to success!</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-blue-400 font-bold text-xl animate-pulse">
            Loading our extensive course catalog...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {courses.length > 0 ? (
              courses.map(course => (
                <div key={course.id} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 flex flex-col hover:-translate-y-1 hover:border-blue-500 transition-all duration-300 group shadow-lg">
                  <div className="text-4xl mb-6 bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-700 group-hover:border-blue-500/50 transition-colors">💻</div>
                  <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
                  <p className="text-sm text-slate-400 mb-8 line-clamp-3 leading-relaxed flex-grow">{course.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto pt-6 border-t border-slate-700/50">
                    <span className="text-xl font-black text-white">₹{course.price}</span>
                    <Link href={`/course/${course.id}`} className="text-sm font-bold text-blue-400 bg-blue-500/10 px-5 py-2.5 rounded-lg hover:bg-blue-500 hover:text-slate-900 transition">
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-16 bg-slate-800/20 border border-dashed border-slate-700 rounded-2xl">
                <p className="text-slate-400">No courses available right now. Please check back later!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}