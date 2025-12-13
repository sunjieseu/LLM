# 个人主页更新指南

## 🔄 更新已部署的个人主页

如果你已经修改了 `personal-homepage/` 下的文件（如 README.md），可以使用以下方法更新到 GitHub：

### 方法1：使用自动更新脚本（推荐）

```bash
# 在 LLM 项目根目录运行
update-personal-homepage.bat
```

### 方法2：手动更新

```bash
# 1. 创建临时目录
mkdir temp-update
cd temp-update

# 2. 克隆现有的个人主页仓库
git clone https://github.com/sunjieseu/sunjieseu.github.io.git
cd sunjieseu.github.io

# 3. 复制更新的文件
# 将 personal-homepage 文件夹中的所有文件复制到当前目录
# Windows:
xcopy ..\..\personal-homepage\* . /s /e /y /q

# 4. 提交更改
git add .
git commit -m "Update personal homepage content"
git push

# 5. 清理
cd ..\..
rmdir /s /q temp-update
```

### 方法3：直接在 personal-homepage 目录操作

如果你想直接在 `personal-homepage` 目录中工作：

```bash
cd personal-homepage

# 删除嵌套的 .git（如果存在）
rmdir /s /q .git

# 初始化为独立仓库
git init
git remote add origin https://github.com/sunjieseu/sunjieseu.github.io.git

# 拉取现有内容（如果有冲突需要解决）
git pull origin main --allow-unrelated-histories

# 添加你的更改
git add .
git commit -m "Update personal homepage"
git push -u origin main
```

## ⚠️ 注意事项

1. **确保仓库存在**: 个人主页仓库 `sunjieseu.github.io` 必须已经创建并部署过
2. **等待构建**: 推送后需要等待 2-5 分钟让 GitHub Pages 重新构建
3. **检查权限**: 确保你有仓库的写权限

## 🔍 验证更新

更新完成后：
1. 访问 https://github.com/sunjieseu/sunjieseu.github.io
2. 检查文件是否已更新
3. 查看 Actions 页面确认构建成功
4. 访问 https://sunjieseu.github.io/ 查看效果

## 🚨 如果遇到问题

### 问题1: 仓库不存在
```
错误: 无法克隆仓库
```
**解决**: 先使用 `deploy-personal-homepage.bat` 进行首次部署

### 问题2: 权限被拒绝
```
Permission denied
```
**解决**: 检查 GitHub 登录状态和仓库权限

### 问题3: 合并冲突
```
Merge conflict
```
**解决**: 手动解决冲突或删除仓库重新部署

## 📝 常用更新场景

- **修改 README.md**: 使用任一方法更新
- **更新页面内容**: 修改 `app/page.tsx` 后更新
- **调整样式**: 修改 CSS 文件后更新
- **添加新功能**: 修改任何文件后更新