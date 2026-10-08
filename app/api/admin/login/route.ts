import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // আপনি এখানে আপনার ইচ্ছামতো এডমিন ও মডারেটর ইউজারনেম-পাসওয়ার্ড সেট করতে পারেন
    let role = '';
    if (username === 'admin' && password === 'duocorner123') {
      role = 'admin';
    } else if (username === 'moderator' && password === 'mod123') {
      role = 'moderator';
    }

    if (role) {
      // কুকিতে রোল এবং স্ট্যাটাস সেভ করে দেওয়া হলো
      cookies().set('duo_admin_session', role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // ৭ দিন
        path: '/',
      });

      return NextResponse.json({ success: true, role });
    }

    return NextResponse.json({ success: false, message: 'ভুল ইউজারনেম বা পাসওয়ার্ড!' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}