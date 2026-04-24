import { useState, useEffect } from 'react';

export default function SystemClock() {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // This formats the time to look like a 24-hour military/server clock (e.g., 14:05:33)
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    
    updateTime(); // Set it immediately
    const timer = setInterval(updateTime, 1000); // Update every 1 second
    
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="hidden sm:inline font-mono tracking-widest text-[#888888]">
      SYS.TIME:{time}
    </span>
  );
}

