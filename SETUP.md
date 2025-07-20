# 設定指南 - Google Apps Script 後端設定

## 📋 步驟總覽

1. [建立 Google 試算表](#1-建立-google-試算表)
2. [建立 Google Apps Script](#2-建立-google-apps-script)
3. [設定權限](#3-設定權限)
4. [部署為網路應用程式](#4-部署為網路應用程式)
5. [測試設定](#5-測試設定)
6. [更新前端設定](#6-更新前端設定)

---

## 1. 建立 Google 試算表

### 步驟：
1. 前往 [Google Sheets](https://sheets.google.com)
2. 點選「空白」建立新試算表
3. 為試算表命名（例如：「預約服務資料庫」）
4. 複製試算表 ID（從瀏覽器網址列中複製）
   ```
   例如：https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   試算表 ID 就是：1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
   ```

### 設定表頭：
在第一列輸入以下表頭：
```
A1: 提交時間
B1: 主要資訊  
C1: 預約日期
D1: 完成日期
E1: 詳細需求
F1: 聯絡人姓名
G1: 聯絡方式
H1: Email
I1: 備註
```

---

## 2. 建立 Google Apps Script

### 步驟：
1. 前往 [Google Apps Script](https://script.google.com)
2. 點選「新增專案」
3. 將專案重新命名（例如：「預約服務後端」）
4. 刪除預設的 `myFunction`
5. 將 `google-apps-script.js` 中的程式碼完整複製貼上
6. 儲存專案（Ctrl+S）

### 重要修改：
找到這一行並替換為您的試算表 ID：
```javascript
const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
```
改為：
```javascript
const spreadsheetId = '您剛剛複製的試算表ID';
```

---

## 3. 設定權限

### 執行 setupSpreadsheetHeaders 函數：
1. 在 Apps Script 中，從函數下拉選單選擇 `setupSpreadsheetHeaders`
2. 點選「執行」按鈕 ▶️
3. 首次執行會要求授權：
   - 點選「檢閱權限」
   - 選擇您的 Google 帳號
   - 點選「進階」→「前往 [專案名稱] (不安全)」
   - 點選「允許」

### 權限說明：
此程式需要以下權限：
- **Google Sheets**：讀取和寫入試算表資料
- **Gmail**（可選）：發送確認信件

---

## 4. 部署為網路應用程式

### 步驟：
1. 點選右上角「部署」按鈕
2. 選擇「新增部署作業」
3. 設定類型：點選齒輪圖示 ⚙️，選擇「網路應用程式」
4. 填寫部署設定：
   ```
   說明：預約服務API
   執行身分：我
   存取權限：任何人
   ```
5. 點選「部署」
6. **重要**：複製「網路應用程式URL」，格式如下：
   ```
   https://script.google.com/macros/s/AKfycbx...../exec
   ```

---

## 5. 測試設定

### 在 Apps Script 中測試：
1. 選擇函數：`testDoPost`
2. 點選「執行」▶️
3. 檢查執行日誌是否顯示「預約成功提交」
4. 前往您的 Google 試算表確認是否有新增測試資料

### 使用瀏覽器測試：
1. 開啟新的瀏覽器分頁
2. 貼上您的網路應用程式 URL
3. 如果看到空白頁面而非錯誤，表示部署成功

---

## 6. 更新前端設定

### 修改 template.html：
1. 找到 JavaScript 中的 CONFIG 物件
2. 將 `scriptURL` 更新為您的網路應用程式 URL：
   ```javascript
   const CONFIG = {
     scriptURL: 'https://script.google.com/macros/s/您的部署ID/exec',
     // ... 其他設定
   };
   ```

---

## 🔧 進階設定

### 啟用 Email 通知（可選）：
1. 在 `google-apps-script.js` 中取消註解 Email 相關程式碼
2. 修改信件內容範本
3. 重新部署 Apps Script

### 自訂資料欄位：
1. 在試算表中調整表頭
2. 在 Apps Script 的 `sheet.appendRow()` 中對應調整
3. 在前端表單中新增對應的輸入欄位

### 資料驗證：
在 `doPost` 函數中加入資料驗證邏輯：
```javascript
// 驗證必填欄位
if (!data.name || !data.email) {
  return ContentService.createTextOutput('缺少必填資訊');
}

// 驗證 Email 格式
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(data.email)) {
  return ContentService.createTextOutput('Email 格式不正確');
}
```

---

## ❗ 常見問題

### Q: 部署後收不到資料
**A:** 檢查以下項目：
- [ ] 試算表 ID 是否正確
- [ ] 網路應用程式 URL 是否正確複製
- [ ] 權限是否設定為「任何人」
- [ ] 是否重新部署 (每次修改程式碼後需要重新部署)

### Q: 出現「未授權」錯誤
**A:** 
1. 重新執行授權流程
2. 確認執行身分設定為「我」
3. 確認存取權限設定為「任何人」

### Q: 試算表沒有新增資料
**A:**
1. 檢查 Apps Script 執行日誌是否有錯誤
2. 確認試算表 ID 是否正確
3. 確認試算表權限（應該是創建者）

### Q: 如何更新已部署的 Apps Script
**A:**
1. 修改程式碼後儲存
2. 前往「部署」→「管理部署作業」
3. 點選現有部署旁的編輯圖示 ✏️
4. 修改版本為「新版本」
5. 點選「部署」

---

## 📞 支援

如果您在設定過程中遇到問題，請檢查：
1. 瀏覽器開發者工具的 Console 是否有錯誤訊息
2. Google Apps Script 的執行日誌
3. 網路連線是否正常

完成設定後，您的預約服務平台就可以正常運作了！ 🎉

製作
@ ytseiung_tech
