import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans selection:bg-blue-500 selection:text-slate-900 flex flex-col">
      
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
          <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
        </div>
      </nav>

      {/* ── OUR SERVICES SECTION (Aapka diya hua content) ── */}
      <section className="py-24 px-8 max-w-7xl mx-auto flex-grow">
        
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            At DCC Institute, we are committed to providing high-quality education and practical training that helps students build successful careers in the IT industry. Our courses are designed by industry experts and focus on real-world skills, hands-on projects, and career-oriented learning. Whether you are a beginner or a working professional, we have the right program to help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-[#111827] p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">💻</div>
            <h3 className="text-xl font-bold text-white mb-3">Professional IT Training</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Learn the latest technologies with practical, project-based training in Python, Java, Web Development, Full Stack Development, DevOps, Cloud Computing, Data Science, AI, Tally, DCA, ADCA, and many more.</p>
          </div>

          <div className="bg-[#111827] p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">👨‍🏫</div>
            <h3 className="text-xl font-bold text-white mb-3">Expert Faculty</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Our experienced trainers provide personalized guidance, real-time project support, and interview preparation to ensure every student gains confidence and industry-ready skills.</p>
          </div>

          <div className="bg-[#111827] p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🚀</div>
            <h3 className="text-xl font-bold text-white mb-3">Career & Placement Support</h3>
            <p className="text-slate-400 text-sm leading-relaxed">We help students prepare for their careers through resume building, mock interviews, technical guidance, and placement assistance with leading companies.</p>
          </div>

          <div className="bg-[#111827] p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">📜</div>
            <h3 className="text-xl font-bold text-white mb-3">Certification Programs</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Receive industry-recognized certificates after successful course completion to strengthen your resume and improve job opportunities.</p>
          </div>

          <div className="bg-[#111827] p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🖥️</div>
            <h3 className="text-xl font-bold text-white mb-3">Practical Learning</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Every course includes live projects, assignments, lab practice, and real-world scenarios so students gain hands-on experience instead of only theoretical knowledge.</p>
          </div>

          <div className="bg-[#111827] p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🕒</div>
            <h3 className="text-xl font-bold text-white mb-3">Flexible Learning Options</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Choose from online or offline classes with flexible batch timings, including weekday and weekend options, making learning convenient for students and working professionals.</p>
          </div>

          <div className="bg-[#111827] p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl group md:col-span-2 lg:col-span-1">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">💰</div>
            <h3 className="text-xl font-bold text-white mb-3">Affordable Fees</h3>
            <p className="text-slate-400 text-sm leading-relaxed">We offer high-quality education at affordable fees with flexible payment options, ensuring every student has access to quality learning.</p>
          </div>
        </div>

        {/* Why Choose Us Feature List */}
        <div className="bg-blue-900/10 border border-blue-500/20 rounded-3xl p-10 max-w-4xl mx-auto shadow-[0_0_40px_rgba(59,130,246,0.05)]">
          <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
            <span className="text-3xl">🌟</span> Why Choose DCC Institute?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div className="flex items-center gap-3 text-slate-300 bg-[#0B1120] p-3 rounded-xl border border-slate-800/50"><div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0">✓</div><span className="font-medium">Industry-focused curriculum</span></div>
            <div className="flex items-center gap-3 text-slate-300 bg-[#0B1120] p-3 rounded-xl border border-slate-800/50"><div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0">✓</div><span className="font-medium">100% Practical Training</span></div>
            <div className="flex items-center gap-3 text-slate-300 bg-[#0B1120] p-3 rounded-xl border border-slate-800/50"><div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0">✓</div><span className="font-medium">Live Projects & Assignments</span></div>
            <div className="flex items-center gap-3 text-slate-300 bg-[#0B1120] p-3 rounded-xl border border-slate-800/50"><div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0">✓</div><span className="font-medium">Experienced Trainers</span></div>
            <div className="flex items-center gap-3 text-slate-300 bg-[#0B1120] p-3 rounded-xl border border-slate-800/50"><div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0">✓</div><span className="font-medium">Flexible Batch Timings</span></div>
            <div className="flex items-center gap-3 text-slate-300 bg-[#0B1120] p-3 rounded-xl border border-slate-800/50"><div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0">✓</div><span className="font-medium">Affordable Fees</span></div>
            <div className="flex items-center gap-3 text-slate-300 bg-[#0B1120] p-3 rounded-xl border border-slate-800/50"><div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0">✓</div><span className="font-medium">Certification</span></div>
            <div className="flex items-center gap-3 text-slate-300 bg-[#0B1120] p-3 rounded-xl border border-slate-800/50"><div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0">✓</div><span className="font-medium">Placement Assistance</span></div>
            <div className="flex items-center gap-3 text-slate-300 bg-[#0B1120] p-3 rounded-xl border border-slate-800/50 md:col-span-2 md:justify-center max-w-md md:mx-auto w-full mt-2"><div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0">✓</div><span className="font-medium">Continuous Learning Support</span></div>
          </div>
        </div>

      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#050810] py-10 px-8 border-t border-slate-800/50 text-center text-slate-500 text-xs">
         <p>© 2026 DCC Institute. All rights reserved.</p>
      </footer>
      
    </div>
  );
}