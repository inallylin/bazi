# Bazi Playground

互動式測試介面，用於在本地開發時測試 `bazi` 套件的功能。

> **Note:** 此目錄使用 Vue 3 + Vite 純粹是為了方便撰寫 demo UI。
> `bazi` 本身是框架無關的純 TypeScript 函式庫，不依賴任何前端框架。

## 開發

```bash
# 在 repo 根目錄執行
npm run playground

# 或進入此目錄執行
cd playground
npm install
npm run dev
```

瀏覽器開啟 http://localhost:5173

## Build

```bash
npm run playground:build
# 產出在 playground/dist/，可部署至任何靜態 hosting
```
