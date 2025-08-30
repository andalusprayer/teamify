# 🚀 teamify 项目部署指南

## 📋 部署步骤

### 1. 在GitHub上创建仓库
- 访问 https://github.com
- 点击 "+" → "New repository"
- 仓库名：`teamify`
- 描述：`国际高中生队友匹配平台`
- 选择 Public
- 不要勾选任何初始化选项
- 点击 "Create repository"

### 2. 连接远程仓库
```bash
# 替换 YOUR_USERNAME 为您的GitHub用户名
git remote set-url origin https://github.com/YOUR_USERNAME/teamify.git
```

### 3. 推送代码到GitHub
```bash
git push -u origin master
```

### 4. 启用GitHub Pages
1. 在GitHub仓库页面，点击 "Settings"
2. 左侧菜单选择 "Pages"
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "master"
5. 点击 "Save"
6. 等待几分钟，GitHub会生成网站链接

### 5. 访问您的网站
- GitHub会显示类似这样的链接：
- `https://YOUR_USERNAME.github.io/teamify`

## 🔧 常用Git命令

```bash
# 查看状态
git status

# 添加文件
git add .

# 提交更改
git commit -m "更新说明"

# 推送到GitHub
git push

# 查看提交历史
git log --oneline

# 查看远程仓库
git remote -v
```

## 📝 注意事项

1. **首次推送**：使用 `git push -u origin master`
2. **后续推送**：使用 `git push`
3. **GitHub Pages**：可能需要等待几分钟才能访问
4. **自定义域名**：可以在Pages设置中添加自定义域名

## 🌐 网站功能

部署完成后，您的网站将包含：
- ✅ 响应式首页
- ✅ 竞赛信息页面
- ✅ 寻找队友页面
- ✅ 团队介绍页面
- ✅ 联系我们页面
- ✅ 登录注册页面
- ✅ 隐私政策和使用条款
- ✅ 多语言支持（中文、英文、粤语）
- ✅ 现代化玻璃质感设计

## 📞 需要帮助？

如果遇到问题，请检查：
1. Git配置是否正确
2. GitHub仓库是否创建成功
3. 远程仓库URL是否正确
4. 是否有足够的权限推送代码

---

**祝您部署成功！** 🎉
