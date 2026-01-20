# 斗拱之美 - 古代建筑力学演示平台

> 探索中国古代建筑的力学智慧，3D可视化展示斗拱结构的力学原理

## 本项目由[阿里云ESA](https://www.aliyun.com/product/esa)提供加速、计算和保护

![阿里云ESA](https://img.alicdn.com/imgextra/i3/O1CN01H1UU3i1Cti9lYtFrs_!!6000000000139-2-tps-7534-844.png)

---

## 项目简介

斗拱是中国古代建筑中最具特色的结构构件之一，它不仅具有独特的美学价值，更蕴含着深厚的力学智慧。本项目通过3D可视化技术，让用户直观地理解斗拱结构的力学原理，感受中国古代建筑的科学之美。

### 核心功能

- **3D斗拱展示**：使用Three.js渲染真实的斗拱结构模型
- **力学原理可视化**：动态展示力的传递路径和分布
- **朝代对比**：对比唐、宋、明清三个时期的斗拱演变
- **AI建筑顾问**：集成千问AI，解答古建筑相关问题
- **交互式学习**：支持旋转、缩放、查看不同角度

---

## 技术亮点

### 创意卓越

- **文化与科技融合**：将传统建筑文化与现代3D技术完美结合
- **视觉冲击力**：采用中国传统配色（中国红、金色、墨黑），避免AI味儿的蓝紫渐变
- **沉浸式体验**：3D交互式展示，让用户身临其境感受斗拱之美

### 应用价值

- **教育意义**：适用于建筑学、历史学、力学等多学科教学
- **文化传播**：向世界展示中国古代建筑的科学成就
- **即用性强**：无需安装，打开即用，支持移动端完美适配

### 技术探索

- **边缘函数**：使用ESA边缘函数处理AI请求，降低延迟
- **边缘缓存**：缓存AI响应，提升用户体验
- **全球加速**：通过ESA全球节点，实现快速访问
- **3D渲染优化**：使用React Three Fiber实现高性能3D渲染

---

## How We Use Edge

### 边缘函数的不可替代性

本项目深度集成了阿里云ESA的边缘能力，边缘函数在以下场景中发挥了**不可替代**的作用：

#### 1. AI请求处理 (`/api/qwen`)

**为什么必须用边缘函数？**
- **API Key安全**：用户的千问API Key不能暴露在前端代码中，必须在边缘函数中安全存储和调用
- **请求代理**：通过边缘函数代理AI请求，避免跨域问题
- **全球低延迟**：边缘函数部署在全球节点，用户无论在哪里都能快速访问AI服务

**技术实现**：
```javascript
// functions/api/qwen.js
export default async function handler(request) {
  const apiKey = request.headers.get('X-API-Key')

  // 调用千问API
  const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'qwen-turbo',
      input: { prompt: question },
      parameters: { result_format: 'text' }
    })
  })

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
}
```

#### 2. 边缘缓存优化

**为什么必须用边缘缓存？**
- **降低AI成本**：相同问题的AI响应可以缓存，避免重复调用
- **提升响应速度**：缓存命中时，响应时间从秒级降低到毫秒级
- **全球一致性**：ESA的边缘缓存确保全球用户都能享受到缓存加速

#### 3. 静态资源加速

**为什么必须用ESA？**
- **3D模型加载**：斗拱3D模型文件较大，通过ESA全球CDN加速，确保快速加载
- **移动端优化**：边缘节点智能压缩和优化资源，提升移动端体验
- **高可用性**：ESA的多节点部署确保服务高可用

---

## 技术栈

### 前端
- **React 18** + **TypeScript**：现代化前端框架
- **Vite**：极速构建工具
- **Three.js** + **React Three Fiber**：3D渲染引擎
- **Zustand**：轻量级状态管理
- **Tailwind CSS**：原子化CSS框架

### 边缘函数
- **ESA Pages Functions**：边缘计算能力
- **千问AI**：智能问答能力

### 部署
- **阿里云ESA Pages**：全球边缘部署
- **GitHub**：代码托管

---

## 项目结构

```
33_DougongMechanics_斗拱力学演示/
├── frontend/                 # 前端代码
│   ├── src/
│   │   ├── components/      # React组件
│   │   │   ├── DougongViewer.tsx    # 3D斗拱展示
│   │   │   ├── InfoPanel.tsx        # 信息面板
│   │   │   └── SettingsModal.tsx    # 设置弹窗
│   │   ├── store/           # 状态管理
│   │   │   └── useStore.ts
│   │   ├── App.tsx          # 主应用
│   │   └── main.tsx         # 入口文件
│   ├── public/              # 静态资源
│   ├── package.json
│   └── vite.config.ts
├── functions/                # 边缘函数
│   ├── index.js             # 统一入口
│   └── api/
│       ├── qwen.js          # 千问AI接口
│       └── health.js        # 健康检查
├── esa.jsonc                # ESA配置文件
├── README.md                # 项目说明
└── .gitignore
```

---

## 本地开发

### 1. 安装依赖

```bash
cd frontend
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:3000` 查看效果。

### 3. 构建生产版本

```bash
npm run build
```

---

## 部署到ESA Pages

### 1. 推送到GitHub

```bash
git init
git add .
git commit -m "feat: 初始化斗拱力学演示项目"
git remote add origin https://github.com/1195214305/33_DougongMechanics.git
git push -u origin main
```

### 2. 在ESA控制台创建Pages项目

- **项目名称**：dougong-mechanics
- **生产分支**：main
- **安装命令**：`cd frontend && npm install`
- **构建命令**：`cd frontend && npm run build`
- **静态资源目录**：`frontend/dist`
- **函数文件路径**：（留空，使用esa.jsonc配置）
- **Node.js 版本**：22.x

### 3. 配置环境变量（可选）

如果需要在边缘函数中使用环境变量，可以在ESA控制台添加。

---

## 使用说明

### 1. 选择斗拱类型

在左侧面板中选择唐代、宋代或明清斗拱，查看不同时期的结构特点。

### 2. 查看力学原理

切换到"力学原理"标签，了解斗拱的力学特征，勾选"显示力学向量"可以看到力的传递路径。

### 3. 使用AI助手

切换到"AI助手"标签，输入关于中国古代建筑的问题，AI会为你解答。

**注意**：首次使用需要在设置中配置千问API Key。

### 4. 获取千问API Key

1. 访问[阿里云百炼平台](https://bailian.console.aliyun.com/)
2. 创建应用并获取API Key
3. 在项目设置中填入API Key

---

## 设计理念

### 配色方案

- **中国红** (#C8102E)：代表传统文化的热情与活力
- **金色** (#D4AF37)：象征建筑的华贵与庄重
- **墨黑** (#1a1a1a)：营造沉稳的背景氛围

### 避免AI味儿

- ❌ 不使用蓝紫渐变色
- ❌ 不滥用Emoji
- ❌ 不使用圆角矩形卡片堆叠
- ✅ 使用中国传统配色
- ✅ 采用简洁现代的设计语言
- ✅ 注重文化内涵的表达

---

## 贡献指南

欢迎提交Issue和Pull Request！

---

## 许可证

MIT License

---

## 致谢

- 感谢阿里云ESA提供的边缘计算能力
- 感谢千问AI提供的智能问答能力
- 感谢Three.js社区提供的3D渲染技术

---

**让我们一起探索中国古代建筑的力学之美！**
