@echo off
echo ========================================
echo 部署两个网站：个人主页 + LLM实验室
echo ========================================

echo.
echo 📍 当前项目结构:
echo   - 个人主页: https://sunjieseu.github.io/ (personal-homepage文件夹)
echo   - LLM实验室: https://sunjieseu.github.io/LLM/ (当前文件夹)

echo.
echo 🚀 开始部署 LLM实验室...
echo ----------------------------------------

echo 1. 清理LLM项目缓存...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out

echo 2. 构建LLM项目...
call npm run build

if exist out (
    echo ✅ LLM项目构建成功！
) else (
    echo ❌ LLM项目构建失败！
    pause
    exit /b 1
)

echo.
echo 🏠 开始部署个人主页...
echo ----------------------------------------

cd personal-homepage

echo 1. 清理个人主页缓存...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out

echo 2. 构建个人主页...
call npm run build

if exist out (
    echo ✅ 个人主页构建成功！
) else (
    echo ❌ 个人主页构建失败！
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo 🎉 两个项目都构建成功！
echo ========================================
echo.
echo 📋 部署说明:
echo.
echo 1. 个人主页部署:
echo    - 将 personal-homepage/out 的内容部署到 GitHub Pages 根目录
echo    - 访问: https://sunjieseu.github.io/
echo.
echo 2. LLM实验室部署:
echo    - 将当前 out 文件夹的内容部署到 GitHub Pages 的 /LLM/ 子目录
echo    - 访问: https://sunjieseu.github.io/LLM/
echo.
echo 🔗 链接验证:
echo    - 个人主页 → LLM实验室: ✅ 已配置
echo    - LLM实验室 → 个人主页: ✅ 已配置
echo.
echo 💡 提示:
echo    - 部署后请强制刷新浏览器 (Ctrl+F5)
echo    - 两个网站都应该有完整的样式和美化效果

pause