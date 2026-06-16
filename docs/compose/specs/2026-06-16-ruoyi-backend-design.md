# 若依后端设计文档

## [S1] 项目概述

"码上成长"在线教育网站，当前为纯前端静态站点。需要基于若依前后端分离版搭建后端，实现用户系统、课程管理、收藏同步、学习进度等功能。

**现有站点保留不变**，作为前台展示页，通过 fetch 调用后端 API。若依 Vue 做管理后台，两者共用同一个 Spring Boot 后端。

## [S2] 架构

```
码上成长 HTML (展示页)  ←→  RuoYi 后端 (Spring Boot + MyBatis)  ←→  MySQL + Redis
若依 Vue 后台 (管理)    ←→
```

- **后端**: 若依前后端分离版 (ruoyi-vue)，基于 Spring Boot 3 + MyBatis-Plus
- **数据库**: MySQL 8.0
- **缓存**: Redis
- **前端展示**: 现有 HTML 站点（E:\网页设计），新增 fetch API 调用
- **前端管理**: 若依 Vue3 版本管理后台

## [S3] 环境搭建

需安装：
1. **JDK 17** — Spring Boot 3 要求
2. **MySQL 8.0** — 数据库
3. **Redis** — 缓存/会话
4. **Maven 3.8+** — 构建工具（项目自带 mvnw，可不单独安装）
5. **Node.js 18+** — Vue 管理后台构建

## [S4] 若依项目获取

从 Gitee 下载若依前后端分离版：
- 后端: `RuoYi-Vue` (Spring Boot)
- 前端: 若依 Vue3 版本
- 导入 IntelliJ IDEA
- 导入数据库脚本（若依自带 SQL）
- 配置 application.yml（数据库连接、Redis 连接）
- 启动验证

## [S5] 业务模块设计

### S5.1 用户模块（若依自带）
- 用户注册（新增接口，若依默认只有登录）
- 用户登录（JWT token）
- 用户信息管理

### S5.2 课程模块（新增）
**数据库表: `course`**
| 字段 | 类型 | 说明 |
|------|------|------|
| course_id | bigint | 主键 |
| course_name | varchar(100) | 课程名称 |
| category | varchar(50) | 分类（HTML/CSS/JS/Java/Python...） |
| level | varchar(20) | 级别（初级/中级/高级） |
| hours | int | 课时时长 |
| cover_img | varchar(255) | 封面图路径 |
| video_url | varchar(500) | B站视频链接 |
| sort_order | int | 排序 |
| status | char(1) | 状态（0正常 1停用） |

**API:**
- `GET /api/course/list` — 课程列表（支持分类筛选）
- `GET /api/course/{id}` — 课程详情
- `POST /api/course` — 新增课程（管理后台）
- `PUT /api/course` — 修改课程（管理后台）
- `DELETE /api/course/{id}` — 删除课程（管理后台）

### S5.3 收藏模块（新增）
**数据库表: `user_favorite`**
| 字段 | 类型 | 说明 |
|------|------|------|
| favorite_id | bigint | 主键 |
| user_id | bigint | 用户ID |
| course_id | bigint | 课程ID |
| create_time | datetime | 收藏时间 |

**API:**
- `GET /api/favorite/list` — 获取当前用户收藏
- `POST /api/favorite` — 添加收藏
- `DELETE /api/favorite/{courseId}` — 取消收藏

### S5.4 学习进度模块（新增）
**数据库表: `learning_progress`**
| 字段 | 类型 | 说明 |
|------|------|------|
| progress_id | bigint | 主键 |
| user_id | bigint | 用户ID |
| course_id | bigint | 课程ID |
| progress | int | 进度百分比（0-100） |
| status | varchar(20) | 状态（未开始/学习中/已完成） |
| update_time | datetime | 更新时间 |

**API:**
- `GET /api/learning/progress` — 获取用户学习进度
- `PUT /api/learning/progress` — 更新学习进度
- `GET /api/learning/schedule` — 获取课程表（学习中的课程）

## [S6] HTML 前端改造

在现有 `js/main.js` 中新增 API 调用模块：
- `api.js` — 封装 fetch 请求，自动携带 JWT token
- 改造收藏功能：localStorage → 调用后端 API
- 改造课程展示：从后端获取课程列表
- 新增登录/注册弹窗
- 新增课程表区域：显示用户学习进度

## [S7] 验证标准

1. 环境安装完成，若依项目可正常启动
2. 若依 Vue 后台可访问，登录管理员账号
3. 课程 CRUD 在后台正常工作
4. HTML 站点可调用 API 完成登录、收藏、查看课程
5. 收藏数据存储在 MySQL，刷新页面后保留

## [S8] 实施阶段

| 阶段 | 内容 |
|------|------|
| Phase 1 | 环境搭建（JDK + MySQL + Redis + Node.js） |
| Phase 2 | 下载若依项目、导入IDEA、配置并启动 |
| Phase 3 | 新增课程、收藏、学习进度模块（数据库 + API） |
| Phase 4 | HTML 前端改造（API 调用、登录注册） |
| Phase 5 | 联调测试、部署 |
