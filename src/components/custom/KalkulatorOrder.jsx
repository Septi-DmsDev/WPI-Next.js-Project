// src/components/custom/KalkulatorOrder.jsx
'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

export default function KalkulatorOrder({ produk }) {
  const router = useRouter();

  const { 
    panjang, lebar, qty, totalHarga, 
    setPanjang, setLebar, setQty, hitungTotal,
    setSlug // PANGGIL FUNGSI BARU INI
  } = useCartStore();

  useEffect(() => {
    hitungTotal();
  }, [panjang, lebar, qty, hitungTotal]);

  const formatRupiah = (angka) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);

  const handleLanjutUpload = () => {
    setSlug(produk.slug); // SIMPAN SLUG SEBELUM PINDAH HALAMAN
    router.push('/upload');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-bold mb-4">Kalkulator {produk.nama}</h2>
      
      {/* FORM INPUT PxL */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1">Panjang (cm)</label>
          <input 
            type="number" 
            value={panjang} 
            onChange={(e) => setPanjang(e.target.value)}
            className="w-full border rounded p-2 focus:outline-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Lebar (cm)</label>
          <input 
            type="number" 
            value={lebar} 
            onChange={(e) => setLebar(e.target.value)}
            className="w-full border rounded p-2 focus:outline-blue-500"
          />
        </div>
      </div>

      {/* FORM INPUT QTY */}
      <div className="mb-6">
        <label className="block text-sm text-slate-600 mb-1">Quantity (Pcs)</label>
        <input 
          type="number" 
          value={qty} 
          onChange={(e) => setQty(e.target.value)}
          className="w-full border rounded p-2 focus:outline-blue-500"
        />
      </div>

      <div className="border-t pt-4 flex justify-between items-center mb-6">
        <span className="font-semibold text-slate-600">Total Estimasi:</span>
        <span className="text-2xl font-bold text-blue-600">{formatRupiah(totalHarga)}</span>
      </div>

      <button 
        onClick={handleLanjutUpload}
        className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors"
      >
        Lanjut Upload Desain
      </button>
    </div>
  );
}