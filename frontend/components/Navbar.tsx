'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#reserve', label: 'Reserve' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition ${scrolled ? 'backdrop-blur-lg bg-background/70 border-b border-white/5' : 'bg-transparent'}`}>
      <div className="section flex items-center justify-between py-4">
        <Link href="#hero" className="font-display text-xl text-accent">BR-02 Cafe</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white transition">{item.label}</Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link href="tel:+917979749293" className="text-sm text-white">+91 79797 49293</Link>
          <Link href="#reserve" className="button-primary text-sm">Book Table</Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-background/90 border-t border-white/5">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block text-white" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="#reserve" className="button-primary inline-block" onClick={() => setOpen(false)}>
            Book Table
          </Link>
        </div>
      )}
    </header>
  );
}
