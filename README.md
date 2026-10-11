# 图标文件说明

打包时需要以下图标文件：

## Windows
- `icon.ico` - 256x256 像素的 ICO 格式图标

## macOS
- `icon.icns` - 512x512 像素的 ICNS 格式图标

## Linux
- `icon.png` - 512x512 像素的 PNG 格式图标

## 如何获取图标

1. 使用在线 ICO 转换工具将 PNG 图标转换为所需格式
2. 或使用图像编辑软件（如 GIMP、Photoshop）创建图标
3. 确保图标为正方形，推荐尺寸为 256x256 或 512x512

## 临时解决方案

如果没有自定义图标，electron-builder 会使用默认的 Electron 图标。
可以暂时跳过图标配置，游戏仍能正常运行。
