'use client';

import { useState } from 'react';

const initialState = {
  name: '',
  phone: '',
  email: '',
  guests: 2,
  date: '',
  time: '',
  message: ''
};

export default function ReservationForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });
    try {
      const res = await fetch(`${apiBase}/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to save reservation');
      setStatus({ type: 'success', message: 'Reservation received! We will confirm shortly.' });
      setForm(initialState);
    } catch (err) {
      setStatus({ type: 'error', message: 'Could not submit. Please call +91 79797 49293.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 border border-white/10 space-y-4 shadow-soft">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" type="text" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="Number of Guests" type="number" min={1} max={20} value={form.guests}
          onChange={(v) => setForm({ ...form, guests: Number(v) })} required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Reservation Date" type="date" value={form.date}
          onChange={(v) => setForm({ ...form, date: v })} required />
        <Field label="Reservation Time" type="time" value={form.time}
          onChange={(v) => setForm({ ...form, time: v })} required />
      </div>
      <Field label="Special Request" type="textarea" value={form.message}
        onChange={(v) => setForm({ ...form, message: v })} placeholder="Allergies, celebration notes, etc." />

      {status.type && (
        <div className={`text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {status.message}
        </div>
      )}

      <button type="submit" disabled={loading} className="button-primary w-full justify-center flex">
        {loading ? 'Booking...' : 'Book Table'}
      </button>
    </form>
  );
}

function Field({ label, type, value, onChange, required, placeholder, min, max }:
  { label: string; type: string; value: any; onChange: (v: string) => void; required?: boolean; placeholder?: string; min?: number; max?: number; }) {
  if (type === 'textarea') {
    return (
      <label className="space-y-2 block text-sm text-muted">
        {label}
        <textarea
          className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-white"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
        />
      </label>
    );
  }
  return (
    <label className="space-y-2 block text-sm text-muted">
      {label}
      <input
        type={type}
        className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-white"
        value={value}
        min={min}
        max={max}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
