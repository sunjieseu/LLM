@echo off
echo ================================
echo    部署真实访客统计
echo ================================
echo.

echo 正在部署真实访客统计功能...

echo 步骤1: 创建临时目录...
if exist temp-real-stats rmdir /s /q temp-real-stats
mkdir temp-real-stats
cd temp-real-stats

echo 步骤2: 克隆现有仓库...
git clone https://github.com/sunjieseu/sunjieseu.github.io.git
cd sunjieseu.github.io

echo 步骤3: 复制真实统计版本...
xcopy ..\..\personal-homepage\* . /s /e /y /q

echo 步骤4: 添加更改...
git add .

echo 步骤5: 提交真实统计版本...
git commit -m "Implement real visitor statistics using multiple data sources"

echo 步骤6: 推送更改...
git push

echo.
echo ================================
echo 真实访客统计部署完成！
echo ================================
echo.
echo 新的统计方案:
echo.
echo 1. GitHub API 真实数据
echo    - 基于仓库的 stars, forks, watchers
echo    - 真实反映项目关注度
echo.
echo 2. 本地持久化统计
echo    - 使用浏览器指纹去重
echo    - 真实累计访客数据
echo    - 自动清理30天前数据
echo.
echo 3. 第三方统计服务
echo    - hits.sh 提供真实访问统计
echo    - 显示总访问和今日访问
echo    - 独立验证访问数据
echo.
echo 4. 数据稳定性
echo    - 不再有随机波动
echo    - 刷新页面数据保持一致
echo    - 真实反映访问情况
echo.
echo 请访问 https://sunjieseu.github.io/ 查看真实统计效果
echo 等待几分钟让GitHub Pages重新构建网站

cd ..\..
rmdir /s /q temp-real-stats

pause