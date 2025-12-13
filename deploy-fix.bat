@echo off
echo 正在修复部署问题...

echo 1. 清理构建缓存...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out

echo 2. 重新安装依赖...
npm install

echo 3. 构建项目...
npm run build

echo 4. 检查构建结果...
if exist out (
    echo ✅ 构建成功！
    echo 📁 输出文件夹: out
    dir out
) else (
    echo ❌ 构建失败！
    echo 请检查控制台错误信息
)

echo.
echo 🚀 部署说明:
echo 1. 将 out 文件夹的内容上传到 GitHub Pages
echo 2. 确保访问 https://sunjieseu.github.io/LLM/
echo 3. 如果样式仍有问题，请强制刷新浏览器 (Ctrl+F5)

pause