/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 移除basePath和assetPrefix，让网站在根域名下运行
  // basePath: process.env.NODE_ENV === 'production' ? '/LLM' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/LLM/' : '',
  
  // 确保静态文件正确导出
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml'
      },
      {
        source: '/robots.txt', 
        destination: '/robots.txt'
      }
    ]
  }
}

module.exports = nextConfig