import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans selection:bg-blue-500 selection:text-slate-900">
      
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
        </div>
      </nav>

      {/* ── CONTACT SECTION ── */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Ready to Start Your Tech Journey?</h1>
          <p className="text-slate-400">Get in touch with us for admissions, batch details, and career counseling.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side: Contact Form */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-[#0B1120] border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full bg-[#0B1120] border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-[#0B1120] border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition" />
              </div>

             <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Course Interested</label>
                <div className="relative">
                  <select className="w-full bg-[#0B1120] border border-slate-700 text-white px-4 py-3 pr-10 rounded-lg focus:outline-none focus:border-blue-500 transition appearance-none cursor-pointer">
                    <option>Web Development</option>
                    <option>Python & Data Science</option>
                    <option>Java Full Stack</option>
                    <option>Digital Marketing</option>
                  </select>
                  {/* Custom Dropdown Arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Message</label>
                <textarea rows={4} placeholder="Tell us about your goals..." className="w-full bg-[#0B1120] border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition resize-none"></textarea>
              </div>

              <button type="button" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 rounded-lg transition-all flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                Submit Inquiry <span>🚀</span>
              </button>
            </form>
          </div>

          {/* Right Side: Visit Info & Map */}
          <div className="space-y-8">
            
            {/* Visit Info Box */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Visit Our Institute</h3>
              <div className="space-y-6">
                
                {/* Location */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center text-xl shrink-0">📍</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Our Location</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">4th Floor, Digital Computer Centre, Bengali Road, Mithapur, Patna - 800001</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-xl shrink-0">📞</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Call Us</h4>
                    <p className="text-slate-400 text-sm">+91 79090 27305</p>
                  </div>
                </div>

                {/* Email (Naya Add Kiya) */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center text-xl shrink-0">📧</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Email Us</h4>
                    <p className="text-slate-400 text-sm">info@dccinstitute.com</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Iske niche aapka wo REAL EXACT GOOGLE MAP wala code rahega... */}

            {/* ── REAL EXACT GOOGLE MAP ── */}
            <div className="w-full h-64 bg-[#111827] rounded-2xl overflow-hidden border border-slate-800 relative shadow-xl group">
              {/* Hover par blue glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-1000"></div>
              
              {/* Google Map Iframe with Exact Address Query */}
              <iframe 
                src="https://www.google.com/maps?q=Digital+Computer+Centre,+Mithapur,+Patna&output=embed" 
                className="absolute inset-0 w-full h-full rounded-2xl"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

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