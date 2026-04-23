import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, GraduationCap, MapPin, Target, Zap, Shield, Search, BookOpen } from 'lucide-react';
import { EDUCATION, PROFILE } from '../constants/data';
import { cn } from '../lib/utils';
import SEO from '../components/SEO';

export default function About() {
  return (
    <div className="grid-bg min-h-screen">
      <SEO 
        title="About Me" 
        description="Learn more about Harsh Singh's journey as a Full Stack Engineer, AI researcher, and builder. Specializing in Python, React, and orchestration of complex digital ecosystems." 
        type="profile"
        path="/about"
      />
      <div className="container mx-auto px-8 py-12 pt-24">
        <div className="max-w-5xl mx-auto">
          {/* Header - Asymmetric */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold text-blue-500 uppercase mb-4 block tracking-[0.4em]">Biography_v2.0</span>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-8 leading-[0.85]">
                ENGINEERING <br />
                <span className="text-blue-500">WITH_PRECISION.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#888888] font-medium leading-relaxed">
                I am a focused developer specializing in building high-performance full-stack environments and AI-integrated applications. My methodology prioritizes scalability, security, and user-centric performance.
              </p>
            </div>
            <div className="lg:col-span-4 hidden lg:block">
               <div className="bg-[var(--card)] border-thin aspect-[3/4] rounded-lg relative overflow-hidden flex items-center justify-center p-12 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
                  <Search className="w-full h-full text-white/5 opacity-10" />
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
            {/* Main Content */}
            <div className="lg:col-span-7 space-y-16">
              <section>
                <h2 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-6">
                  <Target className="w-5 h-5" /> CORE_DIRECTION
                  <div className="flex-1 h-[1px] bg-[#222222]" />
                </h2>
                <div className="space-y-8 text-[#888888] text-lg font-medium">
                  <p>
                    As a Full Stack Developer, I don't just write code; I construct ecosystems. My focus lies at the intersection of high-fidelity user experiences and industrial-grade backend logic.
                  </p>
                  <p>
                    Currently pursuing a BSc in Information Technology, I balance academic theory with aggressive practical execution. Having deployed over 8+ production-ready platforms, I understand the lifecycle of software from initial concept to live-user scaling.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-6">
                  <Sparkles className="w-5 h-5" /> MISSION_CRITICAL_GOALS
                  <div className="flex-1 h-[1px] bg-[#222222]" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Neuro-Sync UI", desc: "Building interfaces that feel as fast as thought itself.", icon: Zap },
                    { title: "Zero-Trust Backend", desc: "Architecting security-first data pipelines.", icon: Shield },
                    { title: "RAG & LLM Integration", desc: "Augmenting apps with real-time autonomous intelligence.", icon: Search },
                    { title: "System Resilience", desc: "Designing for 99.9% uptime and auto-scaling infrastructure.", icon: BookOpen },
                  ].map(goal => (
                    <div key={goal.title} className="bg-[var(--card)] border-thin p-8 rounded-lg hover:border-blue-500/30 transition-all group flex flex-col items-start shadow-lg">
                      <goal.icon className="w-6 h-6 text-[#444444] group-hover:text-blue-500 mb-6 transition-colors" />
                      <h4 className="mono font-bold text-sm mb-2 group-hover:text-white transition-colors">{goal.title.toUpperCase()}</h4>
                      <p className="text-[10px] font-bold text-[#888888] uppercase leading-tight tracking-wider">{goal.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Education Timeline */}
            <div className="lg:col-span-5">
              <div className="bg-[var(--card)] border-thin p-10 rounded-lg sticky top-32 shadow-2xl">
                <h2 className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.25em] mb-12 flex items-center gap-4">
                  <GraduationCap className="w-5 h-5" /> ACADEMIC_JOURNEY
                </h2>
                
                <div className="space-y-12 relative">
                  <div className="absolute left-[11px] top-4 bottom-4 w-px bg-[#222222]" />
                  
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="relative pl-12">
                      <div className={cn(
                        "absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-[#0B0B0B] flex items-center justify-center",
                        idx === 0 ? "bg-blue-600 shadow-[0_0_12px_#3B82F6]" : "bg-[#222222]"
                      )}>
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                      </div>
                      
                      <span className="text-[10px] font-bold text-[#444444] mb-2 block uppercase tracking-widest">{edu.period}</span>
                      <h3 className="text-lg font-bold text-[#EAEAEA] mb-1 tracking-tight">{edu.degree.toUpperCase()}</h3>
                      <p className="text-xs font-bold text-[#888888] mb-3 uppercase tracking-wider">{edu.school.toUpperCase()}</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500/60 uppercase">
                        <MapPin className="w-3 h-3" /> {edu.location.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
