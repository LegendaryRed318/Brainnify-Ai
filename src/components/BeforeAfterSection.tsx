import { motion } from 'framer-motion';
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const BeforeAfterSection = () => {
  const ref = useInViewAnimation();

  return (
    <section className="py-20 px-[5%]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Before Side */}
          <motion.div
            className="bg-white/5 border border-white/10 rounded-2xl p-6 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            <div className="bg-red-500/20 px-3 py-1 rounded-t-lg mb-4">
              <span className="text-red-400 font-mono text-sm">😵 Before Brainify</span>
            </div>
            
            <div className="space-y-3 text-white/40 font-mono text-sm">
              <p className="leading-relaxed">
                • Lecture notes on cellular respiration<br/>
                • Random textbook highlights everywhere<br/>
                • Professor mumbled about mitochondria<br/>
                • Can't read own handwriting from Tuesday<br/>
                • Study guide lost somewhere in backpack<br/>
                • Final exam in 48 hours 😱
              </p>
            </div>
          </motion.div>

          {/* VS Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute h-full w-0.5 bg-gradient-to-b from-purple-500 via-purple-600 to-indigo-600 rounded-full" />
            <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-400/30">
              <span className="text-purple-300 font-grotesk text-xs font-bold">VS</span>
            </div>
          </div>

          {/* After Side */}
          <motion.div
            className="bg-white/5 border border-white/10 rounded-2xl p-6 relative border-purple-500/20"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-purple-500/20 px-3 py-1 rounded-t-lg mb-4">
              <span className="text-purple-400 font-grotesk text-sm font-medium">✨ After Brainify</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010-1.414l-8-8a1 1 0 00-1.414-1.414L8.586 7.414a1 1 0 00-1.414-1.414L8 2.586a1 1 0 00-1.414 1.414l8 8a1 1 0 001.414 1.414l-8-8a1 1 0 00-1.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-grotesk font-medium">Summary</span>
              </div>
              
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010-1.414l-8-8a1 1 0 00-1.414-1.414L8.586 7.414a1 1 0 00-1.414-1.414L8 2.586a1 1 0 00-1.414 1.414l8 8a1 1 0 001.414 1.414l-8-8a1 1 0 00-1.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-grotesk font-medium">Flashcards</span>
              </div>
              
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010-1.414l-8-8a1 1 0 00-1.414-1.414L8.586 7.414a1 1 0 00-1.414-1.414L8 2.586a1 1 0 00-1.414 1.414l8 8a1 1 0 001.414 1.414l-8-8a1 1 0 00-1.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-grotesk font-medium">Key Terms</span>
              </div>
              
              <div className="text-white/60 font-grotesk text-sm leading-relaxed">
                • Cellular respiration: ATP production, electron transport chain<br/>
                • Mitochondria: powerhouse of the cell, cristae structure<br/>
                • Practice questions with detailed explanations<br/>
                • Ready for final exam with confidence ✅<br/>
                • 47 minutes of study time saved!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
