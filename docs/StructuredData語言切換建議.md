# Structured Data 語言切換建議

## 是否需要更新？

### ✅ **建議：需要更新**

**理由：**

1. **SEO 優化**
   - Structured Data 對搜尋引擎很重要
   - 提供對應語言的結構化資料，有助於搜尋引擎理解內容
   - 可以改善搜尋結果的顯示

2. **一致性**
   - 目前 meta 標籤已經支援語言切換（使用 `data-i18n`）
   - Structured Data 應該與 meta 標籤保持一致

3. **用戶體驗**
   - 雖然用戶看不到 Structured Data，但搜尋引擎會使用
   - 正確的結構化資料可以改善搜尋結果顯示

## 實現方案

### 方案 A：動態更新 JSON-LD（推薦）

**優點：**
- 保持單一 HTML 檔案
- 與現有語言切換機制一致
- 實現簡單

**實現方式：**

1. **為 JSON-LD script 添加 ID**
```html
<script type="application/ld+json" id="structuredData">
    {
        "@context": "https://schema.org",
        "@type": "ExhibitionEvent",
        "name": "緯創 - 江賢二線上導覽",
        ...
    }
</script>
```

2. **在翻譯物件中添加 Structured Data 的翻譯**
```javascript
const translations = {
    zh: {
        // ... 現有翻譯 ...
        'structuredData.name': '緯創 - 江賢二線上導覽',
        'structuredData.alternateName': 'In Search of Light',
        'structuredData.description': '探索光在不同文化中的意義與價值，透過藝術與科技的結合，呈現光的多樣面貌。匯集來自世界各地的藝術家作品，每一件作品都代表著對光的獨特詮釋與理解。',
        'structuredData.organizer.name': '緯創資通股份有限公司',
        'structuredData.keywords': '江賢二, 線上展覽, 藝術展覽, 光, 緯創, 線上導覽'
    },
    en: {
        // ... 現有翻譯 ...
        'structuredData.name': 'In Search of Light - Paul Chiang\'s Life Journey for Art  | Wistron',
        'structuredData.alternateName': 'In Search of Light',
        'structuredData.description': 'Exploring the meaning and value of light in different cultures, presenting the diverse aspects of light through the combination of art and technology. Featuring works from artists around the world, each piece represents a unique interpretation and understanding of light.',
        'structuredData.organizer.name': 'Wistron Corporation',
        'structuredData.keywords': 'Paul Chiang, Online Exhibition, Art Exhibition, Light, Wistron, Online Tour'
    }
};
```

3. **在 `applyTranslations` 函數中添加更新邏輯**
```javascript
function applyTranslations(lang) {
    // ... 現有代碼 ...
    
    // 更新 Structured Data (JSON-LD)
    updateStructuredData(lang);
}

function updateStructuredData(lang) {
    const scriptElement = document.getElementById('structuredData');
    if (!scriptElement) {
        return;
    }
    
    const langData = translations[lang] || translations['zh'];
    
    try {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "ExhibitionEvent",
            "name": langData['structuredData.name'] || '緯創 - 江賢二線上導覽',
            "alternateName": langData['structuredData.alternateName'] || 'In Search of Light',
            "description": langData['structuredData.description'] || '',
            "organizer": {
                "@type": "Organization",
                "name": langData['structuredData.organizer.name'] || '緯創資通股份有限公司',
                "alternateName": "Wistron Corporation",
                "url": "https://www.wistron.com"
            },
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
            "location": {
                "@type": "VirtualLocation",
                "url": window.location.href
            },
            "image": "images/ogimg.png",
            "keywords": langData['structuredData.keywords'] || '江賢二, 線上展覽, 藝術展覽, 光, 緯創, 線上導覽'
        };
        
        scriptElement.textContent = JSON.stringify(structuredData, null, 2);
    } catch (e) {
        console.warn('更新 Structured Data 失敗:', e);
    }
}
```

### 方案 B：使用兩個 JSON-LD（不推薦）

**缺點：**
- 需要維護兩個 JSON-LD
- 不符合單一 HTML 檔案的設計理念
- 需要手動切換顯示/隱藏

## 注意事項

1. **搜尋引擎爬蟲**
   - 搜尋引擎通常只會讀取初始 HTML 中的 Structured Data
   - 動態更新的 Structured Data 可能不會被搜尋引擎立即識別
   - 但對於用戶體驗和某些搜尋引擎的即時索引還是有幫助的

2. **OG Locale**
   - 建議同時更新 `og:locale` meta 標籤
   - 中文：`zh_TW`
   - 英文：`en_US` 或 `en`

3. **URL 更新**
   - Structured Data 中的 `location.url` 應該使用當前頁面的 URL
   - 可以使用 `window.location.href`

## 建議實施

### 優先級：**中等**

**理由：**
- ✅ 對 SEO 有幫助
- ✅ 與現有機制一致
- ⚠️ 但搜尋引擎主要讀取初始 HTML
- ⚠️ 實現相對簡單，但收益可能有限

**建議：**
1. 如果時間允許，建議實施
2. 如果時間緊迫，可以暫時不實施（因為搜尋引擎主要讀取初始 HTML）
3. 如果實施，建議同時更新 `og:locale` meta 標籤

## 結論

### 建議：**實施（但優先級中等）**

**實施步驟：**
1. 為 JSON-LD script 添加 ID
2. 在翻譯物件中添加 Structured Data 的翻譯
3. 實現 `updateStructuredData` 函數
4. 在 `applyTranslations` 中調用
5. 同時更新 `og:locale` meta 標籤

**預期效果：**
- 改善搜尋引擎對多語言內容的理解
- 與現有語言切換機制保持一致
- 提升整體 SEO 表現
