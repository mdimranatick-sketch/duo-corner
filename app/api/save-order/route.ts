import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
    };

    orders.unshift(newOrder);
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    const googleSheetUrl = "https://script.google.com/macros/s/AKfycbyRhXgy18iGITj89GjcnblmsTWBejfYbNgPEEquYwZtxqyWolXceVQFl-BM8iWmeTg/exec"; 
    
    const sheetPayload = {
      name: body.name || "",
      phone: body.phone || "",
      address: `${body.address || ""}, থানা: ${body.thana || ""}, জেলা: ${body.district || ""}`,
      note: body.productName ? `${body.productName} (Qty: ${body.quantity || 1})` : "",
      amount: body.totalPrice || 0
    };

    fetch(googleSheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheetPayload)
    }).catch(err => console.error("Google Sheet Sync Error:", err));

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || 'Error saving order' }, { status: 500 });
  }
}