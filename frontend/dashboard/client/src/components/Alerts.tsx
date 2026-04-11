import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Clock, TrendingUp, CheckCircle2, Bell, Filter, MoreHorizontal, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const ALERTS = [
  { 
    id: 'AL-001', 
    type: 'Critical', 
    title: 'Out of Stock Risk', 
    desc: 'Alphonso Mangoes (SKU-882) reached critical threshold (5 units).', 
    time: '2m ago',
    icon: AlertTriangle,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10'
  },
  { 
    id: 'AL-002', 
    type: 'Warning', 
    title: 'Replenishment Due', 
    desc: 'Fruit Section F-4 requires restocking in 45 mins based on sales velocity.', 
    time: '12m ago',
    icon: Clock,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10'
  },
  { 
    id: 'AL-003', 
    type: 'Info', 
    title: 'High Demand Spike', 
    desc: 'Citrus Section C-2 seeing 40% higher traffic than baseline.', 
    time: '1h ago',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10'
  },
  { 
    id: 'AL-004', 
    type: 'Warning', 
    title: 'Shelf Misalignment', 
    desc: 'SKU-002 (Cavendish Bananas) detected in wrong shelf position (Fruit F-1).', 
    time: '2h ago',
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10'
  },
  { 
    id: 'AL-005', 
    type: 'Info', 
    title: 'System Audit Complete', 
    desc: 'Daily shelf audit completed. 98.4% accuracy across 1,200 SKUs.', 
    time: '4h ago',
    icon: CheckCircle2,
    color: 'text-white/60',
    bg: 'bg-white/5'
  },
];

export default function AlertsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="section-heading">Intelligence Alerts</h2>
          <p className="text-white/40 text-sm mt-2 font-body">Predictive notifications and system alerts for proactive store management.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full liquid-glass text-xs font-medium hover:bg-white/5 transition-all">
            <Filter className="w-3 h-3" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors">
            <Bell className="w-3 h-3" /> Notification Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {ALERTS.map((alert) => (
            <motion.div 
              key={alert.id}
              whileHover={{ scale: 1.01 }}
              className="liquid-glass p-6 rounded-3xl group cursor-pointer"
            >
              <div className="flex gap-6">
                <div className={cn("p-4 rounded-2xl h-fit", alert.bg, alert.color)}>
                  <alert.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest",
                          alert.type === 'Critical' ? "bg-rose-500 text-white" : 
                          alert.type === 'Warning' ? "bg-amber-500 text-black" : "bg-white/10 text-white/60"
                        )}>
                          {alert.type}
                        </span>
                        <h3 className="text-sm font-medium">{alert.title}</h3>
                      </div>
                      <p className="text-xs text-white/40 font-body leading-relaxed">{alert.desc}</p>
                    </div>
                    <span className="text-[10px] text-white/20 font-medium">{alert.time}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4">
                      <button className="text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">Dismiss</button>
                      <button className="text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">Snooze</button>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white group-hover:gap-3 transition-all">
                      Take Action <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="liquid-glass p-6 rounded-[40px]">
            <h3 className="text-sm font-heading italic mb-6">Alert Statistics</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Total Today</span>
                  <span className="text-3xl font-heading italic">24</span>
                </div>
                <div className="text-emerald-400 text-xs flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3" /> -12%
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                  <span>Critical</span>
                  <span>4</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[16%] h-full bg-rose-500 rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                  <span>Warning</span>
                  <span>8</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[33%] h-full bg-amber-500 rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                  <span>Info</span>
                  <span>12</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[50%] h-full bg-white/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="liquid-glass-strong p-6 rounded-[40px]">
            <h3 className="text-sm font-heading italic mb-4">Notification Channels</h3>
            <div className="space-y-4">
              {['Push Notifications', 'Email Digests', 'SMS Alerts', 'Store Intercom'].map((channel) => (
                <div key={channel} className="flex justify-between items-center">
                  <span className="text-xs text-white/60">{channel}</span>
                  <div className="w-8 h-4 bg-emerald-500/20 rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-emerald-500 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
