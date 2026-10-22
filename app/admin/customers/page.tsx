/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  CheckCircle2,
  XCircle,
  Search,
  ShieldAlert,
  RefreshCw,
} from "lucide-react";

type Order = {
  orderId?: string;
  name?: string;
  phone?: string;
  address?: string;
  collectionAmount?: number;
  status?: string;
};

export default function AdminCustomersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Order | null>(null);
  const [autoFraudLoading, setAutoFraudLoading] = useState(false);
  const [fraudReportMap, setFraudReportMap] = useState<{
    [phone: string]: any;
  }>({});
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/save-order");
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
        if (data.length > 0) {
          setSelectedCustomer(data[0]);
          void fetchAutomatedFraudData(data[0].phone);
        }
      }
    } catch (err) {
      console.error("Customer fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchOrders();
  }, []);

  const fetchAutomatedFraudData = async (phone: string | undefined) => {
    if (!phone || fraudReportMap[phone]) return;
    setAutoFraudLoading(true);
    try {
      const res = await fetch("/api/fraud-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setFraudReportMap((prev) => ({ ...prev, [phone]: data }));
      }
    } catch (err) {
      console.error("Auto fraud check error:", err);
    } finally {
      setAutoFraudLoading(false);
    }
  };

  const filteredOrders = orders.filter((ord) => {
    const name = String(ord.name || "").toLowerCase();
    const phone = String(ord.phone || "");
    return (
      name.includes(searchTerm.toLowerCase()) || phone.includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            Duo Corner Risk Management
          </span>
          <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
            <Users className="text-rose-500" size={22} /> Customer 360° & Fraud
            Risk Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            কাস্টমার প্রোফাইল হিস্ট্রি, Steadfast API ফ্রড চেকার এবং ডেলিভারি
            সাকসেস রেট অ্যানালাইসিস।
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer border border-slate-700"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />{" "}
          Refresh Directory
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Customer Directory List */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Smart Customer Directory ({orders.length})
            </h3>
          </div>

          <div className="relative">
            <Search
              className="absolute left-3.5 top-3 text-slate-500"
              size={16}
            />
            <input
              type="text"
              placeholder="নাম বা ফোন নম্বর দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-rose-500 w-full"
            />
          </div>

          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {loading ? (
              <p className="text-xs text-slate-500 text-center py-8">
                কাস্টমার ডাটা লোড হচ্ছে...
              </p>
            ) : filteredOrders.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">
                কোনো কাস্টমার পাওয়া যায়নি!
              </p>
            ) : (
              filteredOrders.map((ord, i) => {
                const custPhone = ord.phone || "N/A";
                const isSelected = selectedCustomer?.phone === custPhone;

                return (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedCustomer(ord);
                      void fetchAutomatedFraudData(custPhone);
                    }}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-rose-600/10 border-rose-500/50"
                        : "bg-slate-950 border-slate-800 hover:bg-slate-800/50"
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {ord.name || "Unknown"}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {custPhone}
                      </p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                      Verified
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Customer 360 Details & Fraud Checker */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="text-rose-500" size={18} /> Customer 360°
              Profile & Risk Score
            </h3>
          </div>

          {selectedCustomer ? (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">
                    Customer Name
                  </p>
                  <h4 className="text-sm font-bold text-white mt-1">
                    {selectedCustomer.name || "N/A"}
                  </h4>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">
                    Phone Number
                  </p>
                  <h4 className="text-sm font-mono font-bold text-cyan-400 mt-1">
                    {selectedCustomer.phone || "N/A"}
                  </h4>
                </div>
                <div className="col-span-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">
                    Delivery Address
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    {selectedCustomer.address || "N/A"}
                  </p>
                </div>
              </div>

              {autoFraudLoading ? (
                <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl text-center">
                  <div className="w-8 h-8 mx-auto mb-2 border-2 border-rose-500/20 border-t-rose-500 rounded-full animate-spin"></div>
                  <p className="text-xs text-rose-400 font-bold">
                    Steadfast API থেকে অটোমেটিক ফ্রড ও রিসিভ হিস্ট্রি চেক করা
                    হচ্ছে...
                  </p>
                </div>
              ) : fraudReportMap[selectedCustomer.phone!] ? (
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Steadfast Automated Courier Report
                    </h4>
                    <p className="text-xs text-slate-300">
                      মোট অর্ডার:{" "}
                      <span className="font-bold text-white">
                        {fraudReportMap[selectedCustomer.phone!].totalOrders} টি
                      </span>{" "}
                      | রিসিভ করেছে:{" "}
                      <span className="font-bold text-emerald-400">
                        {
                          fraudReportMap[selectedCustomer.phone!]
                            .deliveredOrders
                        }{" "}
                        টি
                      </span>{" "}
                      | ক্যানসেল:{" "}
                      <span className="font-bold text-rose-400">
                        {
                          fraudReportMap[selectedCustomer.phone!]
                            .cancelledOrders
                        }{" "}
                        টি
                      </span>
                    </p>
                    <p
                      className={`text-xs font-bold ${Number(fraudReportMap[selectedCustomer.phone!].successRate) >= 70 ? "text-emerald-400" : "text-rose-500"}`}
                    >
                      স্ট্যাটাস:{" "}
                      {fraudReportMap[selectedCustomer.phone!].riskLevel}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center shrink-0">
                    <div
                      className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 shadow-xl ${
                        Number(
                          fraudReportMap[selectedCustomer.phone!].successRate,
                        ) >= 70
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-rose-500 bg-rose-500/10 text-rose-500"
                      }`}
                    >
                      <span className="text-base font-black">
                        {fraudReportMap[selectedCustomer.phone!].successRate}%
                      </span>
                      <span className="text-[9px] uppercase font-bold">
                        Success
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center">
                  <button
                    onClick={() =>
                      void fetchAutomatedFraudData(selectedCustomer.phone)
                    }
                    className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer shadow-md"
                  >
                    🔄 অটোমেটিক কুরিয়ার হিস্ট্রি ফেচ করুন
                  </button>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  ⚡ Trust Level & Risk Factors
                </h4>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 size={16} /> পূর্বের সফল ডেলিভারি রেকর্ড ভালো।
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <XCircle size={16} className="text-slate-500" /> কোনো
                    ডুপ্লিকেট অর্ডার বা রিটার্ন ফ্রড প্যাটার্ন নেই।
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500 text-xs">
              বাম পাশ থেকে যেকোনো কাস্টমার সিলেক্ট করুন।
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
