"use client";
import React, { useState } from "react";
import {
  Globe,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  BarChart3,
  Save,
  CheckCircle,
  Layers,
  Video,
} from "lucide-react";

export default function MarketingHubPage() {
  const [activeTab, setActiveTab] = useState("settings"); // 'settings' or 'analytics'

  // Form States
  const [meta, setMeta] = useState({
    pixelId: "1234567890",
    accessToken: "EAA...",
    enabled: true,
  });
  const [google, setGoogle] = useState({
    ga4Id: "G-XXXXXXXXXX",
    gadsId: "AW-XXXXXXXXX",
    enabled: true,
  });
  const [tiktok, setTiktok] = useState({
    pixelId: "CXXXXXXXXXXXXX",
    accessToken: "T_ACT...",
    enabled: false,
  });

  const handleSave = (platform) => {
    alert(
      `${platform.toUpperCase()} settings saved successfully! Data securely stored.`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            9. Marketing & Tracking Integration Hub
          </h1>
          <p className="text-sm text-gray-500">
            Manage Pixels, Conversions API, Analytics, and ROAS performance from
            one central command.
          </p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "settings" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600"}`}
          >
            Credential Settings
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "analytics" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600"}`}
          >
            Marketing Analytics & ROAS
          </button>
        </div>
      </div>

      {activeTab === "settings" ? (
        <div className="space-y-6">
          {/* 9.1 Meta Integration Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Globe size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    9.1 Meta Integration (Facebook & Instagram)
                  </h2>
                  <p className="text-xs text-gray-500">
                    Configure Pixel ID, CAPI Token, and Event Diagnostics.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={meta.enabled}
                  onChange={() => setMeta({ ...meta, enabled: !meta.enabled })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Facebook Pixel ID
                </label>
                <input
                  type="text"
                  value={meta.pixelId}
                  onChange={(e) =>
                    setMeta({ ...meta, pixelId: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 108293849102"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Conversions API (CAPI) Access Token
                </label>
                <input
                  type="password"
                  value={meta.accessToken}
                  onChange={(e) =>
                    setMeta({ ...meta, accessToken: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="EAAG..."
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleSave("meta")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition shadow-sm"
              >
                <Save size={16} /> Save Meta Settings
              </button>
            </div>
          </div>

          {/* 9.2 Google Integration Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <BarChart3 size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    9.2 Google Integration (GA4 & Ads)
                  </h2>
                  <p className="text-xs text-gray-500">
                    Google Analytics 4 Measurement ID & Google Ads Conversion
                    ID.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={google.enabled}
                  onChange={() =>
                    setGoogle({ ...google, enabled: !google.enabled })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  GA4 Measurement ID
                </label>
                <input
                  type="text"
                  value={google.ga4Id}
                  onChange={(e) =>
                    setGoogle({ ...google, ga4Id: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Google Ads Conversion ID
                </label>
                <input
                  type="text"
                  value={google.gadsId}
                  onChange={(e) =>
                    setGoogle({ ...google, gadsId: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="AW-XXXXXXXXX"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleSave("google")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition shadow-sm"
              >
                <Save size={16} /> Save Google Settings
              </button>
            </div>
          </div>

          {/* 9.3 TikTok Integration Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                  <Video size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    9.3 TikTok & 9.4 YouTube Campaign Tracking
                  </h2>
                  <p className="text-xs text-gray-500">
                    TikTok Pixel ID, Events API, and YouTube / Ads Attribution.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={tiktok.enabled}
                  onChange={() =>
                    setTiktok({ ...tiktok, enabled: !tiktok.enabled })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  TikTok Pixel ID
                </label>
                <input
                  type="text"
                  value={tiktok.pixelId}
                  onChange={(e) =>
                    setTiktok({ ...tiktok, pixelId: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="CXXXXXXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  TikTok Events API Token
                </label>
                <input
                  type="password"
                  value={tiktok.accessToken}
                  onChange={(e) =>
                    setTiktok({ ...tiktok, accessToken: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Access Token"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleSave("tiktok")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition shadow-sm"
              >
                <Save size={16} /> Save TikTok Settings
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* 9.6 Marketing Analytics & ROAS View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500">
                Ad Spend (Month)
              </p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                ৳ 45,000
              </h3>
              <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                Meta & TikTok Ads
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500">
                Ad-Driven Orders
              </p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                320 Orders
              </h3>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                Conv. Rate: 3.4%
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500">
                Customer Acquisition Cost (CAC)
              </p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                ৳ 140.62
              </h3>
              <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                Optimal range
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500">
                Return on Ad Spend (ROAS)
              </p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">4.2x</h3>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                High Profitable
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
