import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LLM应用开发实验室 - 孙杰博士 | 大语言模型应用专家',
  description: '孙杰博士专注于大语言模型应用开发，为企业提供AI智能对话、代码生成、文本分析等定制化解决方案。南京中科智慧生态科技有限公司-南京邮电大学-南京晓庄学院人工智能研究院。',
  keywords: 'LLM应用开发,大语言模型,AI应用,智能对话,代码生成,文本分析,孙杰,人工智能,机器学习,自然语言处理,ChatGPT,GPT应用,AI咨询,智能客服,南京邮电大学,南京晓庄学院',
  authors: [{ name: '孙杰', url: 'https://sunjieseu.github.io' }],
  creator: '孙杰',
  publisher: '南京中科智慧生态科技有限公司',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'LLM应用开发实验室 - 孙杰博士 | 大语言模型应用专家',
    description: '孙杰博士专注于大语言模型应用开发，为企业提供AI智能对话、代码生成、文本分析等定制化解决方案。',
    type: 'website',
    url: 'https://sunjieseu.github.io/LLM',
    siteName: 'LLM应用开发实验室',
    locale: 'zh_CN',
    images: [
      {
        url: 'https://sunjieseu.github.io/LLM/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LLM应用开发实验室 - 孙杰博士',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LLM应用开发实验室 - 孙杰博士',
    description: '专注于大语言模型应用开发与智能体构建',
    images: ['https://sunjieseu.github.io/LLM/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://sunjieseu.github.io/LLM',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="baidu-site-verification" content="codeva-your-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <link rel="canonical" href="https://sunjieseu.github.io/LLM" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "孙杰",
              "jobTitle": "大语言模型应用专家",
              "description": "专注于大语言模型应用开发的博士、教授",
              "url": "https://sunjieseu.github.io/LLM",
              "sameAs": [
                "https://github.com/sunjieseu"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "南京中科智慧生态科技有限公司"
              },
              "affiliation": [
                {
                  "@type": "Organization",
                  "name": "南京邮电大学"
                },
                {
                  "@type": "Organization", 
                  "name": "南京晓庄学院"
                }
              ],
              "knowsAbout": [
                "大语言模型",
                "人工智能",
                "机器学习",
                "自然语言处理",
                "AI应用开发"
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}