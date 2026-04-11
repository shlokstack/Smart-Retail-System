import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { RefreshCw, Eye, Maximize2, Camera, Settings, Shield } from 'lucide-react';
import Hls from 'hls.js';
import { cn } from '../lib/utils';

const SHELF_DETECTION = [
  { id: 1, x: 10, y: 15, w: 20, h: 30, label: 'Apple', confidence: 0.98, status: 'present' },
  { id: 2, x: 35, y: 15, w: 20, h: 30, label: 'Strawberry', confidence: 0.95, status: 'present' },
  { id: 3, x: 60, y: 15, w: 20, h: 30, label: 'Avocado', confidence: 0.12, status: 'missing' },
  { id: 4, x: 10, y: 55, w: 20, h: 30, label: 'Orange', confidence: 0.99, status: 'present' },
  { id: 5, x: 35, y: 55, w: 20, h: 30, label: 'Grapes', confidence: 0.88, status: 'present' },
  { id: 6, x: 60, y: 55, w: 20, h: 30, label: 'Mango', confidence: 0.92, status: 'present' },
];

const CAMERAS = [
  { id: 'CAM-01', name: 'Fruit Aisle', status: 'Online', resolution: '4K' },
  { id: 'CAM-02', name: 'Citrus Corner', status: 'Online', resolution: '4K' },
  { id: 'CAM-03', name: 'Berry Bay', status: 'Offline', resolution: '1080p' },
  { id: 'CAM-04', name: 'Tropical Wall', status: 'Online', resolution: '4K' },
];

export default function VisionPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="section-heading">ShelfPulse AI Vision</h2>
          <p className="text-white/40 text-sm mt-2 font-body">Real-time SKU detection and shelf auditing powered by computer vision.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full liquid-glass text-xs font-medium hover:bg-white/5 transition-all">
            <Settings className="w-3 h-3" /> Calibration
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors">
            <Shield className="w-3 h-3" /> Security Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Camera List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-heading italic text-white/60 mb-4">Active Nodes</h3>
          {CAMERAS.map((cam) => (
            <div key={cam.id} className="liquid-glass p-4 rounded-2xl group cursor-pointer hover:bg-white/5 transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn("w-1.5 h-1.5 rounded-full", cam.status === 'Online' ? "bg-emerald-500" : "bg-rose-500")} />
                  <span className="text-xs font-medium">{cam.name}</span>
                </div>
                <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">{cam.resolution}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/40">{cam.id}</span>
                <Camera className="w-3 h-3 text-white/20 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          <div className="liquid-glass-strong p-2 rounded-[40px] relative overflow-hidden group">
            <div className="aspect-video rounded-[32px] bg-white/5 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600" 
                className="w-full h-full object-cover opacity-100 transition-all duration-700 relative z-0"
                alt="Main Shelf Feed"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute top-6 left-6 z-20 flex items-center gap-3 px-3 py-1.5 rounded-full bg-rose-600 text-[10px] font-bold uppercase tracking-widest text-white">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Live Feed: CAM-04
              </div>

              <div className="absolute top-6 right-6 z-20 flex gap-2">
                <button className="p-2 rounded-full liquid-glass hover:bg-white/10 transition-all">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
              
              {/* Video Fades */}
              <div className="absolute top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-black to-transparent pointer-events-none" />
              
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
                      strokeWidth="2"
                      strokeDasharray={det.status === 'missing' ? "6 3" : "0"}
                      className="transition-all duration-300"
                    />
                    <text 
                      x={`${det.x}%`} 
                      y={`${det.y - 2}%`} 
                      fill="white" 
                      fontSize="10" 
                      className="font-body uppercase tracking-tighter font-bold"
                    >
                      {det.label} {Math.round(det.confidence * 100)}%
                    </text>
                  </motion.g>
                ))}
              </svg>

              {/* Scanning Line */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50 z-10"
              />

              <div className="absolute bottom-8 left-8 right-8 liquid-glass p-4 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <RefreshCw className="w-4 h-4 animate-spin text-white/40" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">AI Engine Status</span>
                    <span className="text-xs font-medium">Analyzing SKU Patterns...</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block">Confidence</span>
                    <span className="text-xs font-bold">98.4%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block">Objects</span>
                    <span className="text-xs font-bold">42 Detected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="liquid-glass p-6 rounded-3xl">
              <h4 className="text-sm font-heading italic mb-4">Detection Metrics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/40">SKU Accuracy</span>
                  <span className="text-xs font-medium">99.2%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[99%] h-full bg-white rounded-full" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/40">Processing Latency</span>
                  <span className="text-xs font-medium">12ms</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[12%] h-full bg-white rounded-full" />
                </div>
              </div>
            </div>
            <div className="liquid-glass p-6 rounded-3xl">
              <h4 className="text-sm font-heading italic mb-4">Vision Node Health</h4>
              <div className="flex items-center justify-center h-24">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [10, 30, 15, 40, 20] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 bg-white/20 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
