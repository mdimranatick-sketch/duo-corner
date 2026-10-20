/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

const GOOGLE_SHEET_URL =
  process.env.GOOGLE_SHEET_URL ||
  "আপনার_গুগল_শিট_এক্সিকিউটেবল_লিংকটি_এখানে_দিন";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // body-তে orderId, trackingCode, status থাকতে হবে
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_order_status",
        ...body,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Google Sheet order update failed");
    }

    const result = await response.json().catch(() => ({ status: "success" }));
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Order Update API error:", error);
    return NextResponse.json(
      { success: false, error: error.toString() },
      { status: 500 },
    );
  }
}
