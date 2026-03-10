import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

interface Lead {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  guests?: number;
  date?: string;
  time?: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Shared in-memory store survives route re-imports during dev
const globalStore = globalThis as typeof globalThis & { __br02_leads?: Lead[] };
export const leads: Lead[] = globalStore.__br02_leads || (globalStore.__br02_leads = []);
export const ADMIN_TOKEN = 'local-admin-token';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }
    const now = new Date().toISOString();
    const lead: Lead = {
      _id: randomUUID(),
      name: body.name,
      phone: body.phone,
      email: body.email,
      guests: Number(body.guests || 0),
      date: body.date,
      time: body.time,
      message: body.message,
      status: 'pending',
      createdAt: now,
      updatedAt: now
    };
    leads.unshift(lead);
    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Could not save reservation' }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const todayStr = new Date().toISOString().slice(0, 10);
  const today = leads.filter((l) => l.date === todayStr).length;
  return NextResponse.json({ total: leads.length, today, leads });
}
