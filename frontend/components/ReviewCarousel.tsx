import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Priya S.',
    text: 'Loved the ambience and their filter coffee. Staff was quick to arrange seating for our family.',
    rating: 5
  },
  {
    name: 'Aman Verma',
    text: 'Chicken biryani and burgers are must-try. Parking space makes it easy for groups.',
    rating: 4
  },
  {
    name: 'Ritika K.',
    text: 'Desserts are excellent and the music is chill. Great hangout place with friends.',
    rating: 5
  }
];

export default function ReviewCarousel() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {reviews.map((r) => (
        <div key={r.name} className="glass rounded-2xl p-5 border border-white/10 card-hover">
          <div className="flex items-center gap-2 text-accent">
            {Array.from({ length: r.rating }).map((_, i) => (
              <Star key={i} size={16} fill="#d4af37" />
            ))}
          </div>
          <p className="text-muted mt-3 text-sm">“{r.text}”</p>
          <div className="mt-4 text-white font-semibold">{r.name}</div>
          <div className="text-xs text-muted">Google Maps</div>
        </div>
      ))}
    </div>
  );
}
