import { useState, useEffect } from 'react';

export default function Typewriter() {
  const [text, setText] = useState('');
  
  // This is the exact text from your screenshot
  const fullText = "SYSTEM ONLINE: FULL STACK SPECIALIST";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 60); // 60 milliseconds per letter

    return () => clearInterval(timer);
  }, []);

  return (
    <span className="flex items-center text-[#2563EB] text-xs sm:text-sm font-mono tracking-widest uppercase font-semibold">
      <span className="mr-2">●</span>
      {text}
      {/* The blinking cursor at the end */}
      <span className="w-1.5 h-3 bg-[#2563EB] ml-1 animate-pulse inline-block"></span>
    </span>
  );
}
