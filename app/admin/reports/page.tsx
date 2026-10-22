/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  PieChart,
  Sparkles,
  Filter,
} from "lucide-react";

export default function ProfessionalReportsPage() {
  const [reportCategory, setReportCategory] = useState("sales");
  const [dateRange, setDateRange] = useState("this_month");
  const [exporting, setExporting] = useState(false);

  const handleExportReport = (format: string) => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert(
        `✅ সফলভাবে ${reportCategory.toUpperCase()} রিপোর্টটি ${format.toUpperCase()} ফরম্যাটে ডাউনলোড হয়েছে!`,
      );
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Phase 5: Business Intelligence & BI Center
          </span>
          <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
            <FileText className="text-cyan-400" size={22} /> Professional
            Reports & Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            ব্যবসার লাভ-ক্ষতি (P&L), গ্রস সেলস, কুরিয়ার ও ফিন্যান্সিয়াল
            প্রফেশনাল রিপোর্ট জেনারেটর।
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExportReport("excel")}
            disabled={exporting}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer border border-slate-700"
          >
            <Download size={16} />{" "}
            {exporting ? "Generating..." : "Export Excel (.xlsx)"}
          </button>
          <button
            onClick={() => handleExportReport("pdf")}
            disabled={exporting}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-lg"
          >
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* Category & Date Filters */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          {[
            "sales",
            "profit_loss",
            "orders",
            "courier",
            "inventory",
            "settlements",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setReportCategory(cat)}
              className={`px-4 py-2 rounded-xl transition cursor-pointer uppercase ${
                reportCategory === cat
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                  : "bg-slate-950 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {cat.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Calendar size={16} className="text-slate-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month (October 2026)</option>
            <option value="last_month">Last Month</option>
            <option value="custom">Custom Date Range</option>
          </select>
        </div>
      </div>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Gross Sales (Total)
            </p>
            <h3 className="text-2xl font-black text-white mt-1">৳1,48,500</h3>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              +18.4% from last month
            </span>
          </div>
          <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-2xl">
            <TrendingUp size={26} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Cost of Goods Sold (COGS)
            </p>
            <h3 className="text-2xl font-black text-amber-500 mt-1">৳62,400</h3>
            <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              Inventory Expense
            </span>
          </div>
          <div className="p-3.5 bg-amber-500/10 text-amber-500 rounded-2xl">
            <PieChart size={26} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Net Profit (Estimated)
            </p>
            <h3 className="text-2xl font-black text-cyan-400 mt-1">৳86,100</h3>
            <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              After Courier & Ads Fees
            </span>
          </div>
          <div className="p-3.5 bg-cyan-500/10 text-cyan-400 rounded-2xl">
            <DollarSign size={26} />
          </div>
        </div>
      </div>

      {/* Detailed Report Table Preview */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-wider">
              {reportCategory.replace("_", " ")} Detailed Ledger Preview
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              নির্বাচিত ক্যাটাগরির বিস্তারিত ডাটা এবং ফিন্যান্সিয়াল মেট্রিক্স।
            </p>
          </div>
          <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full font-bold">
            Live Filter Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                <th className="p-4">Transaction / Metric ID</th>
                <th className="p-4">Category Name</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Volume / Quantity</th>
                <th className="p-4">Gross Amount</th>
                <th className="p-4 text-right">Net Financial Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-slate-800/50 transition">
                <td className="p-4 font-bold text-cyan-400">REP-2026-001</td>
                <td className="p-4 text-white font-medium">
                  Couple Bracelet Collection
                </td>
                <td className="p-4 text-slate-400">2026-10-18 14:30</td>
                <td className="p-4 text-slate-300 font-bold">45 Pcs</td>
                <td className="p-4 text-white font-bold">৳35,550</td>
                <td className="p-4 text-right font-black text-emerald-400">
                  +৳21,200 Profit
                </td>
              </tr>
              <tr className="hover:bg-slate-800/50 transition">
                <td className="p-4 font-bold text-cyan-400">REP-2026-002</td>
                <td className="p-4 text-white font-medium">
                  Projection Necklace Sets
                </td>
                <td className="p-4 text-slate-400">2026-10-17 11:15</td>
                <td className="p-4 text-slate-300 font-bold">28 Pcs</td>
                <td className="p-4 text-white font-bold">৳27,720</td>
                <td className="p-4 text-right font-black text-emerald-400">
                  +৳15,400 Profit
                </td>
              </tr>
              <tr className="hover:bg-slate-800/50 transition">
                <td className="p-4 font-bold text-cyan-400">REP-2026-003</td>
                <td className="p-4 text-white font-medium">
                  Soap Rose Gift Boxes
                </td>
                <td className="p-4 text-slate-400">2026-10-16 16:45</td>
                <td className="p-4 text-slate-300 font-bold">32 Pcs</td>
                <td className="p-4 text-white font-bold">৳38,400</td>
                <td className="p-4 text-right font-black text-emerald-400">
                  +৳19,200 Profit
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
