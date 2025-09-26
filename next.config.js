/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // tüm hostnamelere izin verir
        },
        {
          protocol: 'http',
          hostname: '**', // http için de izin
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  