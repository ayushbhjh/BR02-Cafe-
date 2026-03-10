import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'BR-02 Cafe & Restaurant | Premium Dining in Manpur, Gaya',
  description:
    'Book a table at BR-02 Cafe & Restaurant in Manpur, Gaya. Premium ambience, Indian, Chinese, Fast Food & South Indian delicacies.',
  openGraph: {
    title: 'BR-02 Cafe & Restaurant',
    description: 'Premium dining, coffee and desserts in Manpur, Gaya.',
    url: 'https://br02-cafe.example.com',
    siteName: 'BR-02 Cafe & Restaurant',
    locale: 'en_IN',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-white font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
