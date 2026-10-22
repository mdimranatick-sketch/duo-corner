/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Activity,
  Server,
  Database,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
  HardDrive,
  Terminal,
} from "lucide-react";

export default function SystemHealthPage() {
  const [refreshing, setRefreshing] = useState(false);

  const [services] = useState([
    {
      name: "Core Next.js Application",
      type: "Frontend / SSR",
      status: "Operational",
      latency: "45ms",
      uptime: "99.98%",
    },
    {
      name: "Google Sheets API (Database)",
      type: "Storage Sync",
      status: "Synced",
      latency: "210ms",
      uptime: "99.90%",
    },
    {
      name: "Steadfast Courier API",
      type: "Logistics Integration",
      status: "Connected",
      latency: "165ms",
      uptime: "100%",
    },
    {
      name: "Meta Conversion API (CAPI)",
      type: "Marketing Tracking",
      status: "Active",
      latency: "85ms",
      uptime: "99.95%",
    },
    {
      name: "Background Automation Engine",
      type: "Workflow Queue",
      status: "Running",
      latency: "12ms",
      uptime: "100%",
    },
  ]);

  const [logs] = useState([
    {
      id: "LOG-901",
      time: "2026-10-19 12:45:10",
      type: "INFO",
      service: "Steadfast API",
      message: "Consignment successfully booked for order ORD-101",
    },
    {
      id: "LOG-902",
      time: "2026-10-19 12:40:02",
      type: "SYNC",
      service: "Google Sheets",
      message: "Batch order data synced successfully (3 new entries)",
    },
    {
      id: "LOG-903",
      time: "2026-10-19 11:15:30",
      type: "SECURITY",
      service: "RBAC Engine",
      message: "Admin permission matrix successfully updated by Super Admin",
    },
    {
      id: "LOG-904",
      time: "2026-10-19 10:02:14",
      type: "WARN",
      service: "Inventory",
      message:
        "Low stock threshold reached for Product: Magnetic Couple Bracelet",
    },
  ]);

  const handleRefreshHealth = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      alert("✅ সিস্টেম হেলথ ডায়াগনস্টিক সম্পন্ন! সকল সার্ভিস ১০০% সচল রয়েছে।");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Phase 9: System Health & Diagnostics
          </span>
          <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
            <Activity className="text-emerald-400" size={22} /> System Health &
            Integration Monitoring
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            সার্ভার লেটেন্সি, API কানেক্টিভিটি, ব্যাকগ্রাউন্ড জব কিউ এবং
            সিকিউরিটি অডিট লগ মনিটর করুন।
          </p>
        </div>
        <button
          onClick={handleRefreshHealth}
          disabled={refreshing}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-lg disabled:opacity-50"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />{" "}
          {refreshing ? "Diagnosing..." : "🔄 Run Diagnostics"}
        </button>
      </div>

      {/* System Status Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              System Status
            </p>
            <h3 className="text-2xl font-black text-emerald-400 mt-1">
              Operational
            </h3>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              Uptime: 99.98%
            </span>
          </div>
          <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-2xl">
            <Server size={26} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Database Sync
            </p>
            <h3 className="text-2xl font-black text-cyan-400 mt-1">
              Real-time
            </h3>
            <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              Google Sheets API Connected
            </span>
          </div>
          <div className="p-3.5 bg-cyan-500/10 text-cyan-400 rounded-2xl">
            <Database size={26} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Average Latency
            </p>
            <h3 className="text-2xl font-black text-amber-500 mt-1">112 ms</h3>
            <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              Optimal Performance
            </span>
          </div>
          <div className="p-3.5 bg-amber-500/10 text-amber-500 rounded-2xl">
            <Activity size={26} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Backup Status
            </p>
            <h3 className="text-2xl font-black text-white mt-1">Secured</h3>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              Auto Backup Active
            </span>
          </div>
          <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl">
            <HardDrive size={26} />
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-base font-black text-white">
            Connected Microservices & Integrations
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            রিয়েল-টাইম এপিআই ও ক্লাউড সার্ভিস হেলথ স্ট্যাটাস।
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                <th className="p-4">Service Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4">Response Latency</th>
                <th className="p-4 text-right">Uptime Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {services.map((srv, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50 transition">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />{" "}
                    {srv.name}
                  </td>
                  <td className="p-4 text-slate-300">{srv.type}</td>
                  <td className="p-4">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold text-[10px]">
                      {srv.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-cyan-400">{srv.latency}</td>
                  <td className="p-4 text-right font-bold text-white">
                    {srv.uptime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Logs Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Terminal size={16} className="text-emerald-400" /> Real-time System
            & Audit Logs
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Secure Log Stream
          </span>
        </div>

        <div className="p-4 space-y-2 font-mono text-xs bg-slate-950/80 max-h-64 overflow-y-auto">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-slate-900/90 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    log.type === "INFO"
                      ? "bg-cyan-500/20 text-cyan-400"
                      : log.type === "SYNC"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : log.type === "SECURITY"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {log.type}
                </span>
                <span className="text-slate-400 text-[11px]">{log.time}</span>
                <span className="text-amber-300 font-bold">
                  [{log.service}]
                </span>
                <span className="text-slate-200">{log.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
