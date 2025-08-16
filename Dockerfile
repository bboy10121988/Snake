FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package files
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製原始碼
COPY . .

# 建置應用程式
RUN npm run build

# 暴露埠號
EXPOSE 5001

# 啟動應用程式
CMD ["npm", "start"]
