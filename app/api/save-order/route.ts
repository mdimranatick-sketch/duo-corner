import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
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
    };

    orders.unshift(newOrder);
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

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
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || 'Error saving order' }, { status: 500 });
  }
}