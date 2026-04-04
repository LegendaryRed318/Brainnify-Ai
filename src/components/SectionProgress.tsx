import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SectionProgress = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = [
      { id: 'hero', name: 'Home' },
      { id: 'features', name: 'Features' },
      { id: 'how-it-works', name: 'How It Works' },
      { id: 'pricing', name: 'Pricing' },
      { id: 'testimonials', name: 'Testimonials' },
      { id: 'download', name: 'Download' }
    ];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observerRef.current?.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {['hero', 'features', 'how-it-works', 'pricing', 'testimonials', 'download'].map((sectionId) => (
        <div key={sectionId} className="relative group">
          <motion.div
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              activeSection === sectionId 
                ? 'bg-purple-500 w-2 h-8' 
                : 'bg-white/20 hover:bg-white/30'
            }`}
            whileHover={{ scale: 1.2 }}
            layoutId="activeSection"
            title={sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace(/-/g, ' ')}
          />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <div className="bg-black/90 text-white text-xs px-2 py-1 rounded">
              {sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace(/-/g, ' ')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionProgress;
