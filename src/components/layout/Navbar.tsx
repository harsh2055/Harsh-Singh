import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Terminal, Shield, User, Briefcase, Cpu, Mail, LayoutDashboard, Eye, EyeOff, Menu, FileText, Sun, Moon } from 'lucide-react';
import { useRecruiter } from '../../context/RecruiterContext';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiter();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'About Us', path: '/about', icon: User },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Skills', path: '/skills', icon: Cpu },
    { name: 'Resume', path: '/resume-builder', icon: FileText },
    { name: 'Contact', path: '/contact', icon: Mail },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 px-8 flex items-center justify-between border-b border-thin bg-[var(--nav-bg)] backdrop-blur-sm transition-colors duration-300">
      <Link to="/" className="flex items-center space-x-3 group">
        <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-sm tracking-tighter text-white transition-transform group-hover:scale-105">
          HS
        </div>
        <span className="text-sm font-semibold tracking-wide text-[var(--text)]">HARSH SINGH / DEV</span>
      </Link>

      <div className="hidden md:flex items-center space-x-8 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "transition-colors hover:text-[var(--text)]",
                isActive ? "text-[var(--text)]" : ""
              )}
            >
              {item.name}
            </Link>
          );
        })}
        
        <div className="flex items-center space-x-3 ml-4 bg-[var(--card)] px-3 py-1.5 rounded border border-thin">
          <span className="text-[10px] text-[var(--text)]">Recruiter Mode</span>
          <button 
            onClick={toggleRecruiterMode}
            className={cn(
              "w-11 h-6 rounded-full bg-[var(--bg)] relative border border-thin cursor-pointer transition-colors",
              isRecruiterMode ? "bg-blue-600 border-blue-500" : ""
            )}
          >
            <motion.div 
              animate={{ x: isRecruiterMode ? 20 : 0 }}
              className="absolute w-4 h-4 top-[3px] left-[3px] bg-[var(--muted)] rounded-full shadow-sm"
              style={{ backgroundColor: isRecruiterMode ? '#fff' : 'var(--muted)' }}
            />
          </button>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-[var(--card)] rounded-lg transition-colors text-[var(--text)]"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </nav>
  );
}
