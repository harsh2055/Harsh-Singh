import { useState, useEffect } from 'react';

export default function TerminalHero() {
  const [text, setText] = useState('');
  
  // This is the text the terminal will type out. \n makes a new line.
  const fullText = "> system.init()\n> loading modules...\n> accessing secure servers...\n> [OK] welcome back, developer.";

  useEffect(() => {
    let index = 0;
    // This creates the typing effect by revealing one letter every 50 milliseconds
    const timer = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 50); 

    return () => clearInterval(timer);
  }, []);

  return (
    // The font-mono class automatically applies your JetBrains Mono font
    <div className="p-6 bg-[#0D1117] border border-gray-800 rounded-lg w-full max-w-2xl font-mono text-[#00FF41] shadow-[0_0_15px_rgba(0,255,65,0.15)]">
      
      {/* The red, yellow, and green window buttons */}
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      
      {/* The text and the blinking cursor */}
      <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
        {text}
        <span className="inline-block w-2 h-4 bg-[#00FF41] ml-1 animate-pulse align-middle"></span>
      </div>
    </div>
  );
}

