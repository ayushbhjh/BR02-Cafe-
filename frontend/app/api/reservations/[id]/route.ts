import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_TOKEN, leads } from '../store';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (token !== ADMIN_TOKEN) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { status } = await request.json();
  const idx = leads.findIndex((l) => l._id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  leads[idx] = { ...leads[idx], status, updatedAt: new Date().toISOString() };
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (token !== ADMIN_TOKEN) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const countBefore = leads.length;
  const remaining = leads.filter((l) => l._id !== params.id);
  leads.length = 0;
  leads.push(...remaining);

  if (remaining.length === countBefore) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
