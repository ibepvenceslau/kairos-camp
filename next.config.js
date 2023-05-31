/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/inscricoes',
          destination: '/registrations',
        },
      ],
    };
  },
};

module.exports = nextConfig;
