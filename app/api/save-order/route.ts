import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'orders.json');

export async function GET() {
  try {
    if (!fs.existsSync(filePath)) return NextResponse.json([]);
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(fileData || '[]'));
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to read orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let orders = [];
    if (fs.existsSync(filePath)) {
      try {
        orders = JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
      } catch (e) { orders = []; }
    }

    const newOrder = {
      id: Date.now(),
      ...body,
      status: 'Pending',
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
    };

    orders.unshift(newOrder);
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), 'utf-8');
    return NextResponse.json({ success: true, message: 'Order saved' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { orderId } = await request.json();
    if (!fs.existsSync(filePath)) return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 });

    const orders = JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
    const orderIndex = orders.findIndex((o: any) => o.id === orderId);
    if (orderIndex === -1) return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });

    const order = orders[orderIndex];

    // প্রতিবার পাঠানোর জন্য একদম ইউনিক ইনভয়েস আইডি
    const uniqueInvoice = `DUO-${order.id}-${Math.floor(100 + Math.random() * 900)}`;

    const steadfastPayload = {
      invoice: uniqueInvoice,
      recipient_name: order.name || 'Customer',
      recipient_phone: order.phone || '01700000000',
      recipient_address: `${order.address || ''}, ${order.thana || ''}, ${order.district || ''}`,
      cod_amount: Number(order.totalPrice || 0),
      note: order.note || 'Duo Corner'
    };

    const response = await fetch('https://portal.steadfast.com.bd/api/v1/create_order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Api-Key': "nhebmum6ll3aeirxkoa0djqscqckyjn3",
        'Secret-Key': "9clfsi0vrhrbzwupeojrymau"
      },
      body: JSON.stringify(steadfastPayload)
    });

    const result = await response.json();
    console.log("=== STEADFAST RESPONSE ===", result);

    if (response.ok && (result.status === 200 || result.status === 201)) {
      orders[orderIndex].status = 'Sent to Steadfast';
      orders[orderIndex].consignmentId = result.consignment?.consignment_id || '';
      fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), 'utf-8');
      return NextResponse.json({ success: true, message: 'Successfully sent!' });
    } else {
      const errorMsg = result?.message || JSON.stringify(result?.errors) || 'Steadfast rejected the order';
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }
  } catch (error: any) {
    console.error("=== SERVER ERROR ===", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}