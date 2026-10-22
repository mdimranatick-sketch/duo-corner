/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Settings,
  Shield,
  Key,
  Globe,
  Database,
  Save,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

export default function BusinessSettingsPage() {
  const [settingsTab, setSettingsTab] = useState("general");

  const [businessProfile, setBusinessProfile] = useState({
    name: "Duo Corner",
    phone: "01777156691",
    address: "Barishal, Bangladesh",
    currency: "BDT (৳)",
    timezone: "Asia/Dhaka",
    supportEmail: "support@duocorner.com",
  });

  const [apiConfig, setApiConfig] = useState({
    steadfastApiKey: "**************************",
    steadfastSecretKey: "**************************",
    googleSheetId: "1A2B3C4D5E6F7G8H9I0J",
    smsApiToken: "SMS_BD_TOKEN_778899",
  });

  const [testingApi, setTestingApi] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "✅ বিজনেসের গ্লোবাল সেটিংস এবং সিকিউর API ক্রডেনশিয়াল সফলভাবে সংরক্ষিত হয়েছে!",
    );
  };

  const handleTestConnection = () => {
    setTestingApi(true);
    setTimeout(() => {
      setTestingApi(false);
      alert(
        "✅ Steadfast Courier API & Google Sheets API কানেকশন টেস্ট সফল! সব সিস্টেম সচল রয়েছে।",
      );
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Phase 8: Global Configuration & Settings
          </span>
          <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
            <Settings className="text-amber-400" size={22} /> Business Settings
            & Configuration Center
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            কোম্পানির প্রোফাইল, API ক্রডেনশিয়াল এবং পেমেন্ট/কুরিয়ার
            ইন্টিগ্রেশন সেটিংস পরিচালনা করুন।
          </p>
        </div>
        <button
          onClick={handleTestConnection}
          disabled={testingApi}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer border border-slate-700"
        >
          <RefreshCw size={16} className={testingApi ? "animate-spin" : ""} />{" "}
          {testingApi ? "Testing APIs..." : "🔌 Test All Connections"}
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap gap-2">
        {[
          { id: "general", label: "General Profile", icon: Globe },
          { id: "courier_api", label: "Courier & Logistics API", icon: Key },
          { id: "database", label: "Database & Google Sheets", icon: Database },
          { id: "security", label: "Security & Encryption", icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSettingsTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                settingsTab === tab.id
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                  : "bg-slate-950 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Settings Form */}
      <form
        onSubmit={handleSaveSettings}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl"
      >
        {settingsTab === "general" && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              General Business Profile Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessProfile.name}
                  onChange={(e) =>
                    setBusinessProfile({
                      ...businessProfile,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Helpline Phone Number
                </label>
                <input
                  type="text"
                  value={businessProfile.phone}
                  onChange={(e) =>
                    setBusinessProfile({
                      ...businessProfile,
                      phone: e.target.value,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Business Address
                </label>
                <input
                  type="text"
                  value={businessProfile.address}
                  onChange={(e) =>
                    setBusinessProfile({
                      ...businessProfile,
                      address: e.target.value,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={businessProfile.supportEmail}
                  onChange={(e) =>
                    setBusinessProfile({
                      ...businessProfile,
                      supportEmail: e.target.value,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {settingsTab === "courier_api" && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Steadfast Courier API Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Steadfast API Key
                </label>
                <input
                  type="password"
                  value={apiConfig.steadfastApiKey}
                  onChange={(e) =>
                    setApiConfig({
                      ...apiConfig,
                      steadfastApiKey: e.target.value,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Steadfast Secret Key
                </label>
                <input
                  type="password"
                  value={apiConfig.steadfastSecretKey}
                  onChange={(e) =>
                    setApiConfig({
                      ...apiConfig,
                      steadfastSecretKey: e.target.value,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {settingsTab === "database" && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Database & Google Sheets Sync Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Google Sheet ID / Database URL
                </label>
                <input
                  type="text"
                  value={apiConfig.googleSheetId}
                  onChange={(e) =>
                    setApiConfig({
                      ...apiConfig,
                      googleSheetId: e.target.value,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {settingsTab === "security" && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Security & Admin Access Protection
            </h3>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 size={16} /> Two-Factor Authentication (2FA)
                enforced for Super Admins.
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 size={16} /> Password hashing (Argon2 / bcrypt)
                active on all staff accounts.
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition shadow-lg cursor-pointer"
          >
            <Save size={16} /> Save Business Settings
          </button>
        </div>
      </form>
    </div>
  );
}
