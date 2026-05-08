import { AppUser } from '../types';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Award, Heart, MessageSquare, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Profile = () => {
  const user: AppUser = {
    uid: '123',
    displayName: 'Felix Mughal',
    email: 'msmughal190@gmail.com',
    points: 450,
    bio: 'Community volunteer and bridge builder since 2024. Passionate about local food security and education.'
  };

  const stats = [
    { label: 'Bridges Built', value: '12', icon: Heart },
    { label: 'Karma Points', value: '450', icon: Award },
    { label: 'Requests Made', value: '2', icon: MessageSquare },
  ];

  return (
    <div className="container mx-auto px-6 pt-24 pb-32 max-w-4xl">
      <Card className="p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-stone-100 p-1 border-4 border-white shadow-xl overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full border-2 border-white">
              <Award size={16} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-stone-800">{user.displayName}</h1>
                <p className="text-stone-400 text-sm mt-1">{user.email}</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit3 size={16} />
                Edit Profile
              </Button>
            </div>
            <p className="mt-6 text-stone-500 leading-relaxed max-w-2xl">{user.bio}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-stone-100">
           {stats.map((stat, i) => {
             const Icon = stat.icon;
             return (
               <div key={i} className="text-center">
                 <div className="flex justify-center text-primary mb-2">
                   <Icon size={20} />
                 </div>
                 <div className="text-2xl font-bold text-stone-800">{stat.value}</div>
                 <div className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">{stat.label}</div>
               </div>
             );
           })}
        </div>
      </Card>

      <h2 className="font-serif text-2xl font-bold text-stone-800 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {[
          { label: 'Provided food basket to Zainab R.', status: 'Completed', date: '2 days ago' },
          { label: 'Donated books to Education center', status: 'Pending', date: '5 days ago' },
        ].map((act, i) => (
          <Card key={i} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-primary">
                <Heart size={20} />
              </div>
              <div>
                <p className="font-medium text-stone-800 text-sm">{act.label}</p>
                <p className="text-[10px] text-stone-400">{act.date}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded">
              {act.status}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};
