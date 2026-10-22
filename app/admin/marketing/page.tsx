/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Key, CheckCircle2, Save } from "lucide-react";

export default function MarketingPixelsPage() {
  const [pixelConfig, setPixelConfig] = useState({
    metaPixelId: "123456789012345",
    metaAccessToken: "EAAG...",
    ga4Id: "G-XXXXXXXXXX",
    gtmId: "GTM-XXXXXXX",
    tiktokPixelId: "CXXXXXXXXXXXXXXX",
    tiktokAccessToken: "",
    tiktokTestEventCode: "",
    capiEnabled: true,
  });

  const [pixelSaved, setPixelSaved] = useState(false);

  useEffect(() => {
    const savedPixels = localStorage.getItem("duo_pixel_config");
    if (savedPixels) {
      try {
        setPixelConfig(JSON.parse(savedPixels));
      } catch {}
    }
  }, []);

  const handleSavePixels = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("duo_pixel_config", JSON.stringify(pixelConfig));
    setPixelSaved(true);
    setTimeout(() => setPixelSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            Duo Corner Marketing Center
          </span>
          <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
            <TrendingUp className="text-rose-500" size={22} /> Marketing, Pixels
            & Server-Side Tracking
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            ফেইসবুক, গুগল এবং টিকটক পিক্সেল, কনভার্শন এপিআই (CAPI) এবং ইভেন্ট
            ট্র্যাকিং ম্যানেজার।
          </p>
        </div>
      </div>

      {pixelSaved && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} /> পিক্সেল ও ট্র্যাকিং কনফিগারেশন সফলভাবে সেভ
          এবং ওয়েবসাইটে লাইভ হয়েছে!
        </div>
      )}

      <form
        onSubmit={handleSavePixels}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl"
      >
        <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Key size={18} className="text-rose-500" /> Multi-Platform Pixel &
            API Token Manager
          </h3>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
            ● CAPI Deduplication Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              Meta Pixel ID
            </label>
            <input
              type="text"
              value={pixelConfig.metaPixelId}
              onChange={(e) =>
                setPixelConfig({ ...pixelConfig, metaPixelId: e.target.value })
              }
              placeholder="যেমন: 123456789012345"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              Meta CAPI Access Token
            </label>
            <input
              type="password"
              value={pixelConfig.metaAccessToken}
              onChange={(e) =>
                setPixelConfig({
                  ...pixelConfig,
                  metaAccessToken: e.target.value,
                })
              }
              placeholder="EAAG..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              GA4 Measurement ID
            </label>
            <input
              type="text"
              value={pixelConfig.ga4Id}
              onChange={(e) =>
                setPixelConfig({ ...pixelConfig, ga4Id: e.target.value })
              }
              placeholder="G-XXXXXXXXXX"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              Google Tag Manager (GTM ID)
            </label>
            <input
              type="text"
              value={pixelConfig.gtmId}
              onChange={(e) =>
                setPixelConfig({ ...pixelConfig, gtmId: e.target.value })
              }
              placeholder="GTM-XXXXXXX"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              TikTok Pixel ID
            </label>
            <input
              type="text"
              value={pixelConfig.tiktokPixelId}
              onChange={(e) =>
                setPixelConfig({
                  ...pixelConfig,
                  tiktokPixelId: e.target.value,
                })
              }
              placeholder="CXXXXXXXXXXXXXXX"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              TikTok Events API Token
            </label>
            <input
              type="password"
              value={pixelConfig.tiktokAccessToken}
              onChange={(e) =>
                setPixelConfig({
                  ...pixelConfig,
                  tiktokAccessToken: e.target.value,
                })
              }
              placeholder="TikTok Token..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition shadow-lg cursor-pointer"
          >
            <Save size={16} /> পিক্সেল ও টোকেন কনফিগারেশন সেভ করুন
          </button>
        </div>
      </form>
    </div>
  );
}
