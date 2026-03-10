import { Coffee, ParkingSquare, Dessert, Trees, Users, ShieldCheck } from 'lucide-react';

const features = [
  { icon: Coffee, title: 'Great Coffee', copy: 'Freshly ground brews and signature chillers.' },
  { icon: Dessert, title: 'Great Desserts', copy: 'Cheesecakes, brownies and handcrafted sundaes.' },
  { icon: Trees, title: 'Outdoor Seating', copy: 'Breezy patio for evening coffees and hangs.' },
  { icon: ParkingSquare, title: 'Free Parking', copy: 'Hassle-free parking for you and your friends.' },
  { icon: Users, title: 'Family Friendly', copy: 'Spacious seating for groups and celebrations.' },
  { icon: ShieldCheck, title: 'Private Dining', copy: 'Intimate room for special dinners and meetings.' }
];

export default function FeatureGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map(({ icon: Icon, title, copy }) => (
        <div key={title} className="glass rounded-2xl p-5 border border-white/10 card-hover">
          <div className="flex items-center gap-3 mb-2">
            <Icon className="text-accent" />
            <h3 className="font-semibold text-white">{title}</h3>
          </div>
          <p className="text-muted text-sm">{copy}</p>
        </div>
      ))}
    </div>
  );
}
