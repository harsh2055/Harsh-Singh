import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Send, Radio, ShieldCheck, CheckCircle2, Loader2, Smartphone, MapPin } from 'lucide-react';
import { PROFILE } from '../constants/data';
import { cn } from '../lib/utils';
import { trackEvent } from '../lib/analytics';
import SEO from '../components/SEO';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post('/api/contact', formData);
      setStatus('sent');
      trackEvent('Contact', 'Submit Form', 'Success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      trackEvent('Contact', 'Submit Form', 'Error');
    }
  };

  return (
    <div className="grid-bg min-h-screen">
      <SEO 
        title="Get in Touch" 
        description="Contact Harsh Singh for collaboration opportunities, technical inquiries, or full-time developer roles." 
        path="/contact"
      />
      <div className="container mx-auto px-8 py-12 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Left: Info */}
            <div className="lg:col-span-5 space-y-16">
              <div>
                <span className="text-xs font-bold text-blue-500 uppercase mb-4 block tracking-[0.4em]">Secure_Communication</span>
                <h1 className="text-6xl font-bold tracking-tighter uppercase mb-8 leading-tight">
                  INITIATE <br />
                  <span className="text-blue-500">TRANSMISSION.</span>
                </h1>
                <p className="text-lg text-[var(--muted)] font-medium leading-relaxed">
                  Open channels for strategic collaboration, project inquiries, or high-level technical discussions.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-[var(--card)] border-thin p-8 rounded-xl flex items-center gap-8 group hover:border-blue-500/20 transition-all shadow-xl">
                  <div className="w-14 h-14 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-[0_0_15px_#3B82F622]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[var(--border)] uppercase tracking-widest mb-1">Protocol_Endpoint</p>
                    <a href={`mailto:${PROFILE.email}`} className="text-sm font-bold text-[var(--text)] hover:text-blue-500 transition-colors uppercase tracking-tight">{PROFILE.email}</a>
                  </div>
                </div>

                <div className="bg-[var(--card)] border-thin p-8 rounded-xl flex items-center gap-8 group hover:border-blue-500/20 transition-all shadow-xl">
                  <div className="w-14 h-14 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-[0_0_15px_#3B82F622]">
                     <Radio className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[var(--border)] uppercase tracking-widest mb-1">Operation_Status</p>
                    <p className="text-sm font-bold text-blue-500 uppercase tracking-tight">{PROFILE.availability}</p>
                  </div>
                </div>

                <div className="bg-[var(--card)] border-thin p-8 rounded-xl flex items-center gap-8 group hover:border-blue-500/20 transition-all shadow-xl">
                  <div className="w-14 h-14 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-[0_0_15px_#3B82F622]">
                     <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[var(--border)] uppercase tracking-widest mb-1">Deployment_Zone</p>
                    <p className="text-sm font-bold text-[var(--text)] uppercase tracking-tight">{PROFILE.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {[
                  { icon: Github, url: `https://${PROFILE.github}` },
                  { icon: Linkedin, url: `https://${PROFILE.linkedin}` }
                ].map((social, i) => (
                  <a key={i} href={social.url} target="_blank" rel="noreferrer" className="w-14 h-14 bg-[var(--card)] border-thin rounded-xl flex items-center justify-center hover:border-blue-500/50 transition-all group shadow-xl">
                    <social.icon className="w-5 h-5 text-[var(--border)] group-hover:text-blue-500 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <div className="bg-[var(--card)] border-thin p-12 rounded-2xl relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                    <ShieldCheck className="w-48 h-48 text-blue-500" />
                 </div>
                 
                 <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-[0.3em] ml-1">Source_Identifier</label>
                        <input 
                          required
                          type="text"
                          placeholder="NAME_OR_ENTITY"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-[var(--bg)]/40 border-b-2 border-[var(--border)] p-5 font-bold text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-[var(--border)] text-[var(--text)]"
                        />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-[0.3em] ml-1">Communication_Token</label>
                         <input 
                          required
                          type="email"
                          placeholder="EMAIL_PROTOCOL"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-[var(--bg)]/40 border-b-2 border-[var(--border)] p-5 font-bold text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-[var(--border)] text-[var(--text)]"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-[0.3em] ml-1">Payload_Data</label>
                      <textarea 
                        required
                        placeholder="ENTER_MESSAGE_HERE..."
                        rows={6}
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-[var(--bg)]/40 border-thin rounded-xl p-8 font-medium text-sm focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-[var(--border)] text-[var(--text)] resize-none shadow-inner"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={status === 'sending' || status === 'sent'}
                      className={cn(
                        "w-full py-6 font-bold tracking-[0.5em] uppercase flex items-center justify-center gap-4 transition-all rounded-lg",
                        status === 'sent' 
                          ? "bg-blue-600/10 text-blue-500 border border-blue-500/30"
                          : "bg-[var(--text)] text-[var(--bg)] hover:bg-blue-600 hover:text-white shadow-[0_0_40px_rgba(59,130,246,0)] hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                      )}
                    >
                      {status === 'sending' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : status === 'sent' ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" /> SYNCHRONIZED
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> EXECUTE_TRANSMISSION
                        </>
                      )}
                    </button>
                 </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
