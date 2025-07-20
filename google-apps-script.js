function doPost(e) {
  try {
    // 解析 JSON 資料
    const data = JSON.parse(e.postData.contents);
    
    // 開啟 Google 試算表（請替換為您的試算表 ID）
    // 前往 https://sheets.google.com 建立試算表，然後從 URL 複製 ID
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // 取得當前時間
    const timestamp = new Date();
    
    // 將資料寫入試算表
    // 確保試算表的第一列有對應的表頭
    sheet.appendRow([
      timestamp,                // 時間戳記
      data.field1 || '',        // 主要資訊（社團名稱等）
      data.reserve_date || '',  // 預約日期
      data.submit_date || '',   // 完成日期
      data.content || '',       // 詳細需求
      data.name || '',          // 聯絡人姓名
      data.contact1 || '',      // 主要聯絡方式
      data.email || '',         // Email
      data.note || ''           // 備註
    ]);
    
    // 可選：發送確認信件
    // 請確保在 Google Apps Script 中啟用 Gmail API
    /*
    const subject = '預約確認通知';
    const body = `
      親愛的 ${data.name}，
      
      您的預約已成功提交！
      
      預約資訊：
      - 主要資訊：${data.field1}
      - 預約日期：${data.reserve_date}
      - 完成日期：${data.submit_date}
      - 聯絡方式：${data.contact1}
      
      我們將盡快與您聯繫。
      
      謝謝！
    `;
    
    GmailApp.sendEmail(data.email, subject, body);
    */
    
    return ContentService
      .createTextOutput('預約成功提交')
      .setMimeType(ContentService.MimeType.TEXT);
    
  } catch (error) {
    // 錯誤處理
    console.error('處理預約時發生錯誤:', error);
    
    return ContentService
      .createTextOutput('處理預約時發生錯誤: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

/**
 * 測試函數 - 用於在 Apps Script 編輯器中測試
 */
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        field1: '測試社團',
        reserve_date: '2024-01-15',
        submit_date: '2024-01-20',
        content: '測試預約內容',
        name: '測試聯絡人',
        contact1: 'test@example.com',
        email: 'test@example.com',
        note: '測試備註'
      })
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}

/**
 * 初始化試算表表頭
 * 第一次執行時可以使用這個函數來設定表頭
 */
function setupSpreadsheetHeaders() {
  try {
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // 請替換為實際的試算表 ID
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // 設定表頭
    const headers = [
      '提交時間',
      '主要資訊',
      '預約日期', 
      '完成日期',
      '詳細需求',
      '聯絡人姓名',
      '聯絡方式',
      'Email',
      '備註'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // 設定表頭樣式
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    
    // 自動調整欄寬
    sheet.autoResizeColumns(1, headers.length);
    
    console.log('試算表表頭設定完成！');
    
  } catch (error) {
    console.error('設定表頭時發生錯誤:', error);
  }
}
