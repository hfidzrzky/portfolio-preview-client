import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://github.com/hfidzrzky',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
