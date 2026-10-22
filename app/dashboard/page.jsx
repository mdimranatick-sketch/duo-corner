import React from "react";
import { summaryMetrics, initialOrders } from "./data/mockData";
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Truck,
  DollarSign,
  PlusCircle,
  Search,
  RefreshCw,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 space-y-8">
      {/* Top Header / Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Business Dashboard & Command Center
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back! Here is your business live operational overview.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-sm">
            <PlusCircle size={18} /> New Order
          </button>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium text-sm transition">
            <Search size={18} /> Search Order
          </button>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-sm">
            <Truck size={18} /> Courier Booking
          </button>
        </div>
      </div>

      {/* 1.1 Business Overview (Cards Design) */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          1.1 Business Overview & Financial Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Sales Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Sales (Month)
              </p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {summaryMetrics.totalSales}
              </h3>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                +12% from last month
              </span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp size={24} />
            </div>
          </div>

          {/* Net Profit Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Net Profit</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {summaryMetrics.netProfit}
              </h3>
              <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                Expense: {summaryMetrics.totalExpense}
              </span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <DollarSign size={24} />
            </div>
          </div>

          {/* Pending / Processing Orders Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Orders</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {summaryMetrics.pendingOrders + summaryMetrics.processingOrders}
              </h3>
              <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                {summaryMetrics.pendingOrders} Pending,{" "}
                {summaryMetrics.processingOrders} Processing
              </span>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Clock size={24} />
            </div>
          </div>

          {/* COD & Courier Due Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Courier Due (COD)
              </p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {summaryMetrics.courierDue}
              </h3>
              <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                Bank: {summaryMetrics.bankReceived}
              </span>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <ShoppingBag size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* 1.3 Smart Alerts & Notifications */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="text-amber-600" size={22} />
          <h2 className="text-base font-bold text-amber-900">
            1.3 Smart Alerts & System Notifications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-amber-800">
          <div className="bg-white/80 p-3 rounded-xl border border-amber-100 flex items-center justify-between">
            <span>⚠️ 3 Orders delayed in Processing &gt; 24 hrs</span>
            <span className="text-xs font-bold underline cursor-pointer text-amber-700">
              View
            </span>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-100 flex items-center justify-between">
            <span>📦 Low Stock Alert: Couple Watch Set (Only 4 left)</span>
            <span className="text-xs font-bold underline cursor-pointer text-amber-700">
              Restock
            </span>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-100 flex items-center justify-between">
            <span>💳 Steadfast COD Settlement Due: ৳ 15,200</span>
            <span className="text-xs font-bold underline cursor-pointer text-amber-700">
              Check
            </span>
          </div>
        </div>
      </div>

      {/* 1.2 Live Operations Monitor & Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              1.2 Live Operations Monitor
            </h2>
            <p className="text-sm text-gray-500">
              Real-time order tracking, status, and courier dispatch actions.
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition">
            <RefreshCw size={16} /> Refresh Live Feed
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer Info</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Collection Amount</th>
                <th className="py-3 px-4">Tracking ID</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Courier Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {initialOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition">
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-800 block">
                      {order.orderId}
                    </span>
                    <span className="text-xs text-gray-400">
                      {order.date} • {order.time}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-800 block">
                      {order.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {order.number}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 max-w-xs truncate">
                    {order.address}
                  </td>
                  <td className="py-4 px-4 font-bold text-gray-800">
                    ৳ {order.collectionAmount}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-indigo-600 font-semibold">
                    {order.trackingID}
                  </td>
                  <td className="py-4 px-4 text-gray-600 max-w-xs truncate">
                    {order.address}
                  </td>
                  <td className="py-4 px-4 font-bold text-gray-800">
                    ৳ {order.collectionAmount}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-indigo-600 font-semibold">
                    {order.trackingID}
                  </td>
                  <td className="py-4 px-4">
                    {order.status === "pending" && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
                        Pending
                      </span>
                    )}
                    {order.status === "in review" && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        In Review
                      </span>
                    )}
                    {order.status === "processing" && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">
                        Processing
                      </span>
                    )}
                    {order.status === "delivered" && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                        Delivered
                      </span>
                    )}
                    {order.status === "cancelled" && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700">
                        Cancelled
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-700 rounded-lg">
                      {order.courierAction}
                    </span>
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
