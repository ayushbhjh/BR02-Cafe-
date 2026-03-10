'use client';

import { motion } from 'framer-motion';
import { PhoneCall, MapPin, Clock, Star, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ReservationForm from '@/components/ReservationForm';
import MenuGrid from '@/components/MenuGrid';
import FeatureGrid from '@/components/FeatureGrid';
import ReviewCarousel from '@/components/ReviewCarousel';
import GalleryPreview from '@/components/GalleryPreview';
import StatsStrip from '@/components/StatsStrip';

const highlights = [
  'Premium dark-luxe ambience with gold accents',
  'Freshly ground coffee and signature desserts',
  'Group-friendly seating and private dining space'
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section id="hero" className="relative min-h-[80vh] flex items-center bg-hero-pattern bg-cover bg-center">
        <div className="section py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-accent"
            >
              ⭐ Google 4.3 · Loved by 137 diners
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-4xl md:text-5xl leading-tight text-white"
            >
              Experience the Best Cafe in Manpur, Gaya
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted max-w-2xl"
            >
              Delicious Indian, Chinese, Fast Food & South Indian plates served with craft coffee, luxe ambience and heartfelt hospitality.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <Link href="#reserve" className="button-primary">Reserve a Table</Link>
              <Link href="#menu" className="button-outline">View Menu</Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted"
            >
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="text-accent h-5 w-5" /> {item}
                </li>
              ))}
            </motion.ul>

            <motion.div className="flex gap-6 text-sm text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <div className="flex items-center gap-2"><MapPin size={18} className="text-accent" /> Opp. Delhi Bazaar, Rana Nagar, Manpur</div>
              <div className="flex items-center gap-2"><Clock size={18} className="text-accent" /> 11:00 AM – 11:00 PM</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-soft border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80&ixlib=rb-4.0.3"
                alt="Restaurant interior"
                width={900}
                height={600}
                className="object-cover h-full"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl shadow-glow">
              <div className="text-sm text-muted">Call for quick reservations</div>
              <div className="text-2xl font-semibold text-white flex items-center gap-2"><PhoneCall className="text-accent" /> +91 79797 49293</div>
            </div>
          </motion.div>
        </div>
      </section>

      <StatsStrip />

      {/* About */}
      <section id="about" className="section py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-accent uppercase tracking-[0.3em] text-xs">About</span>
            <h2 className="font-display text-3xl text-white">Trendy cafe vibes, fine-dine service</h2>
            <p className="text-muted text-lg">
              BR-02 Cafe & Restaurant is one of the most loved cafes in Manpur, Gaya. Known for its great coffee, delicious food, and relaxing ambience, it is the perfect place for friends, family, and couples.
            </p>
            <p className="text-muted">
              Enjoy outdoor seating, free parking, a private dining room and fast service that keeps the conversations flowing. Our chefs blend regional favourites with modern flavours.
            </p>
            <div className="flex gap-3">
              <span className="badge badge-confirmed">Lunch & Dinner</span>
              <span className="badge badge-pending">Coffee & Desserts</span>
              <span className="badge badge-confirmed">Family Friendly</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
              alt="Coffee"
              width={500}
              height={600}
              className="rounded-2xl h-full object-cover"
            />
            <div className="space-y-4">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                alt="Food"
                width={500}
                height={280}
                className="rounded-2xl object-cover"
              />
              <Image
                src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80"
                alt="Ambience"
                width={500}
                height={280}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section py-12">
        <FeatureGrid />
      </section>

      {/* Menu */}
      <section id="menu" className="section py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-3xl text-white">Chef's Picks</h2>
          <Link href="#reserve" className="text-accent hover:underline">Book a table</Link>
        </div>
        <MenuGrid />
      </section>

      <section id="gallery" className="section py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl text-white">Atmosphere & Plates</h2>
          <Link href="/gallery" className="text-accent hover:underline">Full gallery →</Link>
        </div>
        <GalleryPreview />
      </section>

      <section id="reviews" className="section py-16">
        <div className="flex items-center gap-3 mb-6">
          <Star className="text-accent" />
          <h2 className="font-display text-3xl">4.3 / 5 from 137 Google reviews</h2>
        </div>
        <ReviewCarousel />
      </section>

      {/* Reservation */}
      <section id="reserve" className="section py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <span className="text-accent uppercase tracking-[0.3em] text-xs">Reservation</span>
            <h2 className="font-display text-3xl text-white">Reserve your table in seconds</h2>
            <p className="text-muted text-lg">Fill your details and our team will confirm your booking instantly.</p>
            <div className="flex flex-col gap-2 text-muted text-sm">
              <div className="flex items-center gap-2"><PhoneCall size={16} className="text-accent" /> +91 79797 49293</div>
              <div className="flex items-center gap-2"><MapPin size={16} className="text-accent" /> Opp. Delhi Bazaar, Rana Nagar, Manpur, Gaya</div>
              <div className="flex items-center gap-2"><Clock size={16} className="text-accent" /> Open 11:00 AM – 11:00 PM</div>
            </div>
          </div>
          <ReservationForm />
        </div>
      </section>

      {/* Instagram / Contact */}
      <section id="contact" className="section pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="font-display text-2xl">Visit BR-02 Cafe & Restaurant</h3>
            <p className="text-muted">Opp. Delhi Bazaar, Rana Nagar, Manpur, Gaya, Bihar 823003</p>
            <div className="flex flex-wrap gap-3 text-muted text-sm">
              <span className="badge badge-confirmed">Parking</span>
              <span className="badge badge-confirmed">Outdoor seating</span>
              <span className="badge badge-confirmed">Air-conditioned</span>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1862517852986!2d85.042!3d24.079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32c6b00000001%3A0x0!2sBR-02%20Cafe%20%26%20Restaurant!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-2xl">Follow the vibe</h3>
            <p className="text-muted">See what guests are loving right now.</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1544145945-f90425340c7b?auto=format&fit=crop&w=600&q=80'
              ].map((src) => (
                <Image key={src} src={src} alt="Instagram preview" width={300} height={300} className="rounded-xl object-cover h-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/917979749293?text=Hi%20I%20want%20to%20book%20a%20table%20at%20BR-02"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-full shadow-glow flex items-center gap-2 hover:scale-105 transition"
        aria-label="WhatsApp order"
        target="_blank"
        rel="noreferrer"
      >
        <PhoneCall size={18} /> Order / Book on WhatsApp
      </a>
    </main>
  );
}
