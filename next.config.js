/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  // Allow Next.js to optimize images from your API host
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
    ],
  },

  // Your existing webpack alias
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};
