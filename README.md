<div align="center">

<img src="docs/public/logo.svg" alt="NexusFlow Logo" width="120" />

# NexusFlow

**AI-Powered Blueprint Development Assistant for Unreal Engine**

Control UE Blueprints and UMG Widgets with natural language — from the NexusFlow desktop app or any MCP-capable IDE.

[![License](https://img.shields.io/badge/License-Proprietary%20Freeware-blue)](#license)
[![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?logo=windows)](https://github.com/maxzhao/NexusFlow/releases)
[![UE](https://img.shields.io/badge/Unreal%20Engine-5.6--5.7-313131?logo=unrealengine)](https://www.unrealengine.com/)

[Download Latest](https://github.com/maxzhao/NexusFlow/releases) · [Documentation](https://maxzhao.github.io/NexusFlow/) · [Report Issue](https://github.com/maxzhao/NexusFlow/issues) · [中文](README.cn.md)

</div>

---

## ✨ What is NexusFlow

NexusFlow is an AI-assisted development tool deeply integrated with the Unreal Engine Editor. Through a desktop app + UE plugin combo, you can talk to AI in natural language to operate Blueprints, dramatically boosting your development productivity.

**No need to memorize node names. No need to hunt through tangled Blueprint wires — just tell the AI what you want, and it gets it done.**

<div align="center">
<img src="docs/images/sidebar-preview.jpeg" alt="NexusFlow Sidebar" width="360" />
</div>

## 🎯 Key Features

### 🗣️ Natural Language Blueprint Control

- **Understand** — "What does this Blueprint do? Explain the EventGraph logic."
- **Modify** — "Change the character move speed from 600 to 800 and add a sprint feature."
- **Generate** — "Create an Actor Blueprint that restores health when an item is picked up."

### 🧠 Smart Search

Built-in RAG semantic search engine — the AI automatically searches node templates and Blueprint assets without you looking through docs.

### ⚡ Deep UE Editor Integration

- **UE Quick Menu** — 4 entry points, 17 AI operations across right-click menus and toolbars
- **Floating Ball** — Quick access to AI chat anytime
- **Sidebar Docking** — Dock to screen edge (left/right) like a VS Code sidebar, or use as a floating window

### 🔧 Extensible Skills System

Python-based capability packs covering Blueprints, assets, lighting, and more — with support for custom extensions.

### 🌐 Global LLM Proxy

Configure one HTTP/HTTPS/SOCKS4/SOCKS5 proxy for all LLM traffic from the desktop app. Proxy credentials are stored with NexusFlow's encrypted secret storage, and internal UE/Bridge/MCP connections are not routed through this proxy.

### 🔌 MCP Server for IDE Agents

NexusFlow 0.2.0 exposes its Unreal Engine automation capabilities through an MCP server built into the desktop app. Cursor, Claude Code, and other MCP-capable IDE agents can connect to NexusFlow to inspect UE context, search skills, load guided knowledge, execute Blueprint actions, search nodes, and reuse Blueprint templates.

### 🧩 Optional NexusFlow Skill for Agents

For MCP-capable IDE agents, install the separately published [NexusFlow Skill](https://github.com/maxzhao/nexusflow-skill):

```bash
npx skills add maxzhao/nexusflow-skill
```

It provides agent-facing guidance for safely using the NexusFlow MCP workflow: check connection, inspect UE context, search skills, load only the required guide/knowledge, then execute the action.

### 🧪 Widget Blueprint Skill MVP

The experimental Widget Skill can create UMG Widget Blueprints, read widget trees, patch widget properties, rewrite widget tree branches, and capture real preview screenshots when available.

## 📦 Installation

### System Requirements

| Requirement   | Details                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| OS            | Windows 10/11 (64-bit)                                                                                     |
| Unreal Engine | 5.6 / 5.7                                                                                                  |
| LLM API       | OpenAI / Anthropic / Google Gemini / DeepSeek / Zhipu GLM / MiniMax / Qwen / Kimi (bring your own API Key) |

### Steps

1. **Download Desktop App** — Get the latest installer from [Releases](https://github.com/maxzhao/NexusFlow/releases)
2. **Install UE Plugin** — Purchase and install from the [Fab listing](https://www.fab.com/listings/52b02df5-ac06-46cf-99b5-fecc8296a858) (supports UE 5.6 and 5.7)
3. **Configure AI Model** — Enter your LLM API Key in Settings, or reference one with `${OPENAI_API_KEY}`
4. **Optional: Configure LLM Proxy** — In Settings → LLM Proxy, set a global HTTP/HTTPS/SOCKS proxy for LLM requests when your network requires it
5. **Start Using** — Open a UE project, click the floating ball or use the hotkey to start chatting

> 📖 For detailed installation steps, see the [Installation Guide](https://maxzhao.github.io/NexusFlow/en/guide/installation).

## 🌍 Language Support

- 🇺🇸 English
- 🇨🇳 简体中文
- 🇨🇳 繁體中文

## 📋 Version Status

| Phase | Version | Status |
| ------ | ------- | ------ |
| MVP | 0.1.0 | ✅ Complete |
| **Beta** | **0.2.0** | **✅ Current** |
| Release | 1.0.0 | 📋 Planned |

Current version: **0.2.0 Beta** — now with embedded MCP server support, an optional standalone NexusFlow Skill for MCP-capable agents, improved Blueprint Skill reliability, and an experimental Widget Blueprint Skill.

## ❓ FAQ

**Q: Does it require internet?**
A: Yes. NexusFlow calls LLM APIs to provide AI capabilities. A stable internet connection is required.

**Q: Which LLMs are supported?**
A: Built-in support for OpenAI, Anthropic (Claude), Google Gemini, DeepSeek, Zhipu GLM, MiniMax, Qwen (Alibaba Cloud), and Kimi (Moonshot). You can also connect any OpenAI/Anthropic/Gemini-compatible API via Custom Provider. You need to provide your own API Key, either directly or as an environment variable reference such as `${OPENAI_API_KEY}`. If your network requires a proxy, configure a global LLM proxy in Settings → LLM Proxy.

**Q: Does it support macOS?**
A: Currently Windows only. macOS support is planned for the Release 1.0 version.

**Q: Will it modify my UE project files?**
A: Blueprint operations use UE's native Undo system where supported. For destructive or full-rewrite actions, NexusFlow and the agent workflow ask for confirmation first.

> 📖 More questions? Check the [FAQ](https://maxzhao.github.io/NexusFlow/en/faq/) and [Troubleshooting Guide](https://maxzhao.github.io/NexusFlow/en/faq/troubleshooting).

## 📬 Feedback

Found a bug or have a suggestion? We'd love to hear from you:

- [GitHub Issues](https://github.com/maxzhao/NexusFlow/issues) — Bug reports & feature requests

## 📄 License

NexusFlow Proprietary Freeware License

Copyright © 2026 NexusFlow. All rights reserved.

This software is free to use and distribute, but **may not be modified, reverse-engineered, decompiled, or sold**. See [LICENSE](LICENSE) for details.
