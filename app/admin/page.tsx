'use client';
import { useState, useEffect } from 'react';

type Order = {
  id: string | number;
  createdAt?: string;
  name: string;
  phone: string;
  productName: string;
  quantity: number;
  address: string;
  thana: string;
  district: string;
  totalPrice: number;
  status: string;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | number | null>(null);

  const fetchOrders = async (): Promise<Order[]> => {
    try {
      const res = await fetch('/api/save-order');
      const data = await res.json();
      return Array.isArray(data) ? (data as Order[]) : [];
    } catch {
      console.error('Failed to fetch orders');
      return [];
    }
  };

  const refreshOrders = async () => {
    setLoading(true);
    setOrders(await fetchOrders());
    setLoading(false);
  };

  useEffect(() => {
    let active = true;
    void fetchOrders().then((data) => {
      if (!active) return;
      setOrders(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const sendToSteadfast = async (id: string | number) => {
    if (!confirm('আপনি কি নিশ্চিতভাবে এই অর্ডারটি Steadfast কুরিয়ারে পাঠাতে চান?')) return;
    
    setActionLoading(id);
    try {
      const res = await fetch('/api/save-order', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`সফল! কনসাইনমেন্ট আইডি: ${data.consignmentId}`);
        setOrders(await fetchOrders());
      } else {
        alert(`ব্যর্থ হয়েছে: ${data.error}`);
      }
    } catch {
      alert('সার্ভার এরর!');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/60 p-4 md:p-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        
        {/* হেডার ও রিফ্রেশ বাটন */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-pink-100 mb-8 gap-4">
          <div>
            <span className="bg-pink-100 text-pink-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              👑 Admin Control Panel
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">
              Duo Corner - Order Management
            </h1>
          </div>
          <button 
            onClick={refreshOrders}
            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition cursor-pointer flex items-center gap-2 text-sm"
          >
            🔄 লিস্ট রিফ্রেশ করুন
          </button>
        </div>

        {/* টেবিল বা কন্টেইনার */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="text-center py-20 text-gray-500 font-medium">অর্ডার লোড হচ্ছে...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-medium">কোনো অর্ডার পাওয়া যায়নি!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-100 font-extrabold">
                    <th className="p-4 md:p-5">অর্ডার আইডি / সময়</th>
                    <th className="p-4 md:p-5">কাস্টমার তথ্য</th>
                    <th className="p-4 md:p-5">প্রোডাক্ট ও পরিমাণ</th>
                    <th className="p-4 md:p-5">ডেলিভারি ঠিকানা</th>
                    <th className="p-4 md:p-5">মোট টাকা</th>
                    <th className="p-4 md:p-5">স্ট্যাটাস</th>
                    <th className="p-4 md:p-5 text-center">কুরিয়ার অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs md:text-sm">
                  {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-pink-50/30 transition duration-150">
                      <td className="p-4 md:p-5">
                        <span className="font-bold text-pink-600 block">{order.id}</span>
                        <span className="text-[11px] text-gray-400">{order.createdAt}</span>
                      </td>
                      <td className="p-4 md:p-5">
                        <span className="font-bold text-gray-800 block">{order.name}</span>
                        <span className="text-gray-500 text-xs font-mono">{order.phone}</span>
                      </td>
                      <td className="p-4 md:p-5">
                        <span className="font-semibold text-gray-800 block">{order.productName}</span>
                        <span className="text-xs bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-full inline-block mt-1">
                          পরিমাণ: {order.quantity}
                        </span>
                      </td>
                      <td className="p-4 md:p-5">
                        <p className="text-gray-700">{order.address}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">থানা: {order.thana}, জেলা: {order.district}</p>
                      </td>
                      <td className="p-4 md:p-5 font-black text-gray-900">
                        ৳{order.totalPrice}
                      </td>
                      <td className="p-4 md:p-5">
                        {order.status.includes('Sent to Steadfast') ? (
                          <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-xl text-xs inline-block shadow-sm">
                            ✓ {order.status}
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-xl text-xs inline-block shadow-sm">
                            ⏳ Pending
                          </span>
                        )}
                      </td>
                      <td className="p-4 md:p-5 text-center">
                        {order.status.includes('Sent to Steadfast') ? (
                          <span className="text-green-600 font-bold text-xs bg-green-50 px-3 py-2 rounded-xl border border-green-200 inline-block">
                            ✅ কুরিয়ারে এন্ট্রি হয়েছে
                          </span>
                        ) : (
                          <button
                            onClick={() => sendToSteadfast(order.id)}
                            disabled={actionLoading === order.id}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl shadow transition text-xs cursor-pointer disabled:opacity-50"
                          >
                            {actionLoading === order.id ? 'পাঠানো হচ্ছে...' : '🚚 Send to Steadfast'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}