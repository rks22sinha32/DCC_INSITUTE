"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

// TypeScript ko batate hain ki ab Course ke paas ek naya VIP switch (is_featured) bhi hai
interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  is_featured: boolean; // 👇 Yeh nayi field add ki
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/courses/');
        if (response.ok) {
          const data = await response.json();

          // 👇 YAHAN MAGIC HAI: Sirf un courses ko filter karo jo "Featured" hain
          const featuredCourses = data.filter((course: Course) => course.is_featured === true);

          // Unme se top 3 dikha do taaki design clean rahe
          setCourses(featuredCourses.slice(0, 3));
        }
      } catch (error) {
        console.error("Course fetch fail ho gaya", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans selection:bg-blue-500 selection:text-slate-900">

      {/* ── PREMIUM NAVBAR ── */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-800 bg-[#0B1120]/90 sticky top-0 z-50 backdrop-blur-md">

        {/* Logo & Brand Details */}
        <div className="flex items-center gap-3">
          <img src="/dcc logo.png" alt="DCC Institute" className="w-12 h-12 bg-white rounded-full p-0.5" />
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-white flex">
              <span className="text-blue-500">D</span><span className="text-red-500">CC</span><span className="ml-2">INSTITUTE</span>
            </span>
            <span className="text-[10px] text-slate-400 tracking-widest uppercase">Digital Computer Center | Patna</span>
          </div>
        </div>

        {/* Navigation Links - Contact ko /contact par bhej diya */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link href="#" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/about" className="hover:text-blue-400 transition">About</Link>
          <Link href="/courses" className="hover:text-blue-400 transition">Courses</Link>
          <Link href="#batches" className="hover:text-blue-400 transition">Batches</Link>
          <Link href="#events" className="hover:text-blue-400 transition">Events</Link>
          <Link href="/services" className="hover:text-blue-400 transition">Services</Link>
          <Link href="#reviews" className="hover:text-blue-400 transition">Reviews</Link>
          <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
        </div>

        {/* Enroll Now Button - Glowing Effect ke sath, ab /contact page par jayega */}
        <Link href="/contact" className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)]">
          Enroll Now
        </Link>
      </nav>

      {/* ── STEP 2: HERO SECTION ── */}
      <header className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-8 py-24 max-w-7xl mx-auto">

        {/* Left Column - Big Text & Buttons */}
        <div className="space-y-8 relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase bg-blue-500/10 backdrop-blur-sm">
            #1 TECH INSITUTE IN PATNA
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight text-white">
            Master Tech.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Shape Your<br />Future.
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
            Premium computer training with expert mentorship and 100% placement support in the heart of Bihar.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="#courses" className="bg-orange-500 hover:bg-orange-400 text-slate-900 px-8 py-3 rounded-lg font-bold transition flex items-center gap-2">
              Explore Courses <span>&rarr;</span>
            </Link>
            <Link href="/contact" className="bg-transparent border border-slate-700 hover:border-slate-500 text-white px-8 py-3 rounded-lg font-bold transition">
              Free Consultation
            </Link>
          </div>
        </div>

        {/* Right Column - Cool Code Editor Graphic */}
        <div className="relative group perspective-1000">
          {/* Background glowing blur */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          {/* Code Window */}
          <div className="relative bg-[#0F172A] border border-slate-700 rounded-2xl p-6 shadow-2xl transform transition-transform group-hover:scale-[1.02] duration-500">
            {/* Window controls (Red, Yellow, Green dots) */}
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-auto text-xs text-slate-500 font-mono">digital-computer-center</div>
            </div>

            {/* Fake Code Text */}
            <pre className="font-mono text-sm leading-loose">
              <span className="text-purple-400">const</span> <span className="text-blue-400">dccTraining</span> = <span className="text-yellow-300">()</span> <span className="text-purple-400">=&gt;</span> {'{'}
              <br />
              {'  '}learn(<span className="text-green-400">'Full Stack Dev'</span>);
              <br />
              {'  '}build(<span className="text-green-400">'Real Industry Projects'</span>);
              <br />
              {'  '}landJob(<span className="text-green-400">'Dream Tech Company'</span>);
              <br />
              {'}'};
            </pre>
          </div>
        </div>

      </header>

      {/* ── STEP 4.5: DYNAMIC FEATURED COURSES ── */}
      <section id="courses" className="py-24 px-8 max-w-7xl mx-auto border-t border-slate-800/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-2">Popular Courses</h2>
          <p className="text-blue-500 font-semibold text-sm tracking-wider uppercase">Master The Latest Technologies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            courses.map(course => (
              <div key={course.id} className="bg-[#111827] border border-slate-800 rounded-2xl p-8 hover:-translate-y-2 hover:border-blue-500/50 transition-all duration-300 group shadow-lg relative overflow-hidden flex flex-col">

                {/* VIP Tag */}
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">FEATURED</div>

                {/* Icon */}
                <div className="text-3xl mb-6 bg-slate-800/80 w-14 h-14 rounded-xl flex items-center justify-center border border-slate-700 text-blue-400 group-hover:scale-110 transition-transform mt-2">
                  💻
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
                <p className="text-sm text-slate-400 mb-8 line-clamp-3 leading-relaxed flex-grow">{course.description}</p>

                {/* Footer with Price and Button */}
                <div className="flex justify-between items-center mt-auto pt-6 border-t border-slate-800">
                  <span className="text-xl font-black text-blue-400">₹{course.price}</span>
                  <Link href={`/course/${course.id}`} className="text-sm font-bold text-blue-400 bg-blue-500/10 px-5 py-2.5 rounded-lg hover:bg-blue-500 hover:text-white transition">
                    View Details
                  </Link>
                </div>

              </div>
            ))
          ) : (
            <p className="text-slate-500 col-span-3 text-center py-12 border border-dashed border-slate-800 rounded-2xl">
              Loading featured courses... (Backend check karein!)
            </p>
          )}
        </div>
      </section>
      {/* ── FACULTY & LEADERSHIP SECTION ── */}
      <section className="py-24 px-8 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4">Our Leadership</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-serif tracking-tight">Meet Our Expert Faculty & Mentors</h2>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1: Aayush Raj */}
            <div className="bg-[#111827] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-blue-500/10 flex flex-col group">
              <div className="h-64 relative bg-slate-800">
                {/* Yellow Badge */}
                <div className="absolute top-5 left-5 bg-yellow-500 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow-lg">
                  Leadership
                </div>
                {/* Image (Replace src with your actual image path) */}
                <img src="/aayush.jpg" alt="Aayush Raj" className="w-full h-full object-cover" />                {/* Gradient Fade Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111834] to-transparent"></div>
              </div>
              <div className="p-8 pt-0 flex-grow relative z-10">
                <h3 className="text-xl font-bold text-white mb-1">Aayush Raj</h3>
                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">Director</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Visionary leader dedicated to providing high-quality digital education and shaping the future of tech enthusiasts.
                </p>
              </div>
            </div>

            {/* Card 2: Adarsh */}
            <div className="bg-[#111827] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-blue-500/10 flex flex-col group">
              <div className="h-64 relative bg-slate-800">
                <img src="/adarsh.jpg" alt="Adarsh" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111827] to-transparent"></div>
              </div>
              <div className="p-8 pt-0 flex-grow relative z-10">
                <h3 className="text-xl font-bold text-white mb-1">Adarsh</h3>
                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">CEO</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Specialist in Full Stack Development and Database Management with 8+ years of industry experience.
                </p>
              </div>
            </div>

            {/* Card 3: Priya Sharma */}
            <div className="bg-[#111827] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-blue-500/10 flex flex-col group">
              <div className="h-64 relative bg-slate-800">
                <img src="/priya.jpg" alt="Priya Sharma" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111827] to-transparent"></div>
              </div>
              <div className="p-8 pt-0 flex-grow relative z-10">
                <h3 className="text-xl font-bold text-white mb-1">Priya Sharma</h3>
                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">Senior Graphic Designer</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Expert in UI/UX and Creative Design, mentoring students for the modern digital landscape.
                </p>
              </div>
            </div>

            {/* Card 4: Nitish Chacha */}
            <div className="bg-[#111827] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-blue-500/10 flex flex-col group">
              <div className="h-64 relative bg-slate-800">
                <img src="/nitish.jpg" alt="Nitish Chacha" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111827] to-transparent"></div>
              </div>
              <div className="p-8 pt-0 flex-grow relative z-10">
                <h3 className="text-xl font-bold text-white mb-1">Nitish Chacha</h3>
                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">Office Management Expert</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Master of Tally and Office Automation, focused on professional accounting skills.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ── STEP 4: BATCHES & NOTICE BOARD ── */}
      <section id="batches" className="py-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Side: Current Batches */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Current Batches</h2>
              <p className="text-blue-500 font-semibold text-sm tracking-wider uppercase">Ongoing & Upcoming</p>
            </div>

            <div className="space-y-4">
              {/* Batch 1 */}
              <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-6 flex justify-between items-center hover:border-blue-500/50 transition cursor-pointer">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Java Full Stack</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span> 10:00 AM - 12:00 PM
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 text-xs font-bold bg-blue-500/10">
                  RUNNING
                </span>
              </div>

              {/* Batch 2 */}
              <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-6 flex justify-between items-center hover:border-blue-500/50 transition cursor-pointer">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Python/AI</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span> 02:00 PM - 04:00 PM
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full border border-orange-500/30 text-orange-400 text-xs font-bold bg-orange-500/10">
                  UPCOMING
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Notice Board */}
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
                <span>Notice Title</span>
                <span>Date</span>
              </div>

              <ul className="space-y-4">
                <li className="flex justify-between items-center py-2 border-b border-slate-800/50 pb-4">
                  <span className="text-orange-500 font-semibold text-sm">Dues fees cleared</span>
                  <span className="text-slate-500 text-xs">May 15</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-slate-800/50 pb-4">
                  <span className="text-slate-300 font-medium text-sm">Holiday Notice: Summer Break</span>
                  <span className="text-slate-500 text-xs">June 20</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span className="text-slate-300 font-medium text-sm">Scholarship Test - Register Now</span>
                  <span className="text-slate-500 text-xs">May 25</span>
                </li>
              </ul>

              <button className="w-full mt-6 text-sm font-bold text-blue-500 hover:text-blue-400 transition">
                VIEW ALL NOTICES &rarr;
              </button>
            </div>
          </div>

        </div>
      </section>
      {/* ── STEP 5: STUDENT REVIEWS ── */}
      <section id="reviews" className="py-24 px-8 bg-[#0B1120] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">What Our Students Say</h2>
              <p className="text-slate-400">Real stories from our successful alumni.</p>
            </div>
            <Link href="/write-review" className="bg-[#111827] border border-slate-700 hover:border-blue-500 text-blue-400 px-6 py-3 rounded-lg font-bold text-sm transition-all flex items-center gap-2">
              <span>✍️</span> Write a Review
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Review 1 */}
            <div className="bg-[#111827] p-8 rounded-2xl border border-slate-800 relative group hover:border-blue-500/50 transition-all duration-300 shadow-xl">
              <div className="text-yellow-500 text-sm mb-4 tracking-widest">★★★★★</div>
              <p className="text-slate-300 text-sm italic mb-8 leading-relaxed relative z-10">
                "The training at DCC Institute was life-changing. The hands-on projects actually prepared me for the corporate world."
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold">A</div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Arjun Kumar</h4>

                </div>
              </div>
              <div className="absolute top-8 right-6 text-7xl text-slate-800/40 font-serif leading-none select-none">"</div>
            </div>

            {/* Review 2 */}
            <div className="bg-[#111827] p-8 rounded-2xl border border-slate-800 relative group hover:border-blue-500/50 transition-all duration-300 shadow-xl">
              <div className="text-yellow-500 text-sm mb-4 tracking-widest">★★★★★</div>
              <p className="text-slate-300 text-sm italic mb-8 leading-relaxed relative z-10">
                "Excellent guidance! The faculty is very supportive and the lab facilities are top-notch. Best institute in Patna."
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold">P</div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Priya Sharma</h4>

                </div>
              </div>
              <div className="absolute top-8 right-6 text-7xl text-slate-800/40 font-serif leading-none select-none">"</div>
            </div>

            {/* Review 3 */}
            <div className="bg-[#111827] p-8 rounded-2xl border border-slate-800 relative group hover:border-blue-500/50 transition-all duration-300 shadow-xl">
              <div className="text-yellow-500 text-sm mb-4 tracking-widest">★★★★★</div>
              <p className="text-slate-300 text-sm italic mb-8 leading-relaxed relative z-10">
                "Foundational concepts were cleared so well. I highly recommend DCC to anyone starting their tech career."
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center font-bold">R</div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Rohan Singh</h4>

                </div>
              </div>
              <div className="absolute top-8 right-6 text-7xl text-slate-800/40 font-serif leading-none select-none">"</div>
            </div>

          </div>
        </div>
      </section>

      {/* ── BIG PROFESSIONAL FOOTER ── */}
      <footer className="bg-[#050810] pt-20 pb-10 px-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Brand Col */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img src="/dcc logo.png" alt="DCC Institute" className="w-10 h-10 bg-white rounded-full p-0.5" />
                <span className="text-xl font-black tracking-tight text-white flex">
                  <span className="text-blue-500">D</span><span className="text-red-500">CC</span><span className="ml-2">INSTITUTE</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Premium IT education and placement support. ISO 9001:2015 Certified center in the heart of Bihar.
              </p>
            </div>

            {/* Links Col 1 */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="#about" className="hover:text-blue-400 transition">About Institute</Link></li>
                <li><Link href="#courses" className="hover:text-blue-400 transition">Our Courses</Link></li>
                <li><Link href="#batches" className="hover:text-blue-400 transition">Upcoming Batches</Link></li>
                <li><Link href="#services" className="hover:text-blue-400 transition">Services</Link></li>
              </ul>
            </div>

            {/* Links Col 2 */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Popular Courses</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-blue-400 transition">Full Stack Web Development</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Python Data Science</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">AI & ML Course</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">ADCA and DCA Courses</Link></li>
              </ul>
            </div>

            {/* Address Col */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Address</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex gap-3"><span className="text-orange-500">📍</span> 4th Floor, Digital Computer Centre, Patna</li>
                <li className="flex gap-3"><span className="text-blue-500">📞</span> +91 79090 27305</li>
                <li className="flex gap-3"><span className="text-purple-500">✉️</span> info@dccinstitute.in</li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">© 2026 DCC Institute. All rights reserved.</p>
            <div className="flex gap-4 text-xs text-slate-500">
              <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}