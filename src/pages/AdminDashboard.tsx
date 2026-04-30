import React from "react";
import AdminLayout from "./AdminLayout";
import { ShieldCheck, Zap } from "lucide-react";

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <header className="mb-10">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic">
          Mission <span className="text-orange-600 not-italic">Control</span>
        </h2>
        <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.3em] mt-1">
          Central Intelligence System
        </p>
      </header>

      <div className="bg-[#0a0a0a] border border-white/5 p-12 text-center flex flex-col items-center justify-center min-h-[50vh] rounded-sm">
        <div className="w-20 h-20 bg-orange-600/10 border border-orange-600/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <ShieldCheck size={40} className="text-orange-600" />
        </div>
        
        <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4">
          Welcome, <span className="text-orange-600">Commander</span>
        </h1>
        
        <p className="max-w-xl text-zinc-400 font-medium leading-relaxed mb-8">
          The Admin Portal is now online. This interface allows you to manage global users, 
          update the Flame Game database, and broadcast news across the network. 
          Your session is secured and live.
        </p>

        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-white/10 rounded-full">
            <Zap size={14} className="text-orange-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
              System Operational
            </span>
          </div>
        </div>

        <div className="mt-12 text-orange-600 font-black uppercase text-[11px] tracking-[0.4em] italic">
          Enjoy editing contents for the website
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
