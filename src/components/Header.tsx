import { User, Bell, Menu } from 'lucide-react';
import { Button } from './Button';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-12 py-5">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white rotate-45" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">
            ZROORAT <span className="text-accent italic">BRIDGE</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-8 mr-8">
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900">Impact</button>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900">Ledger</button>
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
            <Bell size={18} strokeWidth={2.5} />
          </button>
          <div className="h-10 w-10 bg-slate-900 border border-slate-200 overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="User" 
              className="w-full h-full object-cover rounded-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
