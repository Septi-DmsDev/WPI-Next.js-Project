// src/app/(storefront)/cek-pesanan/page.js
'use client';

import { useState } from 'react';
import { cariPesananServer } from '@/app/actions/tracking';

export default function CekPesananPage() {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCari = async (e) => {
    e.preventDefault(); // Mencegah browser reload (Analogi: event.preventDefault() di jQuery)
    setLoading(true);
    setErrorMsg('');
    setHasil(null);

    const response = await cariPesananServer(orderId);

    if (response.success) {
      setHasil(response.data);
    } else {
      setErrorMsg(response.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border mt-8">
      <h1 className="text-2xl font-bold mb-2 text-slate-900">Lacak Pesanan</h1>
      <p className="text-slate-600 mb-6 text-sm">Masukkan ID Transaksi yang Anda terima via WhatsApp.</p>

      <form onSubmit={handleCari} className="mb-8 flex gap-2">
        <input 
          type="text" 
          placeholder="Contoh: 123e4567-e89b-..." 
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="flex-1 border p-3 rounded focus:outline-blue-500"
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700 disabled:bg-slate-400 transition-colors"
        >
          {loading ? 'Mencari...' : 'Cari'}
        </button>
      </form>

      {/* TAMPILAN ERROR */}
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded">
          {errorMsg}
        </div>
      )}

      {/* TAMPILAN HASIL PENCARIAN */}
      {hasil && (
        <div className="p-6 bg-slate-50 border rounded">
          <div className="flex justify-between items-start mb-4 border-b pb-4">
            <div>
              <p className="text-sm text-slate-500">Status Saat Ini</p>
              {/* Badge Status Dinamis */}
              <span className={`inline-block px-3 py-1 rounded text-sm font-bold mt-1 uppercase ${
                hasil.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 
                hasil.status === 'selesai' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
              }`}>
                {hasil.status}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Tanggal Pesanan</p>
              <p className="font-medium text-slate-800">
                {new Date(hasil.created_at).toLocaleDateString('id-ID')}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-slate-700">
            <p><strong>ID Transaksi:</strong> <span className="text-xs break-all">{hasil.id}</span></p>
            <p><strong>Produk:</strong> {hasil.produk_slug.replace(/-/g, ' ').toUpperCase()}</p>
            <p><strong>Spesifikasi:</strong> {hasil.detail_spesifikasi.panjang}cm x {hasil.detail_spesifikasi.lebar}cm ({hasil.detail_spesifikasi.qty} Pcs)</p>
            <p><strong>Total Tagihan:</strong> Rp {hasil.total_harga.toLocaleString('id-ID')}</p>
          </div>
        </div>
      )}
    </div>
  );
}