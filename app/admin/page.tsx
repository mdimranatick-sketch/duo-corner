'use client';
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/save-order');
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSendToSteadfast = async (orderId: number) => {
    if (!confirm('আপনি কি এই অর্ডারটি সরাসরি স্টেডফাস্ট কুরিয়ারে পাঠাতে চান?')) return;

    setLoadingId(orderId);
    try {
      const res = await fetch('/api/save-order', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      if (data.success) {
        alert('সফলভাবে স্টেডফাস্ট কুরিয়ারে অর্ডারটি এন্ট্রি হয়েছে!');
        fetchOrders();
      } else {
        alert('ত্রুটি: ' + (data.error || 'স্টেডফাস্টে পাঠানো যায়নি'));
      }
    } catch (err) {
      alert('সার্ভার কানেকশন এরর!');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-gray-800">Duo Corner - Admin Dashboard</h1>
          <button 
            onClick={fetchOrders}
            className="bg-pink-600 hover:bg-pink-700 text-white text-xs md:text-sm font-bold px-4 py-2 rounded-xl shadow cursor-pointer transition"
          >
            🔄 রিফ্রেশ লিস্ট
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-xs md:text-sm border-b uppercase font-bold">
                  <th className="p-4">তারিখ ও সময়</th>
                  <th className="p-4">কাস্টমার তথ্য</th>
                  <th className="p-4">প্রোডাক্ট ও পরিমাণ</th>
                  <th className="p-4">ঠিকানা</th>
                  <th className="p-4">টাকা (৳)</th>
                  <th className="p-4">স্ট্যাটাস</th>
                  <th className="p-4 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs md:text-sm text-gray-700">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-400 font-medium">কোনো অর্ডার পাওয়া যায়নি।</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-pink-50/40 transition">
                      <td className="p-4 whitespace-nowrap text-gray-500 font-mono text-xs">{order.createdAt || 'N/A'}</td>
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{order.name}</p>
                        <p className="text-pink-600 font-semibold">{order.phone}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-gray-800">{order.productName}</p>
                        <p className="text-gray-500">পরিমাণ: {order.quantity}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-medium">{order.address}</p>
                        <p className="text-gray-500 text-xs">{order.thana}, {order.district}</p>
                      </td>
                      <td className="p-4 font-extrabold text-pink-600">
                        ৳{order.totalPrice}
                        <span className="block text-[10px] text-gray-400 font-normal">{order.paymentMethod === 'bkash' ? 'বিকাশ পেমেন্ট' : 'ক্যাশ অন ডেলিভারি'}</span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${order.status === 'Sent to Steadfast' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {order.status || 'Pending'}
                        </span>
                        {order.consignmentId && (
                          <span className="block text-[10px] text-gray-500 mt-1 font-mono">ID: {order.consignmentId}</span>
                        )}
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        {order.status !== 'Sent to Steadfast' ? (
                          <button
                            onClick={() => handleSendToSteadfast(order.id)}
                            disabled={loadingId === order.id}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow transition cursor-pointer disabled:opacity-50"
                          >
                            {loadingId === order.id ? 'পাঠানো হচ্ছে...' : '🚚 Send to Steadfast'}
                          </button>
                        ) : (
                          <span className="text-xs text-green-600 font-bold">এন্ট্রি সম্পন্ন</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}