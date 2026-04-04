import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const SocialProof = () => {
  const universities = [
    "Oxford",
    "MIT", 
    "Harvard",
    "Stanford",
    "UCL",
    "Imperial",
    "Cambridge"
  ];

  return (
    <div className="w-full py-12 px-[5%]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-white/40 text-xs uppercase tracking-widest mb-6 font-grotesk">
          Trusted by students at
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3">
          {universities.map((university, index) => (
            <div
              key={university}
              className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-white/60 text-sm font-grotesk fade-up"
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              {university}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
