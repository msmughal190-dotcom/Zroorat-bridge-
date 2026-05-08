import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { NeedCard } from '../components/NeedCard';
import { Need } from '../types';

export const Landing = ({ onExplore, onCreate }: { onExplore: () => void; onCreate: () => void }) => {
  const featuredNeeds: Need[] = [
    {
      id: '1',
      title: 'Winter clothes for children',
      description: 'We are looking for warm clothes and blankets for a group of 5 children in the local community center.',
      category: 'clothes',
      location: { lat: 30.3753, lng: 69.3451, address: 'Lahore, Punjab' },
      requesterId: 'user1',
      requesterName: 'Ammar J.',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      urgency: 'high'
    },
    {
      id: '2',
      title: 'Life-saving insulin supply',
      description: 'Urgently need assistance getting insulin for an elderly patient who cannot afford this month\'s supply.',
      category: 'medicine',
      location: { lat: 24.8607, lng: 67.0011, address: 'Karachi, Sindh' },
      requesterId: 'user2',
      requesterName: 'Zainab R.',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      urgency: 'high'
    }
  ];

  return (
    <div className="min-h-screen pb-24">
      <Hero onGetHelp={onCreate} onGiveHelp={onExplore} />
      
      <section className="container mx-auto px-12 py-16">
        <div className="flex flex-col mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-2">Live Registry</span>
          <div className="flex items-end justify-between border-b-2 border-slate-900 pb-4">
            <h2 className="text-4xl font-black text-slate-900 uppercase">Urgent Missions</h2>
            <button 
              onClick={onExplore}
              className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
            >
              Access Complete Registry &rarr;
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {featuredNeeds.map((need, i) => (
            <motion.div
              key={need.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <NeedCard need={need} onHelp={onExplore} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-24 px-12">
        <div className="mx-auto text-center">
          <div className="w-12 h-1 bg-accent mx-auto mb-10" />
          <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter">Become the <span className="text-accent italic">Bridge.</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-16 text-lg font-medium leading-relaxed">
            Join our network of structural community support. Your resources, paired with verified needs, create the stability our neighbors depend on.
          </p>
          <div className="flex flex-wrap justify-center gap-20 text-center uppercase tracking-widest">
            <div>
              <div className="text-6xl font-black mb-4">142</div>
              <div className="text-slate-500 text-[10px] font-bold">Active Missions</div>
            </div>
            <div>
              <div className="text-6xl font-black mb-4">850</div>
              <div className="text-slate-500 text-[10px] font-bold">Regions Reached</div>
            </div>
            <div>
              <div className="text-6xl font-black mb-4">12k</div>
              <div className="text-slate-500 text-[10px] font-bold">Bridge Nodes</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
