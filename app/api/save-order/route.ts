import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body: any = await request.json();
    
    const filePath = path.join(process.cwd(), 'orders.json');
    let orders: any[] = [];
    
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      orders = JSON.parse(fileData);
    }

    const newOrder = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || 'Error saving order' }, { status: 500 });
  }
}