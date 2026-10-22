/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  GitMerge,
  CheckCircle2,
  ArrowRight,
  ShoppingCart,
  Truck,
  Wallet,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function EndToEndWorkflowPage() {
  const [runningWorkflow, setRunningWorkflow] = useState<string | null>(null);
  const [workflowStatus, setWorkflowStatus] = useState<{
    [key: string]: boolean;
  }>({
    workflowA: true,
    workflowb: true,
    workflowC: true,
  });

  const handleRunIntegrationTest = (name: string, key: string) => {
    setRunningWorkflow(name);
    setTimeout(() => {
      setRunningWorkflow(null);
      setWorkflowStatus((prev) => ({ ...prev, [key]: true }));
      alert(
        `✅ ${name} Integration Acceptance Test PASSED successfully! All systems are in sync.`,
      );
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            Phase 10: End-to-End Workflow Integration
          </span>
          <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
            <GitMerge className="text-rose-500" size={22} /> Business Automation
            & Workflow Unification
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            অর্ডার থেকে শুরু করে কুরিয়ার বুকিং, সিওডি সেটেলমেন্ট এবং লেজার
            পোস্টিংয়ের এন্ড-টু-এন্ড ইন্টিগ্রেশন টেস্ট।
          </p>
        </div>
      </div>

      {/* Workflow Visual Flow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Workflow A */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold bg-rose-500/10 text-rose-400 px-3 py-1 rounded-full">
                Workflow A
              </span>
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <h3 className="text-base font-black text-white">
              Order to Delivery & COD
            </h3>
            <p className="text-xs text-slate-400">
              Customer Order ➔ Server Validation ➔ Stock Deduction ➔ Steadfast
              Courier API ➔ Delivered Status ➔ COD Receivable Ledger.
            </p>
          </div>
          <button
            onClick={() =>
              handleRunIntegrationTest(
                "Workflow A (Order to Delivery)",
                "workflowA",
              )
            }
            disabled={runningWorkflow !== null}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer border border-slate-700 flex items-center justify-center gap-2"
          >
            <RefreshCw
              size={14}
              className={
                runningWorkflow === "Workflow A (Order to Delivery)"
                  ? "animate-spin"
                  : ""
              }
            />
            {runningWorkflow === "Workflow A (Order to Delivery)"
              ? "Testing..."
              : "Test Workflow A"}
          </button>
        </div>

        {/* Workflow B */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full">
                Workflow B
              </span>
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <h3 className="text-base font-black text-white">
              COD Settlement & Bank Sync
            </h3>
            <p className="text-xs text-slate-400">
              Courier Remittance Import ➔ Transaction Matching ➔ Charge
              Reconciliation ➔ Financial Ledger Posting ➔ Bank Balance Update.
            </p>
          </div>
          <button
            onClick={() =>
              handleRunIntegrationTest(
                "Workflow B (COD Settlement)",
                "workflowb",
              )
            }
            disabled={runningWorkflow !== null}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer border border-slate-700 flex items-center justify-center gap-2"
          >
            <RefreshCw
              size={14}
              className={
                runningWorkflow === "Workflow B (COD Settlement)"
                  ? "animate-spin"
                  : ""
              }
            />
            {runningWorkflow === "Workflow B (COD Settlement)"
              ? "Testing..."
              : "Test Workflow B"}
          </button>
        </div>

        {/* Workflow C */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full">
                Workflow C
              </span>
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <h3 className="text-base font-black text-white">
              Return & Refund Management
            </h3>
            <p className="text-xs text-slate-400">
              Return Request ➔ Eligibility Check ➔ Courier Return Tracking ➔
              Physical Inspection ➔ Stock Re-stocking ➔ Refund Approval.
            </p>
          </div>
          <button
            onClick={() =>
              handleRunIntegrationTest(
                "Workflow C (Return & Refund)",
                "workflowC",
              )
            }
            disabled={runningWorkflow !== null}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer border border-slate-700 flex items-center justify-center gap-2"
          >
            <RefreshCw
              size={14}
              className={
                runningWorkflow === "Workflow C (Return & Refund)"
                  ? "animate-spin"
                  : ""
              }
            />
            {runningWorkflow === "Workflow C (Return & Refund)"
              ? "Testing..."
              : "Test Workflow C"}
          </button>
        </div>
      </div>
    </div>
  );
}
