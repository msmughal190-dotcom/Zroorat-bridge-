/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { Landing } from './views/Landing';
import { Explore } from './views/Explore';
import { CreateNeed } from './views/CreateNeed';
import { Profile } from './views/Profile';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleCreated = () => setActiveTab('browse');
    window.addEventListener('need-created', handleCreated);
    return () => window.removeEventListener('need-created', handleCreated);
  }, []);

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <Landing onExplore={() => setActiveTab('browse')} onCreate={() => setActiveTab('create')} />;
      case 'browse':
        return <Explore />;
      case 'create':
        return <CreateNeed />;
      case 'messages':
        return (
          <div className="pt-24 px-6 text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">Messages</h1>
            <p className="text-stone-500">Your direct connections will appear here once someone bridges your request.</p>
          </div>
        );
      case 'profile':
        return <Profile />;
      default:
        return <Landing onExplore={() => setActiveTab('browse')} onCreate={() => setActiveTab('create')} />;
    }
  };

  return (
    <div className="min-h-screen bg-warm-bg overflow-x-hidden">
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
      
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

