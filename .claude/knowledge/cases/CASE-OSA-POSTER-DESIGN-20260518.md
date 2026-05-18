---
name: CASE-OSA-POSTER-DESIGN-20260518
description: CVPR 2026 OSA 海报设计决策记录
metadata:
  type: case
  project: OSA poster
  date: 2026-05-18
---

# CASE-OSA-POSTER-DESIGN-20260518

## Context

深圳大学 + PolyU 联合论文 OSA: Echocardiography Video Segmentation via Orthogonalized State Update and Anatomical Prior-aware Feature Enhancement 的 CVPR 2026 海报设计迭代。

## 决策记录

### 颜色主题

| 元素 | 颜色 | 说明 |
|------|------|------|
| Header 背景渐变 | `#7F9EE6` 纯色 | 与 Preview 按钮背景同色 |
| Header 底边 | `#7F9EE6` | 呼应主题 |
| Footer 背景 | `#7F9EE6` 纯色 | 扁平化，非渐变 |
| Section titles/borders | `#5A6FCA` | 深蓝强调 |
| 标题/强调文字 (OSA) | `#4655AB` | 最深蓝 |
| 公式 label 文字 | `#555` 灰色 | 不抢眼 |
| OSA 高亮（Our Approach） | `#4655AB` | 深蓝 |
| Page title/作者/机构 | `#000000` | 黑色，非白色 |
| Footer 文字 | `#000000` | 黑色 |

> **不还原色**：最终用户选择了5阶蓝色主题（#F3F7FF / #90B0F0 / #7F9EE6 / #5A6FCA / #4655AB）作为全局 accent，但实际应用时统一为纯 `#7F9EE6` 为主色调。

### 标题区域布局

| 参数 | 值 | 说明 |
|------|------|------|
| Header 行高 | `8in` | 呼吸感（不宜太满也不宜太空）<br>**根因**：原 `grid-template-rows: 10.5in` 导致 affiliations 下方出现大块空白；调 `0.05in gap` 无效，真实修复来自行高压缩 |
| paper-title margin-bottom | `0.05in` | 紧凑但不断裂 |
| authors margin-bottom | `0.05in` | |
| line-height | `1.1` | 标题区域统一 |
| affiliations line-height | `1.1` | |
| header-right gap | `0.05in` | CVPR info 堆叠紧凑（**无效**，真正原因是 grid 行高过大） |
| affiliations margin-bottom | `0` | |

### 内容栏布局

| 列 | 图片宽度 |
|---|---|
| Col 1 (Problem/Approach/Motivation) | 80% |
| Col 2 (Method/Contributions) | 80% |
| Col 3 (OSU/APFE) | 80% |
| Col 4 (Results/Qualitative) | 100% |

- figure padding: `0.1in`（缩减自 0.2in）
- figure img: `width: 100%`，无 max-height 约束
- figure align-items: `stretch`（取消 center）

### 已删除内容

1. **Paper ID: 44297 + Main Conference** — header 右上角删除
2. **学生邮箱** `2400101058@mail.szu.edu.cn` — 仅保留 `hswu@szu.edu.cn`
3. **L(θ) = ℓ(ŷ₁, y₁) + ℓ(ŷᵧ, yᵧ)** — Our Approach 和 Dataset Details 两处删除
4. **Xt = Xt⁺ − Xt⁻ + Mt** — Ablation Study 公式删除
5. **Ablation Study** — 整节删除（Table 2 + 文字）
6. **Dataset Details** — 整节删除（CAMUS/EchoNet 信息）
7. **mDice/mIoU 公式** — Dataset Details 中删除

### 公式替换

**OSU 部分**：替换为 arXiv 2603.26188 论文原文5个公式：
1. Stiefel Manifold Definition: `𝒱_{C_v,C_k} = {S ∈ ℝ^{C_v×C_k} : S^⊤S = I}`
2. Unconstrained State Evolution: `S_t^{Euc} = S_{t-1}(α_t(I - β_t k_t k_t^⊤)) + β_t v_t k_t^⊤`
3. Newton-Schulz Initialization: `X^{(0)} = S_t^{Euc} / (||S_t^{Euc}||_F + ε)`
4. High-Order Newton-Schulz Iteration: `X^{(j+1)} = aX^{(j)} + bX^{(j)}(X^{(j)})^⊤X^{(j)} + cX^{(j)}((X^{(j)})^⊤X^{(j)})²`

### 文件路径

- 源码: `/Users/myk/Repo/webs/OSA/public/poster.html`
- 构建: `dist/en/poster/index.html`
- URL: `https://wangrui2025.github.io/osa/en/poster/`

## 预防规则

- Header 行高用 `fr` 或 `auto` 而非固定 `in`，避免内容填不满时出现大块空白
- 排查空白问题时**先检查 grid 行高固定值**，再调 gap/line-height — gap 调小对固定行高内的空白无效
- 颜色修改前先确认使用位置（全局 accent vs 局部强调）
- 删除内容前确认无其他引用
