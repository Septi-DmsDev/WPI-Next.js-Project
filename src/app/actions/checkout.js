// src/app/actions/checkout.js
'use server'; // Wajib! Ini menandakan kode ini 100% jalan di Backend (VPS)

import { supabase } from '@/lib/supabase';

export async function prosesCheckoutServer(dataPesanan) {
  try {
    const { slug, panjang, lebar, qty, fileUrl } = dataPesanan;

    // 1. Validasi Server (Analogi: $query = "SELECT harga_dasar FROM produk WHERE slug=...")
    const { data: produk, error: errProduk } = await supabase
      .from('produk')
      .select('harga_dasar')
      .eq('slug', slug)
      .single();

    if (errProduk || !produk) {
      throw new Error("Produk tidak ditemukan atau harga tidak valid.");
    }

    // 2. Hitung Ulang secara Rahasia di Server
    // (MVP: Saat ini kita anggap harga per CM adalah 50. Nanti bisa ditarik dari tabel material)
    const hargaPerCm = 50; 
    const totalHargaValid = (panjang * lebar * hargaPerCm) * qty;

    // 3. Simpan ke Database
    const { data: transaksi, error: errInsert } = await supabase
      .from('transaksi')
      .insert([
        {
          produk_slug: slug,
          detail_spesifikasi: { panjang, lebar, qty }, // Disimpan sebagai JSONB
          total_harga: totalHargaValid,
          file_url: fileUrl,
          status: 'pending'
        }
      ])
      .select('id')
      .single();

    if (errInsert) throw new Error(errInsert.message);

    // 4. Generate Link WhatsApp (Untuk MVP)
    const pesanWa = `Halo WPI, saya ingin memproses order dengan ID: ${transaksi.id}. Mohon cek desain dan total tagihan saya sebesar Rp ${totalHargaValid}.`;
    const linkWa = `https://wa.me/6281234567890?text=${encodeURIComponent(pesanWa)}`; // Ganti nomor Anda

    return { success: true, linkWa: linkWa };

  } catch (error) {
    console.error("Checkout Error:", error);
    return { success: false, message: error.message };
  }
}