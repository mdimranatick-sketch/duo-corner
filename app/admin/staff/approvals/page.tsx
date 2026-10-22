/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

type ApprovalRequest = {
  id: string;
  requester: string;
  role: string;
  actionType: string;
  details: string;
  amount?: number;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
};

export default function ApprovalWorkflowPage() {
  const [requests, setRequests] = useState<ApprovalRequest[]>([
    {
      id: "APP-01",
      requester: "Rahim Ahmed",
      role: "Order Manager",
      actionType: "High Value Refund",
      details: "Order #ORD-101 (৳2,500 refund request due to item damage)",
      amount: 2500,
      date: "2026-10-18 11:20",
      status: "Pending",
    },
    {
      id: "APP-02",
      requester: "Karim Uddin",
      role: "Courier Operator",
      actionType: "Manual Settlement Adjustment",
      details: "Steadfast Courier COD ledger adjustment discrepancy",
      amount: 1200,
      date: "2026-10-17 16:45",
      status: "Pending",
    },
  ]);

  const handleAction = (id: string, decision: "Approved" | "Rejected") => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: decision } : req,
      ),
    );
    alert(`✅ Request ${id} has been ${decision} successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Phase 7: Approval Workflows & Governance
          </span>
          <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
            <ShieldCheck className="text-amber-400" size={22} /> Sensitive
            Action Approvals & Inbox
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            বড় অংকের রিফান্ড বা সংবেদনশীল কাজের জন্য স্টাফদের রিকোয়েস্ট এবং
            সুপার অ্যাডমিন এপ্রুভাল ইনবক্স।
          </p>
        </div>
      </div>

      {/* Approval Requests Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-base font-black text-white">
            Pending Approval Queue
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            ম্যানেজার বা সুপার অ্যাডমিনের অনুমোদনের অপেক্ষায় থাকা টাস্কসমূহ।
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                <th className="p-4">Request ID</th>
                <th className="p-4">Requester Staff</th>
                <th className="p-4">Action Type</th>
                <th className="p-4">Details & Amount</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    কোনো পেন্ডিং এপ্রুভাল রিকোয়েস্ট নেই!
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-800/50 transition">
                    <td className="p-4 font-bold text-rose-500">{req.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-white">
                        {req.requester}
                      </div>
                      <div className="text-[10px] text-amber-400">
                        {req.role}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-cyan-400">
                      {req.actionType}
                    </td>
                    <td className="p-4 text-slate-300 max-w-xs">
                      <div>{req.details}</div>
                      {req.amount && (
                        <div className="text-emerald-400 font-bold mt-0.5">
                          Amount: ৳{req.amount}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-slate-400">{req.date}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          req.status === "Pending"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : req.status === "Approved"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {req.status === "Pending" ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleAction(req.id, "Approved")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl font-bold transition cursor-pointer"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => handleAction(req.id, "Rejected")}
                            className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-xl font-bold transition cursor-pointer"
                          >
                            ✕ Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-500 font-bold italic">
                          Resolved
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
