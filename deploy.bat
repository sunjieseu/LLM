@echo off
echo ================================
echo    GitHub Pages 部署脚本
echo ================================
echo.

echo 请确保已经：
echo 1. 在 GitHub 创建了仓库
echo 2. 修改了 next.config.js 中的仓库名
echo.

set /p repo_url="请输入完整的 GitHub 仓库 URL (例如: https://github.com/username/repo-name.git): "

echo.
echo 正在初始化 Git 仓库...
git init

echo 添加所有文件...
git add .

echo 提交代码...
git commit -m "Deploy LLM Demo Lab to GitHub Pages"

echo 添加远程仓库...
git remote add origin %repo_url%

echo 推送到 GitHub...
git branch -M main
git push -u origin main

echo.
echo ================================
echo 部署完成！
echo ================================
echo.
echo 接下来请：
echo 1. 访问你的 GitHub 仓库
echo 2. 进入 Settings > Pages
echo 3. Source 选择 "GitHub Actions"
echo 4. 等待几分钟后访问你的网站
echo.
pause