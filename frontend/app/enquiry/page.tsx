"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

interface Course {
  id: number;
  title: string;
}

function EnquiryFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseIdFromUrl = searchParams.get('course_id');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  
  const [formData, setFormData] = useState({
    student_name: "",
    phone: "",
    email: "", // Email added
    course_id: courseIdFromUrl || "", 
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/courses/");
        if (res.ok) {
          const data = await res.json();
          setAvailableCourses(data);
        }
      } catch (error) {
        console.error("Courses load nahi hue", error);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/enroll/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_name: formData.student_name,
          phone: formData.phone,
          email: formData.email, // Passing email to backend
          course: formData.course_id,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => { router.push('/'); }, 3000);
      } else {
        alert("Enrollment failed!");
      }
    } catch (error) {
      alert("Network error!");
    }
  };

  return (
    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 w-full max-w-xl shadow-2xl relative">
      {isSubmitted ? (
        <div className="text-center py-10">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-white">Request Submitted!</h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-1">Full Name</label>
            <input name="student_name" required onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white" placeholder="Enter your name" />
          </div>
          
          {/* Email Input Field */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-1">Email Address</label>
            <input type="email" name="email" required onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white" placeholder="Enter your email" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-300 mb-1">Phone Number</label>
            <input name="phone" required onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white" placeholder="+91 XXXXX XXXXX" />
          </div>

          {!courseIdFromUrl && (
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Select Course</label>
              <select name="course_id" required onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white">
                <option value="">Select a course...</option>
                {availableCourses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
          )}

          <button type="submit" className="w-full bg-blue-500 text-slate-900 font-bold py-3.5 rounded-lg hover:bg-blue-400">Submit Enquiry</button>
        </form>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      <nav className="p-6 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <span className="text-2xl font-black text-white"><span className="text-blue-500">D</span><span className="text-red-500">CC</span> INSTITUTE</span>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center p-6">
        <Suspense fallback={<div className="text-white">Loading form...</div>}>
          <EnquiryFormContent />
        </Suspense>
      </div>
    </div>
  );
}