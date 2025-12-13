@echo off
echo ================================
echo    更新个人主页统计显示
echo ================================
echo.

echo 已完成的修改：
echo ✅ 移除"访客数量"，改为"发明专利 50+"
echo ✅ 移除"页面浏览"，改为"合作企业 20+"
echo ✅ 使用合适的图标（Award 和 Briefcase）
echo ✅ 保持原有的样式和布局
echo.

echo 修改位置：
echo - 主页面的统计卡片区域
echo - 底部的统计展示区域
echo.

echo 现在部署更新...
call deploy.bat

echo.
echo ================================
echo 更新完成！
echo ================================
echo.
echo 新的显示内容：
echo 📊 5+年教学经验 | 发明专利50+ | 合作企业20+
echo.
echo 访问 https://sunjieseu.github.io/ 查看效果
echo.

pause