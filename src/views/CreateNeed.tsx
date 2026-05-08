import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { NeedCategory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, MapPin, AlertCircle, ShoppingBag, Pill, Shirt, Book, Users } from 'lucide-react';
import { cn } from '../lib/utils';

export const CreateNeed = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'food' as NeedCategory,
    urgency: 'medium' as 'low' | 'medium' | 'high',
    address: ''
  });

  const categories = [
    { id: 'food', icon: ShoppingBag, label: 'Food' },
    { id: 'medicine', icon: Pill, label: 'Medicine' },
    { id: 'clothes', icon: Shirt, label: 'Clothes' },
    { id: 'education', icon: Book, label: 'Books' },
    { id: 'volunteer', icon: Users, label: 'Service' },
    { id: 'emergency', icon: AlertCircle, label: 'Emergency' },
  ];

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase">What is the necessity?</h2>
              <p className="text-slate-500 text-sm font-medium">Select a categorical classification for your request.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = formData.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFormData({ ...formData, category: cat.id as NeedCategory })}
                    className={cn(
                      "flex flex-col items-center justify-center p-6 border-2 transition-all duration-300",
                      isSelected 
                        ? "bg-slate-900 border-slate-900 text-white shadow-xl" 
                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
                    )}
                  >
                    <Icon size={24} className={cn("mb-2", isSelected ? "text-accent" : "text-slate-900")} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Urgency Parameters</label>
              <div className="flex gap-4">
                {['low', 'medium', 'high'].map((u) => (
                  <button
                    key={u}
                    onClick={() => setFormData({ ...formData, urgency: u as any })}
                    className={cn(
                      "flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-2",
                      formData.urgency === u
                        ? "bg-accent border-accent text-white"
                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                    )}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase">Mission Logistics</h2>
              <p className="text-slate-500 text-sm font-medium">Provide explicit data to facilitate the bridging process.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject Line</label>
                <input 
                  type="text" 
                  placeholder="E.G. MANDATORY MEDICAL SUPPLY"
                  className="w-full bg-slate-50 border-2 border-slate-100 p-5 outline-none focus:border-slate-900 transition-all font-mono text-sm uppercase tracking-widest"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comprehensive Details</label>
                <textarea 
                  rows={4}
                  placeholder="EXPLAIN THE NECESSITY IN DETAIL..."
                  className="w-full bg-slate-50 border-2 border-slate-100 p-5 outline-none focus:border-slate-900 transition-all font-mono text-sm uppercase tracking-widest resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase">Geographic Index</h2>
              <p className="text-slate-500 text-sm font-medium">Define the physical location for resource allocation.</p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} strokeWidth={3} />
                <input 
                  type="text" 
                  placeholder="ENTER REGIONAL COORDINATES OR ADDRESS"
                  className="w-full bg-slate-50 border-2 border-slate-100 py-5 pl-16 pr-6 outline-none focus:border-slate-900 font-mono text-sm uppercase tracking-widest"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((pos) => {
                       setFormData({ ...formData, address: `COORDINATES: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}` });
                    });
                  }
                }}
              >
                Sync Current Position
              </Button>
            </div>

            <div className="p-8 bg-accent/5 border-l-4 border-accent">
               <p className="text-xs text-accent font-black uppercase tracking-widest leading-relaxed italic">
                 Security Alert: Exact geographic data is strictly isolated to verified bridge partners for mission execution.
               </p>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-12 pt-40 pb-32 max-w-3xl">
      <div className="flex items-center gap-6 mb-12">
        <div className="h-1 flex-1 bg-slate-200 overflow-hidden">
          <motion.div 
            className="h-full bg-accent" 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sequence {step}/3</span>
      </div>

      <Card className="p-12 shadow-[16px_16px_0px_rgba(15,23,42,0.1)]">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        <div className="mt-12 flex justify-between gap-4">
          {step > 1 ? (
            <Button variant="ghost" onClick={prevStep} className="flex items-center gap-2">
              <ChevronLeft size={20} />
              Back
            </Button>
          ) : <div />}
          
          <Button 
            className="flex-1 sm:grow-0 sm:min-w-[160px] flex items-center justify-center gap-2"
            onClick={step === 3 ? () => {
              // In a real app, we would save to Firebase here
              alert('Request Posted! Your need is now visible to the community.');
              window.dispatchEvent(new CustomEvent('need-created'));
            } : nextStep}
            disabled={step === 2 && !formData.title}
          >
            {step === 3 ? 'Post Request' : 'Continue'}
            {step < 3 && <ChevronRight size={20} />}
          </Button>
        </div>
      </Card>
    </div>
  );
};
