import { NextResponse } from 'next/server';

const allowedCreds = [
  { id: process.env.ADMIN_ID, pass: process.env.ADMIN_PASSWORD },
  { id: 'Admin@#1234', pass: '123456789' },
  { id: 'admin', pass: 'br02admin123' }
].filter((c) => c.id && c.pass);

export async function POST(request: Request) {
  const { adminId, password } = await request.json();
  const isValid = allowedCreds.some((c) => c.id === adminId && c.pass === password);

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ token: 'local-admin-token' });
}
