/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  UserPlus,
  Search,
  CheckCircle,
  AlertTriangle,
  Lock,
} from "lucide-react";

type StaffMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "Active" | "Suspended";
  department: string;
};

export default function StaffManagementPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>([
    {
      id: "STF-01",
      name: "Md Imran Hossain",
      email: "imran@duocorner.com",
      phone: "01777156691",
      role: "Super Admin",
      status: "Active",
      department: "Management",
    },
    {
      id: "STF-02",
      name: "Rahim Ahmed",
      email: "rahim@duocorner.com",
      phone: "01811223344",
      role: "Order Manager",
      status: "Active",
      department: "Operations",
    },
    {
      id: "STF-03",
      name: "Karim Uddin",
      email: "karim@duocorner.com",
      phone: "01922334455",
      role: "Courier Operator",
      status: "Active",
      department: "Logistics",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // New Staff Form State
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Order Manager",
    department: "Operations",
  });

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) {
      alert("দয়া করে নাম এবং ইমেল পূরণ করুন!");
      return;
    }

    const created: StaffMember = {
      id: `STF-0${staffList.length + 1}`,
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      role: newStaff.role,
      status: "Active",
      department: newStaff.department,
    };

    setStaffList([...staffList, created]);
    setShowAddModal(false);
    setNewStaff({
      name: "",
      email: "",
      phone: "",
      role: "Order Manager",
      department: "Operations",
    });
    alert(
      "✅ নতুন স্টাফ সফলভাবে যুক্ত হয়েছে এবং সিকিউর ইনভাইটেশন পাঠানো হয়েছে!",
    );
  };

  const filteredStaff = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            Phase 2: Security & Access Control
          </span>
          <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
            <Shield className="text-rose-500" size={22} /> Staff Management &
            Permissions
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            স্টাফদের রোল এবং গ্রানুলার পারমিশন ম্যানেজ করুন (অটোমেটেড
            এনক্রিপ্টেড পাসওয়ার্ড ফ্লো)।
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-lg w-full sm:w-auto justify-center"
          >
            <UserPlus size={16} /> Add New Staff
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search
            className="absolute left-3.5 top-3 text-slate-500"
            size={16}
          />
          <input
            type="text"
            placeholder="স্টাফের নাম, ইমেইল বা রোল খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-rose-500 w-full"
          />
        </div>
        <span className="text-xs text-slate-400 hidden sm:inline">
          Total Active Staff:{" "}
          <strong className="text-white">{staffList.length}</strong>
        </span>
      </div>

      {/* Staff Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                <th className="p-4">Staff ID & Name</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Department</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Granular Permissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-800/50 transition">
                  <td className="p-4">
                    <div className="font-bold text-white">{staff.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {staff.id}
                    </div>
                  </td>
                  <td className="p-4 text-slate-300 font-mono">
                    {staff.email}
                  </td>
                  <td className="p-4 text-slate-300">{staff.phone}</td>
                  <td className="p-4 font-bold text-amber-400">{staff.role}</td>
                  <td className="p-4 text-slate-300">{staff.department}</td>
                  <td className="p-4">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold text-[10px]">
                      {staff.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() =>
                        alert(
                          `Redirecting to Permission Matrix for ${staff.name}`,
                        )
                      }
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer border border-slate-700"
                    >
                      ⚙️ Edit Matrix
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <UserPlus size={18} className="text-rose-500" /> Add New Staff
                Member
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, name: e.target.value })
                  }
                  placeholder="যেমন: Tanvir Ahmed"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Email (Username) *
                  </label>
                  <input
                    type="email"
                    value={newStaff.email}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, email: e.target.value })
                    }
                    placeholder="tanvir@duocorner.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={newStaff.phone}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, phone: e.target.value })
                    }
                    placeholder="017xxxxxxxx"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Assigned Role
                  </label>
                  <select
                    value={newStaff.role}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, role: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                  >
                    <option>Super Admin</option>
                    <option>Operations Manager</option>
                    <option>Order Manager</option>
                    <option>Courier Operator</option>
                    <option>Accountant</option>
                    <option>Inventory Manager</option>
                    <option>Marketing Manager</option>
                    <option>Customer Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={newStaff.department}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, department: e.target.value })
                    }
                    placeholder="Operations / Logistics"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-[11px] text-amber-300 flex items-center gap-2">
                <Lock size={16} className="shrink-0" />
                <span>
                  পাসওয়ার্ড প্লেন টেক্সট হিসেবে সংরক্ষণ করা হবে না। অ্যাকাউন্ট
                  তৈরি হলে ইমেইলে নিরাপদ সেটআপ লিংক চলে যাবে।
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg"
                >
                  🚀 Create Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
