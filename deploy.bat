@echo off
echo ========================================
echo teamify 项目部署脚本
echo ========================================
echo.

echo 请按照以下步骤操作：
echo.
echo 1. 在GitHub上创建名为 'teamify' 的仓库
echo 2. 复制您的GitHub用户名
echo 3. 按任意键继续...
pause >nul

set /p username=请输入您的GitHub用户名: 

echo.
echo 正在设置远程仓库...
git remote set-url origin https://github.com/%username%/teamify.git

echo.
echo 正在推送到GitHub...
git push -u origin master

echo.
echo ========================================
echo 部署完成！
echo ========================================
echo.
echo 接下来请：
echo 1. 访问 https://github.com/%username%/teamify
echo 2. 点击 Settings → Pages
echo 3. Source 选择 "Deploy from a branch"
echo 4. Branch 选择 "master"
echo 5. 点击 Save
echo 6. 等待几分钟，访问 https://%username%.github.io/teamify
echo.
pause
