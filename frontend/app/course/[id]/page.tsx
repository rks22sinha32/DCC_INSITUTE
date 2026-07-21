"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Chapter {
  id: number;
  title: string;
  content: string;
}

interface Review {
  id: number;
  student_name: string;
  rating: number;
  comment: string;
}

interface CourseDetail {
  id: number;
  title: string;
  description: string;
  price: string;
  chapters: Chapter[];
  reviews: Review[];
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [reviewData, setReviewData] = useState({ student_name: "", rating: 5, comment: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/courses/${params.id}/`, {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
        if (res.ok) setCourse(await res.json());
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("https://127.0.0.1:8000/api/reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify({ ...reviewData, course: params.id }),
    });
    if (res.ok) {
      alert("Review submitted!");
      setReviewData({ student_name: "", rating: 5, comment: "" });
      window.location.reload();
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-emerald-400 font-bold">Loading Course...</div>;
  if (!course) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-red-400">Course not found.</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header & Enroll */}
        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">{course.title}</h1>
          <p className="text-slate-400 text-lg mb-6">{course.description}</p>
          <div className="flex items-center gap-6">
            <div className="text-3xl font-black">₹{course.price}</div>
            <Link href={`/enquiry?course_id=${course.id}`}>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold transition">Enroll Now</button>
            </Link>
          </div>
        </div>

        {/* Syllabus */}
        <h2 className="text-2xl font-bold mb-6">Course Syllabus</h2>
        <div className="space-y-4 mb-12">
          {course.chapters.map((ch, i) => (
            <div key={ch.id} onClick={() => setExpandedChapter(expandedChapter === ch.id ? null : ch.id)}
              className="bg-slate-800/30 p-6 rounded-xl border border-slate-700 cursor-pointer hover:border-blue-500/50">
              <div className="flex justify-between font-bold">{ch.title} <span>{expandedChapter === ch.id ? '−' : '+'}</span></div>
              
              {/* 👇 YAHAN CHANGE KIYA HAI: Split aur Map wala code add ho gaya */}
              {expandedChapter === ch.id && (
                <div className="mt-4 text-slate-300 text-sm flex flex-col gap-2">
                  {ch.content.split('-').map((item, index) => {
                    if (item.trim() !== "") {
                      return <div key={index}>👉 {item.trim()}</div>;
                    }
                    return null;
                  })}
                </div>
              )}
              {/* 👆 CHANGE KHATAM */}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}