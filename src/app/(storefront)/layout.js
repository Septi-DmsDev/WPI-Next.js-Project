// src/app/(storefront)/layout.js
import Link from 'next/link';
import { Search, ShoppingBag } from 'lucide-react'; // Butuh install lucide-react jika belum ada

export const metadata = {
  title: 'WPI.INTL | Platform Web-to-Print Premium',
  description: 'Solusi cetak online premium, presisi, dan mudah.',
};

export default function StorefrontLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER / NAVBAR (STICKY) */}
      <header className="sticky top-0 z-50 w-full bg-white/95 border-b border-gray-100 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20"> {/* Header lebih tinggi (h-20) */}
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-extrabold text-2xl tracking-tight text-gray-950">
                WPI.<span className="text-brand">INTL</span>
              </Link>
            </div>
            
            {/* Area Search Tengah (Meninggalkan spasi kiri agar teks logo tidak padat) */}
            <div className="flex-1 px-12">
              <div className="relative max-w-lg mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="search" 
                  placeholder="Cari produk... (Kartu Nama, Brosur, Stiker)" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Menu Kanan */}
            <nav className="flex items-center space-x-8 font-semibold text-sm text-gray-600">
              {/* Menu 'Produk' dengan dropdown sederhana */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 hover:text-brand transition-colors py-2">
                  Produk
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-brand">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {/* Dropdown Menu (Hanya muncul saat hover) */}
                <div className="absolute top-full left-0 bg-white border p-3 rounded-lg shadow-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                    <Link href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand rounded">Stiker Label</Link>
                    <Link href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand rounded">Kartu Nama</Link>
                    <Link href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand rounded">Brosur & Flier</Link>
                </div>
              </div>

              <Link href="#" className="hover:text-brand transition-colors py-2">Templates</Link>
              <Link href="#" className="hover:text-brand transition-colors py-2">Sampel</Link>
              <Link href="#" className="hover:text-brand transition-colors py-2">Membership</Link>
            </nav>

            {/* Aksi Ikon & Tombol Masuk */}
            <div className="flex items-center gap-6 ml-8 pl-8 border-l border-gray-100">
              <Link href="#" className="text-gray-500 hover:text-brand relative py-2">
                <ShoppingBag className="w-6 h-6" />
                {/* Badge Cart */}
                <span className="absolute -top-1 -right-2 bg-brand text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">3</span>
              </Link>
              
              <Link href="/login" className="px-6 py-3 bg-gray-950 text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow hover:shadow-lg">
                Masuk
              </Link>
            </div>
            
          </div>
        </div>
      </header>

      {/* KONTEN UTAMA */}
      <main className="flex-1 bg-white">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-300 mt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-5 gap-12">
            
            {/* Kolom 1: Logo & Info */}
            <div className="col-span-2 space-y-4 pr-12">
              <h3 className="font-extrabold text-3xl tracking-tight text-white mb-6">WPI.<span className="text-brand">INTL</span></h3>
              <p className="text-sm leading-relaxed max-w-md">
                Platform Web-to-Print premium terpercaya untuk kebutuhan bisnis Anda. Pesan mudah, hasil presisi.
              </p>
              <div className="flex gap-3 text-gray-500 pt-4">
                {/* Icon Sosmed Bawaan (Hanya Teks) */}
                <Link href="#" className="hover:text-white">FB</Link>
                <Link href="#" className="hover:text-white">IG</Link>
                <Link href="#" className="hover:text-white">WA</Link>
              </div>
            </div>

            {/* Kolom 2: Kategori Produk */}
            <div className="space-y-4">
              <h4 className="font-bold text-white mb-4">Kategori Produk</h4>
              <ul className="text-sm space-y-2.5">
                <li><Link href="#" className="hover:text-brand">Stiker Label Kosmetik</Link></li>
                <li><Link href="#" className="hover:text-brand">Stiker Label F&B</Link></li>
                <li><Link href="#" className="hover:text-brand">Kartu Nama Bisnis</Link></li>
                <li><Link href="#" className="hover:text-brand">Brosur & Flier</Link></li>
              </ul>
            </div>

            {/* Kolom 3: Lainnya */}
            <div className="space-y-4">
              <h4 className="font-bold text-white mb-4">Lainnya</h4>
              <ul className="text-sm space-y-2.5">
                <li><Link href="#" className="hover:text-brand">Lacak Pesanan</Link></li>
                <li><Link href="#" className="hover:text-brand">Cara Pesan</Link></li>
                <li><Link href="#" className="hover:text-brand">Promo Member</Link></li>
                <li><Link href="#" className="hover:text-brand">Kebijakan Privasi</Link></li>
              </ul>
            </div>

            {/* Kolom 4: Perusahaan */}
            <div className="space-y-4">
              <h4 className="font-bold text-white mb-4">Perusahaan</h4>
              <ul className="text-sm space-y-2.5">
                <li><Link href="#" className="hover:text-brand">Tentang WPI</Link></li>
                <li><Link href="#" className="hover:text-brand">Hubungi Kami</Link></li>
                <li><Link href="#" className="hover:text-brand">Karir</Link></li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm text-gray-500 font-medium tracking-tight">
            &copy; {new Date().getFullYear()} PT WPI Internasional. Solusi Cetak Online Anda.
          </div>
        </div>
      </footer>
    </div>
  );
}