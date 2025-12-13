@echo off
echo ================================
echo    个人主页更新脚本
echo ================================
echo.

echo 步骤1: 创建临时目录并复制文件...
if exist temp-homepage-update rmdir /s /q temp-homepage-update
mkdir temp-homepage-update
xcopy personal-homepage\* temp-homepage-update\ /s /e /q

echo.
echo 步骤2: 进入临时目录...
cd temp-homepage-update

echo 删除嵌套的.git目录...
if exist .git rmdir /s /q .git

echo 克隆现有仓库...
git clone https://github.com/sunjieseu/sunjieseu.github.io.git existing-repo
if errorlevel 1 (
    echo 错误: 无法克隆仓库，请检查仓库是否存在
    cd ..
    rmdir /s /q temp-homepage-update
    pause
    exit /b
)

echo.
echo 步骤3: 更新文件...
xcopy * existing-repo\ /s /e /y /q
cd existing-repo

echo 添加更改...
git add .

echo 检查是否有更改...
git diff --staged --quiet
if errorlevel 1 (
    echo 发现更改，正在提交...
    git commit -m "Update personal homepage content"
    
    echo 推送更改到GitHub...
    git push
    
    echo.
    echo ================================
    echo 更新完成！
    echo ================================
    echo.
    echo 你的个人主页已更新: https://sunjieseu.github.io/
    echo 请等待几分钟让GitHub Pages重新构建网站
) else (
    echo 没有检测到更改
)

echo.
cd ..\..
echo 清理临时目录...
rmdir /s /q temp-homepage-update

pause