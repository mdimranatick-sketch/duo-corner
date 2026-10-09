import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // আপনার গুগল শিটের ওয়েব অ্যাপ ইউআরএল
    const googleSheetUrl = "https://script.google.com/macros/s/AKfycbyRhXgy18iGITj89GjcnblmsTWBejfYbNgPEEquYwZtxqyWolXceVQFl-BM8iWmeTg/exec"; 
    
    // গুগল শিটে পাঠানোর জন্য ডাটা গোছানো
    const sheetPayload = {
      name: body.name || "",
      phone: body.phone || "",
      address: `${body.address || ""}, থানা: ${body.thana || ""}, জেলা: ${body.district || ""}`,
      note: body.productName ? `${body.productName} (Qty: ${body.quantity || 1})` : "",
      amount: body.totalPrice || 0
    };

    // সরাসরি গুগল শিটে ফেচ রিকোয়েস্ট পাঠানো
    const response = await fetch(googleSheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheetPayload)
    });

    const result = await response.json();

    if (result.status === "success") {
      return NextResponse.json({ success: true, message: "Order saved to Google Sheet successfully!" });
    } else {
      return NextResponse.json({ success: false, message: "Failed to save order in sheet." }, { status: 500 });
    }

  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || 'Error processing order' }, { status: 500 });
  }
}