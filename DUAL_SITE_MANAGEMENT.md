# 双网站管理指南

## 🌐 网站架构

你现在有两个相互链接的美化网站：

### 1. 个人主页 (根目录)
- **URL**: https://sunjieseu.github.io/
- **位置**: `personal-homepage/` 文件夹
- **功能**: 个人简介、学术背景、研究成果
- **链接**: 有"LLM应用开发实验室"按钮跳转到LLM网站

### 2. LLM应用开发实验室 (子目录)
- **URL**: https://sunjieseu.github.io/LLM/
- **位置**: 当前项目根目录
- **功能**: LLM应用演示、项目案例、技术展示
- **链接**: 有"个人主页"链接返回主网站

## 🎨 样式统一性

两个网站都使用相同的设计语言：

### 共同特色
- ✨ 学术风格的卡片设计
- 🎯 蓝色主题色彩 (`academic-blue: #1e3a8a`)
- 🖱️ 悬停动画效果
- 📱 响应式布局
- 🎪 专业的视觉效果

### 样式文件对比
| 组件 | 个人主页 | LLM实验室 |
|------|----------|-----------|
| 卡片样式 | `.academic-card` | `.academic-paper` |
| 主题色 | `academic-blue` | `academic-blue` |
| 字体 | Inter + Crimson Text | Inter + Crimson Text |
| 动画 | ✅ 完整 | ✅ 完整 |

## 🔗 链接配置

### 个人主页 → LLM实验室
```html
<!-- 主要按钮 -->
<a href="https://sunjieseu.github.io/LLM/">
  LLM应用开发实验室
</a>

<!-- 联系区域链接 -->
<a href="https://sunjieseu.github.io/LLM/">
  LLM实验室
</a>
```

### LLM实验室 → 个人主页
```html
<!-- 导航栏链接 -->
<a href="https://sunjieseu.github.io/">
  个人主页
</a>
```

## 🚀 部署流程

### 方法 1: 使用自动脚本
```bash
# 构建两个项目
deploy-both-sites.bat
```

### 方法 2: 手动部署

#### 步骤 1: 构建LLM实验室
```bash
# 在项目根目录
rmdir /s /q .next
npm run build
# 生成 out 文件夹
```

#### 步骤 2: 构建个人主页
```bash
cd personal-homepage
rmdir /s /q .next
npm run build
# 生成 out 文件夹
cd ..
```

#### 步骤 3: 部署到GitHub Pages
```bash
# 提交所有更改
git add .
git commit -m "更新双网站内容"
git push origin main
```

## 📁 文件结构

```
项目根目录/
├── app/                    # LLM实验室源码
├── personal-homepage/      # 个人主页源码
│   ├── app/
│   ├── out/               # 个人主页构建输出
│   └── ...
├── out/                   # LLM实验室构建输出
├── public/
└── ...
```

## 🔧 维护指南

### 更新个人主页
1. 进入 `personal-homepage/` 文件夹
2. 修改 `app/page.tsx` 等文件
3. 运行 `npm run build`
4. 提交更改

### 更新LLM实验室
1. 在项目根目录修改文件
2. 运行 `npm run build`
3. 提交更改

### 同时更新两个网站
1. 使用 `deploy-both-sites.bat` 脚本
2. 或者分别构建两个项目
3. 一次性提交所有更改

## 🎯 SEO优化

### 个人主页SEO
- 主要关键词：孙杰、博士、教授、人工智能
- 目标：学术声誉、专业形象

### LLM实验室SEO
- 主要关键词：LLM应用开发、大语言模型、AI解决方案
- 目标：技术服务、商业合作

### 相互链接优势
- 提高网站权重
- 改善用户体验
- 增强SEO效果

## 🔍 问题排查

### 样式问题
1. **检查构建输出**：确认 `out` 文件夹包含CSS文件
2. **清除缓存**：强制刷新浏览器 (Ctrl+F5)
3. **对比配置**：检查两个项目的 `tailwind.config.js`

### 链接问题
1. **验证URL**：确认链接指向正确的地址
2. **测试跳转**：在两个网站间测试导航
3. **检查路径**：确认相对/绝对路径正确

### 部署问题
1. **GitHub Actions**：检查自动部署状态
2. **文件权限**：确认所有文件都已提交
3. **缓存清理**：等待CDN缓存更新

## 📊 监控指标

定期检查：
- ✅ 两个网站都能正常访问
- ✅ 样式和美化效果正常
- ✅ 相互链接功能正常
- ✅ 移动端适配良好
- ✅ 加载速度合理

## 🎉 预期效果

用户体验流程：
1. 访问 `https://sunjieseu.github.io/` 看到专业的个人主页
2. 点击"LLM应用开发实验室"进入技术展示页面
3. 在LLM页面可以返回个人主页
4. 两个网站都有完整的美化效果和专业外观

这样的双网站架构既展示了个人学术背景，又突出了专业技术能力！