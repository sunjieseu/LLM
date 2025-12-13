@echo off
echo ================================
echo    测试个人主页编译
echo ================================
echo.

echo 进入个人主页目录...
cd personal-homepage

echo 安装依赖...
npm install

echo 运行 TypeScript 检查...
npx tsc --noEmit

if errorlevel 1 (
    echo ❌ TypeScript 检查失败
    pause
    exit /b
) else (
    echo ✅ TypeScript 检查通过
)

echo.
echo 尝试构建...
npm run build

if errorlevel 1 (
    echo ❌ 构建失败
    pause
    exit /b
) else (
    echo ✅ 构建成功
)

echo.
echo ================================
echo 测试完成！
echo ================================

cd ..
pause