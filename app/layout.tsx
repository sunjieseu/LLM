import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LLM应用开发实验室 - 孙杰',
  description: '专注于大语言模型应用开发与智能体构建的学术实验室',
  keywords: 'LLM, 大语言模型, AI应用开发, 智能体, 人工智能',
  authors: [{ name: '孙杰', email: 'jie.sun@njxzc.edu.cn' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}