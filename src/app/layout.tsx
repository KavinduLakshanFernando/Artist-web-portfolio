import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

export const metadata: Metadata = {
  title: 'Aurelia Vance | Contemporary Visual Artist & Atelier',
  description: 'Official portfolio and atelier of Aurelia Vance. Monumental oil paintings, mineral pigments, 24k gold leaf, fine art photography, bronze sculptural design, exhibitions, publications, and masterclasses.',
  keywords: ['contemporary artist', 'fine art portfolio', 'oil painting', 'sculptural design', 'cyanotype photography', 'Aurelia Vance', 'art atelier Paris', 'exhibitions', 'art publications'],
  authors: [{ name: 'Aurelia Vance' }],
  openGraph: {
    title: 'Aurelia Vance | Contemporary Visual Artist & Atelier',
    description: 'Explore the monumental works, mineral pigments, exhibitions, publications, and archival editions of contemporary artist Aurelia Vance.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Aurelia Vance Atelier',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="site-main">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
