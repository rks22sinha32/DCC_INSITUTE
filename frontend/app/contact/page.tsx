"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'; 

interface Course {
  id: number;
  title: string;
  price: string;
}

export default function ContactPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    student_name: "",
    email: "",
    phone: "",
    course_id: "", 
  });

  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCoursesForDropdown = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/courses/"); 
        if (res.ok) {
          const data = await res.json();
          setAvailableCourses(data);
        }
      } catch (error) {
        console.error("Courses load nahi ho paye dropdown ke liye.", error);
      }
    };
    fetchCoursesForDropdown();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/enroll/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_name: formData.student_name,
          email: formData.email,
          phone: formData.phone,
          course: formData.course_id 
        }),
      });

      if (response.ok) {
        setSuccessMessage("🎉 Congratulations! Your enrollment is successful. We will contact you soon.");
        setFormData({ student_name: "", email: "", phone: "", course_id: "" }); 
      } else {
        const errorData = await response.json();
        setErrorMessage("Oops! Something went wrong. " + JSON.stringify(errorData));
      }
    } catch (error) {
      setErrorMessage("Network error! Please check if backend is running.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans p-6 md:p-12">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-8">
         <button onClick={() => router.push('/')} className="text-slate-400 hover:text-blue-400 font-semibold flex items-center gap-2 transition w-max">
           <span>&larr;</span> Back to Home
         </button>
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center md:text-left mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Get in Touch</h1>
        <p className="text-slate-400 text-lg">Have questions or ready to enroll? Reach out to us or drop a message below!</p>
      </div>

      {/* CSS GRID (2 Columns on Desktop) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* ── LEFT SIDE: Contact Info & Map ── */}
        <div className="space-y-8">
          
          {/* Contact Details Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="text-lg font-bold text-white mb-2">Visit Us</h3>
              <p className="text-slate-400 text-sm leading-relaxed">4th Floor, Digital Computer Centre,<br/>Patna, Bihar</p>
            </div>
            
            <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="text-lg font-bold text-white mb-2">Contact Info</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                <a href="tel:+917909027305" className="hover:text-blue-400">+91 79090 27305</a><br/>
                <a href="mailto:info@dccinstitute.in" className="hover:text-blue-400">info@dccinstitute.in</a>
              </p>
            </div>
          </div>

         {/* Google Map Embed */}
          <div className="bg-[#111827] border border-slate-800 p-2 rounded-2xl overflow-hidden shadow-lg h-[300px] relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.195384600659!2d85.12757797539501!3d25.59842297745479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5917e639d9c3%3A0xaeb4d0cce52efd79!2sDIGITAL%20COMPUTER%20CENTRE%20(DCC)!5e0!3m2!1sen!2sin!4v1784468933607!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '12px' }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>

        {/* ── RIGHT SIDE: Enrollment Form ── */}
        <div className="bg-[#111827] border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl w-full">
          <h2 className="text-2xl font-bold text-white mb-6">Enroll Now</h2>
          
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-center font-semibold">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-center font-semibold">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Full Name</label>
              <input 
                type="text" 
                name="student_name"
                required
                value={formData.student_name}
                onChange={handleChange}
                className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="e.g., Adarsh Kumar"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="e.g., adarsh@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="e.g., +91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Select Course</label>
              <select 
                name="course_id"
                required
                value={formData.course_id}
                onChange={handleChange}
                className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition appearance-none cursor-pointer"
              >
                <option value="" disabled>-- Choose a Course --</option>
                {availableCourses.map((course) => (
                  <option key={course.id} value={course.id} className="bg-[#0B1120]">
                    {course.title} (₹{course.price})
                  </option>
                ))}
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all shadow-lg ${isSubmitting ? 'bg-slate-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/30'}`}
            >
              {isSubmitting ? 'Processing...' : 'Submit Enrollment Request'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}