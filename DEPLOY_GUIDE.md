# GitHub Pages 部署指南

## 🚨 重要：GitHub Pages 设置

在推送代码后，你需要在 GitHub 仓库中进行以下设置：

### 1. 启用 GitHub Pages
1. 进入你的 GitHub 仓库：`https://github.com/sunjieseu/LLM`
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**
5. 保存设置

### 2. 检查 Actions 权限
1. 在 Settings 页面，点击左侧的 **Actions**
2. 选择 **General**
3. 在 **Workflow permissions** 部分：
   - 选择 **Read and write permissions**
   - 勾选 **Allow GitHub Actions to create and approve pull requests**
4. 点击 **Save**

### 3. 重新运行部署
1. 进入 **Actions** 标签
2. 找到失败的工作流
3. 点击 **Re-run all jobs**

## 📝 部署命令

```bash
# 添加修改
git add .

# 提交更改
git commit -m "Update GitHub Actions configuration"

# 推送到 GitHub
git push
```

## 🌐 访问网站

部署成功后，你的网站将在以下地址可用：
```
https://sunjieseu.github.io/LLM/
```

## 🔧 如果仍有问题

1. **检查仓库是否为 Public**
2. **确认 GitHub Pages 已启用**
3. **验证 Actions 权限设置**
4. **查看 Actions 页面的详细错误日志**

## 📞 需要帮助？

如果遇到问题，请检查：
- GitHub 仓库设置
- Actions 运行日志
- 网络连接状态