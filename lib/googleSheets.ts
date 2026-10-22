const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;

type OrderData = {
  name?: string;
  phone?: string;
  address?: string;
  collectionAmount?: number | string;
  totalPrice?: number | string;
};

// ১. গুগল শিট থেকে সব অর্ডার ফেচ বা রিড করার ফাংশন
export async function fetchOrdersFromSheet() {
  try {
    if (!GOOGLE_SHEET_URL) {
      throw new Error("GOOGLE_SHEET_URL পরিবেশ ভেরিয়েবল সেট করা নেই।");
    }

    const response = await fetch(GOOGLE_SHEET_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("গুগল শিট থেকে ডেটা আনা যায়নি।");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return [];
  }
}

// ২. গুগল শিটে নতুন অর্ডার সেভ করার ফাংশন
export async function saveOrderToSheet(orderData: OrderData) {
  try {
    if (!GOOGLE_SHEET_URL) {
      throw new Error("GOOGLE_SHEET_URL পরিবেশ ভেরিয়েবল সেট করা নেই।");
    }

    const payload = {
      action: "add_order",
      name: orderData.name || "Unknown",
      phone: orderData.phone || "",
      address: orderData.address || "",
      collectionAmount: Number(
        orderData.collectionAmount ?? orderData.totalPrice ?? 0,
      ),
    };

    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("গুগল শিটে অর্ডার সেভ করা ব্যর্থ হয়েছে।");
    }

    const result = await response.json();
    return { success: true, result };
  } catch (error: unknown) {
    console.error("Save Order Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}

// ৩. গুগল শিটে অর্ডারের ট্র্যাকিং আইডি ও স্ট্যাটাস আপডেট করার ফাংশন
export async function updateOrderInSheet(updateData: {
  orderId: string;
  trackingCode: string;
  status: string;
}) {
  try {
    if (!GOOGLE_SHEET_URL) {
      throw new Error("GOOGLE_SHEET_URL পরিবেশ ভেরিয়েবল সেট করা নেই।");
    }

    const payload = {
      action: "update_order",
      orderId: updateData.orderId,
      trackingCode: updateData.trackingCode,
      status: updateData.status,
    };

    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("গুগল শিটে অর্ডার আপডেট করা ব্যর্থ হয়েছে।");
    }

    const result = await response.json();
    return { success: true, result };
  } catch (error: unknown) {
    console.error("Update Order Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}
