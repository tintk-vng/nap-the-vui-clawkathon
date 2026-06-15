/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || 'next-local-v3',
  experimental: {
    workerThreads: true,
    cpus: 1,
    webpackBuildWorker: false
  },
  rewrites: async () => [
    {
      source: '/mua-the-game',
      destination: '/game'
    },
    {
      source: '/mua-the-game/tin-tuc',
      destination: '/game/news'
    },
    {
      source: '/mua-the-game/tin-tuc/:id',
      destination: '/game/news/:id'
    }
  ]
}

module.exports = nextConfig
