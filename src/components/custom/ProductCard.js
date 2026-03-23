// src/components/custom/ProductCard.jsx
import Link from 'next/link';

export default function ProductCard({ produk }) {
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(angka);
  };

  // Analogi PHP: if (empty($row['gambar'])) { $gambar = '/path/to/placeholder.jpg'; } else { $gambar = $row['gambar']; }
  const imageSrc = produk.gambar || 'https://via.placeholder.com/400';

  return (
    <Link href={`/order/${produk.slug}`} className="group block h-full">
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col group-hover:-translate-y-1.5">
        
        {/* Area Gambar (Rasio 1:1/Square) */}
        <div className="aspect-square bg-gray-100 w-full relative overflow-hidden flex items-center justify-center">
          {/* 👇 PERUBAHAN DI SINI 👇 */}
          {produk.gambar ? (
            <img
              src={produk.gambar}
              alt={produk.nama}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="text-gray-400 font-medium text-sm group-hover:scale-110 transition-transform duration-700">
              [Visual {produk.nama}]
            </div>
          )}
          {/* 👆 PERUBAHAN DI SINI 👆 */}
          
          {/* Badge 'Tersedia' opsional di kiri atas */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-950 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
            Tersedia
          </div>
        </div>
        
        {/* Area Teks & Harga */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-bold text-gray-950 text-lg leading-tight mb-2 group-hover:text-brand transition-colors">
            {produk.nama}
          </h3>
          <p className="text-sm text-gray-500 mb-5 line-clamp-2">
            Mulai dari spesifikasi standar hingga premium. Kustomisasi penuh.
          </p>
          
          <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1">Harga Mulai</p>
              <p className="font-extrabold text-brand text-xl tracking-tight">{formatRupiah(produk.harga_dasar)}</p>
            </div>
            
            {/* Tombol Panah (Minimalis) */}
            <div className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}