import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // atau konfigurasi lain yang sudah Anda miliki
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '', // Kosongkan jika tidak ada port spesifik
        pathname: '/**', // Izinkan semua path di bawah hostname ini
      },
      // Anda bisa menambahkan konfigurasi untuk domain lain di sini jika perlu
      // Contoh:
      // {
      //   protocol: 'https',
      //   hostname: 'another-image-domain.com',
      // },
    ],
  },
};

export default nextConfig;
