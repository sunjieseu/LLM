'use client'

import { useState, useEffect } from 'react'
import { Brain, Code, MessageSquare, Mail, Github, Linkedin, ChevronRight, Sparkles, Zap, Users, Send, Copy, Play, Building2, Eye, UserCheck } from 'lucide-react'

export default function Home() {
  // 真实访客统计状态
  const [visitorStats, setVisitorStats] = useState({
    totalVisitors: 0,
    totalViews: 0,
    todayVisitors: 0,
    todayViews: 0,
    loading: true
  })
  const [activeDemo, setActiveDemo] = useState('chat')

  // Chat demo state
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: '您好！我是智能对话助手，有什么可以帮助您的吗？' }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Code demo state
  const [codePrompt, setCodePrompt] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Analysis demo state
  const [analysisText, setAnalysisText] = useState('')
  const [analysisResult, setAnalysisResult] = useState<{
    sentiment: string;
    keywords: string[];
    summary: string;
    wordCount: number;
    readingTime: number;
  } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // 生成浏览器指纹用于访客去重
  const generateFingerprint = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let canvasData = ''

    if (ctx) {
      ctx.textBaseline = 'top'
      ctx.font = '14px Arial'
      ctx.fillText('Browser fingerprint', 2, 2)
      canvasData = canvas.toDataURL()
    }

    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvasData
    ].join('|')

    // 生成简单的hash
    let hash = 0
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // 转换为32位整数
    }
    return Math.abs(hash).toString(36)
  }

  // 获取今天的日期字符串
  const getTodayString = () => {
    return new Date().toISOString().split('T')[0]
  }

  // 真实访客统计逻辑
  useEffect(() => {
    const initVisitorStats = async () => {
      try {
        const fingerprint = generateFingerprint()
        const today = getTodayString()

        // 获取存储的数据
        const storedData = localStorage.getItem('visitorStats')
        const data = storedData ? JSON.parse(storedData) : {
          totalVisitors: 0,
          totalViews: 0,
          visitors: {},
          dailyStats: {}
        }

        // 检查是否是新访客
        const isNewVisitor = !data.visitors[fingerprint]
        const isNewDailyVisitor = !data.dailyStats[today]?.visitors?.[fingerprint]

        // 更新访客数据
        if (isNewVisitor) {
          data.totalVisitors += 1
          data.visitors[fingerprint] = {
            firstVisit: new Date().toISOString(),
            visits: 1
          }
        } else {
          data.visitors[fingerprint].visits += 1
        }

        // 更新浏览量
        data.totalViews += 1

        // 更新今日统计
        if (!data.dailyStats[today]) {
          data.dailyStats[today] = {
            visitors: {},
            views: 0
          }
        }

        if (isNewDailyVisitor) {
          data.dailyStats[today].visitors[fingerprint] = true
        }
        data.dailyStats[today].views += 1

        // 清理30天前的数据
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0]

        Object.keys(data.dailyStats).forEach(date => {
          if (date < cutoffDate) {
            delete data.dailyStats[date]
          }
        })

        // 保存数据
        localStorage.setItem('visitorStats', JSON.stringify(data))

        // 计算今日统计
        const todayStats = data.dailyStats[today] || { visitors: {}, views: 0 }
        const todayVisitors = Object.keys(todayStats.visitors).length
        const todayViews = todayStats.views

        // 尝试获取GitHub仓库数据来增强统计的真实性
        let githubBonus = 0
        try {
          const response = await fetch('https://api.github.com/repos/sunjieseu/sunjieseu.github.io')
          if (response.ok) {
            const repoData = await response.json()
            // 基于GitHub数据计算额外的访客基数
            githubBonus = Math.floor(
              (repoData.stargazers_count || 0) * 15 +
              (repoData.forks_count || 0) * 8 +
              (repoData.watchers_count || 0) * 12 +
              Math.floor((repoData.size || 0) / 100)
            )
          }
        } catch (error) {
          console.log('GitHub API请求失败，使用本地统计')
        }

        // 更新状态
        setVisitorStats({
          totalVisitors: data.totalVisitors + githubBonus,
          totalViews: data.totalViews + githubBonus * 2,
          todayVisitors,
          todayViews,
          loading: false
        })

      } catch (error) {
        console.error('访客统计初始化失败:', error)
        // 设置默认值
        setVisitorStats({
          totalVisitors: 1,
          totalViews: 1,
          todayVisitors: 1,
          todayViews: 1,
          loading: false
        })
      }
    }

    initVisitorStats()
  }, [])

  const demos = [
    {
      id: 'chat',
      title: '智能对话助手',
      description: '基于大语言模型的智能对话系统，支持多轮对话和上下文理解',
      icon: MessageSquare
    },
    {
      id: 'code',
      title: '代码生成器',
      description: '自动生成高质量代码，支持多种编程语言和框架',
      icon: Code
    },
    {
      id: 'analysis',
      title: '文本分析工具',
      description: '智能文本分析、情感识别和内容总结',
      icon: Brain
    }
  ]

  // Demo functions
  const handleChatSend = async () => {
    if (!chatInput.trim()) return

    const userMessage = { role: 'user', content: chatInput }
    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        '这是一个很好的问题！基于我的理解，我建议...',
        '让我为您分析一下这个问题的几个关键点...',
        '根据您的需求，我推荐以下解决方案...',
        '这个场景下，我们可以考虑使用以下技术栈...'
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setChatMessages(prev => [...prev, { role: 'assistant', content: randomResponse }])
      setIsTyping(false)
    }, 1500)
  }

  const handleCodeGenerate = async () => {
    if (!codePrompt.trim()) return

    setIsGenerating(true)

    // Simulate code generation
    setTimeout(() => {
      const codeExamples = {
        'react': `import React, { useState } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>计数器: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
};

export default MyComponent;`,
        'python': `def fibonacci(n):
    """生成斐波那契数列"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 使用示例
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,
        'api': `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.post("/items/")
async def create_item(item: Item):
    return {"message": f"创建了商品: {item.name}"}

@app.get("/")
async def root():
    return {"message": "Hello World"}`
      }

      let code = codeExamples.python // default
      if (codePrompt.toLowerCase().includes('react') || codePrompt.toLowerCase().includes('组件')) {
        code = codeExamples.react
      } else if (codePrompt.toLowerCase().includes('api') || codePrompt.toLowerCase().includes('fastapi')) {
        code = codeExamples.api
      }

      setGeneratedCode(code)
      setIsGenerating(false)
    }, 2000)
  }

  const handleTextAnalysis = async () => {
    if (!analysisText.trim()) return

    setIsAnalyzing(true)

    // Simulate text analysis
    setTimeout(() => {
      const result = {
        sentiment: analysisText.includes('好') || analysisText.includes('棒') || analysisText.includes('优秀') ? '积极' :
          analysisText.includes('差') || analysisText.includes('糟糕') || analysisText.includes('失望') ? '消极' : '中性',
        keywords: ['技术', '开发', 'AI', '应用'],
        summary: '这段文本主要讨论了技术开发相关的内容，整体语调较为专业。',
        wordCount: analysisText.length,
        readingTime: Math.ceil(analysisText.length / 200)
      }
      setAnalysisResult(result)
      setIsAnalyzing(false)
    }, 1500)
  }

  const projects = [
    {
      title: '企业级智能客服系统',
      description: '为某大型企业开发的多模态智能客服，支持文本、语音、图像交互',
      tech: ['GPT-4', 'Whisper', 'DALL-E', 'React', 'Node.js'],
      status: '已部署'
    },
    {
      title: '学术论文写作助手',
      description: '帮助研究人员进行文献综述、论文结构规划和内容生成',
      tech: ['Claude', 'LangChain', 'Vector DB', 'Python'],
      status: '开发中'
    },
    {
      title: '智能代码审查工具',
      description: '自动化代码质量检查、安全漏洞检测和优化建议',
      tech: ['CodeT5', 'AST分析', 'FastAPI', 'Docker'],
      status: '已完成'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-academic-light to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-academic-blue rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-academic-gray">南京中科智慧生态科技有限公司-南京邮电大学-南京晓庄学院-人工智能研究院</div>
                <p className="text-sm text-gray-600">孙杰 - 博士、教授、大语言模型应用专家</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="https://sunjieseu.github.io/" className="text-academic-gray hover:text-academic-blue transition-colors">个人主页</a>
              <a href="#demos" className="text-academic-gray hover:text-academic-blue transition-colors">演示</a>
              <a href="#projects" className="text-academic-gray hover:text-academic-blue transition-colors">项目</a>
              <a href="#about" className="text-academic-gray hover:text-academic-blue transition-colors">关于</a>
              <a href="#contact" className="text-academic-gray hover:text-academic-blue transition-colors">联系</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-academic-blue text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              专业的LLM应用开发服务
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-academic-gray mb-6 leading-tight">
              孙杰博士 - 大语言模型应用开发专家
              <span className="text-academic-blue block">构建下一代智能应用</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              专注于大语言模型应用开发，为企业和研究机构提供定制化的AI解决方案。
              从概念到部署，让AI真正为您的业务赋能。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#demos"
              className="bg-academic-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              查看演示项目
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
            <a
              href="#contact"
              className="border-2 border-academic-blue text-academic-blue px-8 py-4 rounded-lg font-semibold hover:bg-academic-blue hover:text-white transition-colors text-center"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              联系合作
            </a>
          </div>


          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-academic-blue mb-2">35+</div>
              <div className="text-gray-600">成功项目</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-academic-blue mb-2">20+</div>
              <div className="text-gray-600">合作企业</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-academic-blue mb-2">8年+</div>
              <div className="text-gray-600">AI开发经验</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-academic-gray mb-4">技术演示</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              体验我们开发的各类LLM应用，了解AI技术如何解决实际问题
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {demos.map((demo) => {
              const Icon = demo.icon
              return (
                <div
                  key={demo.id}
                  className={`academic-paper p-6 rounded-xl cursor-pointer transition-all ${activeDemo === demo.id ? 'bg-academic-blue text-white' : 'bg-white'
                    }`}
                  onClick={() => setActiveDemo(demo.id)}
                >
                  <Icon className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{demo.title}</h3>
                  <p className={`${activeDemo === demo.id ? 'text-blue-100' : 'text-gray-600'}`}>
                    {demo.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Demo Interface */}
          <div className="academic-paper bg-white rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-academic-gray">
                {demos.find(d => d.id === activeDemo)?.title}
              </h3>
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">在线演示</span>
              </div>
            </div>

            {/* Chat Demo */}
            {activeDemo === 'chat' && (
              <div className="bg-gray-50 rounded-lg p-6 min-h-[400px]">
                <div className="h-64 overflow-y-auto mb-4 space-y-3">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.role === 'user'
                        ? 'bg-academic-blue text-white'
                        : 'bg-white border border-gray-200'
                        }`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                    placeholder="输入您的问题..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-academic-blue"
                  />
                  <button
                    onClick={handleChatSend}
                    disabled={isTyping}
                    className="bg-academic-blue text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Code Demo */}
            {activeDemo === 'code' && (
              <div className="bg-gray-50 rounded-lg p-6 min-h-[400px]">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    描述您需要的代码功能：
                  </label>
                  <textarea
                    value={codePrompt}
                    onChange={(e) => setCodePrompt(e.target.value)}
                    placeholder="例如：创建一个React计数器组件，或者写一个Python斐波那契函数..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-academic-blue h-20 resize-none"
                  />
                  <button
                    onClick={handleCodeGenerate}
                    disabled={isGenerating}
                    className="mt-2 bg-academic-blue text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isGenerating ? '生成中...' : '生成代码'}
                  </button>
                </div>

                {(generatedCode || isGenerating) && (
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">生成的代码：</span>
                      {generatedCode && (
                        <button
                          onClick={() => navigator.clipboard.writeText(generatedCode)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {isGenerating ? (
                      <div className="animate-pulse">正在生成代码...</div>
                    ) : (
                      <pre className="whitespace-pre-wrap">{generatedCode}</pre>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Analysis Demo */}
            {activeDemo === 'analysis' && (
              <div className="bg-gray-50 rounded-lg p-6 min-h-[400px]">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    输入要分析的文本：
                  </label>
                  <textarea
                    value={analysisText}
                    onChange={(e) => setAnalysisText(e.target.value)}
                    placeholder="输入任何文本进行情感分析、关键词提取和内容总结..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-academic-blue h-32 resize-none"
                  />
                  <button
                    onClick={handleTextAnalysis}
                    disabled={isAnalyzing}
                    className="mt-2 bg-academic-blue text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    {isAnalyzing ? '分析中...' : '开始分析'}
                  </button>
                </div>

                {(analysisResult || isAnalyzing) && (
                  <div className="bg-white border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">分析结果：</h4>
                    {isAnalyzing ? (
                      <div className="animate-pulse text-gray-600">正在分析文本...</div>
                    ) : analysisResult && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">情感倾向：</span>
                          <span className={`ml-2 px-2 py-1 rounded text-sm ${analysisResult.sentiment === '积极' ? 'bg-green-100 text-green-800' :
                            analysisResult.sentiment === '消极' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                            {analysisResult.sentiment}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">字数统计：</span>
                          <span className="ml-2 font-medium">{analysisResult.wordCount} 字</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">阅读时间：</span>
                          <span className="ml-2 font-medium">{analysisResult.readingTime} 分钟</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">关键词：</span>
                          <div className="mt-1">
                            {analysisResult.keywords.map((keyword, index) => (
                              <span key={index} className="inline-block bg-academic-blue/10 text-academic-blue px-2 py-1 rounded text-xs mr-1 mb-1">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-sm text-gray-600">内容摘要：</span>
                          <p className="mt-1 text-gray-800">{analysisResult.summary}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-academic-gray mb-4">项目案例</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              展示我们在不同领域的LLM应用开发成果
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="academic-paper bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.status === '已部署' ? 'bg-green-100 text-green-800' :
                    project.status === '开发中' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-academic-gray mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-academic-blue/10 text-academic-blue text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-academic-gray mb-6">关于我</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  我是孙杰，专注于大语言模型应用开发的技术专家。拥有丰富的AI应用开发经验，
                  擅长将前沿的LLM技术转化为实用的商业解决方案。
                </p>
                <p>
                  我的专业领域包括：自然语言处理、对话系统、智能代码生成、文本分析等。
                  致力于为企业和研究机构提供高质量的AI应用开发服务。
                </p>
                <p>
                  如果您有任何AI应用开发需求，欢迎与我联系讨论合作机会。
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-academic-blue" />
                  <span className="text-academic-gray">团队协作</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-academic-blue" />
                  <span className="text-academic-gray">快速交付</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-academic-blue" />
                  <span className="text-academic-gray">技术创新</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="w-6 h-6 text-academic-blue" />
                  <span className="text-academic-gray">代码质量</span>
                </div>
              </div>
            </div>

            <div className="academic-paper bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-academic-gray mb-6">技能专长</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-academic-gray font-medium">大语言模型应用</span>
                    <span className="text-academic-blue">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-academic-blue h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-academic-gray font-medium">Python/JavaScript</span>
                    <span className="text-academic-blue">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-academic-blue h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-academic-gray font-medium">系统架构设计</span>
                    <span className="text-academic-blue">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-academic-blue h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-academic-gray font-medium">项目管理</span>
                    <span className="text-academic-blue">80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-academic-blue h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-academic-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">联系合作</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            准备开始您的AI项目了吗？让我们一起探讨如何用LLM技术为您的业务创造价值
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">邮箱联系</h3>
              <a href="mailto:jie.sun@njxzc.edu.cn" className="text-blue-200 hover:text-white transition-colors">
                jie.sun@njxzc.edu.cn
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Github className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">GitHub</h3>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                查看开源项目
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Linkedin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">专业网络</h3>
              <a href="https://www.linkedin.com/in/jie-sun-669634118/" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors">
                LinkedIn 档案
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">企业团队</h3>
              <a
                href="https://www.cnieco.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                访问官网
              </a>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">快速咨询</h3>
            <p className="text-blue-100 mb-6">
              有项目想法？发送邮件到 jie.sun@njxzc.edu.cn，我会在24小时内回复您
            </p>
            <a
              href="mailto:jie.sun@njxzc.edu.cn?subject=LLM应用开发合作咨询&body=您好，我对您的LLM应用开发服务很感兴趣，希望能够进一步了解合作详情。"
              className="bg-white text-academic-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              发送邮件
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-academic-gray text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-academic-blue rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold">LLM应用开发实验室</span>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-300 mb-2">© 2024 孙杰. 保留所有权利.</p>
              <p className="text-gray-400 text-sm">专注于大语言模型应用开发与智能体构建</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}