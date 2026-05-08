import { Need } from '../types';
import { Card } from './Card';
import { MapPin, Clock, Heart, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { motion } from 'framer-motion';

interface NeedCardProps {
  need: Need;
  onHelp?: (need: Need) => void;
  key?: string;
}

export const NeedCard = ({ need, onHelp }: NeedCardProps) => {
  const urgencyColors = {
    low: 'bg-green-600 text-white',
    medium: 'bg-slate-900 text-white',
    high: 'bg-accent text-white',
  };

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <span className={cn(
          "px-2 py-1 text-[10px] font-black tracking-widest uppercase",
          urgencyColors[need.urgency]
        )}>
          {need.urgency} Priority
        </span>
        <span className="text-slate-300">
          <Heart size={20} />
        </span>
      </div>

      <div>
        <h3 className="text-2xl font-black leading-tight text-slate-900 group-hover:text-accent transition-colors">
          {need.title}
        </h3>
        <p className="text-slate-500 mt-2 line-clamp-2 text-sm leading-relaxed font-medium">
          {need.description}
        </p>
      </div>

      <div className="flex flex-col gap-2 pt-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <MapPin size={12} />
          <span>{need.location.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={12} />
          <span>BRIDGED: {new Date(need.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 flex items-center justify-center text-white text-[10px] font-black">
            {need.requesterName[0]}
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-900">{need.requesterName}</span>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={() => onHelp?.(need)}
        >
          BRIDGE
        </Button>
      </div>
    </Card>
  );
};

import { cn } from '../lib/utils';
