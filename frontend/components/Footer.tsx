import Link from 'next/link';
import { Facebook, Instagram, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/60 backdrop-blur py-8 mt-12">
      <div className="section flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-sm text-muted">
        <div>
          <div className="font-display text-xl text-white">BR-02 Cafe & Restaurant</div>
          <div>Opp. Delhi Bazaar, Rana Nagar, Manpur, Gaya, Bihar 823003</div>
          <div className="flex items-center gap-2 text-white mt-2">
            <PhoneCall size={16} className="text-accent" /> +91 79797 49293
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#reserve" className="text-white hover:text-accent">Reserve</Link>
          <Link href="/admin" className="text-white hover:text-accent">Admin Login</Link>
        </div>
        <div className="flex items-center gap-3 text-white">
          <Link href="https://instagram.com" className="hover:text-accent" target="_blank" rel="noreferrer"><Instagram size={18} /></Link>
          <Link
            href="https://www.facebook.com/p/BR02-CafeRestaurant-100075905772965/"
            className="hover:text-accent"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
