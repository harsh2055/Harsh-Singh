import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Plus, Edit2, Trash2, Save, X, Settings, Database, Activity, FileDown, GitBranch, Zap, Clock, Shield, Github, ExternalLink } from 'lucide-react';
import { PROJECTS, SKILLS } from '../constants/data';
import { cn } from '../lib/utils';
import { generatePortfolioPDF } from '../services/pdfService';
import { trackEvent } from '../lib/analytics';
import SEO from '../components/SEO';
import axios from 'axios';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'stats'>('projects');
  const [githubStats, setGithubStats] = useState<any>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  
  const [projects, setProjects] = useState(PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', description: '', status: 'ongoing', techStack: '', githubUrl: '', liveUrl: '' });

  const handleOpenModal = (project?: any) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        description: project.description,
        status: project.status,
        techStack: project.techStack.join(', '),
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || ''
      });
    } else {
      setEditingProject(null);
      setFormData({ name: '', description: '', status: 'ongoing', techStack: '', githubUrl: '', liveUrl: '' });
    }
    setIsModalOpen(true);
  };

  const handleSaveProject = () => {
    const newProject = {
      ...editingProject,
      id: editingProject ? editingProject.id : `proj_${Date.now()}`,
      name: formData.name,
      description: formData.description,
      status: formData.status,
      techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl,
      highlights: editingProject?.highlights || [],
      challenges: editingProject?.challenges || [],
      solutions: editingProject?.solutions || []
    };

    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? newProject : p));
    } else {
      setProjects([newProject, ...projects]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  useEffect(() => {
    if (activeTab === 'stats' && !githubStats) {
      fetchGithubStats();
    }
  }, [activeTab]);

  const fetchGithubStats = async () => {
    setIsLoadingStats(true);
    try {
      const response = await axios.get('/api/github/activity');
      setGithubStats(response.data.stats);
    } catch (err) {
      console.error('Failed to fetch stats');
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleExportPDF = () => {
    trackEvent('Portfolio', 'Export PDF', 'Dashboard');
    generatePortfolioPDF();
  };

  return (
    <div className="grid-bg min-h-screen">
      <SEO 
        title="Operations Command" 
        description="Harsh Singh - System administration and project management dashboard." 
        path="/dashboard"
      />
      <div className="container mx-auto px-8 py-12 pt-24">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 bg-[var(--card)] p-10 rounded-2xl border-thin shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_#3B82F644]">
                <LayoutDashboard className="text-white w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tighter uppercase text-[var(--text)]">OPERATIONS_COMMAND</h1>
                <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-[0.3em] mt-1">Admin_Access_Level_01 // SECURE_SESSION</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <button 
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600/10 text-blue-500 border border-blue-500/30 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl"
              >
                <FileDown className="w-4 h-4" /> Export_Portfolio_PDF
              </button>
              
              <div className="flex gap-2 p-1 bg-[var(--bg)]/40 rounded-xl border border-thin">
                {['projects', 'skills', 'stats'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t as any)}
                    className={cn(
                      "px-8 py-3 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all",
                      activeTab === t ? "bg-[var(--text)] text-[var(--bg)] shadow-lg" : "text-[var(--muted)] hover:text-[var(--text)]"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-12">
            {activeTab === 'projects' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-8 border-b border-thin pb-6">
                  <h2 className="text-[10px] font-bold text-[var(--border)] uppercase tracking-[0.4em]">MANAGE_PROJECT_STORAGE</h2>
                  <button onClick={() => handleOpenModal()} className="flex items-center gap-3 px-6 py-3 bg-[var(--text)] text-[var(--bg)] font-bold text-[10px] rounded-lg tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all">
                    <Plus className="w-4 h-4" /> ADD_NEW_ENTRY
                  </button>
                </div>

                {projects.map(project => (
                  <div key={project.id} className="bg-[var(--card)] border-thin p-8 rounded-xl flex items-center justify-between group hover:border-blue-500/30 transition-all shadow-xl">
                    <div className="flex items-center gap-8">
                      <div className="w-14 h-14 rounded-lg bg-[var(--bg)] border border-thin flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                         <Database className="w-6 h-6 text-[var(--border)] group-hover:text-blue-500 transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold tracking-tight text-[var(--text)]">{project.name.toUpperCase()}</h3>
                        <div className="flex items-center gap-4 mt-2">
                           <span className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-widest px-2 py-0.5 bg-[var(--bg)] rounded border border-thin">{project.status}</span>
                           <span className="text-[9px] font-bold text-[var(--border)] uppercase tracking-widest">{project.techStack.length}_MODULES_DETECTED</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="p-3 rounded-lg bg-[var(--bg)] border border-thin hover:border-blue-500/50 transition-all text-[var(--muted)] hover:text-white shadow-lg"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="p-3 rounded-lg bg-[var(--bg)] border border-thin hover:border-blue-500/50 transition-all text-[var(--muted)] hover:text-white shadow-lg"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button onClick={() => handleOpenModal(project)} className="p-3 rounded-lg bg-[var(--bg)] border border-thin hover:border-blue-500/50 transition-all text-[var(--muted)] hover:text-[var(--text)] shadow-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteProject(project.id)} className="p-3 rounded-lg bg-[var(--bg)] border border-thin hover:border-red-500/50 transition-all text-[var(--muted)] hover:text-red-500 shadow-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {SKILLS.map(skillGroup => (
                  <div key={skillGroup.group} className="bg-[var(--card)] border-thin p-8 rounded-xl shadow-xl hover:border-blue-500/30 transition-all group">
                     <div className="flex justify-between items-start mb-6">
                        <h3 className="font-bold text-sm tracking-tight text-blue-500">{skillGroup.group.toUpperCase()}</h3>
                     </div>
                     <p className="text-xs text-[var(--text)] leading-relaxed mono">
                        {skillGroup.items}
                     </p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-[var(--card)] border-thin p-8 rounded-xl shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                        <Activity className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">Global_Commits</span>
                    </div>
                    <div className="text-4xl font-bold tracking-tighter text-[var(--text)]">
                      {isLoadingStats ? "---" : githubStats?.totalCommits || "0"}
                    </div>
                  </div>

                  <div className="bg-[var(--card)] border-thin p-8 rounded-xl shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                        <Database className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">Public_Repos</span>
                    </div>
                    <div className="text-4xl font-bold tracking-tighter text-[var(--text)]">
                      {isLoadingStats ? "---" : githubStats?.publicRepos || "0"}
                    </div>
                  </div>

                  <div className="bg-[var(--card)] border-thin p-8 rounded-xl shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                        <GitBranch className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">Active_Streak</span>
                    </div>
                    <div className="text-4xl font-bold tracking-tighter text-[var(--text)]">
                      {isLoadingStats ? "---" : githubStats?.streak || "0"}
                    </div>
                  </div>

                  <div className="bg-[var(--card)] border-thin p-8 rounded-xl shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                        <Clock className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">Last_Sync</span>
                    </div>
                    <div className="text-xl font-bold tracking-tighter text-[var(--text)] uppercase">
                      {isLoadingStats ? "---" : githubStats?.lastActive ? new Date(githubStats.lastActive).toLocaleDateString() : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--card)] border-thin p-12 rounded-2xl shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                      <Shield className="w-48 h-48 text-blue-500" />
                   </div>
                   <div className="relative z-10">
                      <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em] mb-8">SYSTEM_CORE_HEALTH_REPORT</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                         {[
                           { label: 'Uptime', value: '99.98%', status: 'nominal' },
                           { label: 'Latency', value: '24ms', status: 'optimal' },
                           { label: 'Security', value: 'Level_4', status: 'hardened' },
                           { label: 'Threads', value: '1,024', status: 'scaling' }
                         ].map(stat => (
                           <div key={stat.label}>
                              <div className="text-[9px] font-bold text-[var(--border)] uppercase tracking-widest mb-2">{stat.label}</div>
                              <div className="text-xl font-bold text-[var(--text)] tracking-tight">{stat.value}</div>
                              <div className="text-[8px] font-bold text-blue-500/40 uppercase mt-2">{stat.status}</div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl w-full max-w-lg p-6 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--text)]">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-[var(--text)]">{editingProject ? 'EDIT PROJECT' : 'ADD NEW PROJECT'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-1">Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[var(--bg)] border border-thin rounded p-2 text-sm text-[var(--text)] focus:border-blue-500 outline-none" placeholder="Project Name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-1">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[var(--bg)] border border-thin rounded p-2 text-sm text-[var(--text)] focus:border-blue-500 outline-none h-20" placeholder="Short description..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-1">Tech Stack (comma separated)</label>
                <input type="text" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="w-full bg-[var(--bg)] border border-thin rounded p-2 text-sm text-[var(--text)] focus:border-blue-500 outline-none" placeholder="React, Node.js, etc." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-[var(--bg)] border border-thin rounded p-2 text-sm text-[var(--text)] focus:border-blue-500 outline-none">
                    <option value="completed">Completed</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-1">GitHub URL</label>
                  <input type="text" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full bg-[var(--bg)] border border-thin rounded p-2 text-sm text-[var(--text)] focus:border-blue-500 outline-none" placeholder="https://github.com/..." />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-1">Live URL</label>
                <input type="text" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full bg-[var(--bg)] border border-thin rounded p-2 text-sm text-[var(--text)] focus:border-blue-500 outline-none" placeholder="https://..." />
              </div>
              <button onClick={handleSaveProject} className="w-full bg-blue-600/20 text-blue-500 border border-blue-500/50 font-bold py-3 rounded hover:bg-blue-600 hover:text-white transition-colors mt-4">
                <Save className="w-4 h-4 inline mr-2" /> SAVE ENTRY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
