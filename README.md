# Hero Project

## 專案介紹
這是一個 React 練習專案，主要功能是展示英雄清單與英雄詳細頁面。  

## 建立專案
以往我都是使用 `create-react-app (CRA)` 建立專案，但在 **2025/2/14 React 官方宣布與 CRA 分手** 後，官方文件已建議改用 **Vite**。  
因此這次的專案使用 **Vite** 作為建構工具，擁有更快的啟動速度與更小的打包體積。  

## Routing
專案路由使用 **React Router**。由於這次的需求只需要在 **Browser 環境** 使用，因此選擇安裝 **react-router-dom**，相較於完整的 react-router 套件能降低專案大小。  

## 技術棧
- React 19
- Vite
- TypeScript
- React Router DOM

## 專案啟動
```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev