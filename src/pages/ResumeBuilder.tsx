import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Cpu, Search, Download, CheckCircle2, AlertCircle, FileCode, Server, Layers, LayoutDashboard } from 'lucide-react';
import { PROFILE, PROJECTS, SKILLS, EDUCATION } from '../constants/data';
import { useRecruiter } from '../context/RecruiterContext';
import { cn } from '../lib/utils';
import { GoogleGenAI, Type } from "@google/genai";
import SEO from '../components/SEO';
import { generatePortfolioPDF } from '../services/pdfService';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function ResumeBuilder() {
  const [role, setRole] = useState<'frontend' | 'backend' | 'fullstack'>('fullstack');
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);

  const generateResume = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Analyze this job description and my profile. 
      Job Description: ${jobDescription || role}
      Generate a set of recommended focus areas, extracted keywords, and prioritized projects from my list.
      My profile: ${JSON.stringify({ PROFILE, PROJECTS, SKILLS, EDUCATION })}
      
      Return as JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              focusAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              prioritizedProjects: { type: Type.ARRAY, items: { type: Type.STRING } },
              resumeSummary: { type: Type.STRING },
            },
            required: ["focusAreas", "keywords", "prioritizedProjects", "resumeSummary"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      setResumeData(result);
    } catch (err) {
      console.error('AI Resume Generation failed', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const roles = [
    { id: 'frontend', name: 'Frontend Engineer', icon: LayoutDashboard },
    { id: 'backend', name: 'Backend Engineer', icon: Server },
    { id: 'fullstack', name: 'Full Stack Developer', icon: Layers },
  ];

  return (
    <div className="grid-bg min-h-screen">
      <SEO 
        title="AI Resume Optimizer" 
        description="Adapt your professional profile to specific job descriptions using our AI-driven ATS optimization engine." 
        path="/resume-builder"
      />
      <div className="container mx-auto px-8 py-12 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-14 h-14 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_20px_#3B82F644]">
              <FileText className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tighter uppercase text-[var(--text)]">ATS_RESUME_ENGINE</h1>
              <p className="text-xs text-[var(--muted)] font-bold uppercase tracking-widest mt-1">Dynamic AI optimization for strategic role adaptation.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1 space-y-6">
              <div className="bg-[var(--card)] border-thin p-8 rounded-lg shadow-xl">
                <h3 className="text-[10px] font-bold text-blue-500 uppercase mb-6 tracking-widest">Select_Role</h3>
                <div className="space-y-2">
                  {roles.map((r: any) => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-4 rounded-lg border transition-all text-[11px] font-bold uppercase tracking-wide",
                        role === r.id 
                          ? "bg-blue-600 border-blue-500 text-white shadow-lg" 
                          : "bg-[var(--bg)]/40 border-thin text-[var(--muted)] hover:border-[var(--border)]"
                      )}
                    >
                      <r.icon className="w-4 h-4" />
                      {r.name.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--card)] border-thin p-8 rounded-lg shadow-xl">
                <h3 className="text-[10px] font-bold text-blue-500 uppercase mb-6 tracking-widest">Target_Parameters</h3>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="PASTE_JOB_DESCRIPTION_HERE..."
                  className="w-full h-48 bg-[var(--bg)]/40 border border-thin rounded-lg p-5 text-[11px] mono text-[var(--text)] placeholder:text-[var(--border)] focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
                <button
                  onClick={generateResume}
                  disabled={isGenerating}
                  className="w-full mt-6 py-4 bg-[var(--text)] text-[var(--bg)] font-bold text-[11px] uppercase tracking-widest transition-all disabled:opacity-30 flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> SYNTHESIZING...
                    </>
                  ) : "INITIATE_SYNTHESIS"}
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <AnimatePresence mode="wait">
                {resumeData ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-[var(--card)] border-thin p-10 rounded-lg min-h-[600px] shadow-2xl"
                  >
                    <div className="flex justify-between items-start mb-12 border-b border-thin pb-8">
                      <div>
                        <h2 className="text-3xl font-bold tracking-tighter mb-2 uppercase text-[var(--text)]">{PROFILE.name}</h2>
                        <div className="flex gap-4">
                           <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{role.toUpperCase()}_ENGINEER</span>
                           <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest px-2 border border-thin rounded mx-1">ATS_SCORE: 98%</span>
                        </div>
                      </div>
                      <button 
                        onClick={generatePortfolioPDF}
                        className="flex items-center gap-2 px-4 py-3 bg-[var(--text)] text-[var(--bg)] rounded-lg hover:bg-blue-600 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest"
                      >
                        <Download className="w-3 h-3" /> EXPORT PDF
                      </button>
                    </div>

                    <div className="space-y-12">
                      <section>
                        <h4 className="text-[10px] font-bold text-[var(--border)] mb-4 uppercase tracking-[0.3em] border-l-2 border-blue-500 pl-4">Professional_Summary</h4>
                        <p className="text-sm text-[var(--muted)] leading-relaxed font-medium italic">"{resumeData.resumeSummary}"</p>
                      </section>

                      <section>
                        <h4 className="text-[10px] font-bold text-[var(--border)] mb-6 uppercase tracking-[0.3em] border-l-2 border-blue-500 pl-4">Technical_Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.keywords.map((k: string) => (
                            <span key={k} className="pill border-blue-500/20 text-blue-500 bg-blue-500/5">
                              {k.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h4 className="text-[10px] font-bold text-[var(--border)] mb-6 uppercase tracking-[0.3em] border-l-2 border-blue-500 pl-4">Prioritized_Evidence</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {resumeData.prioritizedProjects.map((pId: string) => {
                            const p = PROJECTS.find(proj => proj.id === pId) || PROJECTS.find(proj => proj.name.toLowerCase().includes(pId.toLowerCase()));
                            if (!p) return null;
                            return (
                              <div key={p.id} className="p-6 rounded-lg bg-[var(--bg)]/40 border border-thin group hover:border-blue-500/30 transition-all shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                  <h5 className="font-bold text-sm text-[var(--text)] tracking-tight">{p.name.toUpperCase()}</h5>
                                  <div className="pill text-[9px] border-blue-500/40 text-blue-500">RELEVANCE: AUTO_OPTIMIZED</div>
                                </div>
                                <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed mb-4">{p.description}</p>
                                <div className="flex gap-4">
                                  {p.techStack.slice(0, 3).map(s => (
                                    <span key={s} className="mono text-[9px] text-[var(--border)] font-bold uppercase tracking-widest">{s}</span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-16 bg-[var(--card)] border-thin border-dashed border-thin rounded-lg min-h-[600px] shadow-2xl">
                    <div className="w-16 h-16 rounded-full bg-[var(--bg)]/40 flex items-center justify-center mb-8 border border-thin">
                      <Search className="text-[var(--border)] w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold mb-3 uppercase tracking-tighter opacity-20 text-[var(--text)]">AWAITING_PARAMETERS</h2>
                    <p className="text-[10px] text-[var(--muted)] max-w-[240px] leading-[1.6] opacity-40 uppercase font-bold tracking-[0.2em]">Enter job details and initiate synthesis to generate a custom ATS-optimized data profile.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Loader2 } from 'lucide-react';

