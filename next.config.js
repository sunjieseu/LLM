/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 恢复basePath和assetPrefix配置，确保在/LLM/路径下正常工作
  basePath: process.env.NODE_ENV === 'production' ? '/LLM' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/LLM/' : '',
}

module.exports = nextConfig