import Image from 'next/image';

// Stable Unsplash shots (explicit width & quality) to avoid 404s
const gallery = [
  { src: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80', alt: 'Signature pizza fresh from the oven' },
  { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80', alt: 'Coffee and dessert table setup' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80', alt: 'Fine-dine plated main course' },
  { src: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80', alt: 'Cozy booth seating inside the cafe' },
  { src: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=1200&q=80', alt: 'Dinner service with friends enjoying meals' },
  { src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80', alt: 'Outdoor style seating with warm lighting' },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', alt: 'Private dining setup with wine glasses' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80&sat=-30', alt: 'Chef presentation close-up' },
  { src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80', alt: 'Gourmet burger with fries' }
];

export default function GalleryPage() {
  return (
    <div className="section py-14">
      <div className="mb-8">
        <p className="text-muted text-sm">Gallery</p>
        <h1 className="font-display text-4xl text-white">Inside BR-02 Cafe & Restaurant</h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((item) => (
          <Image key={item.src} src={item.src} alt={item.alt} width={800} height={600} className="rounded-2xl h-64 w-full object-cover border border-white/10" />
        ))}
      </div>
    </div>   
  );
}
