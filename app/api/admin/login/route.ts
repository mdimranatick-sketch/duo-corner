import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password }: { username?: string; password?: string } = await request.json();

    let role = '';
    if (username === 'admin' && password === 'duocorner123') {
      role = 'admin';
    } else if (username === 'moderator' && password === 'mod123') {
      role = 'moderator';
    }

    if (role) {
      const cookieStore = await cookies();
      cookieStore.set({
        name: 'duo_admin_session',
        value: role,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return NextResponse.json({ success: true, role });
    }

    return NextResponse.json({ success: false, message: 'ভুল ইউজারনেম বা পাসওয়ার্ড!' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Server Error' }, { status: 500 });
  }
}