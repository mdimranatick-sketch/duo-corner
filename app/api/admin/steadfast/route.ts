import { NextResponse } from "next/server";

const STEADFAST_API_URL = "https://portal.packzy.com/api/v1/create_order";
const API_KEY = "nhebmum6ll3aeirxkoa0djqscqckyjn3";
const SECRET_KEY = "9clfsi0vrhrbzwupeojrymau";
const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;

export async function POST(request: Request) {
  try {
    const order = await request.json();

    // সঠিক অর্ডার আইডি এবং ফোন নম্বর নিশ্চিত করা
    const targetOrderId = order.orderId || order.invoice || `ORD-${Date.now()}`;
    const targetPhone = order.customerPhone || order.phone || "";

    const payload = {
      invoice: targetOrderId,
      recipient_name: order.customerName || order.name || "Customer",
      recipient_phone: targetPhone,
      recipient_address: order.customerAddress || order.address || "Dhaka",
      cod_amount: Number(order.productPrice || order.amount || 0),
      note: order.note || "Duo Corner Order",
    };

    const response = await fetch(STEADFAST_API_URL, {
      method: "POST",
      headers: {
        "Api-Key": API_KEY,
        "Secret-Key": SECRET_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.status === 200 || result.success) {
      const consignmentId =
        result.consignment?.consignment_id ||
        result.consignment_id ||
        `CN-${Date.now()}`;

      // গুগল শিটে স্ট্যাটাস ও ট্র্যাকিং আইডি আপডেট করার জন্য Order ID এবং Phone একসাথে পাঠানো
      if (GOOGLE_SHEET_URL) {
        try {
          await fetch(GOOGLE_SHEET_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "update_order_status",
              orderId: targetOrderId,
              phone: targetPhone,
              trackingCode: String(consignmentId),
              status: "Booked",
            }),
            cache: "no-store",
          });
        } catch (sheetErr) {
          console.error("Google Sheet Update Error:", sheetErr);
        }
      }

      return NextResponse.json({ success: true, result, consignmentId });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Steadfast এন্ট্রি ব্যর্থ হয়েছে",
        },
        { status: 400 },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
