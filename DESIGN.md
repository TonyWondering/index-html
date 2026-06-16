# Design System — 码上成长

## Visual Theme & Atmosphere

安静、专业、可信赖的教育平台。不追求视觉特效，而是通过清晰的排版和克制的动效传达品质感。像一个安静的图书馆，而非科技展厅。

## Color Palette & Roles

### Light Mode
| Token | Hex | Role |
|-------|-----|------|
| `--color-primary` | `#2563eb` | 主操作、链接、选中态 |
| `--color-primary-dark` | `#1d4ed8` | Hover 状态 |
| `--color-primary-light` | `#eff6ff` | 浅色背景、选中项背景 |
| `--color-accent` | `#059669` | 标签、次要强调 |
| `--color-bg` | `#fafafa` | 页面背景 |
| `--color-bg-white` | `#ffffff` | 卡片、弹窗背景 |
| `--color-text` | `#18181b` | 主文本 |
| `--color-text-light` | `#52525b` | 次要文本 |
| `--color-text-muted` | `#a1a1aa` | 占位符、禁用态 |
| `--color-border` | `#e4e4e7` | 边框、分割线 |
| `--color-footer-bg` | `#18181b` | 页脚背景 |

### Dark Mode
使用 Zinc 色阶，避免纯黑纯白。主色调稍亮以保持可见性。

## Typography Rules

- **字体栈**: `-apple-system, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif`
- **标题**: 系统字体，不使用特殊装饰字体
- **正文**: 14px，行高 1.6

## Component Stylings

### Cards
- 圆角: 6px (`--radius-md`)
- 阴影: 轻微单层阴影 (`--shadow-sm`)
- Hover: 上移 2px + 阴影加深（非 8px 大幅浮动）
- 无渐变占位背景，使用纯色 `#f4f4f5`

### Buttons
- 主按钮: 纯色背景，无渐变光泽
- Hover: 仅变暗背景色，无 translateY 浮动
- 无玻璃拟态效果

### Navigation
- 无弹跳动画
- 简单的背景色变化 + 文字颜色变化
- 下拉菜单: 标准下拉，无特殊动效

### Sidebar
- 选中态: 主题色文字 + 浅色背景
- 无全背景色填充（避免过于突出）

## Layout Principles

- 固定宽度 1200px 居中
- 左侧边栏 220px + 主内容区
- 响应式断点: 1240px（平板）、768px（手机）、480px（小屏手机）

## Depth & Elevation

- 三层阴影系统: sm / md / lg
- 无纯黑阴影，使用 rgba 透明度
- 暗色模式下阴影更深

## Do's and Don'ts

### Do
- 使用纯色背景和边框区分层级
- 保持动效克制（150ms 过渡）
- 使用系统字体栈
- 保持一致的圆角半径

### Don't
- 不使用粒子背景或 canvas 动画
- 不使用打字机动画效果
- 不使用弹跳或心跳动画
- 不使用玻璃拟态或模糊效果
- 不使用渐变占位背景
- 不使用过度的入场动画

## Responsive Behavior

- 平板: 隐藏侧边栏，内容全宽
- 手机: 导航换行，卡片 2 列
- 小屏: 保持 2 列，缩小间距

## Agent Prompt Guide

### 课程卡片
```
一个白色卡片，6px 圆角，轻微阴影。
上方 16:10 比例的封面图（纯色占位），
下方课程名称（14px 加粗）和课时信息（12px 灰色）。
右上角圆形收藏按钮。
Hover 时上移 2px，阴影略深。
```

### Banner
```
深色渐变背景（#1e293b 到 #334155）。
中央白色大标题（48px）+ 浅色副标题（18px）。
右侧半透明课程表卡片。
无粒子效果或动画。
```
