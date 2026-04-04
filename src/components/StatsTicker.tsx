import { useState, useEffect } from 'react';

const StatsTicker = () => {
  const stats = [
    "2.4M Flashcards Generated",
    "847K Summaries Created", 
    "12,000+ Active Students",
    "4.9★ Average Rating",
    "200+ Study Topics",
    "47 mins saved per session"
  ];

  return (
    <div className="w-full bg-white/5 backdrop-blur border-y border-white/10 overflow-hidden">
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scroll-animation {
          animation: scroll-left 30s linear infinite;
        }
        .scroll-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="relative py-3">
        <div className="flex gap-4 whitespace-nowrap scroll-animation">
          {/* Two identical rows for continuous effect */}
          <div className="flex gap-4">
            {stats.map((stat, index) => (
              <span key={index} className="text-purple-300 font-grotesk text-sm font-medium whitespace-nowrap">
                {stat}
                <span className="text-purple-500 mx-4">•</span>
              </span>
            ))}
          </div>
          
          <div className="flex gap-4">
            {stats.map((stat, index) => (
              <span key={index} className="text-purple-300 font-grotesk text-sm font-medium whitespace-nowrap">
                {stat}
                <span className="text-purple-500 mx-4">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTicker;
