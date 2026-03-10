import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Reuse the same in-memory array defined in the sibling route
import * as listRoute from '../route';
import { ADMIN_TOKEN } from '../route';

function getLeads(): any[] {
  // @ts-ignore accessing module-scoped leads
  return (listRoute as any).leads as any[];
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (token !== ADMIN_TOKEN) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { status } = await request.json();
  const leads = getLeads();
  const idx = leads.findIndex((l) => l._id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  leads[idx] = { ...leads[idx], status, updatedAt: new Date().toISOString() };
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (token !== ADMIN_TOKEN) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let leads = getLeads();
  const countBefore = leads.length;
  leads = leads.filter((l) => l._id !== params.id);
  // write back to shared array
  (listRoute as any).leads.length = 0;
  (listRoute as any).leads.push(...leads);

  if (leads.length === countBefore) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
