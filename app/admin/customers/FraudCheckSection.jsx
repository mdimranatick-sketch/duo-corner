"use client";
import React, { useState } from "react";

export default function FraudCheckSection() {
  const [phoneInput, setPhoneInput] = useState("");
  const [fraudData, setFraudData] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkCustomerFraud = async (e) => {
    e.preventDefault();
    if (!phoneInput) return;

    setLoading(true);
    try {
      const res = await fetch("/api/fraud-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneInput }),
      });
      const data = await res.json();
      if (data.success) {
        setFraudData(data);
      } else {
        alert("ডেটা ফেচ করতে ব্যর্থ হয়েছে!");
      }
    } catch (err) {
      console.error(err);
      alert("সার্ভার এরর!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
      <div>
        <h3 className="text-lg font-black text-white">
          🛡️ Customer & Fraud Prevention Management
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Steadfast Courier API ও Google Sheets ডেটা দিয়ে কাস্টমারের রিসিভ ও
          ক্যানসেল হিস্ট্রি চেক করুন।
        </p>
      </div>

      <form onSubmit={checkCustomerFraud} className="flex gap-3">
        <input
          type="text"
          value={phoneInput}
          onChange={(e) => setPhoneInput(e.target.value)}
          placeholder="কাস্টমারের ফোন নম্বর লিখুন (যেমন: 017xxxxxxxx)"
          className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500 flex-1"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition cursor-pointer shadow-lg"
        >
          {loading ? "চেক হচ্ছে..." : "🔍 ফ্রড চেক করুন"}
        </button>
      </form>

      {fraudData && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white">
              ফোন নম্বর:{" "}
              <span className="text-cyan-400">{fraudData.phone}</span>
            </h4>
            <p className="text-xs text-slate-300">
              মোট অর্ডার:{" "}
              <span className="font-bold text-white">
                {fraudData.totalOrders} টি
              </span>{" "}
              | রিসিভ করেছে:{" "}
              <span className="font-bold text-emerald-400">
                {fraudData.deliveredOrders} টি
              </span>{" "}
              | ক্যানসেল:{" "}
              <span className="font-bold text-rose-400">
                {fraudData.cancelledOrders} টি
              </span>
            </p>
            <p
              className={`text-xs font-bold ${fraudData.successRate >= 70 ? "text-emerald-400" : "text-rose-500"}`}
            >
              স্ট্যাটাস: {fraudData.riskLevel}
            </p>
          </div>

          {/* লাল বা সবুজ বৃত্তের মাধ্যমে ডেলিভারি সাকসেস রেট প্রদর্শন */}
          <div className="flex flex-col items-center justify-center">
            <div
              className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 shadow-xl ${
                Number(fraudData.successRate) >= 70
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                  : "border-rose-500 bg-rose-500/10 text-rose-500"
              }`}
            >
              <span className="text-lg font-black">
                {fraudData.successRate}%
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider">
                Success
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-2">
              Delivery Rate
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
