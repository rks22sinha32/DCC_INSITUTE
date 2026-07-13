"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Chapter {
  id: number;
  title: string;
  content: string;
}

interface CourseDetail {
  id: number;
  title: string;
  description: string;
  price: string;
  chapters: Chapter[];
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // 👇 YAHAN MAGIC HAI: Kaunsa chapter khula hai usko track karne ke liye state
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://15.164.163.3:8000/api/courses//${params.id}/`);
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        }
      } catch (error) {
        console.error("Course fetch fail ho gaya", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [params.id]);

  // Click karne par chapter ko open/close karne ka function
  const toggleChapter = (id: number) => {
    if (expandedChapter === id) {
      setExpandedChapter(null); // Agar pehle se khula hai, toh band kar do
    } else {
      setExpandedChapter(id); // Varna isko khol do
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center font-bold text-xl text-emerald-400">
        Loading Course Syllabus...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center font-bold text-xl text-red-400">
        Oops! Course not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-900">

      {/* ── SIMPLE NAVBAR ── */}
      <nav className="p-6 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-50 backdrop-blur-sm flex justify-between items-center">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-blue-400 font-semibold flex items-center gap-2 transition">
          <span>&larr;</span> Back
        </button>
        <div className="text-xl font-black text-emerald-400 tracking-tighter hidden md:block">
          <span className="text-blue-500">D</span>
          <span className="text-red-500">CC</span> <span className="text-white">Institute</span>
        </div>
        <Link href="/login" className="text-sm font-bold text-blue-250 bg-emerald-500/10 px-4 py-2 rounded hover:bg-blue-500 hover:text-slate-900 transition">
          Student Login
        </Link>
      </nav>

      <div className="p-6 max-w-4xl mx-auto py-12">

        {/* ── COURSE HEADER ── */}
        <div className="bg-slate-800/50 p-8 md:p-10 rounded-3xl border border-slate-700 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 bg-blue-500 h-full"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 text-blue-400 font-bold tracking-widest text-xs mb-4 uppercase">
                Premium Course
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{course.title}</h1>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">{course.description}</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 w-full md:w-auto text-center shrink-0">
              <div className="text-sm text-slate-400 font-bold mb-1">Course Fee</div>
              <div className="text-3xl font-black text-white-400 mb-4">₹{course.price}</div>
              <Link href="/enquiry" className="block w-full bg-blue-500 hover:bg-blue-400 text-white text-center px-6 py-3 rounded-lg font-bold transition shadow-lg shadow-blue-500/20">
                Enroll Now
              </Link>
            </div>
          </div>
        </div>

        {/* ── COURSE SYLLABUS (ACCORDION STYLE) ── */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-2">Course Syllabus</h2>
          <p className="text-slate-400 mb-8">Click on any module to view details</p>

          <div className="space-y-4">
            {course.chapters && course.chapters.length > 0 ? (
              course.chapters.map((chapter, index) => {
                const isExpanded = expandedChapter === chapter.id; // Check agar yeh module khula hai

                return (
                  /* border ka coloure hai */
                  <div
                    key={chapter.id}
                    onClick={() => toggleChapter(chapter.id)}
                    className="bg-slate-800/30 p-6 rounded-xl border border-slate-700 flex flex-col group hover:border-blue-500/50 hover:bg-slate-800/50 transition-all cursor-pointer select-none"
                  >
                    {/* Chapter Title Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 md:gap-5">
                        <div className={`w-12 h-12 rounded-lg border flex items-center justify-center font-bold text-lg transition-colors shrink-0 ${isExpanded ? 'bg-blue-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30'}`}>
                          {index + 1}
                        </div>
                        <span className={`text-lg font-semibold transition-colors ${isExpanded ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                          {chapter.title}
                        </span>
                      </div>

                      {/* Plus/Minus Icon */}
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 text-sm font-medium hidden md:block">📍 Offline Class</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold transition-colors ${isExpanded ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 group-hover:text-emerald-400'}`}>
                          {isExpanded ? '−' : '+'}
                        </div>
                      </div>
                    </div>

                    {/* Chapter Content (Sirf tab dikhega jab isExpanded true hoga) */}
                    {/* 'whitespace-pre-wrap' aapki line-by-line formatting ko waise hi dikhayega jaise admin mein dali thi */}
                    {isExpanded && chapter.content && (
                      <div className="mt-6 ml-16 md:ml-17 pl-4 border-l-2 border-emerald-500/30 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap animate-in fade-in slide-in-from-top-2 duration-300">
                        {chapter.content}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="bg-slate-800/30 p-10 rounded-xl border border-dashed border-slate-700 text-center">
                <p className="text-slate-400">Syllabus will be updated shortly.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}