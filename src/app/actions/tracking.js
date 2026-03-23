// src/app/actions/tracking.js
'use server';

import { supabase } from '@/lib/supabase';

export async function cariPesananServer(orderId) {
  try {
    // Validasi format UUID sederhana agar server tidak error jika user input sembarangan
    if (!orderId || orderId.length < 30) {
      return { success: false, message: "Format ID Transaksi tidak valid." };
    }

    const { data, error } = await supabase
      .from('transaksi')
      .select('id, produk_slug, detail_spesifikasi, total_harga, status, created_at')
      .eq('id', orderId)
      .single();

    if (error || !data) {
      return { success: false, message: "Pesanan tidak ditemukan. Cek kembali ID Anda." };
    }

    return { success: true, data: data };

  } catch (error) {
    return { success: false, message: "Terjadi kesalahan sistem." };
  }
}