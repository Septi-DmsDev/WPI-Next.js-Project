// src/app/(storefront)/page.js
import Link from 'next/link';
import ProductCard from '@/components/custom/ProductCard';
import { supabase } from '@/lib/supabase';
import { Zap, Target, Truck } from 'lucide-react';

export default async function HomePage() {
  // Analogi PHP: $query = mysqli_query($conn, "SELECT * FROM produk ORDER BY id ASC");
  const { data: products, error } = await supabase
    .from('produk')
    .select('*')
    .order('id', { ascending: true });

  // Tangani error database jika VPS/Supabase sedang down
  if (error) {
    return (
      <div className="p-10 text-center text-red-600 bg-red-50 font-bold border-b border-red-200">
        Gagal memuat katalog: {error.message}
      </div>
    );
  }

  return (
    <div className="pb-24">
      
      {/* 1. HERO SECTION (BANNER UTAMA) */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-950 tracking-tighter mb-6 leading-tight">
              Cetak Kebutuhan Bisnis Anda, <span className="text-brand">Tanpa Ribet.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-lg leading-relaxed">
              Platform Web-to-Print premium untuk WPI Internasional. Hitung harga instan, upload desain, dan pesanan tiba di meja Anda.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#katalog" className="px-10 py-4 bg-brand text-white font-bold rounded-full hover:bg-brand-dark transition-colors shadow-xl shadow-brand/30 text-lg">
                Lihat Katalog
              </Link>
              <Link href="#" className="px-10 py-4 bg-gray-100 text-gray-800 font-bold rounded-full hover:bg-gray-200 transition-colors text-lg">
                Cara Pesan
              </Link>
            </div>
          </div>
          {/* Visual Banner Placeholder */}
        <div className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-2xl border border-gray-100 group">
            <img 
              src="https://cwwbhjnamkgxrbhjaaql.supabase.co/storage/v1/object/public/Septian_prib/959feaff-1deb-45ec-84c3-c4160afeab62.jpg" 
              alt="Promo Cetak WPI Internasional"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* 👆 GANTI BLOK VISUAL BANNER INI 👆 */}
        </div>
      </section>

      {/* 2. STATISTIK SECTION */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div className="p-6">
              <p className="font-extrabold text-4xl tracking-tighter text-brand">1.8rb+</p>
              <p className="text-sm text-gray-500 font-semibold mt-1">Brand Pengguna WPI</p>
            </div>
            <div className="p-6">
              <p className="font-extrabold text-4xl tracking-tighter text-brand">99%</p>
              <p className="text-sm text-gray-500 font-semibold mt-1">Konsumen Happy</p>
            </div>
            <div className="p-6">
              <p className="font-extrabold text-4xl tracking-tighter text-brand">24 Jam</p>
              <p className="text-sm text-gray-500 font-semibold mt-1">Order Online Selalu Aktif</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CARA PESAN SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight text-center mb-16">
            Kemudahan Order Cetak di WPI.INTL
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center group p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-gray-950 mb-3">1. Pilih Produk & Kustomisasi</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Pilih produk, masukkan ukuran, material, dan kuantitas. Harga terhitung instan.</p>
            </div>
            
            <div className="text-center group p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-gray-950 mb-3">2. Upload File Desain</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Unggah desain siap cetak Anda (PDF/JPG/PNG). Kami cek filenya.</p>
            </div>
            
            <div className="text-center group p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-gray-950 mb-3">3. Cetak & Kirim</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Duduk manis, kami proses cetak dengan presisi dan kirim langsung ke Anda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KATALOG SECTION */}
      <section id="katalog" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">Katalog Produk</h2>
            <p className="text-gray-500 mt-2 font-medium">Pilih produk dan kustomisasi sesuai kebutuhan.</p>
          </div>
          <Link href="#" className="font-semibold text-sm text-brand hover:text-brand-dark transition-colors">Lihat Semua Produk &rarr;</Link>
        </div>

        {/* Analogi PHP: while($row = mysqli_fetch_assoc($result)) diganti dengan .map() */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products?.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-12">Belum ada produk di database.</p>
          ) : (
            products.map((produk) => (
              <ProductCard key={produk.id} produk={produk} />
            ))
          )}
        </div>
      </section>
      
    </div>
  );
}