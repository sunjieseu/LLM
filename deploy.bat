@echo off
echo ================================
echo    个人主页部署脚本
echo ================================
echo.

:: 检查个人主页目录
if not exist personal-homepage (
    echo ❌ 错误: personal-homepage 目录不存在
    pause
    exit /b
)

echo ✅ 检查个人主页目录...

:: 测试编译
echo.
echo 📦 测试编译...
cd personal-homepage
npm install
npx tsc --noEmit

if errorlevel 1 (
    echo ❌ TypeScript 检查失败，请修复错误后重试
    pause
    cd ..
    exit /b
)

npm run build
if errorlevel 1 (
    echo ❌ 构建失败，请检查错误信息
    pause
    cd ..
    exit /b
)

echo ✅ 编译测试通过
cd ..

:: 创建部署目录
echo.
echo 🚀 开始部署...
if exist temp-deploy rmdir /s /q temp-deploy
mkdir temp-deploy
cd temp-deploy

:: 克隆仓库
git clone https://github.com/sunjieseu/sunjieseu.github.io.git
if errorlevel 1 (
    echo ❌ 克隆仓库失败
    echo 请确保：
    echo 1. 已创建 sunjieseu.github.io 仓库
    echo 2. 网络连接正常
    echo 3. Git 已配置认证
    cd ..
    rmdir /s /q temp-deploy
    pause
    exit /b
)

cd sunjieseu.github.io

:: 清空现有文件（保留.git）
echo 🧹 清理现有文件...
for /f "delims=" %%i in ('dir /b /a-d 2^>nul') do (
    if /i not "%%i"==".git" del "%%i" >nul 2>&1
)
for /f "delims=" %%i in ('dir /b /ad 2^>nul') do (
    if /i not "%%i"==".git" rmdir /s /q "%%i" >nul 2>&1
)

:: 复制新文件
echo 📁 复制新文件...
xcopy ..\..\personal-homepage\* . /s /e /q /y

:: 添加时间戳确保有更改
echo Last updated: %date% %time% > .deploy-timestamp

:: Git 操作
echo 📤 提交和推送...
git add -A
git commit -m "Deploy homepage - %date% %time%"

if errorlevel 1 (
    echo ⚠️  没有检测到更改，但继续推送...
)

git push origin main

if errorlevel 1 (
    echo ❌ 推送失败
    echo 可能的原因：
    echo 1. 网络问题
    echo 2. 认证问题  
    echo 3. 权限问题
    echo.
    echo 请检查 Git 配置和网络连接
    pause
) else (
    echo ✅ 部署成功！
    echo.
    echo 🌐 您的网站: https://sunjieseu.github.io/
    echo ⏱️  等待 2-5 分钟让 GitHub Pages 更新
    echo.
    echo 💡 提示：
    echo - 如果网站没有更新，请检查 GitHub Actions
    echo - 确保仓库 Settings > Pages 已正确配置
)

:: 清理
cd ..\..
rmdir /s /q temp-deploy

echo.
echo ================================
echo 部署完成
echo ================================
pause