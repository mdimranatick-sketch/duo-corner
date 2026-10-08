'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/save-order');
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const sendToCourier = async (order) => {
    setLoading(true);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      const data = await res.json();

      if (data.status === 200 || data.consignment_id) {
        alert('আলহামদুলিল্লাহ! পার্সেল সফলভাবে Steadfast-এ চলে গেছে!');
        fetchOrders();
      } else {
        alert('সমস্যা হয়েছে: ' + (data.message || 'আবার চেষ্টা করুন'));
      }
    } catch (err) {
      alert('সার্ভার এরর হয়েছে।');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', background: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Duo Corner - Admin Dashboard</h1>
      <p style={{ marginBottom: '20px', color: '#666' }}>এখানে আপনার ওয়েবসাইটের সমস্ত অর্ডার জমা হবে।</p>

      {orders.length === 0 ? (
        <p style={{ background: '#fff', padding: '20px', borderRadius: '5px' }}>কোনো নতুন অর্ডার নেই বা ডেটা ফাইল খালি আছে।</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ background: '#222', color: '#fff', textAlign: 'left' }}>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>নাম ও ফোন</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>ঠিকানা</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>টাকা</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>স্ট্যাটাস</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  <strong>{order.name}</strong><br />{order.phone}
                </td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  {order.address}, {order.thana}, {order.district}
                </td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>৳{order.totalPrice}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  <span style={{ color: order.status === 'Sent' ? 'green' : 'orange', fontWeight: 'bold' }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  {order.status !== 'Sent' && (
                    <button
                      onClick={() => sendToCourier(order)}
                      disabled={loading}
                      style={{
                        background: '#000',
                        color: '#fff',
                        padding: '8px 14px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      {loading ? 'পাঠানো হচ্ছে...' : 'Send to Steadfast'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}