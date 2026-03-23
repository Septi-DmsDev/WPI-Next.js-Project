// src/app/(storefront)/order/[slug]/page.js
import KalkulatorOrder from '@/components/custom/KalkulatorOrder';

// Menambahkan Metadata Dinamis untuk SEO yang lebih baik
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const namaProduk = slug.replace(/-/g, ' ').toUpperCase();
  
  return {
    title: `Pesan ${namaProduk} | Kalkulator Cetak`,
    description: `Masukkan spesifikasi cetak untuk ${namaProduk} dan dapatkan estimasi harga secara langsung.`
  };
}

// 1. Tambahkan kata 'async' di fungsi utama
export default async function OrderDetail({ params }) {
  
  // 2. Wajib gunakan 'await' untuk mengekstrak slug dari Promise params
  const { slug } = await params;

  // Sekarang slug sudah berisi teks murni (contoh: 'kartu-nama-premium')
  const produk = { 
    nama: slug.replace(/-/g, ' ').toUpperCase(),
    slug: slug 
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Detail Produk</h1>
        <p className="text-slate-600">Silakan masukkan spesifikasi cetak Anda.</p>
      </div>
      
      <KalkulatorOrder produk={produk} />
    </div>
  );
}