import Link from 'next/link';

export default function AboutPage() {
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
          <Link href="/services" className="hover:text-blue-400 transition">Services</Link>
          <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
        </div>
      </nav>

      {/* ── ABOUT CONTENT SECTION ── */}
      <section className="py-24 px-8 max-w-5xl mx-auto flex-grow w-full">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About DCC Institute</h1>
          <p className="text-blue-500 font-bold tracking-widest uppercase text-sm">Empowering Students with Quality Education</p>
        </div>

        {/* Main Text Content */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-10 md:p-14 shadow-2xl mb-16">
          <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
            <p>
              <strong className="text-white font-bold">DCC Institute</strong> is a leading computer education and skill development institute dedicated to providing high-quality, practical, and career-oriented training. Our mission is to bridge the gap between academic learning and industry requirements by offering hands-on education, expert guidance, and real-world projects.
            </p>
            <p>
              We believe that every student deserves the opportunity to build a successful career. Whether you are a school student, college student, job seeker, or working professional, our courses are designed to help you gain the skills needed to succeed in today's competitive world.
            </p>
            <p>
              From basic computer education to advanced technologies like <span className="text-blue-400 font-semibold">Python, Java, Full Stack Development, DevOps, Cloud Computing, Artificial Intelligence, Data Science, Tally, DCA, ADCA, Web Development,</span> and Digital Skills, we provide comprehensive training that prepares students for real industry challenges.
            </p>
            <p>
              Our experienced faculty members focus on practical learning through live projects, assignments, workshops, and interview preparation, ensuring that students become confident and job-ready professionals.
            </p>
            <p className="text-xl font-medium text-white italic border-l-4 border-blue-500 pl-6 mt-8">
              At DCC Institute, we are committed to creating a learning environment that inspires innovation, confidence, and continuous growth.
            </p>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-[#0B1120] to-[#111827] border border-blue-500/30 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-slate-400 leading-relaxed">
              To provide affordable, practical, and industry-focused education that empowers students with technical skills, confidence, and career opportunities.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-gradient-to-br from-[#0B1120] to-[#111827] border border-orange-500/30 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
            <div className="text-4xl mb-4">👁️</div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-slate-400 leading-relaxed">
              To become one of the most trusted and innovative computer training institutes by delivering quality education, advanced technology training, and successful career guidance to every student.
            </p>
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