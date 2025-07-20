# 預約服務平台 - 通用公版

這是一個可以快速自訂的預約服務平台模板，適用於各種預約服務需求。

## ✨ 特色功能

- 🎨 **美觀的響應式設計** - 支援桌面和手機版本
- ⚡ **高效能動畫效果** - 流暢的使用者體驗
- 🔧 **輕鬆自訂配置** - 只需修改 JavaScript 配置即可
- 📱 **完全響應式** - 在各種裝置上都有良好表現
- 🛡️ **表單驗證** - 完整的前端驗證機制
- 🎭 **主題自訂** - 支援 CSS 變數自訂顏色主題

## 🚀 快速開始

### 1. 基本設定

打開 `template.html` 檔案，找到 JavaScript 中的 `CONFIG` 物件：

```javascript
const CONFIG = {
  // Google Apps Script URL - 請替換為您的 Google Apps Script 部署 URL
  scriptURL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
  
  // 網站資訊
  siteTitle: '🎨 您的服務名稱',
  siteSubtitle: '專業服務 ・ 優質體驗 ・ 快速便捷',
  
  // ... 更多設定
};
```

### 2. 必要修改項目

#### 📝 網站基本資訊
- `siteTitle`: 修改為您的服務名稱
- `siteSubtitle`: 修改副標題

#### 💰 服務說明
- `pricingTitle`: 收費說明區塊標題
- `pricingItems`: 修改為您的收費方式（數組格式）

#### 🖼️ 範例作品
- `exampleImageUrl`: 替換為您的範例圖片 URL
- `exampleTitle` 和 `exampleDescription`: 修改範例區域文字

#### 📋 表單欄位
在 `formFields` 中自訂表單欄位：
- `label`: 欄位標籤
- `placeholder`: 輸入提示文字
- `required`: 是否必填

### 3. Google Apps Script 設定

#### 步驟 1：建立 Google Apps Script
1. 前往 [Google Apps Script](https://script.google.com/)
2. 建立新專案
3. 貼入以下程式碼：

```javascript
function doPost(e) {
  try {
    // 解析 JSON 資料
    const data = JSON.parse(e.postData.contents);
    
    // 開啟 Google 試算表（請替換為您的試算表 ID）
    const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
    
    // 取得當前時間
    const timestamp = new Date();
    
    // 將資料寫入試算表
    sheet.appendRow([
      timestamp,
      data.field1 || '',
      data.reserve_date || '',
      data.submit_date || '',
      data.content || '',
      data.name || '',
      data.contact1 || '',
      data.email || '',
      data.note || ''
    ]);
    
    return ContentService.createTextOutput('成功').setMimeType(ContentService.MimeType.TEXT);
    
  } catch (error) {
    return ContentService.createTextOutput('錯誤: ' + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

#### 步驟 2：建立 Google 試算表
1. 建立新的 Google 試算表
2. 在第一列設定表頭：
   ```
   時間戳記 | 主要資訊 | 預約日期 | 完成日期 | 詳細需求 | 聯絡人 | 聯絡方式 | Email | 備註
   ```
3. 複製試算表 ID（從 URL 中取得）

#### 步驟 3：部署並設定
1. 在 Apps Script 中點選「部署」→「新增部署作業」
2. 類型選擇「網路應用程式」
3. 執行身分選擇「我」
4. 存取權限選擇「任何人」
5. 部署後複製 URL，貼入 `template.html` 的 `scriptURL`

### 4. 主題顏色自訂

在 CSS 的 `:root` 區域修改顏色變數：

```css
:root {
  --primary-color: #667eea;    /* 主要顏色 */
  --secondary-color: #764ba2;  /* 次要顏色 */
  --success-color: #10b981;    /* 成功顏色 */
  --error-color: #ef4444;      /* 錯誤顏色 */
  /* ... 更多顏色設定 */
}
```

## 🎨 自訂樣式

### 修改背景漸變
```css
body {
  background: linear-gradient(135deg, 你的顏色1 0%, 你的顏色2 100%);
}
```

### 調整卡片樣式
```css
.card {
  --border-radius: 24px;  /* 圓角大小 */
  --card-bg: rgba(255, 255, 255, 0.95);  /* 背景透明度 */
}
```

## 📱 響應式支援

模板已包含完整的響應式設計：
- 桌面版：最佳的視覺體驗
- 平板版：適中的佈局調整
- 手機版：優化的觸控體驗

## 🔧 進階自訂

### 添加新的表單欄位

1. 在 HTML 中添加新的 `form-group`：
```html
<div class="form-group">
  <label id="new-field-label">新欄位</label>
  <input type="text" name="new_field" id="new-field-input">
</div>
```

2. 在 CONFIG 中添加設定：
```javascript
formFields: {
  // ... 現有欄位
  newField: {
    label: '新欄位名稱',
    placeholder: '請輸入...',
    required: true
  }
}
```

3. 更新 Google Apps Script 以處理新欄位

### 修改動畫效果

在 CSS 中自訂動畫：
```css
@keyframes yourCustomAnimation {
  from { /* 起始狀態 */ }
  to { /* 結束狀態 */ }
}
```

## 🐛 常見問題

### Q: 表單提交後沒有收到資料
A: 請檢查：
1. Google Apps Script URL 是否正確
2. 試算表權限是否開放
3. Apps Script 部署設定是否正確

### Q: 樣式顯示異常
A: 請確認：
1. CSS 變數是否正確設定
2. 瀏覽器是否支援 CSS Grid 和 Flexbox
3. 字體是否正確載入

### Q: 手機版顯示問題
A: 檢查 viewport 設定和響應式 CSS 是否生效

## 📝 更新日誌

### v1.0.0
- ✅ 基本預約表單功能
- ✅ 響應式設計
- ✅ Google Apps Script 整合
- ✅ 動畫效果
- ✅ 表單驗證
- ✅ 主題自訂支援

## 📄 授權

此專案採用 MIT 授權，您可以自由使用、修改和分發。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改善這個模板！

---

網頁製作
@ytseiung_tech
demo: https://ytseiung-tech.github.io/reservationsystem-public/
