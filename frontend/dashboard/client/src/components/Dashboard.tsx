import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Eye, 
  AlertTriangle, 
  TrendingUp, 
  RefreshCw, 
  ArrowUpRight, 
  Clock,
  Box
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../lib/utils';

const SALES_DATA = [
  { time: '08:00', sales: 45, stock: 95 },
  { time: '10:00', sales: 52, stock: 88 },
  { time: '12:00', sales: 85, stock: 75 },
  { time: '14:00', sales: 65, stock: 65 },
  { time: '16:00', sales: 95, stock: 45 },
  { time: '18:00', sales: 120, stock: 30 },
  { time: '20:00', sales: 80, stock: 25 },
];

const INVENTORY_ITEMS = [
  { id: 'SKU-001', name: 'Gala Apples', category: 'Fruits', stock: 12, status: 'Low' },
  { id: 'SKU-002', name: 'Cavendish Bananas', category: 'Fruits', stock: 45, status: 'Optimal' },
  { id: 'SKU-003', name: 'Alphonso Mangoes', category: 'Fruits', stock: 8, status: 'Critical' },
  { id: 'SKU-004', name: 'Fresh Strawberries', category: 'Berries', stock: 24, status: 'Low' },
  { id: 'SKU-005', name: 'Hass Avocados', category: 'Fruits', stock: 120, status: 'Optimal' },
];

const SHELF_DETECTION = [
  { id: 1, x: 10, y: 15, w: 20, h: 30, label: 'Cabbage', confidence: 0.98, status: 'present' },
  { id: 2, x: 35, y: 15, w: 20, h: 30, label: 'Red Bell Pepper', confidence: 0.95, status: 'present' },
  { id: 3, x: 60, y: 15, w: 20, h: 30, label: 'Courgette', confidence: 0.82, status: 'missing' },
  { id: 4, x: 10, y: 55, w: 20, h: 30, label: 'Coriander', confidence: 0.99, status: 'present' },
  { id: 5, x: 35, y: 55, w: 20, h: 30, label: 'Green Bell Pepper', confidence: 0.88, status: 'present' },
  { id: 6, x: 60, y: 55, w: 20, h: 30, label: 'Zuccini', confidence: 0.92, status: 'present' },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="liquid-glass p-6 rounded-3xl flex flex-col gap-4"
  >
    <div className="flex justify-between items-start">
      <div className="p-2 rounded-2xl bg-white/5">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs px-2 py-1 rounded-full",
        trend === 'up' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
      )}>
        {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
        {change}
      </div>
    </div>
    <div>
      <p className="font-body text-white/40 text-xs uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-heading italic text-white mt-1">{value}</h3>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div>
        <span className="section-badge">Real-time Intelligence</span>
        <h2 className="section-heading max-w-3xl">
          Eliminating the $1T Ghost Economy <br />
          <span className="text-white/40">Through Predictive Replenishment.</span>
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Shelf Availability" 
          value="94.2%" 
          change="+2.4%" 
          icon={CheckCircle2} 
          trend="up" 
        />
        <StatCard 
          title="SKUs Detected" 
          value="1,284" 
          change="+12" 
          icon={Eye} 
          trend="up" 
        />
        <StatCard 
          title="Low Stock Alerts" 
          value="18" 
          change="-4" 
          icon={AlertTriangle} 
          trend="down" 
        />
        <StatCard 
          title="Est. Sales Recovery" 
          value="$12,450" 
          change="+$840" 
          icon={TrendingUp} 
          trend="up" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Visualization */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="liquid-glass-strong p-8 rounded-[40px]"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-heading italic">Sales vs Stock Trends</h3>
                <p className="text-white/40 text-xs">Hourly analysis across all categories</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-white" /> Sales
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-white/20" /> Stock
                </div>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_DATA}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#ffffff" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="stock" 
                    stroke="rgba(255,255,255,0.2)" 
                    strokeWidth={2}
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Inventory Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="liquid-glass p-8 rounded-[40px]"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-heading italic">Inventory Management</h3>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors">
                <RefreshCw className="w-3 h-3" /> Sync Inventory
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/40">
                    <th className="pb-4 font-medium">SKU / Product</th>
                    <th className="pb-4 font-medium">Category</th>
                    <th className="pb-4 font-medium">Stock Level</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {INVENTORY_ITEMS.map((item) => (
                    <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-white">{item.name}</span>
                          <span className="text-[10px] text-white/40">{item.id}</span>
                        </div>
                      </td>
                      <td className="py-4 text-xs text-white/60">{item.category}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all duration-1000",
                                item.status === 'Critical' ? "bg-rose-500" : 
                                item.status === 'Low' ? "bg-amber-500" : "bg-white"
                              )}
                              style={{ width: `${Math.min(item.stock, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{item.stock}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-medium",
                          item.status === 'Critical' ? "bg-rose-500/10 text-rose-400" : 
                          item.status === 'Low' ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400"
                        )}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all">
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Components */}
        <div className="space-y-8">
          {/* AI Vision Feed */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="liquid-glass-strong p-6 rounded-[40px] relative overflow-hidden group"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <h3 className="text-lg font-heading italic">Live Shelf Feed</h3>
              </div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Cam-04</span>
            </div>
            
            <div className="aspect-[4/5] rounded-3xl bg-white/5 relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover opacity-100 transition-all duration-700 relative z-0"
                alt="Grocery Store Shelf Feed"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-2 py-1 rounded bg-rose-600 text-[8px] font-bold uppercase tracking-widest text-white">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Live Feed
              </div>
              
              {/* Video Fades */}
              <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black to-transparent pointer-events-none" />
              
              {/* Detection Overlays */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {SHELF_DETECTION.map((det) => (
                  <motion.g 
                    key={det.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: det.id * 0.1 }}
                  >
                    <rect 
                      x={`${det.x}%`} 
                      y={`${det.y}%`} 
                      width={`${det.w}%`} 
                      height={`${det.h}%`}
                      fill="transparent"
                      stroke={det.status === 'missing' ? 'rgba(244, 63, 94, 0.6)' : 'rgba(255, 255, 255, 0.4)'}
                      strokeWidth="1.5"
                      strokeDasharray={det.status === 'missing' ? "4 2" : "0"}
                      className="transition-all duration-300"
                    />
                    <text 
                      x={`${det.x}%`} 
                      y={`${det.y - 2}%`} 
                      fill="white" 
                      fontSize="8" 
                      className="font-body uppercase tracking-tighter"
                    >
                      {det.label} {Math.round(det.confidence * 100)}%
                    </text>
                  </motion.g>
                ))}
              </svg>

              {/* Scanning Line */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50 z-10"
              />

              <div className="absolute bottom-4 left-4 right-4 liquid-glass p-3 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3 h-3 animate-spin text-white/40" />
                  <span className="text-[10px] uppercase tracking-widest">Analyzing SKU...</span>
                </div>
                <span className="text-[10px] font-bold">98% ACC</span>
              </div>
            </div>
          </motion.div>

          {/* Predictive Alerts */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="liquid-glass p-6 rounded-[40px]"
          >
            <h3 className="text-lg font-heading italic mb-4">Predictive Alerts</h3>
            <div className="space-y-4">
              {[
                { icon: Clock, color: 'text-amber-400', title: 'Replenishment Due', desc: 'Fruit Section F-4 in 45 mins', time: '2m ago' },
                { icon: AlertTriangle, color: 'text-rose-400', title: 'Out of Stock Risk', desc: 'Alphonso Mangoes (SKU-882)', time: '12m ago' },
                { icon: TrendingUp, color: 'text-emerald-400', title: 'High Demand Spike', desc: 'Citrus Section C-2', time: '1h ago' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
                  <div className={cn("p-2 rounded-xl bg-white/5", alert.color)}>
                    <alert.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-medium">{alert.title}</h4>
                      <span className="text-[10px] text-white/20">{alert.time}</span>
                    </div>
                    <p className="text-[10px] text-white/40 mt-0.5">{alert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 rounded-full liquid-glass text-xs font-medium hover:bg-white/10 transition-all">
              View All Intelligence
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
