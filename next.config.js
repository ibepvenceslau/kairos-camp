/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  rewrites() {
    return [
      {
        source: '/inscricoes',
        destination: '/registrations',
      },
    ];
  },
};

module.exports = nextConfig;
