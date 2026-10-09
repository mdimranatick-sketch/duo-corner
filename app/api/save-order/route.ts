import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type Order = Record<string, unknown> & { id: string | number };

const ordersFilePath = () => path.join(process.cwd(), 'orders.json');

function readOrders(): Order[] {
  const filePath = ordersFilePath();
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileData = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(fileData) as unknown;
  return Array.isArray(parsed) ? (parsed as Order[]) : [];
}

function writeOrders(orders: Order[]) {
  fs.writeFileSync(ordersFilePath(), JSON.stringify(orders, null, 2));
}

export async function GET() {
  try {
    const orders = readOrders();
    return NextResponse.json(orders);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error reading orders';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
<<<<<<< HEAD
    const body = await request.json();

    // ১. লোকাল orders.json ফাইলে সেভ করার কোড
    const filePath = path.join(process.cwd(), 'orders.json');
    let orders = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      orders = JSON.parse(fileData);
    }

    const newOrder = {
      id: "DUO-" + Math.floor(100000 + Math.random() * 900000),
      ...body,
      createdAt: new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' }),
=======
    const body = (await request.json()) as Record<string, unknown>;

    const orders = readOrders();

    const newOrder: Order = {
      id: Date.now(),
      ...body,
      status: 'Pending',
      createdAt: new Date().toISOString(),
>>>>>>> e2a6589e077e97685167343aeab53bc9a4d14823
    };

    orders.unshift(newOrder);
    writeOrders(orders);

    // ২. আপনার গুগল শিটে স্বয়ংক্রিয়ভাবে ডাটা পাঠিয়ে দেওয়ার লিংক ও কোড
    const googleSheetUrl = "https://script.google.com/macros/s/AKfycbyRhXgy18iGITj89GjcnblmsTWBejfYbNgPEEquYwZtxqyWolXceVQFl-BM8iWmeTg/exec"; 
    
    const sheetPayload = {
      name: body.name || "",
      phone: body.phone || "",
      address: `${body.address || ""}, থানা: ${body.thana || ""}, জেলা: ${body.district || ""}`,
      note: body.productName ? `${body.productName} (Qty: ${body.quantity || 1})` : "",
      amount: body.totalPrice || 0
    };

    try {
      await fetch(googleSheetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetPayload)
      });
    } catch (sheetErr) {
      console.error("Google Sheet Sync Error:", sheetErr);
    }

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error saving order';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as { id?: string | number };

    if (body.id === undefined || body.id === null) {
      return NextResponse.json({ success: false, error: 'Order id is required' }, { status: 400 });
    }

    const orders = readOrders();
    const orderIndex = orders.findIndex(
      (order) => String(order.id) === String(body.id)
    );

    if (orderIndex === -1) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    const consignmentId = Math.floor(100000000 + Math.random() * 899999999);
    orders[orderIndex] = {
      ...orders[orderIndex],
      status: `Sent to Steadfast (ID: ${consignmentId})`,
    };
    writeOrders(orders);

    return NextResponse.json({ success: true, consignmentId: String(consignmentId) });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error updating order';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}