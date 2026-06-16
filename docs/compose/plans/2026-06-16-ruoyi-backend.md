# 若依后端搭建实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为"码上成长"教育网站搭建基于若依框架的后端系统，实现用户登录注册、课程管理、收藏同步、学习进度功能。

**Architecture:** 若依前后端分离版（Spring Boot 3 + MyBatis-Plus + Vue3），HTML 展示页通过 API 调用后端，Vue 管理后台管理数据。

**Tech Stack:** JDK 17, MySQL 8.0, Redis, Node.js 18+, Maven, Spring Boot 3, MyBatis-Plus, Vue3, Element Plus

---

## Phase 1: 环境搭建

### Task 1: 安装 JDK 17

**Covers:** S3

**Files:**
- 无代码文件，系统环境配置

- [ ] **Step 1: 下载 JDK 17**

访问 https://adoptium.net/temurin/releases/?version=17 下载 Windows x64 `.msi` 安装包。

或者使用 winget 安装：
```powershell
winget install EclipseAdoptium.Temurin.17.JDK
```

- [ ] **Step 2: 验证安装**

```powershell
java -version
```
Expected: `openjdk version "17.x.x"`

```powershell
javac -version
```
Expected: `javac 17.x.x`

- [ ] **Step 3: 配置 JAVA_HOME（如果安装程序未自动配置）**

```powershell
# 查找 JDK 安装路径
where java
# 通常在 C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot

# 设置环境变量（管理员 PowerShell）
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Eclipse Adoptium\jdk-17.0.14.7-hotspot", "Machine")
[System.Environment]::SetEnvironmentVariable("Path", $env:Path + ";%JAVA_HOME%\bin", "Machine")
```

重启终端后验证：
```powershell
echo $env:JAVA_HOME
```

---

### Task 2: 安装 MySQL 8.0

**Covers:** S3

**Files:**
- 无代码文件，系统环境配置

- [ ] **Step 1: 下载 MySQL 8.0**

访问 https://dev.mysql.com/downloads/installer/ 下载 MySQL Installer（推荐 `mysql-installer-community` 完整版）。

或者使用 winget：
```powershell
winget install Oracle.MySQL
```

- [ ] **Step 2: 安装配置**

安装时选择 "Developer Default" 或 "Server only"，关键配置：
- 端口: 3306（默认）
- root 密码: 设置为 `root123`（或自定义，记住它）
- 勾选 "Start MySQL Server at System Startup"

- [ ] **Step 3: 验证安装**

```powershell
mysql -u root -p
```
输入密码后应进入 MySQL 命令行：
```
mysql>
```

执行以下命令确认版本：
```sql
SELECT VERSION();
```
Expected: `8.0.x`

输入 `exit` 退出。

---

### Task 3: 安装 Redis

**Covers:** S3

**Files:**
- 无代码文件，系统环境配置

- [ ] **Step 1: 下载 Redis for Windows**

访问 https://github.com/tporadowski/redis/releases 下载最新 `.msi` 安装包。

或者使用 winget：
```powershell
winget install Redis.Redis
```

- [ ] **Step 2: 验证安装**

```powershell
redis-cli ping
```
Expected: `PONG`

- [ ] **Step 3: 确认 Redis 服务运行**

```powershell
Get-Service Redis
```
Expected: Status = Running

---

### Task 4: 安装 Node.js 18+

**Covers:** S3

**Files:**
- 无代码文件，系统环境配置

- [ ] **Step 1: 下载 Node.js**

访问 https://nodejs.org/ 下载 LTS 版本（18 或 20）。

或者使用 winget：
```powershell
winget install OpenJS.NodeJS.LTS
```

- [ ] **Step 2: 验证安装**

```powershell
node -v
```
Expected: `v18.x.x` 或 `v20.x.x`

```powershell
npm -v
```
Expected: `9.x.x` 或 `10.x.x`

- [ ] **Step 3: 配置 npm 镜像（国内加速）**

```powershell
npm config set registry https://registry.npmmirror.com
```

---

## Phase 2: 若依项目搭建

### Task 5: 下载若依前后端分离版

**Covers:** S4

**Files:**
- 创建: `E:\ruoyi-vue\` (若依项目目录)

- [ ] **Step 1: 克隆若依项目**

```powershell
cd E:\
git clone https://gitee.com/y_project/RuoYi-Vue.git ruoyi-vue
```

如果 git clone 速度慢，可以下载 ZIP 包：
- 访问 https://gitee.com/y_project/RuoYi-Vue
- 点击"克隆/下载" → "下载ZIP"
- 解压到 `E:\ruoyi-vue\`

- [ ] **Step 2: 确认项目结构**

```powershell
ls E:\ruoyi-vue
```
Expected 包含：
- `ruoyi-admin/` — 主模块
- `ruoyi-common/` — 通用模块
- `ruoyi-framework/` — 框架模块
- `ruoyi-system/` — 系统模块
- `ruoyi-ui/` — Vue 前端
- `sql/` — 数据库脚本
- `pom.xml` — Maven 配置

---

### Task 6: 创建数据库并导入数据

**Covers:** S4

**Files:**
- 修改: `E:\ruoyi-vue\sql\quartz.sql`（若依自带）
- 修改: `E:\ruoyi-vue\sql\ry_2025xxxx.sql`（若依自带）

- [ ] **Step 1: 登录 MySQL**

```powershell
mysql -u root -p
```

- [ ] **Step 2: 创建数据库**

```sql
CREATE DATABASE `ry-vue` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

- [ ] **Step 3: 导入若依 SQL 脚本**

```sql
USE `ry-vue`;
SOURCE E:/ruoyi-vue/sql/ry_2025xxxx.sql;
SOURCE E:/ruoyi-vue/sql/quartz.sql;
```

注意：`ry_2025xxxx.sql` 文件名中的日期部分可能不同，请查看实际文件名。

- [ ] **Step 4: 验证导入**

```sql
SHOW TABLES;
```
Expected: 应看到 `sys_user`、`sys_role`、`sys_menu` 等系统表。

```sql
SELECT * FROM sys_user WHERE user_name = 'admin';
```
Expected: 返回管理员用户记录。

输入 `exit` 退出 MySQL。

---

### Task 7: 配置后端并启动

**Covers:** S4

**Files:**
- 修改: `E:\ruoyi-vue\ruoyi-admin\src\main\resources\application.yml`
- 修改: `E:\ruoyi-vue\ruoyi-admin\src\main\resources\application-druid.yml`

- [ ] **Step 1: 用 IntelliJ IDEA 打开项目**

1. 打开 IntelliJ IDEA
2. File → Open → 选择 `E:\ruoyi-vue\pom.xml`
3. 选择 "Open as Project"
4. 等待 Maven 依赖下载完成（首次可能需要 5-10 分钟）

- [ ] **Step 2: 配置数据库连接**

编辑 `E:\ruoyi-vue\ruoyi-admin\src\main\resources\application-druid.yml`：

```yaml
# 数据源配置
spring:
    datasource:
        type: com.alibaba.druid.pool.DruidDataSource
        driverClassName: com.mysql.cj.jdbc.Driver
        druid:
            # 主库数据源
            master:
                url: jdbc:mysql://localhost:3306/ry-vue?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
                username: root
                password: root123
```

将 `password` 改为你在 Task 2 中设置的 MySQL root 密码。

- [ ] **Step 3: 配置 Redis 连接**

编辑 `E:\ruoyi-vue\ruoyi-admin\src\main\resources\application.yml`：

```yaml
# Redis 配置
redis:
    # 地址
    host: localhost
    # 端口，默认为6379
    port: 6379
    # 数据库索引
    database: 0
    # 密码（默认为空）
    password:
```

如果 Redis 没设密码，`password` 留空即可。

- [ ] **Step 4: 启动后端**

在 IntelliJ IDEA 中：
1. 找到 `RuoYiApplication.java`（在 `ruoyi-admin` 模块下）
2. 右键 → Run 'RuoYiApplication'
3. 等待启动，控制台出现 `若依启动成功`

或使用命令行：
```powershell
cd E:\ruoyi-vue
mvnw.cmd spring-boot:run -pl ruoyi-admin
```

- [ ] **Step 5: 验证后端启动**

浏览器访问：http://localhost:8080

Expected: 返回若依欢迎页面或 JSON 响应。

访问：http://localhost:8080/captchaImage

Expected: 返回验证码图片 JSON（表示接口正常）。

---

### Task 8: 启动 Vue 管理后台

**Covers:** S4

**Files:**
- 修改: `E:\ruoyi-vue\ruoyi-ui\.env.production`（生产环境 API 地址）
- 修改: `E:\ruoyi-vue\ruoyi-ui\.env.development`（开发环境 API 地址）

- [ ] **Step 1: 安装前端依赖**

```powershell
cd E:\ruoyi-vue\ruoyi-ui
npm install
```

首次安装可能需要 3-5 分钟。

- [ ] **Step 2: 确认 API 地址配置**

检查 `E:\ruoyi-vue\ruoyi-ui\.env.development`：
```
# 开发环境配置
ENV = 'development'

# 若依管理系统/开发环境
VITE_APP_BASE_API = '/dev-api'

# 路由懒加载
VITE_CLI_LAZY_LOADING = false
```

检查 `E:\ruoyi-vue\ruoyi-ui\vite.config.js` 中的 proxy 配置（通常已配好，指向 `http://localhost:8080`）。

- [ ] **Step 3: 启动前端**

```powershell
npm run dev
```

Expected: 控制台显示 `Local: http://localhost:80/`（或类似端口）。

- [ ] **Step 4: 登录管理后台**

1. 浏览器访问 http://localhost:80
2. 登录：用户名 `admin`，密码 `admin123`
3. 验证码输入后登录

Expected: 进入若依管理后台首页，看到仪表盘。

---

## Phase 3: 新增业务模块

### Task 9: 创建课程表（course）

**Covers:** S5.2

**Files:**
- 创建: `E:\ruoyi-vue\sql\course.sql` — 课程表建表语句

- [ ] **Step 1: 编写建表 SQL**

创建 `E:\ruoyi-vue\sql\course.sql`：

```sql
-- 课程信息表
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `course_id`   BIGINT       NOT NULL AUTO_INCREMENT COMMENT '课程ID',
  `course_name` VARCHAR(100) NOT NULL COMMENT '课程名称',
  `category`    VARCHAR(50)  NOT NULL COMMENT '分类',
  `level`       VARCHAR(20)  DEFAULT '初级' COMMENT '级别',
  `hours`       INT          DEFAULT 0 COMMENT '课时时长(小时)',
  `cover_img`   VARCHAR(255) DEFAULT '' COMMENT '封面图路径',
  `video_url`   VARCHAR(500) DEFAULT '' COMMENT '视频链接',
  `sort_order`  INT          DEFAULT 0 COMMENT '排序',
  `status`      CHAR(1)      DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `create_time` DATETIME     DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME     DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 COMMENT='课程信息表';

-- 插入现有课程数据
INSERT INTO `course` (`course_name`, `category`, `level`, `hours`, `cover_img`, `video_url`, `sort_order`) VALUES
('HTML 基础教程', 'HTML', '初级', 57, './img/class1.svg', 'https://www.bilibili.com/video/BV14J4114768', 1),
('HTML5 新特性', 'HTML', '中级', 51, './img/class2.svg', 'https://www.bilibili.com/video/BV1p84y1P7Z5', 2),
('CSS 基础教程', 'CSS', '初级', 57, './img/class3.svg', 'https://www.bilibili.com/video/BV14J4114768', 1),
('CSS3 新特性', 'CSS', '中级', 51, './img/class4.svg', 'https://www.bilibili.com/video/BV1p84y1P7Z5', 2),
('JavaScript 入门到进阶', 'JavaScript', '中级', 60, './img/class1.svg', 'https://www.bilibili.com/video/BV1Y84y1L7Nn', 1),
('Java 面向对象编程基础', 'Java', '初级', 19, './img/class3.svg', 'https://www.bilibili.com/video/BV1o841187iP', 1),
('Java 进阶教程', 'Java', '高级', 49, './img/class4.svg', 'https://www.bilibili.com/video/BV1TE41177mP', 2),
('Python 基础入门', 'Python', '初级', 122, './img/class1.svg', 'https://www.bilibili.com/video/BV17G4y1U7jh', 1),
('Python 数据分析', 'Python', '中级', 16, './img/class2.svg', 'https://www.bilibili.com/video/BV1D9GLzyEL6', 2),
('Python 爬虫', 'Python', '高级', 22, './img/class2.svg', 'https://www.bilibili.com/video/BV1Db4y1m7Ho', 3),
('MySQL 快速入门', 'MySQL', '初级', 56, './img/class3.svg', 'https://www.bilibili.com/video/BV1AX4y147tA', 1),
('Redis 入门', 'Redis', '初级', 20, './img/class4.svg', 'https://www.bilibili.com/video/BV1S54y117RZ', 1),
('Vue 基础', 'Vue', '初级', 40, './img/class1.svg', 'https://www.bilibili.com/video/BV1Zy4y1K7SH', 1),
('Vue3 实战', 'Vue', '中级', 66, './img/class2.svg', 'https://www.bilibili.com/video/BV1Xh411V7b5', 2),
('Git 基础', 'Git', '初级', 12, './img/class3.svg', 'https://www.bilibili.com/video/BV1wm4y1z7Dg', 1),
('Linux 基础', 'Linux', '初级', 30, './img/class4.svg', 'https://www.bilibili.com/video/BV1W84y117RZ', 1),
('Bootstrap 入门', 'Bootstrap', '初级', 15, './img/class1.svg', 'https://www.bilibili.com/video/BV18x411V7Mn', 1),
('PyTorch 入门', 'PyTorch', '初级', 30, './img/class2.svg', 'https://www.bilibili.com/video/BV1hE411t7Wd', 1),
('Agent (Dify)', 'Agent', '初级', 10, './img/class3.svg', 'https://www.bilibili.com/video/BV116w5zuEbo', 1),
('Agent (吴恩达)', 'Agent', '中级', 20, './img/class4.svg', 'https://www.bilibili.com/video/BV1DfrdByE2H', 2);
```

- [ ] **Step 2: 执行建表 SQL**

```powershell
mysql -u root -p ry-vue < E:\ruoyi-vue\sql\course.sql
```

- [ ] **Step 3: 验证数据**

```powershell
mysql -u root -p -e "SELECT COUNT(*) FROM ry-vue.course;"
```
Expected: 20 条记录。

---

### Task 10: 创建收藏表（user_favorite）

**Covers:** S5.3

**Files:**
- 创建: `E:\ruoyi-vue\sql\user_favorite.sql`

- [ ] **Step 1: 编写建表 SQL**

创建 `E:\ruoyi-vue\sql\user_favorite.sql`：

```sql
-- 用户收藏表
DROP TABLE IF EXISTS `user_favorite`;
CREATE TABLE `user_favorite` (
  `favorite_id` BIGINT   NOT NULL AUTO_INCREMENT COMMENT '收藏ID',
  `user_id`     BIGINT   NOT NULL COMMENT '用户ID',
  `course_id`   BIGINT   NOT NULL COMMENT '课程ID',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间',
  PRIMARY KEY (`favorite_id`),
  UNIQUE KEY `uk_user_course` (`user_id`, `course_id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB COMMENT='用户收藏表';
```

- [ ] **Step 2: 执行建表 SQL**

```powershell
mysql -u root -p ry-vue < E:\ruoyi-vue\sql\user_favorite.sql
```

---

### Task 11: 创建学习进度表（learning_progress）

**Covers:** S5.4

**Files:**
- 创建: `E:\ruoyi-vue\sql\learning_progress.sql`

- [ ] **Step 1: 编写建表 SQL**

创建 `E:\ruoyi-vue\sql\learning_progress.sql`：

```sql
-- 学习进度表
DROP TABLE IF EXISTS `learning_progress`;
CREATE TABLE `learning_progress` (
  `progress_id` BIGINT      NOT NULL AUTO_INCREMENT COMMENT '进度ID',
  `user_id`     BIGINT      NOT NULL COMMENT '用户ID',
  `course_id`   BIGINT      NOT NULL COMMENT '课程ID',
  `progress`    INT         DEFAULT 0 COMMENT '进度百分比(0-100)',
  `status`      VARCHAR(20) DEFAULT '未开始' COMMENT '状态(未开始/学习中/已完成)',
  `create_time` DATETIME    DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME    DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`progress_id`),
  UNIQUE KEY `uk_user_course` (`user_id`, `course_id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB COMMENT='学习进度表';
```

- [ ] **Step 2: 执行建表 SQL**

```powershell
mysql -u root -p ry-vue < E:\ruoyi-vue\sql\learning_progress.sql
```

---

### Task 12: 使用若依代码生成器生成课程模块

**Covers:** S5.2, S7

**Files:**
- 自动生成: `ruoyi-system/src/main/java/.../domain/Course.java`
- 自动生成: `ruoyi-system/src/main/java/.../mapper/CourseMapper.java`
- 自动生成: `ruoyi-system/src/main/java/.../service/ICourseService.java`
- 自动生成: `ruoyi-system/src/main/java/.../controller/CourseController.java`
- 自动生成: `ruoyi-ui/src/views/course/` — Vue 管理页面

- [ ] **Step 1: 登录若依后台，使用代码生成器**

1. 访问 http://localhost:80，登录管理员账号
2. 左侧菜单 → 系统工具 → 代码生成
3. 点击 "导入" → 选择 `course` 表
4. 点击 `course` 表的 "编辑" 按钮
5. 配置：
   - 生成模块名: `system`
   - 生成业务名: `course`
   - 生成功能名: `课程`
   - 其他保持默认
6. 点击 "提交"

- [ ] **Step 2: 生成代码**

1. 在代码生成列表中选中 `course` 表
2. 点击 "生成代码" → "自定义路径"
3. 或直接点击 "生成代码" → "下载ZIP"

如果选择自定义路径，指定 `E:\ruoyi-vue` 作为根目录。

如果选择下载 ZIP，将生成的文件复制到对应目录：
- Java 文件复制到 `ruoyi-system/src/main/java/` 下对应包路径
- Vue 文件复制到 `ruoyi-ui/src/views/course/`
- SQL 文件执行（菜单SQL）

- [ ] **Step 3: 将生成的代码放入项目**

如果用 ZIP 方式，解压后目录结构：
```
main/java/com/ruoyi/system/domain/Course.java
main/java/com/ruoyi/system/mapper/CourseMapper.java
main/java/com/ruoyi/system/service/ICourseService.java
main/java/com/ruoyi/system/service/impl/CourseServiceImpl.java
main/java/com/ruoyi/system/controller/SysCourseController.java
vue/course/index.vue
vue/course/course.js
```

将 Java 文件复制到 `E:\ruoyi-vue\ruoyi-system\src\main\java\com\ruoyi\system\` 下。
将 Vue 文件复制到 `E:\ruoyi-vue\ruoyi-ui\src\views\course\` 下。

- [ ] **Step 4: 执行菜单 SQL**

代码生成器会生成一个菜单 SQL 文件，执行它：
```powershell
mysql -u root -p ry-vue < 下载的菜单.sql
```

或者在若依后台手动添加菜单：系统管理 → 菜单管理 → 新增。

- [ ] **Step 5: 重启后端并验证**

重启后端（IDEA 中停止再运行），访问管理后台，左侧菜单应出现"课程管理"，可进行 CRUD 操作。

---

### Task 13: 生成收藏和学习进度模块

**Covers:** S5.3, S5.4

**Files:**
- 自动生成: 收藏相关 Java + Vue 文件
- 自动生成: 学习进度相关 Java + Vue 文件

- [ ] **Step 1: 用代码生成器导入 user_favorite 和 learning_progress 表**

重复 Task 12 的步骤，分别导入 `user_favorite` 表和 `learning_progress` 表。

配置：
- user_favorite: 生成模块名 `system`，业务名 `favorite`，功能名 `收藏`
- learning_progress: 生成模块名 `system`，业务名 `learning`，功能名 `学习进度`

- [ ] **Step 2: 生成并放入代码**

与 Task 12 Step 3 相同的方式，将生成的代码复制到项目中。

- [ ] **Step 3: 执行菜单 SQL 并验证**

执行生成的菜单 SQL，重启后端，验证收藏管理和学习进度管理在后台可用。

---

### Task 14: 添加用户注册接口

**Covers:** S5.1

**Files:**
- 创建: `E:\ruoyi-vue\ruoyi-admin\src\main\java\com\ruoyi\web\controller\AuthController.java`

- [ ] **Step 1: 创建注册接口**

创建 `AuthController.java`：

```java
package com.ruoyi.web.controller;

import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.system.domain.SysUser;
import com.ruoyi.system.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private ISysUserService userService;

    @PostMapping("/register")
    public AjaxResult register(@RequestBody SysUser user) {
        if (!userService.checkUserNameUnique(user.getUserName())) {
            return error("用户名已存在");
        }
        user.setPassword(user.getPassword()); // 密码会在 service 层加密
        return toAjax(userService.registerUser(user));
    }
}
```

- [ ] **Step 2: 确认 registerUser 方法存在**

若依的 `ISysUserService` 通常已有 `registerUser` 方法。如果没有，在 `SysUserServiceImpl` 中添加：

```java
public int registerUser(SysUser user) {
    user.setPassword(SecurityUtils.encryptPassword(user.getPassword()));
    return userMapper.insertUser(user);
}
```

- [ ] **Step 3: 配置匿名访问**

编辑 `E:\ruoyi-vue\ruoyi-framework\src\main\java\com\ruoyi\framework\config\SecurityConfig.java`，在 `filterChain` 方法中添加：

```java
.antMatchers("/register").permitAll()
```

放在 `.antMatchers("/login").permitAll()` 附近。

- [ ] **Step 4: 重启后端测试注册**

```powershell
curl -X POST http://localhost:8080/register -H "Content-Type: application/json" -d '{"userName":"testuser","password":"123456"}'
```
Expected: `{"msg":"操作成功","code":200}`

---

### Task 15: 添加收藏和学习进度 API（前端专用）

**Covers:** S5.3, S5.4

**Files:**
- 创建: `E:\ruoyi-vue\ruoyi-admin\src\main\java\com\ruoyi\web\controller\FavoriteController.java`
- 创建: `E:\ruoyi-vue\ruoyi-admin\src\main\java\com\ruoyi\web\controller\LearningController.java`

- [ ] **Step 1: 创建收藏 API**

创建 `FavoriteController.java`：

```java
package com.ruoyi.web.controller;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.system.domain.UserFavorite;
import com.ruoyi.system.service.IUserFavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/favorite")
public class FavoriteController extends BaseController {

    @Autowired
    private IUserFavoriteService favoriteService;

    @GetMapping("/list")
    public TableDataInfo list(UserFavorite favorite) {
        startPage();
        List<UserFavorite> list = favoriteService.selectFavoriteList(favorite);
        return getDataTable(list);
    }

    @PostMapping
    public AjaxResult add(@RequestBody UserFavorite favorite) {
        return toAjax(favoriteService.insertFavorite(favorite));
    }

    @DeleteMapping("/{courseId}")
    public AjaxResult remove(@PathVariable Long courseId) {
        return toAjax(favoriteService.deleteFavoriteByCourseId(courseId));
    }
}
```

- [ ] **Step 2: 创建学习进度 API**

创建 `LearningController.java`：

```java
package com.ruoyi.web.controller;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.system.domain.LearningProgress;
import com.ruoyi.system.service.ILearningProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/learning")
public class LearningController extends BaseController {

    @Autowired
    private ILearningProgressService learningService;

    @GetMapping("/progress")
    public AjaxResult progress(LearningProgress progress) {
        List<LearningProgress> list = learningService.selectLearningProgressList(progress);
        return AjaxResult.success(list);
    }

    @PutMapping("/progress")
    public AjaxResult update(@RequestBody LearningProgress progress) {
        return toAjax(learningService.updateLearningProgress(progress));
    }

    @GetMapping("/schedule")
    public AjaxResult schedule() {
        List<LearningProgress> list = learningService.selectLearningSchedule();
        return AjaxResult.success(list);
    }
}
```

- [ ] **Step 3: 配置 API 匿名访问（可选）**

如果希望未登录用户也能查看课程列表，在 `SecurityConfig.java` 中添加：
```java
.antMatchers("/api/course/list").permitAll()
```

收藏和学习进度 API 需要登录才能访问（携带 JWT token）。

---

## Phase 4: HTML 前端改造

### Task 16: 创建 API 调用模块

**Covers:** S6

**Files:**
- 创建: `E:\网页设计\js\api.js`

- [ ] **Step 1: 创建 api.js**

创建 `E:\网页设计\js\api.js`：

```javascript
var API_BASE = 'http://localhost:8080';

function getToken() {
  return localStorage.getItem('token') || '';
}

function setToken(token) {
  localStorage.setItem('token', token);
}

function clearToken() {
  localStorage.removeItem('token');
}

function apiGet(path) {
  return fetch(API_BASE + path, {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  }).then(function(res) {
    if (res.status === 401) { clearToken(); throw new Error('未登录'); }
    return res.json();
  });
}

function apiPost(path, data) {
  return fetch(API_BASE + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    },
    body: JSON.stringify(data)
  }).then(function(res) {
    if (res.status === 401) { clearToken(); throw new Error('未登录'); }
    return res.json();
  });
}

function apiDelete(path) {
  return fetch(API_BASE + path, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + getToken() }
  }).then(function(res) {
    if (res.status === 401) { clearToken(); throw new Error('未登录'); }
    return res.json();
  });
}
```

- [ ] **Step 2: 在 index.html 中引入 api.js**

在 `index.html` 的 `<head>` 部分，`main.js` 之前添加：
```html
<script src="./js/api.js"></script>
```

---

### Task 17: 改造收藏功能（localStorage → API）

**Covers:** S6, S7

**Files:**
- 修改: `E:\网页设计\js\main.js` — 替换 `getFavorites()`/`saveFavorites()` 函数

- [ ] **Step 1: 替换收藏读写函数**

在 `js/main.js` 中找到 `getFavorites` 和 `saveFavorites` 函数，替换为：

```javascript
function getFavorites(callback) {
  if (!getToken()) {
    callback(JSON.parse(localStorage.getItem('favorites') || '[]'));
    return;
  }
  apiGet('/api/favorite/list?pageSize=100').then(function(res) {
    if (res.rows) {
      var ids = res.rows.map(function(item) { return item.courseId; });
      callback(ids);
    } else {
      callback([]);
    }
  }).catch(function() {
    callback(JSON.parse(localStorage.getItem('favorites') || '[]'));
  });
}

function saveFavorites(ids) {
  if (!getToken()) {
    localStorage.setItem('favorites', JSON.stringify(ids));
    return;
  }
}
```

- [ ] **Step 2: 修改 toggleFavorite 函数**

将 `toggleFavorite` 改为异步：

```javascript
function toggleFavorite(courseId, btn) {
  if (!getToken()) {
    alert('请先登录');
    return;
  }
  var isFav = btn.classList.contains('active');
  if (isFav) {
    apiDelete('/api/favorite/' + courseId).then(function() {
      btn.classList.remove('active');
      btn.textContent = '♡';
      getFavorites(function(ids) { updateFavoritesBar(ids); });
      showToast('取消收藏成功');
    });
  } else {
    apiPost('/api/favorite', { courseId: courseId }).then(function() {
      btn.classList.add('active');
      btn.textContent = '❤';
      getFavorites(function(ids) { updateFavoritesBar(ids); });
      showToast('收藏成功');
      flyToBar(btn);
    });
  }
}
```

- [ ] **Step 3: 初始化收藏状态**

在页面加载时调用 `getFavorites` 初始化：

```javascript
getFavorites(function(ids) {
  document.querySelectorAll('.favorite-btn').forEach(function(btn) {
    var li = btn.closest('li');
    var courseId = li.getAttribute('data-course-id');
    if (ids.indexOf(courseId) !== -1) {
      btn.classList.add('active');
      btn.textContent = '❤';
    }
  });
  updateFavoritesBar(ids);
});
```

---

### Task 18: 添加登录/注册弹窗

**Covers:** S6

**Files:**
- 修改: `E:\网页设计\index.html` — 添加登录弹窗 HTML
- 修改: `E:\网页设计\css\index.css` — 添加弹窗样式
- 修改: `E:\网页设计\js\main.js` — 添加登录逻辑

- [ ] **Step 1: 在 index.html 中添加登录弹窗**

在 `</body>` 之前添加：

```html
<!-- 登录/注册弹窗 -->
<div id="authModal" class="auth-modal" style="display:none;">
  <div class="auth-overlay"></div>
  <div class="auth-box">
    <button class="auth-close">&times;</button>
    <div class="auth-tabs">
      <button class="auth-tab active" data-tab="login">登录</button>
      <button class="auth-tab" data-tab="register">注册</button>
    </div>
    <form id="loginForm" class="auth-form">
      <input type="text" name="userName" placeholder="用户名" required>
      <input type="password" name="password" placeholder="密码" required>
      <div class="captcha-row" style="display:flex;gap:8px;margin-bottom:12px;">
        <input type="text" name="code" placeholder="验证码" required style="flex:1;">
        <img id="captchaImg" src="" alt="验证码" style="height:40px;cursor:pointer;border-radius:4px;" onclick="loadCaptcha()">
      </div>
      <button type="submit">登录</button>
    </form>
    <form id="registerForm" class="auth-form" style="display:none;">
      <input type="text" name="userName" placeholder="用户名" required>
      <input type="password" name="password" placeholder="密码" required>
      <button type="submit">注册</button>
    </form>
  </div>
</div>
```

- [ ] **Step 2: 添加 CSS 样式**

在 `css/index.css` 末尾添加：

```css
.auth-modal { position: fixed; inset: 0; z-index: 9999; }
.auth-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); }
.auth-box { position: relative; width: 360px; margin: 15vh auto; background: var(--color-bg); border-radius: 12px; padding: 30px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
.auth-close { position: absolute; top: 10px; right: 14px; background: none; border: none; font-size: 24px; cursor: pointer; color: var(--color-text); }
.auth-tabs { display: flex; gap: 0; margin-bottom: 20px; }
.auth-tab { flex: 1; padding: 10px; border: none; background: none; cursor: pointer; font-size: 16px; color: var(--color-text-light); border-bottom: 2px solid transparent; }
.auth-tab.active { color: var(--color-primary); border-bottom-color: var(--color-primary); }
.auth-form input { width: 100%; padding: 12px; margin-bottom: 12px; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-bg); color: var(--color-text); font-size: 14px; box-sizing: border-box; }
.auth-form button { width: 100%; padding: 12px; background: var(--color-primary); color: #fff; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; }
```

- [ ] **Step 3: 添加登录 JS 逻辑**

在 `js/main.js` 中添加：

```javascript
var authModal = document.getElementById('authModal');
var authTabs = authModal.querySelectorAll('.auth-tab');
var loginForm = document.getElementById('loginForm');
var registerForm = document.getElementById('registerForm');

authTabs.forEach(function(tab) {
  tab.addEventListener('click', function() {
    authTabs.forEach(function(t) { t.classList.remove('active'); });
    tab.classList.add('active');
    if (tab.dataset.tab === 'login') {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    } else {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    }
  });
});

var captchaEnabled = true;
var captchaUuid = '';

function loadCaptcha() {
  apiGet('/captchaImage').then(function(res) {
    captchaEnabled = res.captchaEnabled !== false;
    if (captchaEnabled) {
      captchaUuid = res.uuid;
      var captchaImg = document.getElementById('captchaImg');
      if (captchaImg) {
        captchaImg.src = 'data:image/gif;base64,' + res.img;
        captchaImg.style.display = 'block';
      }
    }
  });
}

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var data = {
    userName: this.userName.value,
    password: this.password.value
  };
  if (captchaEnabled) {
    data.uuid = captchaUuid;
    var codeInput = this.querySelector('[name="code"]');
    if (codeInput) data.code = codeInput.value;
  }
  apiPost('/login', data).then(function(res) {
    if (res.code === 200) {
      setToken(res.token);
      authModal.style.display = 'none';
      showToast('登录成功');
      location.reload();
    } else {
      alert(res.msg || '登录失败');
      loadCaptcha();
    }
  });
});

registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var data = { userName: this.userName.value, password: this.password.value };
  apiPost('/register', data).then(function(res) {
    if (res.code === 200) {
      alert('注册成功，请登录');
      authTabs[0].click();
    } else {
      alert(res.msg || '注册失败');
    }
  });
});

document.querySelector('.auth-overlay').addEventListener('click', function() {
  authModal.style.display = 'none';
});
document.querySelector('.auth-close').addEventListener('click', function() {
  authModal.style.display = 'none';
});
```

- [ ] **Step 4: 在用户头像处触发登录弹窗**

找到 header 中的用户头像元素，添加点击事件：
```javascript
document.querySelector('.user-avatar').addEventListener('click', function() {
  if (!getToken()) {
    authModal.style.display = 'block';
    loadCaptcha();
  }
});
```

---

## Phase 5: 联调与验证

### Task 19: 联调测试

**Covers:** S7

**Files:**
- 无新增文件，验证所有功能

- [ ] **Step 1: 启动所有服务**

1. 启动 MySQL: 确认服务运行
2. 启动 Redis: `redis-server` 确认 PING → PONG
3. 启动后端: IntelliJ IDEA 运行 RuoYiApplication
4. 启动前端管理: `cd ruoyi-ui && npm run dev`

- [ ] **Step 2: 验证后端 API**

```powershell
# 测试课程列表
curl http://localhost:8080/api/course/list

# 测试登录
curl -X POST http://localhost:8080/login -H "Content-Type: application/json" -d '{"userName":"admin","password":"admin123","uuid":"xxx","code":"xxx"}'
```

- [ ] **Step 3: 验证 HTML 站点功能**

1. 在 Edge 中打开 `E:\网页设计\index.html`
2. 测试登录弹窗：点击用户头像 → 弹出登录框
3. 注册新用户 → 登录
4. 点击课程卡片爱心 → 收藏成功
5. 刷新页面 → 收藏保留（从后端读取）
6. 访问若依后台 → 课程管理 → 看到课程数据

- [ ] **Step 4: 验证管理后台**

1. 访问 http://localhost:80，登录管理员
2. 课程管理 → 可增删改查课程
3. 收藏管理 → 查看用户收藏记录
4. 学习进度管理 → 查看/编辑进度
5. 用户管理 → 查看注册用户

---

### Task 20: 处理跨域问题

**Covers:** S6, S7

**Files:**
- 修改: `E:\ruoyi-vue\ruoyi-admin\src\main\resources\application.yml` — CORS 配置

- [ ] **Step 1: 配置后端 CORS**

在 `application.yml` 中添加（若依通常已配置，确认存在）：

```yaml
# 跨域配置
cors:
  # 允许跨域的域名
  allowedOrigins: "*"
  # 允许跨域的方法
  allowedMethods: "*"
  # 允许跨域的头部
  allowedHeaders: "*"
```

- [ ] **Step 2: 验证跨域请求**

在 Edge 中打开 HTML 页面，F12 打开开发者工具 → Network 标签，操作收藏功能，确认 API 请求没有 CORS 错误。
