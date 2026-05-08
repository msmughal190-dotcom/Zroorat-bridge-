import { Heart, Home, Search, PlusCircle, User, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navbar = ({ activeTab, onTabChange }: NavbarProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'browse', icon: Search, label: 'Explore' },
    { id: 'create', icon: PlusCircle, label: 'Need Help' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-6 pointer-events-none md:top-0 md:bottom-auto md:pt-24">
      <div className="mx-auto max-w-lg pointer-events-auto">
        <div className="flex items-center justify-around bg-slate-900 border-2 border-slate-900 p-1 shadow-2xl md:max-w-md md:mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-3 transition-all duration-300 group flex-1",
                  isActive ? "bg-white text-slate-900" : "text-slate-400 hover:text-white"
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 3 : 2} />
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-widest mt-1",
                  isActive ? "text-slate-900" : "text-slate-500"
                )}>
                  {tab.id}
                </span>
                {isActive && (
                   <motion.div 
                    layoutId="bar"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-accent"
                   />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
