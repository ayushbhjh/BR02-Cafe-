import Image from 'next/image';

const gallery = [
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=1200&q=80'
];

export default function GalleryPreview() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {gallery.map((src) => (
        <Image key={src} src={src} alt="Restaurant" width={500} height={400} className="rounded-2xl h-48 w-full object-cover border border-white/10" />
      ))}
    </div>
  );
}
