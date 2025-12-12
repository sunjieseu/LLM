@echo off
echo ================================
echo    个人主页部署脚本
echo ================================
echo.

echo 步骤1: 复制个人主页文件到临时目录...
if exist temp-homepage rmdir /s /q temp-homepage
mkdir temp-homepage
xcopy personal-homepage\* temp-homepage\ /s /e /q

echo.
echo 步骤2: 进入临时目录并初始化Git...
cd temp-homepage

echo 删除嵌套的.git目录...
if exist .git rmdir /s /q .git

echo 初始化新的Git仓库...
git init

echo 添加所有文件...
git add .

echo 提交代码...
git commit -m "Initial commit: Academic personal homepage"

echo.
echo 步骤3: 添加远程仓库...
echo 请确保已在GitHub创建仓库: sunjieseu.github.io
set /p confirm="已创建仓库？(y/n): "
if /i "%confirm%" neq "y" (
    echo 请先在GitHub创建仓库 sunjieseu.github.io，然后重新运行此脚本
    pause
    exit /b
)

git remote add origin https://github.com/sunjieseu/sunjieseu.github.io.git

echo 推送到GitHub...
git branch -M main
git push -u origin main

echo.
echo ================================
echo 部署完成！
echo ================================
echo.
echo 接下来请：
echo 1. 访问 https://github.com/sunjieseu/sunjieseu.github.io
echo 2. 进入 Settings > Actions > General
echo 3. 设置 Workflow permissions 为 "Read and write permissions"
echo 4. 进入 Settings > Pages，Source 选择 "GitHub Actions"
echo 5. 等待几分钟后访问 https://sunjieseu.github.io/
echo.

cd ..
echo 清理临时目录...
rmdir /s /q temp-homepage

pause