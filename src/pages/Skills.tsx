import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Terminal, Database, Layout, Brain, Globe, CheckCircle2, History, ChevronRight, ShieldCheck } from 'lucide-react';
import { SKILLS } from '../constants/data';
import { useRecruiter } from '../context/RecruiterContext';
import { cn, formatDate } from '../lib/utils';
import SEO from '../components/SEO';

export default function Skills() {
  const { isRecruiterMode } = useRecruiter();

  return (
    <div className="grid-bg min-h-screen">
      <SEO 
        title="Technical Competency Matrix" 
        description="Verified audit of Harsh Singh's professional tech stack: React 19, Node.js, Python, Supabase, and advanced AI integration patterns." 
        path="/skills"
      />
      <div className="container mx-auto px-8 py-12 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6 text-[var(--text)]">COMPETENCY_MATRIX</h1>
            <p className="text-[var(--muted)] max-w-xl text-lg font-medium">
              A verified audit of technical capabilities, project usage data, and current learning trajectories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Mastered Skills */}
            <div className="lg:col-span-8 space-y-8">
              {SKILLS.map((skillGroup) => (
                <section key={skillGroup.group} className="bg-[var(--card)] border-thin p-10 rounded-xl shadow-xl group hover:border-blue-500/30 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-500">{skillGroup.group}</h2>
                    <div className="flex-1 h-[1px] bg-[var(--border)]" />
                  </div>
                  <p className="text-lg text-[var(--text)] leading-relaxed font-medium mono">
                    {skillGroup.items}
                  </p>
                </section>
              ))}
            </div>

            {/* Sidebar: Languages & Certs */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[var(--card)] border-thin p-8 rounded-lg shadow-xl">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] mb-8 text-[var(--text)] flex items-center gap-3 border-b border-thin pb-4">
                  <Globe className="w-4 h-4 text-blue-500" /> SPOKEN_LANGUAGES
                </h2>
                <div className="space-y-6">
                  {[
                    { name: 'English', level: 'Professional' },
                    { name: 'Hindi', level: 'Native' },
                    { name: 'Marathi', level: 'Bilingual' }
                  ].map(lang => (
                    <div key={lang.name} className="flex justify-between items-center py-2">
                      <span className="text-xs font-bold tracking-tight text-[var(--text)]">{lang.name.toUpperCase()}</span>
                      <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-[var(--card)] border-thin border-dashed border-[var(--border)] rounded-lg group hover:border-blue-500/30 transition-all cursor-pointer">
                <h3 className="text-[10px] font-bold mb-3 uppercase tracking-widest text-[var(--muted)] group-hover:text-blue-500 transition-colors">CERTIFICATION_VAULT</h3>
                <p className="text-[9px] text-[var(--border)] font-bold uppercase mb-6 tracking-widest">8_Verified_Credentials</p>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-[var(--bg)] border border-thin flex items-center justify-center shadow-lg group-hover:-translate-y-1 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>
                      <ShieldCheck className="w-4 h-4 text-blue-500/50" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-[var(--card)] border border-thin flex items-center justify-center text-[10px] font-bold text-[var(--muted)] shadow-lg">
                    +4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
