<div align="center">

<img src="docs/public/logo.svg" alt="NexusFlow Logo" width="120" />

# NexusFlow

**AI 驱动的 Unreal Engine 蓝图开发助手**

用自然语言操控 UE 蓝图与 UMG Widget — 可在 NexusFlow 桌面端中使用，也可从支持 MCP 的 IDE 接入。

[![License](https://img.shields.io/badge/许可证-Proprietary%20Freeware-blue)](#许可证)
[![Platform](https://img.shields.io/badge/平台-Windows-0078D6?logo=windows)](https://github.com/maxzhao/NexusFlow/releases)
[![UE](https://img.shields.io/badge/Unreal%20Engine-5.6--5.7-313131?logo=unrealengine)](https://www.unrealengine.com/)

[下载最新版](https://github.com/maxzhao/NexusFlow/releases) · [使用文档](https://maxzhao.github.io/NexusFlow/) · [问题反馈](https://github.com/maxzhao/NexusFlow/issues) · [English](README.md)

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

- **UE 快速菜单** — 4 个入口、17 项 AI 操作，覆盖右键菜单和工具栏
- **悬浮球快速入口** — 随时唤起 AI 对话
- **侧边栏停靠** — 停靠到屏幕边缘（左/右），类似 VS Code 侧边栏，也支持浮动窗口模式

### 🔧 可扩展的 Skills 系统

基于 Python 脚本的能力包机制，覆盖蓝图、资产、灯光等多种操作类型，支持自定义扩展。

### 🌐 全局 LLM 代理

可为桌面主程序中的所有 LLM 通讯统一配置 HTTP / HTTPS / SOCKS4 / SOCKS5 代理。代理认证信息使用 NexusFlow 的加密密钥存储保存，且该代理只作用于 LLM 请求，不影响 UE / Bridge / MCP 等内部连接。

### 🔌 面向 IDE Agent 的 MCP Server

NexusFlow 0.2.0 在桌面主程序中内置 MCP 服务。Cursor、Claude Code 以及其他支持 MCP 的 IDE / Agent 可以连接 NexusFlow，读取 UE 上下文、搜索 Skill、加载指导知识、执行蓝图动作、搜索节点并复用蓝图模板。

### 🧩 可选的 NexusFlow Skill

如果你希望在支持 MCP 的 IDE Agent 中使用 NexusFlow，可以安装独立发布的 [NexusFlow Skill](https://github.com/maxzhao/nexusflow-skill)：

```bash
npx skills add maxzhao/nexusflow-skill
```

它会指导 Agent 按安全的 NexusFlow MCP 流程工作：检查连接、读取 UE 上下文、搜索 Skill、按需加载知识，然后执行动作。

### 🧪 Widget Blueprint Skill MVP

实验性的 Widget Skill 已可试用，可创建 UMG Widget Blueprint、读回 Widget Tree、修改控件属性、重写控件分支，并在可用时捕获真实预览截图。

## 📦 安装

### 系统要求

| 项目 | 要求 |
|------|------|
| 操作系统 | Windows 10/11 (64-bit) |
| Unreal Engine | 5.6 / 5.7 |
| LLM API | OpenAI / Anthropic / Google Gemini / DeepSeek / 智谱 GLM / MiniMax / 通义千问 / Kimi（需自备 API Key） |

### 安装步骤

1. **下载主程序** — 从 [Releases](https://github.com/maxzhao/NexusFlow/releases) 页面下载最新安装包
2. **安装 UE 插件** — 从 [Fab 商品页](https://www.fab.com/listings/52b02df5-ac06-46cf-99b5-fecc8296a858)购买并安装（支持 UE 5.6 和 5.7）
3. **配置 AI 模型** — 在设置中填入 LLM API Key，或使用 `${OPENAI_API_KEY}` 引用环境变量
4. **可选：配置 LLM 代理** — 如网络环境需要，在设置 → LLM 代理中配置全局 HTTP/HTTPS/SOCKS 代理
5. **开始使用** — 打开 UE 项目，点击悬浮球或使用快捷键唤起 AI 对话

> 📖 详细安装步骤请参阅[安装指南](https://maxzhao.github.io/NexusFlow/zh/guide/installation)。

## 🌍 多语言支持

- 🇨🇳 简体中文
- 🇹🇼 繁體中文
- 🇺🇸 English

## 📋 版本状态

| 阶段 | 版本 | 状态 |
|------|------|------|
| MVP | 0.1.0 | ✅ 已完成 |
| **Beta** | **0.2.0** | **✅ 当前版本** |
| Release | 1.0.0 | 📋 规划中 |

当前版本：**0.2.0 Beta** — 新增内置 MCP Server、面向 MCP Agent 的独立 NexusFlow Skill，蓝图 Skill 稳定性提升，并提供实验性的 Widget Blueprint Skill。

## ❓ 常见问题

**Q: 需要联网吗？**
A: 需要。NexusFlow 需要调用 LLM API 来提供 AI 能力，请确保网络畅通。

**Q: 支持哪些 LLM？**
A: 内置支持 OpenAI、Anthropic (Claude)、Google Gemini、DeepSeek、智谱 GLM、MiniMax、通义千问 (Qwen) 和 Kimi (月之暗面)。还可以通过 Custom Provider 接入任何兼容 OpenAI/Anthropic/Gemini API 的服务。需要自备 API Key，可直接填写，也可使用 `${OPENAI_API_KEY}` 这类环境变量引用。如网络环境需要代理，可在设置 → LLM 代理中配置全局 LLM 代理。

**Q: 支持 macOS 吗？**
A: 目前仅支持 Windows，macOS 支持计划在 Release 1.0 版本中提供。

**Q: 会修改我的 UE 项目文件吗？**
A: 蓝图操作会尽量使用 UE 原生 Undo 系统。对于破坏性操作或完整重写，NexusFlow 和 Agent 工作流会先要求确认。

> 📖 更多问题？查看[常见问题](https://maxzhao.github.io/NexusFlow/zh/faq/)和[故障排除指南](https://maxzhao.github.io/NexusFlow/zh/faq/troubleshooting)。

## 📬 反馈与建议

遇到问题或有建议？欢迎通过以下方式联系：

- [GitHub Issues](https://github.com/maxzhao/NexusFlow/issues) — Bug 报告 & 功能建议

## 📄 许可证

NexusFlow Proprietary Freeware License

Copyright © 2026 NexusFlow. All rights reserved.

本软件可免费使用和分发，但**不得修改、逆向工程、反编译或出售**。详见 [LICENSE](LICENSE) 文件。
