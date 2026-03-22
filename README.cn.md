<div align="center">

<img src="docs/public/logo.svg" alt="NexusFlow Logo" width="120" />

# NexusFlow

**AI 驱动的 Unreal Engine 蓝图开发助手**

用自然语言操控 UE 蓝图 — 理解、修改、生成，一句话搞定。

[![License](https://img.shields.io/badge/许可证-Proprietary%20Freeware-blue)](#许可证)
[![Platform](https://img.shields.io/badge/平台-Windows-0078D6?logo=windows)](https://github.com/maxzhao/NexusFlow/releases)
[![UE](https://img.shields.io/badge/Unreal%20Engine-5.3--5.7-313131?logo=unrealengine)](https://www.unrealengine.com/)

[下载最新版](https://github.com/maxzhao/NexusFlow/releases) · [问题反馈](https://github.com/maxzhao/NexusFlow/issues) · [English](README.md)

</div>

---

## ✨ 什么是 NexusFlow

NexusFlow 是一款深度集成 Unreal Engine 编辑器的 AI 辅助开发工具。它通过桌面端应用 + UE 插件的组合，让你可以用自然语言与 AI 对话来操作蓝图，大幅提升开发效率。

**不需要记住节点名称，不需要在密密麻麻的蓝图中翻找连线 — 告诉 AI 你想要什么，它帮你完成。**

<div align="center">
<img src="docs/images/sidebar-preview.jpeg" alt="NexusFlow 侧边栏" width="360" />
</div>

## 🎯 核心能力

### 🗣️ 自然语言操作蓝图

- **理解蓝图** — "这个蓝图在做什么？解释一下 EventGraph 的逻辑"
- **修改蓝图** — "把角色移动速度从 600 改成 800，并添加一个冲刺功能"
- **生成蓝图** — "创建一个 Actor 蓝图，实现拾取道具后恢复生命值的逻辑"

### 🧠 智能搜索

内置 RAG 语义搜索引擎，AI 能自动搜索节点模板和蓝图资产，不用你手动查文档。

### ⚡ UE 编辑器深度集成

- **右键快捷菜单** — 在蓝图编辑器中右键即可让 AI 解释、重构、修复
- **悬浮球快速入口** — 随时唤起 AI 对话
- **侧边栏停靠** — 像原生面板一样嵌入编辑器

### 🔧 可扩展的 Skills 系统

基于 Python 脚本的能力包机制，覆盖蓝图、资产、灯光等多种操作类型，支持自定义扩展。

## 📦 安装

### 系统要求

| 项目 | 要求 |
|------|------|
| 操作系统 | Windows 10/11 (64-bit) |
| Unreal Engine | 5.3 ~ 5.7 |
| LLM API | OpenAI / Anthropic / DeepSeek (需自备 API Key) |

### 安装步骤

1. **下载主程序** — 从 [Releases](https://github.com/maxzhao/NexusFlow/releases) 页面下载最新安装包
2. **安装 UE 插件** — 首次启动主程序时，安装向导会引导你完成插件安装
3. **配置 AI 模型** — 在设置中填入你的 LLM API Key
4. **开始使用** — 打开 UE 项目，点击悬浮球或使用快捷键唤起 AI 对话

## 🌍 多语言支持

- 🇨🇳 简体中文
- 🇹🇼 繁體中文
- 🇺🇸 English

## 📋 版本状态

| 阶段 | 版本 | 状态 |
|------|------|------|
| MVP | 0.1.0 | ✅ 已完成 |
| **Beta** | **0.5.0** | **🔄 开发中** |
| Release | 1.0.0 | 📋 规划中 |

当前处于 **Beta 阶段**，核心功能已可用，正在持续完善用户体验。

## ❓ 常见问题

**Q: 需要联网吗？**
A: 需要。NexusFlow 需要调用 LLM API（OpenAI / Anthropic / DeepSeek）来提供 AI 能力，请确保网络畅通。

**Q: 支持哪些 LLM？**
A: 目前支持 OpenAI、Anthropic (Claude) 和 DeepSeek，需要自备 API Key。

**Q: 支持 macOS 吗？**
A: 目前仅支持 Windows，macOS 支持计划在 Release 1.0 版本中提供。

**Q: 会修改我的 UE 项目文件吗？**
A: AI 对蓝图的操作基于 UE 原生的 Undo 系统 (FScopedTransaction)，所有修改都可以撤销。

## 📬 反馈与建议

遇到问题或有建议？欢迎通过以下方式联系：

- [GitHub Issues](https://github.com/maxzhao/NexusFlow/issues) — Bug 报告 & 功能建议

## 📄 许可证

NexusFlow Proprietary Freeware License

Copyright © 2026 NexusFlow. All rights reserved.

本软件可免费使用和分发，但**不得修改、逆向工程、反编译或出售**。详见 [LICENSE](LICENSE) 文件。
