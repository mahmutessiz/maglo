import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    remotePatterns: [
      {
        // This one is for your user avatars
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/**',
      },
      {
        // Add this new one for your transaction images
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**', // Allows any path on this host
      },
    ],
  },
};

export default nextConfig;
