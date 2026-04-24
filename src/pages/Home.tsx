import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, ArrowRight, Code2, GitBranch, Activity, Zap, FileCode, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROFILE, PROJECTS } from '../constants/data';
import { useRecruiter } from '../context/RecruiterContext';
import { cn } from '../lib/utils';
import { ProjectSkeleton, GithubPulseSkeleton } from '../components/ui/Skeleton';
import SEO from '../components/SEO';
import axios from 'axios';
import TerminalHero from '../components/ui/TerminalHero';
import Typewriter from '../components/ui/Typewriter';


export default function Home() {
  const { isRecruiterMode } = useRecruiter();
  const [githubStats, setGithubStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axios.get('/api/github/activity');
        setGithubStats(response.data.stats);
      } catch (err) {
        console.error('GitHub fetch failed');
      } finally {
        // Add a deliberate slight delay for better skeleton visibility demonstration
        setTimeout(() => setLoading(false), 800);
      }
    }
    fetchStats();
  }, []);

  const featuredProjects = isRecruiterMode 
    ? PROJECTS.slice(0, 1) // Only most impactful for Elegant Dark style
    : PROJECTS.slice(0, 2);

  return (
    <div className="grid-bg min-h-screen">
      <SEO 
        title="Full Stack Developer & AI Engineer" 
        description="Harsh Singh - Building secure, scalable, and AI-powered software solutions. Expert in Python, React, and Distributed Systems."
        path="/"
      />
      <div className="container mx-auto px-8 py-12 pt-24">
        <main className="flex flex-col lg:flex-row gap-8 overflow-hidden">
          {/* Left Column: Intro + Project */}
          <div className="w-full lg:w-[580px] flex flex-col space-y-12">
            <motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* The new typing animation goes exactly here, replacing the old div */}
  <Typewriter />
  
  <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-6">
    Building Scalable<br/>Web Applications.
  </h1>
  <p className="text-[#888888] leading-relaxed max-w-sm text-sm">
    Full Stack Developer focused on building high-performance web applications and AI-integrated systems. Currently developing production-grade SaaS engines and contributing to secure data protocols.
  </p>
  <div className="mt-8 flex gap-4">
    <Link to="/about" className="text-[10px] font-bold text-[#EAEAEA] uppercase tracking-widest flex items-center gap-2 hover:text-blue-500 transition-colors">
      Read_Full_Biography <ArrowRight className="w-3 h-3" />
    </Link>
  </div>
</motion.section>


            <section className="space-y-4">
              <div className="flex justify-between items-end">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#888888]">Featured Insight</h3>
                <span className="text-[10px] mono text-blue-500 tracking-tighter">PROJ_ID: 0042</span>
              </div>
              
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProjectSkeleton />
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {PROJECTS.slice(0, 1).map(project => (
                      <div key={project.id} className="bg-[var(--card)] border-thin p-8 rounded-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 flex gap-2">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="pill bg-white/10 text-white border-white/20 px-3 py-1 hover:bg-white hover:text-black transition-all flex items-center gap-2">
                              <Github className="w-3 h-3" /> Code
                            </a>
                          )}
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="pill bg-blue-900/20 text-blue-400 border-blue-800/40 px-3 py-1 hover:bg-blue-600 hover:text-white transition-all">
                            Live Demo
                          </a>
                        </div>
                        <h4 className="text-2xl font-bold mb-3 tracking-tight">{project.name}</h4>
                        <div className="flex space-x-4 mb-8">
                          {project.techStack.slice(0, 3).map(tech => (
                            <span key={tech} className="text-[11px] mono text-[#888888]">#{tech}</span>
                          ))}
                        </div>
                        <div className="space-y-6">
                          <div className="flex gap-6">
                            <div className="text-[10px] uppercase font-bold text-[#888888] w-16 pt-1 shrink-0">Problem</div>
                            <p className="text-xs text-[#EAEAEA] leading-relaxed font-medium">
                              {project.challenges[0]}
                            </p>
                          </div>
                          <div className="flex gap-6">
                            <div className="text-[10px] uppercase font-bold text-blue-500 w-16 pt-1 shrink-0">Solution</div>
                            <p className="text-xs text-[#EAEAEA] leading-relaxed font-medium">
                              {project.solutions[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#888888]">System Catalog</h3>
                <Link to="/projects" className="text-[10px] mono text-blue-500 tracking-tighter hover:underline">VIEW_ALL_RECORDS</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROJECTS.map((project, i) => (
                  <motion.div 
  key={project.id}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: i * 0.1 }}
  className="bg-[var(--card)] border-thin p-6 rounded-lg group hover:border-blue-500/80 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col justify-between"
>

                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-sm font-bold tracking-tight">{project.name}</h4>
                        <div className="flex gap-2">
                           <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-[var(--muted)] hover:text-[var(--text)]">
                             <Github className="w-3 h-3" />
                           </a>
                           <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-[var(--muted)] hover:text-blue-500">
                             <ExternalLink className="w-3 h-3" />
                           </a>
                        </div>
                      </div>
                      <p className="text-[10px] text-[#888888] line-clamp-2 leading-relaxed mb-4">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 2).map(tech => (
                        <span key={tech} className="text-[9px] mono text-blue-500/60 uppercase">#{tech}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Pulse + Utilities */}
          <div className="flex-1 flex flex-col space-y-6">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="stats-skeleton"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <GithubPulseSkeleton />
                </motion.div>
              ) : (
                <motion.div 
                  key="stats-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[var(--card)] border-thin rounded-lg p-8 flex flex-col shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#888888] mb-1">GitHub Pulse</span>
                      <span className="mono text-[10px] text-blue-500 tracking-widest">GITHUB_API: 200 OK</span>
                    </div>
                    <div className="flex space-x-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold tracking-tighter">{githubStats?.streak || 0}</div>
                        <div className="text-[9px] text-[#888888] uppercase tracking-widest">Streak</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold tracking-tighter">{githubStats?.totalCommits || 0}</div>
                        <div className="text-[9px] text-[#888888] uppercase tracking-widest">Commits</div>
                      </div>
                    </div>
                  </div>

                  {/* GitHub Heatmap Grid - Real Mapping */}
                  <div className="grid grid-cols-12 md:grid-cols-24 gap-1.5 mb-6">
                    {Array.from({ length: 120 }).map((_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() - (119 - i));
                      const dateStr = date.toISOString().split('T')[0];
                      const activity = githubStats?.contributionMap?.[dateStr] || 0;
                      const level = activity > 5 ? 3 : activity > 2 ? 2 : activity > 0 ? 1 : 0;
                      return <div key={i} className={cn("heatmap-cell", level > 0 && `active-${level}`)} />;
                    })}
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-6 border-t border-[#222222]">
                    <div className="flex flex-col text-left max-w-[50%]">
                      <span className="text-[10px] text-[#888888] uppercase tracking-widest">Primary Focal Repo</span>
                      <span className="text-xs font-semibold mt-1 truncate">{githubStats?.mostActiveRepo || "SCANNING..."}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-[#888888] uppercase tracking-widest">Last Activity Sync</span>
                      <span className="text-xs font-semibold mt-1">
                        {githubStats?.lastActive ? new Date(githubStats.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "---"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              <div className="bg-[var(--card)] border-thin rounded-lg p-6 flex flex-col justify-between group hover:border-blue-500/50 transition-all">
                <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-6 flex items-center gap-2">
                    <FileCode className="w-3 h-3" /> Role-Based Generator
                  </h5>
                  <p className="text-xs leading-relaxed text-[#EAEAEA]">
                    Extracting technical keywords from live job descriptions via ATS optimization engine for maximum visibility.
                  </p>
                </div>
                <Link 
                  to="/resume-builder"
                  className="w-full mt-8 py-4 bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all text-center block"
                >
                  Generate Resume PDF
                </Link>
              </div>

              <div className="bg-[var(--card)] border-thin rounded-lg p-6 flex flex-col justify-between group hover:border-blue-500/50 transition-all">
                <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-6 flex items-center gap-2">
                    <LayoutDashboard className="w-3 h-3" /> Current Tech Stack
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="pill">React 19</div>
                    <div className="pill">Node.js</div>
                    <div className="pill">Express</div>
                    <div className="pill">Firebase</div>
                    <div className="pill">Tailwind</div>
                    <div className="pill text-blue-500 border-blue-500/30">Learning: AI Agents</div>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-[#222222] flex justify-between items-center">
                  <span className="text-[10px] text-[#888888] uppercase">Projects tracked</span>
                  <span className="mono text-xs text-white">8 Total</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 h-12 px-8 border-t border-thin flex items-center justify-between text-[10px] mono text-[var(--muted)] bg-[var(--bg)]/80 backdrop-blur-sm z-40">
        <div className="flex items-center gap-4">
          <span>&copy; 2024 HARSH SINGH. ALL RIGHTS RESERVED.</span>
          <span className="hidden md:inline text-[#222222]">|</span>
          <span className="hidden md:inline tracking-tighter uppercase font-medium">{PROFILE.name} // DEV_UNIT_01</span>
        </div>
        <div className="flex space-x-6 items-center">
          <span className="hidden sm:inline">LAT: 19.0760 N</span>
          <span className="hidden sm:inline">LON: 72.8777 E</span>
          <div className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-green-500 font-bold">SECURE CONNECTION // AES-256</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

