import React, { useState, useEffect } from 'react';

import {
  Search,
  Bell,
  Box,
  LogOut,
  X,
  Mail
} from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

import DashboardPage from './components/Dashboard';
import InventoryPage from './components/Inventory';
import VisionPage from './components/Vision';
import AlertsPage from './components/Alerts';
import AuthPage from './components/Auth';

export default function App() {

  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [view, setView] = useState<'auth' | 'app'>('auth');

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const mockUser = {
    name: 'Kavya Shree',
    email: 'kavyax888@gmail.com',
    role: 'Store Manager',
    location: 'Downtown Branch #402'
  };

  useEffect(() => {

    const timer = setInterval(
      () => setCurrentTime(new Date()),
      1000
    );

    return () => clearInterval(timer);

  }, []);

  const handleLogout = () => {
    setView('auth');
  };

  const renderContent = () => {

    switch (activeTab) {

      case 'dashboard':
        return <DashboardPage />;

      case 'inventory':
        return <InventoryPage />;

      case 'vision':
        return <VisionPage />;

      case 'alerts':
        return <AlertsPage />;

      default:
        return <DashboardPage />;

    }

  };

  if (view === 'auth') {
    return (
      <AuthPage
        onAuthSuccess={() => setView('app')}
      />
    );
  }

  return (

    <div className="min-h-screen bg-black text-white">

      {/* Navigation */}

      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-white/5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <Box className="w-6 h-6 text-black" />
          </div>

          <div>
            <h1 className="font-heading italic font-bold text-2xl">
              ShelfPulse AI
            </h1>

            <p className="text-[10px] text-white/40 uppercase">
              Store Brain v2.4
            </p>

          </div>

        </div>

        <div className="hidden md:flex items-center gap-1 p-1 rounded-full">

          {['dashboard', 'inventory', 'vision', 'alerts'].map((tab) => (

            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2 rounded-full text-xs capitalize font-heading italic font-bold tracking-wide",
                activeTab === tab
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              )}
            >

              {tab}

            </button>

          ))}

        </div>

        <div className="flex items-center gap-4">

          <div className="hidden lg:flex flex-col items-end">

            <p className="text-xs">
              {currentTime.toLocaleTimeString()}
            </p>

            <p className="text-[10px] text-white/40">
              System Online
            </p>

          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full"
          >
            <Search />
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full text-red-400"
          >
            <LogOut />
          </button>

        </div>

      </nav>

      <main className="pt-28 pb-12 px-6 max-w-[1600px] mx-auto">

        <AnimatePresence mode="wait">

          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            {renderContent()}

          </motion.div>

        </AnimatePresence>

      </main>

    </div>

  );

}
