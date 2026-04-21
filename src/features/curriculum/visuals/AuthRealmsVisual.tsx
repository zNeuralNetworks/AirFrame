
import React from 'react';
import { Key, UserCheck, Lock, Users, ArrowRight, XCircle } from 'lucide-react';

const AuthRealmsVisual: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 font-sans text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
         {/* PSK (Shared) */}
         <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-4 text-orange-400">
                <Key className="w-5 h-5" />
                <span className="font-bold text-sm uppercase">WPA2-PSK (Personal)</span>
            </div>
            
            <div className="flex flex-col gap-4">
                <div className="flex justify-center items-center gap-2">
                    <div className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded font-mono text-xs border border-orange-500/50">
                        Password123
                    </div>
                </div>
                
                <div className="flex justify-center gap-2">
                    <div className="flex flex-col items-center">
                        <Users className="w-6 h-6 text-slate-400" />
                        <span className="text-[10px] text-slate-500">Staff</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Users className="w-6 h-6 text-slate-400" />
                        <span className="text-[10px] text-slate-500">Guest</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Users className="w-6 h-6 text-slate-400" />
                        <span className="text-[10px] text-slate-500">IoT</span>
                    </div>
                </div>

                <div className="bg-red-900/30 p-2 rounded text-xs text-red-300 flex items-start gap-2">
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    If one device is compromised, you must change the key for EVERYONE.
                </div>
            </div>
         </div>

         {/* 802.1X (Enterprise) */}
         <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-4 text-green-400">
                <UserCheck className="w-5 h-5" />
                <span className="font-bold text-sm uppercase">802.1X (Enterprise)</span>
            </div>
            
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-600">
                    <span className="text-xs font-bold">User: Alice</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] bg-green-900 text-green-300 px-2 rounded">VLAN 10 (Eng)</span>
                </div>
                <div className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-600">
                    <span className="text-xs font-bold">User: Bob</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] bg-blue-900 text-blue-300 px-2 rounded">VLAN 20 (HR)</span>
                </div>
                
                <div className="bg-green-900/30 p-2 rounded text-xs text-green-300 flex items-start gap-2 mt-1">
                    <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                    Unique encryption keys per user. Revoke Alice without affecting Bob.
                </div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default AuthRealmsVisual;
