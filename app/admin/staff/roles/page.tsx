/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, CheckSquare, Square, Save } from "lucide-react";

export default function RolePermissionMatrixPage() {
  const [selectedRole, setSelectedRole] = useState("Order Manager");

  // Modules list for Permission Matrix
  const modules = [
    "Dashboard",
    "Orders",
    "Products",
    "Inventory",
    "Courier",
    "Cancellations",
    "Returns",
    "Payments",
    "COD Settlement",
    "Accounting",
    "Reports",
    "Customers",
    "Marketing",
    "Website CMS",
    "Automation Rules",
    "Staff",
    "Roles & Permissions",
    "Business Settings",
    "API & Integrations",
    "System Health",
    "Audit Logs",
  ];

  const actions = [
    "View",
    "Create",
    "Edit",
    "Delete",
    "Approve",
    "Export",
    "Manage Settings",
  ];

  // Mock permission state mapping: module_action -> boolean
  const [permissions, setPermissions] = useState<{ [key: string]: boolean }>({
    Orders_View: true,
    Orders_Create: true,
    Orders_Edit: true,
    Orders_Delete: false,
    Orders_Approve: true,
    Orders_Export: true,
    Inventory_View: true,
  });

  const togglePermission = (mod: string, act: string) => {
    const key = `${mod}_${act}`;
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePermissions = () => {
    alert(
      `✅ ${selectedRole} রোলের পারমিশন সফলভাবে আপডেট ও সার্ভারে সেভ হয়েছে!`,
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Granular RBAC System
          </span>
          <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
            <ShieldCheck className="text-amber-400" size={22} /> Role &
            Permission Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            প্রতিটি রোলের জন্য মডিউল ভিত্তিক সুনির্দিষ্ট পারমিশন বা অ্যাক্সেস
            নির্ধারণ করুন।
          </p>
        </div>
        <button
          onClick={handleSavePermissions}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-lg"
        >
          <Save size={16} /> Save Permission Matrix
        </button>
      </div>

      {/* Role Selector Tabs */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap gap-2">
        {[
          "Super Admin",
          "Operations Manager",
          "Order Manager",
          "Courier Operator",
          "Accountant",
          "Inventory Manager",
          "Marketing Manager",
          "Customer Support",
          "Read-only Auditor",
        ].map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedRole === role
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                : "bg-slate-950 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Permission Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Permission Matrix for:{" "}
            <span className="text-amber-400">{selectedRole}</span>
          </h3>
          <span className="text-xs text-slate-400">অটো সেভ প্রটেক্টেড</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <th className="p-4 font-bold">System Module</th>
                {actions.map((act) => (
                  <th key={act} className="p-4 font-bold text-center">
                    {act}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {modules.map((mod) => (
                <tr key={mod} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <Lock size={14} className="text-rose-500" /> {mod}
                  </td>
                  {actions.map((act) => {
                    const key = `${mod}_${act}`;
                    const isChecked = !!permissions[key];

                    return (
                      <td key={act} className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => togglePermission(mod, act)}
                          className="p-1 rounded hover:bg-slate-800 transition cursor-pointer inline-flex items-center justify-center"
                        >
                          {isChecked ? (
                            <CheckSquare
                              size={18}
                              className="text-emerald-400"
                            />
                          ) : (
                            <Square size={18} className="text-slate-600" />
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
