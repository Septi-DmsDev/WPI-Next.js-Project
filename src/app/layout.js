// src/app/layout.js
import './globals.css'; // Wajib panggil CSS Tailwind di sini agar web tidak berantakan

export const metadata = {
  title: 'WPI Internasional - Web to Print',
  description: 'Sistem cetak online interaktif',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/* Semua layout spesifik seperti (storefront) atau (dashboard) akan dirender di dalam tag body ini */}
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}