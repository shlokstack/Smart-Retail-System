import React from 'react';
import { motion } from 'motion/react';
import { RefreshCw, ArrowUpRight, Search, Filter, Download, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

const INVENTORY_ITEMS = [
  { id: 'SKU-001', name: 'Gala Apples', category: 'Fruits', stock: 12, status: 'Low', price: '$2.49/lb', lastRestocked: '2 days ago' },
  { id: 'SKU-002', name: 'Cavendish Bananas', category: 'Fruits', stock: 45, status: 'Optimal', price: '$0.69/lb', lastRestocked: 'Today' },
  { id: 'SKU-003', name: 'Alphonso Mangoes', category: 'Tropical', stock: 8, status: 'Critical', price: '$2.99/ea', lastRestocked: '3 days ago' },
  { id: 'SKU-004', name: 'Fresh Strawberries', category: 'Berries', stock: 24, status: 'Low', price: '$4.99', lastRestocked: 'Yesterday' },
  { id: 'SKU-005', name: 'Seedless Grapes', category: 'Fruits', stock: 120, status: 'Optimal', price: '$3.99/lb', lastRestocked: '1 week ago' },
  { id: 'SKU-006', name: 'Navel Oranges', category: 'Citrus', stock: 85, status: 'Optimal', price: '$1.19/lb', lastRestocked: '4 days ago' },
  { id: 'SKU-007', name: 'Hass Avocados', category: 'Fruits', stock: 15, status: 'Low', price: '$1.49/ea', lastRestocked: 'Today' },
  { id: 'SKU-008', name: 'Golden Pineapples', category: 'Tropical', stock: 32, status: 'Optimal', price: '$3.49/ea', lastRestocked: '2 days ago' },
  { id: 'SKU-009', name: 'Watermelons', category: 'Fruits', stock: 5, status: 'Critical', price: '$6.99/ea', lastRestocked: '2 weeks ago' },
  { id: 'SKU-010', name: 'Kiwi (6-pack)', category: 'Fruits', stock: 60, status: 'Optimal', price: '$4.50', lastRestocked: 'Yesterday' },
];

export default function InventoryPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="section-heading">Inventory Management</h2>
          <p className="text-white/40 text-sm mt-2 font-body">Manage and track your store's stock levels in real-time.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full liquid-glass text-xs font-medium hover:bg-white/5 transition-all">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors">
            <Plus className="w-3 h-3" /> Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="liquid-glass p-4 rounded-3xl flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white/5">
            <Search className="w-4 h-4 text-white/60" />
          </div>
          <input 
            type="text" 
            placeholder="Search SKUs or products..." 
            className="bg-transparent border-none outline-none text-sm w-full font-body placeholder:text-white/20"
          />
        </div>
        <div className="liquid-glass p-4 rounded-3xl flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white/5">
            <Filter className="w-4 h-4 text-white/60" />
          </div>
          <select className="bg-transparent border-none outline-none text-sm w-full font-body text-white/60 appearance-none">
            <option>All Categories</option>
            <option>Fruits</option>
            <option>Citrus</option>
            <option>Berries</option>
            <option>Tropical</option>
          </select>
        </div>
        <div className="liquid-glass p-4 rounded-3xl flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white/5">
            <RefreshCw className="w-4 h-4 text-white/60" />
          </div>
          <div className="text-sm font-body text-white/60">Last synced: 2 mins ago</div>
        </div>
      </div>

      <div className="liquid-glass p-8 rounded-[40px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/40">
                <th className="pb-4 font-medium">Product Details</th>
                <th className="pb-4 font-medium">Category</th>
                <th className="pb-4 font-medium">Stock Level</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Price</th>
                <th className="pb-4 font-medium">Last Restocked</th>
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
                  <td className="py-4 text-xs text-white/60">{item.price}</td>
                  <td className="py-4 text-xs text-white/60">{item.lastRestocked}</td>
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
      </div>
    </motion.div>
  );
}
