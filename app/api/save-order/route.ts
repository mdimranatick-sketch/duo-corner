import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const STEADFAST_API_KEY = process.env.STEADFAST_API_KEY || 'nhebmum6ll3aeirxkoa0djqscqckyjn3';
const STEADFAST_SECRET_KEY = process.env.STEADFAST_SECRET_KEY || '9clfsi0vrhrbzwupeojrymau';

// ফাইল পাথ (লোকাল ফাইল বা ডাটা সেভ করার জন্য)
const filePath = path.join(process.cwd(), 'orders.json');

// ডাটা রিড করার ফাংশন
function getOrders() {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Read error:', err);
  }
  return [];
}

// ডাটা রাইট করার ফাংশন
function saveOrders(orders: any[]) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error('Write error:', err);
  }
}

// ১. কাস্টমার অর্ডার সাবমিট করলে (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orders = getOrders();
    
    const orderId = 'DUO-' + Math.floor(100000 + Math.random() * 900000);
    
    const newOrder = {
      id: orderId,
      ...body,
      status: 'Processing',
      createdAt: new Date().toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' })
    };

    orders.unshift(newOrder);
    saveOrders(orders);

    return NextResponse.json({ success: true, orderId });
  } catch (error: any) {
    console.error('POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ২. অ্যাডমিন প্যানেলে অর্ডার লিস্ট দেখানোর জন্য (GET)
export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ৩. অ্যাডমিন প্যানেল থেকে এক ক্লিকে Steadfast কুরিয়ারে পাঠানোর জন্য (PUT)
export async function PUT(request: Request) {
  try {
    const { id } = await request.json();
    const orders = getOrders();

    const order = orders.find((o: any) => o.id === id);

    if (!order) {
      return NextResponse.json({ success: false, error: 'অর্ডারটি পাওয়া যায়নি!' }, { status: 404 });
    }

    const steadfastPayload = {
      invoice: order.id,
      recipient_name: order.name,
      recipient_phone: order.phone,
      recipient_address: `${order.address}, থানা: ${order.thana || ''}, জেলা: ${order.district || ''}`,
      cod_amount: order.totalPrice || 0,
      note: `${order.productName || 'Duo Corner Product'} (পরিমাণ: ${order.quantity || 1})`
    };

    const steadfastResponse = await fetch('https://portal.packzy.com/api/v1/create_order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': STEADFAST_API_KEY,
        'Secret-Key': STEADFAST_SECRET_KEY,
      },
      body: JSON.stringify(steadfastPayload),
    });

    const result = await steadfastResponse.json();

    if (result.status === 200 || result.success) {
      const consignmentId = result.consignment?.consignment_id || 'N/A';
      order.status = `Sent to Steadfast (ID: ${consignmentId})`;
      saveOrders(orders);

      return NextResponse.json({ success: true, consignmentId: consignmentId });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.message || 'Steadfast এন্ট্রি নিতে ব্যর্থ হয়েছে।' 
      });
    }

  } catch (error: any) {
    console.error('Steadfast Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: `500` });
  }
}