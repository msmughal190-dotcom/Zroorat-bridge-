import { motion } from 'framer-motion';
import { Button } from './Button';
import { Heart, ShieldCheck, Users } from 'lucide-react';

export const Hero = ({ onGetHelp, onGiveHelp }: { onGetHelp: () => void; onGiveHelp: () => void }) => {
  return (
    <div className="relative pt-32 pb-24 overflow-hidden bg-white border-b border-slate-200">
      <div className="container mx-auto px-12 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 items-center">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6 }}
           className="md:col-span-12 lg:col-span-7"
        >
          <div className="w-16 h-1 bg-accent mb-10" />
          <h1 className="text-6xl md:text-8xl font-black leading-[0.85] text-slate-900 mb-8 uppercase">
            Connecting<br />Necessity to<br /><span className="text-accent italic">Provision.</span>
          </h1>
          
          <p className="max-w-xl text-xl text-slate-500 leading-relaxed mb-12 font-medium">
            An architectural platform designed to bridge the gap between verified community needs and available neighbors.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Button size="lg" onClick={onGiveHelp} className="w-full sm:w-auto">
              Bridge Support
            </Button>
            <Button size="lg" variant="outline" onClick={onGetHelp} className="w-full sm:w-auto">
              Post Necessity
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:col-span-5 lg:flex flex-col gap-8"
        >
          <div className="border-l-4 border-slate-900 pl-8 py-4">
             <div className="text-6xl font-black text-slate-900 tracking-tighter">1,240+</div>
             <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mt-2">Active Bridges</div>
          </div>
          <div className="border-l-4 border-slate-200 pl-8 py-4">
             <div className="text-6xl font-black text-slate-900 tracking-tighter">850</div>
             <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mt-2">Regions Covered</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
