/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Zap,
  PlusCircle,
  CheckCircle2,
  Play,
  Settings2,
  ShieldAlert,
  History,
} from "lucide-react";

type AutomationRule = {
  id: number;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  status: boolean;
  runCount: number;
};

export default function AutomationEnginePage() {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: 1,
      name: "কুরিয়ার Delivered হলে অর্ডার ও COD পাওনা আপডেট",
      trigger: "Courier Status = Delivered",
      condition: "Payment Status == Pending",
      action: "Update Order to Completed & Add COD Ledger",
      status: true,
      runCount: 142,
    },
    {
      id: 2,
      name: "কম স্টক হলে ইমার্জেন্সি অ্যালার্ট",
      trigger: "Inventory Stock < 5",
      condition: "Product Status == Active",
      action: "Send Admin Notification & Low Stock Tag",
      status: true,
      runCount: 18,
    },
    {
      id: 3,
      name: "নতুন অর্ডারে অটো স্টক রিজার্ভেশন",
      trigger: "New Order Created",
      condition: "Stock >= Ordered Qty",
      action: "Deduct Stock & Assign Order ID",
      status: true,
      runCount: 325,
    },
  ]);

  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [ruleName, setRuleName] = useState("");
  const [selectedTrigger, setSelectedTrigger] = useState("New Order Created");
  const [selectedAction, setSelectedAction] = useState("Update Order Status");

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleName) {
      alert("দয়া করে অটোমেশন নিয়মের নাম লিখুন!");
      return;
    }

    const newRule: AutomationRule = {
      id: rules.length + 1,
      name: ruleName,
      trigger: selectedTrigger,
      condition: "Custom Parameters Matched",
      action: selectedAction,
      status: true,
      runCount: 0,
    };

    setRules([...rules, newRule]);
    setShowBuilderModal(false);
    setRuleName("");
    alert("✅ নতুন অটোমেশন রুল সফলভাবে তৈরি ও লাইভ করা হয়েছে!");
  };

  const toggleRuleStatus = (id: number) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, status: !r.status } : r)));
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Phase 4: Workflow Automation Engine
          </span>
          <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
            <Zap className="text-amber-400" size={22} /> Automation Rules &
            Workflow Builder
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            ব্যবসার রুটিন কাজগুলো স্বয়ংক্রিয় করার জন্য ট্রিগার, কন্ডিশন এবং
            অ্যাকশন কনফিগার করুন।
          </p>
        </div>
        <button
          onClick={() => setShowBuilderModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-lg"
        >
          <PlusCircle size={16} /> Create New Automation Rule
        </button>
      </div>

      {/* Rules Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Active Workflows
            </p>
            <h3 className="text-2xl font-black text-emerald-400 mt-1">
              {rules.filter((r) => r.status).length} Rules
            </h3>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              Running Background Jobs
            </span>
          </div>
          <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-2xl">
            <Play size={26} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Total Executions
            </p>
            <h3 className="text-2xl font-black text-cyan-400 mt-1">
              485 Times
            </h3>
            <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              100% Success Rate
            </span>
          </div>
          <div className="p-3.5 bg-cyan-500/10 text-cyan-400 rounded-2xl">
            <History size={26} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Failed / Retrying
            </p>
            <h3 className="text-2xl font-black text-white mt-1">0 Jobs</h3>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              All Systems Normal
            </span>
          </div>
          <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl">
            <CheckCircle2 size={26} />
          </div>
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-base font-black text-white">
            Configured Automation Workflows
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            রিয়েল-টাইম ইভেন্ট লিসেনার ও ট্রিগার ইঞ্জিন রেজিস্টার।
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                <th className="p-4">Rule Name</th>
                <th className="p-4">Trigger Event</th>
                <th className="p-4">Condition</th>
                <th className="p-4">Automated Action</th>
                <th className="p-4">Executions</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Toggle / Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-800/50 transition">
                  <td className="p-4 font-bold text-white">{rule.name}</td>
                  <td className="p-4 font-mono text-cyan-400">
                    {rule.trigger}
                  </td>
                  <td className="p-4 text-slate-300">{rule.condition}</td>
                  <td className="p-4 text-amber-400 font-medium">
                    {rule.action}
                  </td>
                  <td className="p-4 font-bold text-white">
                    {rule.runCount} Runs
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        rule.status
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {rule.status ? "Active" : "Paused"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleRuleStatus(rule.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                        rule.status
                          ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                          : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                      }`}
                    >
                      {rule.status ? "⏸ Pause" : "▶ Resume"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Rule Modal */}
      {showBuilderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Settings2 size={18} className="text-amber-400" /> Visual Rule
                Builder
              </h3>
              <button
                onClick={() => setShowBuilderModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Rule Name (নিয়মের নাম) *
                </label>
                <input
                  type="text"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  placeholder="যেমন: অর্ডার প্লেস হলে অটো এসএমএস পাঠানো"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Select Trigger (যখন ঘটবে)
                </label>
                <select
                  value={selectedTrigger}
                  onChange={(e) => setSelectedTrigger(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                >
                  <option>New Order Created</option>
                  <option>Courier Status = Delivered</option>
                  <option>Courier Status = Cancelled</option>
                  <option>Inventory Stock &lt; 5</option>
                  <option>Payment Received</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Select Action (তখন যা হবে)
                </label>
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                >
                  <option>Update Order Status</option>
                  <option>Send Bulk SMS Notification</option>
                  <option>Deduct / Reserve Stock</option>
                  <option>Create Settlement Exception</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowBuilderModal(false)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg"
                >
                  ⚡ Save & Activate Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
