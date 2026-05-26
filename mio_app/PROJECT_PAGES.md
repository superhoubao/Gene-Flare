# MIO 项目页面说明文档

本文档概述了 MIO 应用程序中当前实现的主要页面及其功能。

## 1. 首页 (Home)
- **路由**: `/`
- **说明**: 用户的健康资产控制台，展示 Health Score、资产完整度、可铸造 Research NFT 包和 Shield 等级。
- **主要功能**:
  - 健康资产状态总览。
  - Research NFT 铸造进度。
  - Health Plan 摘要与任务入口。

## 2. Research
- **路由**: `/research`
- **说明**: 展示可铸造的健康数据资产、Research NFT 收益阶段、授权匹配和证明记录。
- **相关路由**:
  - `/research/collection`: 数据资产收藏与收益记录。
  - `/mint/:packId`: 指定数据包的铸造流程。

## 3. Shield
- **路由**: `/shield`
- **说明**: 展示 Flame Shield 等级、权益进度和高端医疗协调服务。
- **相关路由**:
  - `/shield/services`: Shield 服务目录。
  - `/shield/challenges`: 重定向到 `/health-plan?focus=institution`。

## 4. Health Plan 与健康资产详情
- **路由**:
  - `/health-plan`
  - `/health-score`
  - `/asset-completeness`
  - `/health-risk-factors`
- **说明**: 承载当前主线中的计划看板、数字孪生健康评分、资产完整度和风险因素详情。

## 5. 个人中心 (Profile)
- **路由**: `/profile`
- **说明**: 用户设置、隐私控制和数字身份入口。
- **相关路由**:
  - `/profile/settings`
  - `/profile/privacy`
  - `/profile/did`
  - `/profile/nfts`: 重定向到 `/research`。
  - `/profile/flame-shield`: 重定向到 `/shield`。

## 6. AI Consultation
- **路由**: `/ai-consultation`
- **说明**: MIO AI 咨询体验页。

---

*文档更新日期：2026-04-29*
