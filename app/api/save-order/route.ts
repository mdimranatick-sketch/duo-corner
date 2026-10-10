import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // আপনার গুগল শিটের ওয়েব অ্যাপ লিংক
    const googleSheetUrl = "https://script.google.com/macros/s/AKfycbyRhXgy18iGITj89GjcnblmsTWBejfYbNgPEEquYwZtxqyWolXceVQFl-BM8iWmeTg/exec"; 
    
    // গুগল শিটে ডাটা পাঠানো
    await fetch(googleSheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name || "",
        phone: body.phone || "",
        address: `${body.address || ""}, থানা: ${body.thana || ""}, জেলা: ${body.district || ""}`,
        note: body.productName ? `${body.productName} (Qty: ${body.quantity || 1})` : "",
        amount: body.totalPrice || 0
      })
    });

    return NextResponse.json({ success: true, message: "Order saved successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || "Server error" }, { status: 500 });
  }
}