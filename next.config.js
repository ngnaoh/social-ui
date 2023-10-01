/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.discordapp.com",
      "external-hkg4-1.xx.fbcdn.net",
      "scontent-hkg4-1.xx.fbcdn.net",
      "scontent.cdninstagram.com",
      "scontent-hkg4-2.cdninstagram.com",
      "scontent-hkg4-1.cdninstagram.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
