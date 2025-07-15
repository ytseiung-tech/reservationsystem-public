# 預約平台

這是一個簡易的預約網頁，可用於收集預約表單、繪製需求與聯絡資訊。  
支援 Google Sheets 後端整合（需自設 Web App）。

## ✨ 功能特色

- 說明
- 表單欄位完整：名稱、日期、內容、聯絡方式
- 自動提交到 Google Apps Script
- RWD 響應式設計，手機也好填

## 🚀 使用方式

1. **部署 Google Apps Script**
   - 建立 Google Sheet
   - 使用 GAS 製作接收 POST 的 Web App
   - 將 `scriptURL` 改為你自己的

2. **修改 index.html**
   - 換上自己的圖片 / 說明文字
   - 檢查欄位名稱與 Google Sheet 對應

3. **部署**
   - 可部署至 GitHub Pages、Vercel、Netlify 等平台

## 📂 檔案結構
```
預約平台/
├── index.html # 主頁 HTML
└── README.md # 專案說明
```

## 🛡️ 注意事項

- 請勿直接公開含有 `scriptURL` 的正式網址，以防止濫用或垃圾資料。
- 可以考慮加上簡易 CAPTCHA 或驗證機制。

---


