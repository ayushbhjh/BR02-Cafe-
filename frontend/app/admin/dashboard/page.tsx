'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarClock, CheckCircle2, Trash2 } from 'lucide-react';

interface Lead {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  guests: number;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, today: 0 });
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  useEffect(() => {
    const token = localStorage.getItem('br02_token');
    if (!token) {
      router.replace('/admin');
      return;
    }
    (async () => {
      try {
        const res = await fetch(`${apiBase}/api/reservations`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();
        setLeads(data.leads || []);
        setStats({ total: data.total || 0, today: data.today || 0 });
      } catch (err) {
        router.replace('/admin');
      } finally {
        setLoading(false);
      }
    })();
  }, [apiBase, router]);

  async function updateStatus(id: string, status: 'confirmed' | 'cancelled') {
    const token = localStorage.getItem('br02_token');
    const res = await fetch(`${apiBase}/api/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
    }
  }

  async function remove(id: string) {
    const token = localStorage.getItem('br02_token');
    const res = await fetch(`${apiBase}/api/reservations/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) setLeads((prev) => prev.filter((l) => l._id !== id));
  }

  if (loading) return <div className="section py-20">Loading dashboard...</div>;

  return (
    <div className="section py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted text-sm">Admin Dashboard</p>
          <h1 className="font-display text-3xl text-white">Reservations</h1>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('br02_token');
            router.replace('/admin');
          }}
          className="text-sm text-muted hover:text-white"
        >
          Logout
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Total Reservations" value={stats.total} />
        <StatCard label="Today's Reservations" value={stats.today} />
        <StatCard label="Pending Leads" value={leads.filter((l) => l.status === 'pending').length} />
      </div>

      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-sm">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Guests</th>
                <th>Date</th>
                <th>Time</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="text-sm">
                  <td className="text-white font-medium">{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.email || '-'}</td>
                  <td>{lead.guests}</td>
                  <td>{lead.date}</td>
                  <td>{lead.time}</td>
                  <td className="max-w-[200px] truncate" title={lead.message}>{lead.message || '-'}</td>
                  <td>
                    <span className={`badge ${lead.status === 'confirmed' ? 'badge-confirmed' : lead.status === 'cancelled' ? 'badge-cancelled' : 'badge-pending'}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="flex items-center gap-2">
                    <button onClick={() => updateStatus(lead._id, 'confirmed')} className="text-green-400" title="Confirm">
                      <CheckCircle2 size={18} />
                    </button>
                    <button onClick={() => remove(lead._id)} className="text-red-400" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {!leads.length && (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-muted">No leads yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass rounded-2xl p-5 border border-white/10">
      <div className="text-muted text-sm">{label}</div>
      <div className="text-3xl font-semibold text-white">{value}</div>
    </div>
  );
}
