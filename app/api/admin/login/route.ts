import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    let role = '';
    if (username === 'admin' && password === 'duocorner123') {
      role = 'admin';
    } else if (username === 'moderator' && password === 'mod123') {
      role = 'moderator';
    }

    if (role) {
      // Next.js এর লেটেস্ট নিয়মে cookies() এখন async
      const cookieStore = await cookies();
      cookieStore.set('duo_admin_session', role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return NextResponse.json({ success: true, role });
    }

    return NextResponse.json({ success: false, message: 'ভুল ইউজারনেম বা পাসওয়ার্ড!' }, { status: 401 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server Error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}