// src/app/(storefront)/upload/page.js
'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { prosesCheckoutServer } from '@/app/actions/checkout'; // IMPORT SERVER ACTION

export default function UploadPage() {
  const router = useRouter();
  
  // Tarik slug juga dari Zustand
  const { slug, panjang, lebar, qty, totalHarga } = useCartStore();
  
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Cek apakah user tembus langsung via URL tanpa isi kalkulator
  if (totalHarga === 0 || !slug) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Data pesanan tidak lengkap.</p>
        <button onClick={() => router.push('/')} className="text-blue-600 underline">Kembali ke Katalog</button>
      </div>
    );
  }

  const handleUploadAndCheckout = async () => {
    if (!file) return alert("Pilih file desain terlebih dahulu!");
    setIsUploading(true);
    
    // 1. Upload ke Supabase Storage (seperti Fase 3)
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `pesanan/${fileName}`;

    const { error: errUpload } = await supabase.storage
      .from('desain_user')
      .upload(filePath, file);

    if (errUpload) {
      alert("Gagal upload gambar: " + errUpload.message);
      setIsUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('desain_user')
      .getPublicUrl(filePath);

    // 2. Eksekusi Server Action (Fase 4 - Proses Backend)
    // Ingat: Kita TIDAK mengirim totalHarga dari frontend. Biar server yang hitung ulang.
    const response = await prosesCheckoutServer({
      slug: slug,
      panjang: panjang,
      lebar: lebar,
      qty: qty,
      fileUrl: publicUrlData.publicUrl
    });

    if (response.success) {
      alert("Pesanan berhasil disimpan! Mengarahkan ke WhatsApp...");
      // Gunakan window.location karena link WA berada di luar domain Next.js kita
      window.location.href = response.linkWa; 
    } else {
      alert("Gagal memproses pesanan: " + response.message);
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">Upload & Checkout</h1>
      
      <div className="bg-slate-50 p-4 rounded mb-6 text-sm text-slate-700">
        <p><strong>Produk:</strong> {slug.replace(/-/g, ' ').toUpperCase()}</p>
        <p><strong>Spesifikasi:</strong> {panjang}cm x {lebar}cm ({qty} Pcs)</p>
        <p><strong>Total Estimasi:</strong> Rp {totalHarga.toLocaleString('id-ID')}</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Pilih File (JPG/PNG/PDF)</label>
        <input 
          type="file" 
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded"
        />
      </div>

      <button 
        onClick={handleUploadAndCheckout}
        disabled={isUploading}
        className={`w-full py-3 rounded-md font-bold text-white transition-colors ${
          isUploading ? 'bg-slate-400' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {isUploading ? 'Memproses Pesanan...' : 'Upload & Pesan Sekarang'}
      </button>
    </div>
  );
}