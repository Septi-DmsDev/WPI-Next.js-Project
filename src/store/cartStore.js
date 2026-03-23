// src/store/cartStore.js
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  slug: '', // TAMBAH INI
  panjang: 100,
  lebar: 100,
  qty: 1,
  hargaPerCm: 50,
  totalHarga: 0,

  setSlug: (val) => set({ slug: val }), // TAMBAH INI
  setPanjang: (val) => set({ panjang: Number(val) }),
  setLebar: (val) => set({ lebar: Number(val) }),
  setQty: (val) => set({ qty: Number(val) }),
  
  hitungTotal: () => set((state) => ({
    totalHarga: (state.panjang * state.lebar * state.hargaPerCm) * state.qty
  })),
}));