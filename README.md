# LLM应用开发实验室 - 孙杰

一个展示大语言模型应用开发能力的学术风格网站模板。

## 特性

- 🎨 学术实验室风格设计
- 📱 响应式布局，支持移动端
- ⚡ Next.js 14 + TypeScript + Tailwind CSS
- 🚀 可直接部署到 GitHub Pages
- 💼 专业的项目展示页面
- 📧 集成联系方式和社交链接

## 快速开始

### 本地开发

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 部署到 GitHub Pages

1. Fork 这个仓库到你的 GitHub 账户

2. 在仓库设置中启用 GitHub Pages：
   - 进入 Settings > Pages
   - Source 选择 "GitHub Actions"

3. 修改 `next.config.js` 中的 `basePath` 和 `assetPrefix`：
   ```javascript
   basePath: process.env.NODE_ENV === 'production' ? '/你的仓库名' : '',
   assetPrefix: process.env.NODE_ENV === 'production' ? '/你的仓库名/' : '',
   ```

4. 推送代码到 main 分支，GitHub Actions 会自动构建和部署

### 自定义内容

编辑 `app/page.tsx` 文件来修改：
- 个人信息和联系方式
- 项目案例
- 技能展示
- 演示内容

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **部署**: GitHub Pages

## 项目结构

```
├── app/
│   ├── globals.css      # 全局样式
│   ├── layout.tsx       # 布局组件
│   └── page.tsx         # 主页面
├── .github/workflows/
│   └── deploy.yml       # GitHub Actions 部署配置
├── next.config.js       # Next.js 配置
├── tailwind.config.js   # Tailwind CSS 配置
└── package.json         # 项目依赖
```

## 联系方式

- 邮箱: jie.sun@njxzc.edu.cn
- 专业领域: 大语言模型应用开发、智能体构建

## 许可证

MIT License