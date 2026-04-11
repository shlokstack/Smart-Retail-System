import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Box,
  LogOut,
  X,
  User,
  Settings,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Info,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Page Components
import DashboardPage from './components/Dashboard';
import InventoryPage from './components/Inventory';
import VisionPage from './components/Vision';
import AlertsPage from './components/Alerts';
import AuthPage from './components/Auth';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [view, setView] = useState<'auth' | 'app'>('auth');
  
  // UI States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mockAlerts = [
    { id: 1, type: 'warning', title: 'Low Stock: Hass Avocados', time: '2 mins ago', icon: AlertTriangle },
    { id: 2, type: 'success', title: 'Shelf Audit Complete', time: '15 mins ago', icon: CheckCircle2 },
    { id: 3, type: 'info', title: 'New Vision Node Online', time: '1 hour ago', icon: Info },
  ];

  const mockUser = {
    name: 'Bhagya Shah',
    email: 'bhagyashah506@gmail.com',
    role: 'Store Manager',
    location: 'Downtown Branch #402'
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
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
    return <AuthPage onAuthSuccess={() => setView('app')} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-white/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <Box className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="font-heading italic text-2xl leading-none">ShelfPulse AI</h1>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Store Brain v2.4</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 liquid-glass p-1 rounded-full">
          {['dashboard', 'inventory', 'vision', 'alerts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-medium transition-all duration-300 capitalize",
                activeTab === tab 
                  ? "bg-white text-black" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end mr-4">
            <p className="text-xs font-medium">{currentTime.toLocaleTimeString()}</p>
            <p className="text-[10px] text-white/40 uppercase">System Online</p>
          </div>
          
          {/* Search Button */}
          <div className="relative">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full liquid-glass hover:bg-white/10 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Alerts Button */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsAlertsOpen(!isAlertsOpen);
                setIsProfileOpen(false);
              }}
              className="p-2 rounded-full liquid-glass hover:bg-white/10 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-black" />
            </button>

            <AnimatePresence>
              {isAlertsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-80 liquid-glass-strong rounded-3xl p-4 z-[60]"
                >
                  <div className="flex justify-between items-center mb-4 px-2">
                    <h3 className="text-xs font-medium uppercase tracking-widest text-white/60">Recent Alerts</h3>
                    <button className="text-[10px] text-emerald-400 hover:underline">Mark all read</button>
                  </div>
                  <div className="space-y-2">
                    {mockAlerts.map((alert) => (
                      <div key={alert.id} className="p-3 rounded-2xl hover:bg-white/5 transition-colors flex gap-3 group cursor-pointer">
                        <div className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
                          alert.type === 'warning' ? "bg-rose-500/20 text-rose-400" :
                          alert.type === 'success' ? "bg-emerald-500/20 text-emerald-400" :
                          "bg-blue-500/20 text-blue-400"
                        )}>
                          <alert.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{alert.title}</p>
                          <p className="text-[10px] text-white/40 mt-0.5">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      setActiveTab('alerts');
                      setIsAlertsOpen(false);
                    }}
                    className="w-full mt-4 py-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors border-t border-white/5 pt-4"
                  >
                    View All Alerts
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Profile Button */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsAlertsOpen(false);
              }}
              className="w-10 h-10 rounded-full liquid-glass p-0.5 overflow-hidden hover:scale-105 transition-transform"
            >
              <img 
                src="https://picsum.photos/seed/retail/100/100" 
                className="w-full h-full rounded-full object-cover"
                alt="User"
                referrerPolicy="no-referrer"
              />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-72 liquid-glass-strong rounded-3xl p-6 z-[60]"
                >
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 rounded-full liquid-glass p-1 mb-3">
                      <img 
                        src="https://picsum.photos/seed/retail/100/100" 
                        className="w-full h-full rounded-full object-cover"
                        alt="User"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h3 className="text-lg font-medium">{mockUser.name}</h3>
                    <p className="text-xs text-white/40">{mockUser.role}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <Mail className="w-4 h-4 text-white/20" />
                      {mockUser.email}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <Shield className="w-4 h-4 text-white/20" />
                      {mockUser.location}
                    </div>
                  </div>

                  <div className="space-y-1 border-t border-white/5 pt-4">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors text-xs text-white/60 hover:text-white">
                      <Settings className="w-4 h-4" />
                      Account Settings
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-rose-500/10 transition-colors text-xs text-rose-400"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-start justify-center pt-32 px-6"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-2xl"
            >
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Search products, SKUs, or alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-20 text-xl font-light focus:outline-none focus:border-white/20 transition-all"
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-white/40" />
                </button>
              </div>

              <div className="mt-12">
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/20 mb-6 ml-4">Quick Suggestions</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Gala Apples', 'Citrus', 'Inventory Audit', 'Vision Nodes', 'Replenishment'].map((item) => (
                    <button 
                      key={item}
                      onClick={() => setSearchQuery(item)}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group"
                    >
                      <p className="text-xs text-white/60 group-hover:text-white transition-colors">{item}</p>
                    </button>
                  ))}
                </div>
              </div>

              {searchQuery && (
                <div className="mt-12 p-8 rounded-[2rem] liquid-glass-strong">
                  <p className="text-sm text-white/40 italic">Searching for "{searchQuery}"...</p>
                  <div className="mt-4 h-32 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin" />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-28 pb-12 px-6 max-w-[1600px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 px-6 py-2 bg-black/80 backdrop-blur-md border-t border-white/5 flex justify-between items-center text-[10px] text-white/40 uppercase tracking-[0.2em]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>AI Core Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Vision Nodes Sync</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span>Latency: 14ms</span>
          <span>Last Audit: 12:45:02</span>
        </div>
      </footer>
    </div>
  );
}
