# 51Pro

WordPress 6.9 專案

## 系統需求

- PHP >= 8.0
- MySQL 8.0 / MariaDB 10.6+
- Composer

## 安裝步驟

1. 複製環境變數範本：
   ```bash
   cp .env.example .env
   ```

2. 編輯 `.env` 填入資料庫資訊

3. 複製 WordPress 配置：
   ```bash
   cp wp/wp-config-sample.php wp/wp-config.php
   ```

4. 編輯 `wp/wp-config.php` 設定資料庫連線

5. 設定 Web Server 指向 `wp/` 目錄

6. 瀏覽網站完成 WordPress 安裝精靈

## 目錄結構

```
51Pro/
├── composer.json    # Composer 依賴配置
├── vendor/          # Composer 依賴
├── wp/              # WordPress 核心檔案
│   ├── wp-admin/
│   ├── wp-content/
│   └── wp-includes/
└── README.md
```

## 更新 WordPress

```bash
composer update johnpbloch/wordpress
```
