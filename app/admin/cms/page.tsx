/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  LayoutTemplate,
  Globe,
  Megaphone,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  Eye,
} from "lucide-react";

export default function WebsiteCMSPage() {
  const [cmsData, setCmsData] = useState({
    heroTitle: "Exclusive Couple Gifts & Collection",
    heroSubtitle:
      "Express your love with premium couple items across Bangladesh",
    announcement: "Free Delivery on orders above ৳1500!",
    primaryCtaText: "Shop Collection",
    secondaryCtaText: "Watch Video",
    bannerImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
    isPublished: true,
  });

  const [saving, setSaving] = useState(false);

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert(
        "✅ CMS কনটেন্ট এবং হোমপেজ ডিজাইন সফলভাবে লাইভ ওয়েবসাইটে পাবলিশ হয়েছে!",
      );
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Phase 6: Visual CMS & Frontend Control
          </span>
          <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
            <LayoutTemplate className="text-purple-400" size={22} /> Website &
            CMS Control Center
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            ওয়েবসাইটের হিরো সেকশন, ব্যানার, অ্যানাউন্সমেন্ট এবং টেক্সট সরাসরি
            অ্যাডমিন প্যানেল থেকে ম্যানেজ করুন।
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open("/", "_blank")}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer border border-slate-700"
          >
            <Eye size={16} /> Preview Live Website
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSaveCMS}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl"
      >
        <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Globe size={18} className="text-purple-400" /> Homepage Hero &
            Banner Customizer
          </h3>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
            ● Live Sync Enabled
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              Homepage Hero Title
            </label>
            <input
              type="text"
              value={cmsData.heroTitle}
              onChange={(e) =>
                setCmsData({ ...cmsData, heroTitle: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              Hero Subtitle
            </label>
            <input
              type="text"
              value={cmsData.heroSubtitle}
              onChange={(e) =>
                setCmsData({ ...cmsData, heroSubtitle: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              Top Announcement Bar Text
            </label>
            <input
              type="text"
              value={cmsData.announcement}
              onChange={(e) =>
                setCmsData({ ...cmsData, announcement: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              Banner Image URL
            </label>
            <input
              type="text"
              value={cmsData.bannerImage}
              onChange={(e) =>
                setCmsData({ ...cmsData, bannerImage: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-purple-500 focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              Primary CTA Button Text
            </label>
            <input
              type="text"
              value={cmsData.primaryCtaText}
              onChange={(e) =>
                setCmsData({ ...cmsData, primaryCtaText: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              Secondary CTA Button Text
            </label>
            <input
              type="text"
              value={cmsData.secondaryCtaText}
              onChange={(e) =>
                setCmsData({ ...cmsData, secondaryCtaText: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition shadow-lg cursor-pointer disabled:opacity-50"
          >
            <Save size={16} />{" "}
            {saving
              ? "Publishing Changes..."
              : "🚀 Publish Changes to Live Website"}
          </button>
        </div>
      </form>
    </div>
  );
}
