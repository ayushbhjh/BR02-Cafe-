import Image from 'next/image';

const items = [
  {
    name: 'Chicken Biryani',
    price: '₹260',
    category: 'Indian',
    img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Paneer Butter Masala',
    price: '₹220',
    category: 'Indian',
    img: 'https://images.unsplash.com/photo-1604908553986-6c81271c0aaf?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Veg Manchurian',
    price: '₹190',
    category: 'Chinese',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Chicken Lollipop',
    price: '₹240',
    category: 'Chinese',
    img: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Masala Dosa',
    price: '₹180',
    category: 'South Indian',
    img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Signature Burger',
    price: '₹160',
    category: 'Fast Food',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Oven Pizza',
    price: '₹280',
    category: 'Fast Food',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Filter Coffee',
    price: '₹120',
    category: 'Coffee',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80'
  }
];

export default function MenuGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.name} className="glass rounded-2xl overflow-hidden border border-white/10 card-hover">
          <Image src={item.img} alt={item.name} width={400} height={260} className="h-40 w-full object-cover" />
          <div className="p-4 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{item.name}</h3>
              <span className="text-accent text-sm">{item.price}</span>
            </div>
            <p className="text-muted text-xs uppercase tracking-wide">{item.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
