import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2, FlaskConical, Construction, Layers } from 'lucide-react';
import { PROJECTS } from '../constants/data';
import { useRecruiter } from '../context/RecruiterContext';
import { cn } from '../lib/utils';
import SEO from '../components/SEO';

export default function Projects() {
  const { isRecruiterMode } = useRecruiter();
  const [filter, setFilter] = useState<'all' | 'completed' | 'ongoing'>('all');

  const filteredProjects = PROJECTS.filter(p => 
    filter === 'all' ? true : p.status === filter
  );

  return (
    <div className="grid-bg min-h-screen">
      <SEO 
        title="Production Portfolio" 
        description="Detailed catalog of Harsh Singh's software projects, including DriveX car rental, Stackbase dev platform, and AI-powered study tools." 
        path="/projects"
        type="article"
      />
      <div className="container mx-auto px-8 py-12 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-4">PRODUCTION_ARCHIVE</h1>
              <p className="text-[#888888] max-w-xl text-sm font-medium">
                A detailed catalog of engineered solutions, from conceptual prototypes to high-availability production environments.
              </p>
            </div>
            
            <div className="flex p-1 bg-[var(--card)] rounded-xl border border-thin">
              {['all', 'completed', 'ongoing'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t as any)}
                  className={cn(
                    "px-6 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all",
                    filter === t ? "bg-[var(--text)] text-[var(--bg)]" : "text-[var(--muted)] hover:text-[var(--text)]"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-24">
            {filteredProjects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12"
              >
                <div className="lg:col-span-5 space-y-6">
                  <div className="aspect-video bg-[var(--card)] border-thin rounded-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
                    <div className="absolute bottom-6 left-6">
                      <div className="pill border-blue-500/30 text-blue-500 bg-blue-500/5">
                        IDENTIFIER: {project.id.toUpperCase()}
                      </div>
                    </div>
                    <div className="w-full h-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-20 group-hover:opacity-100">
                      <Layers className="w-16 h-16 text-[var(--muted)]" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 py-4 bg-[var(--card)] border-thin rounded-xl flex items-center justify-center gap-3 text-[10px] font-bold hover:border-blue-500/50 transition-all uppercase text-[var(--muted)] hover:text-[var(--text)]">
                      <Github className="w-4 h-4" /> REPOSITORY
                    </a>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-4 bg-[var(--card)] border-thin rounded-xl flex items-center justify-center gap-3 text-[10px] font-bold hover:border-blue-500/50 transition-all uppercase text-[var(--muted)] hover:text-[var(--text)]">
                      <ExternalLink className="w-4 h-4" /> LIVE_ACCESS
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--text)]">{project.name.toUpperCase()}</h2>
                    <div className={cn(
                      "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded border",
                      project.status === 'completed' ? "text-blue-500 border-blue-500/20" : "text-amber-500 border-amber-500/20"
                    )}>
                      {project.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : <Construction className="w-3 h-3" />}
                      {project.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map(tag => (
                      <span key={tag} className="pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-lg text-[var(--muted)] mb-10 leading-relaxed font-medium">{project.description}</p>

                  {/* Work Proof - High Depth */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[var(--card)] border-thin p-8 rounded-2xl relative overflow-hidden group">
                      <h4 className="text-[10px] font-bold text-blue-500 mb-6 uppercase tracking-[0.25em] flex items-center gap-2">
                         CRITICAL_CHALLENGES
                      </h4>
                      <ul className="space-y-4">
                        {project.challenges?.map((c, i) => (
                          <li key={i} className="text-xs text-[var(--muted)] flex gap-4">
                            <span className="text-[var(--muted)] opacity-50 font-mono shrink-0">0{i+1}_</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[var(--card)] border-thin p-8 rounded-2xl relative overflow-hidden group">
                      <h4 className="text-[10px] font-bold text-[var(--text)] mb-6 uppercase tracking-[0.25em] flex items-center gap-2">
                         IMPLEMENTED_SOLUTIONS
                      </h4>
                      <ul className="space-y-4">
                        {project.solutions?.map((s, i) => (
                          <li key={i} className="text-xs text-[var(--muted)] flex gap-4">
                            <ArrowRight className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {project.status === 'ongoing' && (
                    <div className="mt-8 pt-8 border-t border-thin">
                      <div className="flex justify-between text-[10px] font-bold text-[var(--muted)] mb-2 uppercase tracking-widest">
                        <span>Development_Progress</span>
                        <span className="text-blue-500">{project.progress}%</span>
                      </div>
                      <div className="h-1 w-full bg-[var(--border)] rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="h-full bg-blue-500 shadow-[0_0_8px_#3B82F6]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
