# 🐍 3D Snake Game

一個使用 React + Three.js 建立的現代化 3D 貪食蛇遊戲

## 🚀 一鍵部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbboy10121988%2FSnake)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/RjhC1P?referralCode=alphasec)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/bboy10121988/Snake)

## ✨ 特色功能

- 🎮 3D 遊戲體驗
- 🎵 音效系統
- 📱 響應式設計
- 🎨 現代化 UI
- 🏆 分數系統

## 🚀 快速開始

### 環境需求
- Node.js 18+ 
- npm 或 yarn

### 安裝與運行

1. **克隆專案**
```bash
git clone <your-repo-url>
cd SnakeGame
```

2. **安裝依賴**
```bash
npm install
```

3. **啟動開發伺服器**
```bash
npm run dev
```

4. **開啟瀏覽器**
訪問 http://localhost:5001

## 🛠️ 可用指令

```bash
# 開發模式
npm run dev

# 建置生產版本
npm run build

# 啟動生產伺服器
npm start

# 類型檢查
npm run check

# 資料庫遷移
npm run db:push
```

## 🏗️ 專案架構

```
├── client/          # 前端 React 應用
├── server/          # 後端 Express 伺服器
├── shared/          # 前後端共用程式碼
└── public/          # 靜態資源
```

## 🎯 技術棧

- **前端**: React 18, TypeScript, Three.js, Tailwind CSS
- **後端**: Node.js, Express, TypeScript
- **建置工具**: Vite, ESBuild
- **資料庫**: Drizzle ORM
- **狀態管理**: Zustand
- **音效**: Howler.js

## 🚀 部署選項

### 1. Railway 部署（推薦）
1. 訪問 [railway.app](https://railway.app)
2. 連接 GitHub 倉庫
3. 選擇 `bboy10121988/Snake` 倉庫
4. 自動部署

### 2. Render 部署
- 連接 GitHub 倉庫
- 使用 `npm run build && npm start`

### 3. Heroku 部署
- 支援 Node.js 應用部署

### 4. Docker 部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5001
CMD ["npm", "start"]
```

## 🎮 遊戲操作

- **W/↑**: 向前
- **S/↓**: 向後  
- **A/←**: 向左
- **D/→**: 向右
- **空白鍵**: 暫停/繼續

## 📄 授權

MIT License

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📧 聯絡

如有問題請透過 GitHub Issues 聯繫。
