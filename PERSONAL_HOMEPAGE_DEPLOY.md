# 个人主页部署指南

## 📋 部署步骤

### 1. 创建 GitHub 仓库

**重要：仓库名必须是 `sunjieseu.github.io`**

1. 登录 GitHub
2. 点击右上角的 "+" 号 → "New repository"
3. 仓库名输入：`sunjieseu.github.io`
4. 设置为 Public
5. 不要勾选 "Add a README file"
6. 点击 "Create repository"

### 2. 部署个人主页

**方法A：使用自动部署脚本（推荐）**

```bash
# 在 LLM 项目根目录运行
deploy-personal-homepage.bat
```

**方法B：手动部署**

```bash
# 1. 创建临时目录并复制文件
mkdir temp-homepage
cp -r personal-homepage/* temp-homepage/
cd temp-homepage

# 2. 删除嵌套的.git目录
rm -rf .git

# 3. 初始化新的Git仓库
git init
git add .
git commit -m "Initial commit: Academic personal homepage"

# 4. 添加远程仓库并推送
git remote add origin https://github.com/sunjieseu/sunjieseu.github.io.git
git branch -M main
git push -u origin main

# 5. 清理
cd ..
rm -rf temp-homepage
```

### 3. 配置 GitHub Pages

1. 进入仓库：`https://github.com/sunjieseu/sunjieseu.github.io`
2. 点击 **Settings** 标签
3. 在左侧菜单找到 **Actions** → **General**
4. 在 **Workflow permissions** 部分：
   - 选择 **Read and write permissions**
   - 勾选 **Allow GitHub Actions to create and approve pull requests**
   - 点击 **Save**
5. 在左侧菜单找到 **Pages**
6. **Source** 选择 **GitHub Actions**
7. 保存设置

### 4. 等待部署完成

- 查看 **Actions** 标签页的部署进度
- 首次部署约需 3-5 分钟

### 5. 访问个人主页

部署完成后，访问：
```
https://sunjieseu.github.io/
```

## 🔄 更新现有 LLM 项目

我已经在 LLM 项目中添加了返回个人主页的链接。更新 LLM 项目：

```bash
# 在 LLM 项目根目录
git add .
git commit -m "Add link to personal homepage"
git push
```

## 🌐 最终效果

- **个人主页**: https://sunjieseu.github.io/
- **LLM实验室**: https://sunjieseu.github.io/LLM/
- 两个网站可以相互跳转

## 📱 网站特性

### 个人主页特性：
- 🎓 学术风格设计
- 📚 完整的学术信息展示
- 🔗 ORCID 和机构链接
- 📄 论文发表记录
- 👨‍🏫 教学工作展示
- 📧 多种联系方式

### 导航链接：
- 个人主页 → LLM实验室
- LLM实验室 → 个人主页

## 🔧 如果遇到问题

1. **确认仓库名**: 必须是 `sunjieseu.github.io`
2. **检查权限**: Actions 权限必须设置正确
3. **查看日志**: 在 Actions 页面查看部署日志
4. **等待时间**: 首次部署可能需要几分钟

## 📞 需要帮助？

如果部署过程中遇到问题，请检查：
- GitHub 仓库名是否正确
- Actions 权限是否已设置
- 部署日志中的错误信息