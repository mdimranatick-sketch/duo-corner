'use client';

import React, { useEffect, useState } from 'react';

interface Order {
  id?: string;
  name?: string;
  phone?: string;
  address?: string;
  thana?: string;
  district?: string;
  totalPrice?: number;
  status?: string;
  productName?: string;
  quantity?: number;
  createdAt?: string;
  [key: string]: any;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Fetch orders
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data.orders && Array.isArray(data.orders)) {
          setOrders(data.orders);
        }
      })
      .catch((err) => console.error('Error fetching orders:', err));
  }, []);

  const sendToSteadfast = async (orderId: string) => {
    try {
      const res = await fetch('/api/save-order', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId }),
      });
      const data = await res.json();
      if (data.success) {
        alert('ஸ்டেডফাস্টে অর্ডার সফলভাবে পাঠানো হয়েছে!');
        window.location.reload();
      } else {
        alert('সমস্যা হয়েছে: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('নেটওয়ার্ক বা সার্ভার এরর!');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Duo Corner - Admin Dashboard</h2>
      <button 
        onClick={() => window.location.reload()} 
        style={{ marginBottom: '20px', padding: '8px 15px', cursor: 'pointer' }}
      >
        🔄 রিফ্রেশ লিস্ট
      </button>

      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th>তারিখ ও সময়</th>
            <th>কাস্টমার তথ্য</th>
            <th>প্রোডাক্ট ও পরিমাণ</th>
            <th>ঠিকানা</th>
            <th>টাকা (৳)</th>
            <th>স্ট্যাটাস</th>
            <th>অ্যাকশন</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id || index}>
              <td>{order.createdAt || 'N/A'}</td>
              <td>
                <b>{order.name || 'N/A'}</b>
                <br />
                {order.phone || 'N/A'}
              </td>
              <td>
                {order.productName || 'লাভ পার্ল নেকলেস উইথ গিফট বক্স'}
                <br />
                পরিমাণ: {order.quantity || 1}
              </td>
              <td>
                <b>{order.address || 'N/A'}</b>
                <br />
                {order.thana || ''} {order.district || ''}
              </td>
              <td>৳ {order.totalPrice || 0}</td>
              <td>{order.status || 'Pending'}</td>
              <td>
                <button
                  onClick={() => sendToSteadfast(order.id || '')}
                  style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  🚚 Send to Steadfast
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}