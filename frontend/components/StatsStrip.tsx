import { Clock, Star, Users } from 'lucide-react';

const stats = [
  { label: 'Google Rating', value: '4.3 / 5', icon: Star },
  { label: 'Open Hours', value: '11:00 AM – 11:00 PM', icon: Clock },
  { label: 'Dining Capacity', value: '120+ Guests', icon: Users }
];

export default function StatsStrip() {
  return (
    <div className="bg-surface border-y border-white/5">
      <div className="section py-6 grid sm:grid-cols-3 gap-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <Icon className="text-accent" />
            </div>
            <div>
              <div className="text-sm text-muted">{label}</div>
              <div className="text-lg text-white font-semibold">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
