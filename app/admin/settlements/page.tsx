/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Truck,
  Wallet,
  Building2,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

type SettlementItem = {
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  collectionAmount: number;
  deliveryCharge: number;
  netReceivable: number;
  status: "Matched" | "Pending" | "Disputed" | "Partially Matched";
  courierName: string;
};

export default function SettlementsCenterPage() {
  const [settlementFilter, setSettlementFilter] = useState("all");
  const [importLoading, setImportLoading] = useState(false);

  // Mock settlement data connected with live order stats
  const [settlements, setSettlements] = useState<SettlementItem[]>([
    {
      orderId: "ORD-101",
      date: "2026-10-18",
      customerName: "Rafiqul Islam",
      phone: "01711223344",
      collectionAmount: 1250,
      deliveryCharge: 70,
      netReceivable: 1180,
      status: "Matched",
      courierName: "Steadfast Courier",
    },
    {
      orderId: "ORD-102",
      date: "2026-10-18",
      customerName: "Sumaiya Akter",
      phone: "01822334455",
      collectionAmount: 850,
      deliveryCharge: 70,
      netReceivable: 780,
      status: "Pending",
      courierName: "Steadfast Courier",
    },
    {
      orderId: "ORD-103",
      date: "2026-10-17",
      customerName: "Nazmul Hasan",
      phone: "01933445566",
      collectionAmount: 2100,
      deliveryCharge: 110,
      netReceivable: 1990,
      status: "Matched",
      courierName: "Steadfast Courier",
    },
    {
      orderId: "ORD-104",
      date: "2026-10-16",
      customerName: "Farhana Yeasmin",
      phone: "01644556677",
      collectionAmount: 990,
      deliveryCharge: 70,
      netReceivable: 920,
      status: "Disputed",
      courierName: "Steadfast Courier",
    },
  ]);

  const totalCOD = settlements.reduce(
    (acc, curr) => acc + curr.collectionAmount,
    0,
  );
  const totalReceived = settlements
    .filter((s) => s.status === "Matched")
    .reduce((acc, curr) => acc + curr.netReceivable, 0);
  const totalPending = settlements
    .filter((s) => s.status === "Pending")
    .reduce((acc, curr) => acc + curr.collectionAmount, 0);

  const handleSimulateImport = () => {
    setImportLoading(true);
    setTimeout(() => {
      setImportLoading(false);
      alert(
        "✅ কুরিয়ার প্রোভাইডার API থেকে লেটেস্ট সেটেলমেন্ট ডাটা সফলভাবে রিকনসাইল ও সিঙ্ক হয়েছে!",
      );
    }, 1500);
  };

  const filteredData = settlements.filter((item) => {
    if (settlementFilter === "matched") return item.status === "Matched";
    if (settlementFilter === "pending") return item.status === "Pending";
    if (settlementFilter === "disputed") return item.status === "Disputed";
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Phase 3: Financial & Reconciliation Center
          </span>
          <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
            <DollarSign className="text-emerald-400" size={22} /> Payments & COD
            Settlements Center
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            কুরিয়ার ক্যাশ-অন-ডে ডেলিভারি হিসাব, চার্জ ডিডাকশন এবং অটো
            রিকনসিলিয়েশন ইঞ্জিন।
          </p>
        </div>
        <button
          onClick={handleSimulateImport}
          disabled={importLoading}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-lg disabled:opacity-50"
        >
          <UploadCloud size={16} />{" "}
          {importLoading
            ? "Syncing API..."
            : "📥 Import / Sync Courier Statement"}
        </button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Total COD Receivable
            </p>
            <h3 className="text-2xl font-black text-white mt-1">
              ৳{totalCOD.toLocaleString()}
            </h3>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              Gross Collection
            </span>
          </div>
          <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-2xl">
            <Wallet size={26} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Successfully Received
            </p>
            <h3 className="text-2xl font-black text-emerald-400 mt-1">
              ৳{totalReceived.toLocaleString()}
            </h3>
            <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              Net Bank Transfer
            </span>
          </div>
          <div className="p-3.5 bg-cyan-500/10 text-cyan-400 rounded-2xl">
            <Building2 size={26} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Pending Settlement
            </p>
            <h3 className="text-2xl font-black text-amber-500 mt-1">
              ৳{totalPending.toLocaleString()}
            </h3>
            <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              Courier In-Transit
            </span>
          </div>
          <div className="p-3.5 bg-amber-500/10 text-amber-500 rounded-2xl">
            <Truck size={26} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Disputed / Mismatch
            </p>
            <h3 className="text-2xl font-black text-rose-500 mt-1">1 Item</h3>
            <span className="text-[10px] text-rose-400 font-semibold bg-rose-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              Needs Review
            </span>
          </div>
          <div className="p-3.5 bg-rose-500/10 text-rose-500 rounded-2xl">
            <AlertTriangle size={26} />
          </div>
        </div>
      </div>

      {/* Settlements Table & Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-base font-black text-white">
              Automated Reconciliation Ledger
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Steadfast Courier এবং মার্চেন্ট লেজারের স্বয়ংক্রিয় মিলন রেজিস্টার।
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSettlementFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${settlementFilter === "all" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300"}`}
            >
              সকল ({settlements.length})
            </button>
            <button
              onClick={() => setSettlementFilter("matched")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${settlementFilter === "matched" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300"}`}
            >
              Matched
            </button>
            <button
              onClick={() => setSettlementFilter("pending")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${settlementFilter === "pending" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300"}`}
            >
              Pending
            </button>
            <button
              onClick={() => setSettlementFilter("disputed")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${settlementFilter === "disputed" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300"}`}
            >
              Disputed
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer Info</th>
                <th className="p-4">Courier Provider</th>
                <th className="p-4">Collection Amount</th>
                <th className="p-4">Delivery Charge</th>
                <th className="p-4">Net Receivable</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-slate-800/50 transition">
                  <td className="p-4">
                    <div className="font-bold text-rose-500">
                      {item.orderId}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {item.date}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white">
                      {item.customerName}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {item.phone}
                    </div>
                  </td>
                  <td className="p-4 text-cyan-400 font-semibold">
                    {item.courierName}
                  </td>
                  <td className="p-4 font-bold text-white">
                    ৳{item.collectionAmount}
                  </td>
                  <td className="p-4 text-rose-400 font-medium">
                    -৳{item.deliveryCharge}
                  </td>
                  <td className="p-4 font-black text-emerald-400">
                    ৳{item.netReceivable}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === "Matched"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : item.status === "Pending"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() =>
                        alert(`Details & Audit trail for ${item.orderId}`)
                      }
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl font-bold transition cursor-pointer"
                    >
                      🔍 Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
