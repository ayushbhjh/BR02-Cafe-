import { NextRequest, NextResponse } from 'next/server';

type LeadStatus = 'pending' | 'confirmed' | 'cancelled';
type Lead = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  guests?: number;
  date?: string;
  time?: string;
  message?: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
};

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'local-admin-token';
const leads: Lead[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }
    const now = new Date().toISOString();
    const lead: Lead = {
      _id: crypto.randomUUID(),
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

export async function GET(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const todayStr = new Date().toISOString().slice(0, 10);
  const today = leads.filter((l) => l.date === todayStr).length;
  return NextResponse.json({ total: leads.length, today, leads });
}
