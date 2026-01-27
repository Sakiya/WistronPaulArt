# 音訊播放時間點同步 Swiper 切換功能評估

## 需求
當音訊播放到特定時間點（例如 2:22）時，自動切換 Swiper 的 slide。

## 技術可行性評估

### ✅ **完全可行**

**現有技術基礎：**
1. Video.js 播放器支援 `timeupdate` 事件（播放時間更新時觸發）
2. Swiper 實例已存儲在 `window.workSwipers[workId]` 中
3. 可以使用 `swiper.slideTo(index)` 方法切換 slide
4. 播放器實例可通過 `videojs.getPlayer(playerId)` 獲取

## 實現方案

### 方案 A：使用 `timeupdate` 事件（推薦）

**優點：**
- Video.js 原生支援，無需額外庫
- 事件觸發頻率可控制（預設約每秒 4 次）
- 實現簡單，代碼清晰

**實現邏輯：**
```javascript
// 在 initSingleWorkPlayer 中，播放器 ready 後添加
player.on('timeupdate', function() {
    const currentTime = player.currentTime();
    const workId = 3; // 作品3
    
    // 定義時間點和對應的 slide 索引
    const timePoints = [
        { time: 142, slideIndex: 1 }, // 2:22 = 142 秒
        { time: 300, slideIndex: 2 }, // 5:00 = 300 秒（範例）
    ];
    
    // 檢查是否需要切換
    const swiper = window.workSwipers[workId];
    if (swiper) {
        for (let i = 0; i < timePoints.length; i++) {
            const point = timePoints[i];
            // 檢查是否到達時間點（允許 0.5 秒誤差）
            if (currentTime >= point.time - 0.5 && currentTime < point.time + 0.5) {
                // 檢查是否已經在目標 slide
                if (swiper.activeIndex !== point.slideIndex) {
                    swiper.slideTo(point.slideIndex);
                }
                break; // 只處理第一個匹配的時間點
            }
        }
    }
});
```

### 方案 B：使用 `setInterval`（不推薦）

**缺點：**
- 需要額外的定時器
- 可能與播放器內部邏輯衝突
- 性能較差

## 性能影響評估

### ⚠️ **性能影響：低到中等**

#### 1. **事件觸發頻率**
- `timeupdate` 事件預設約每秒觸發 **4 次**（250ms 間隔）
- 對於音訊播放來說，這個頻率是合理的
- 不會造成明顯的性能問題

#### 2. **資源消耗分析**

**CPU 使用：**
- 每次 `timeupdate` 觸發時：
  - 獲取當前時間：`O(1)` - 極低
  - 遍歷時間點陣列：`O(n)` - n 通常很小（1-5 個時間點）
  - 檢查 Swiper 狀態：`O(1)` - 極低
  - 切換 slide：`O(1)` - 低（DOM 操作）
- **總體評估：極低到低**

**記憶體使用：**
- 時間點配置陣列：每個作品約 100-500 bytes
- 事件監聽器：每個播放器一個
- **總體評估：極低**

**電池消耗（移動設備）：**
- 事件監聽本身消耗極低
- Swiper 切換動畫會消耗一些 GPU 資源
- **總體評估：低**

#### 3. **優化建議**

**避免重複切換：**
```javascript
// 使用標記避免重複切換
let lastSlideIndex = -1;
if (swiper.activeIndex !== point.slideIndex && lastSlideIndex !== point.slideIndex) {
    swiper.slideTo(point.slideIndex);
    lastSlideIndex = point.slideIndex;
}
```

**降低檢查頻率（可選）：**
```javascript
// 只在接近時間點時才檢查（例如 ±5 秒範圍內）
const checkRange = 5; // 秒
const shouldCheck = timePoints.some(point => 
    Math.abs(currentTime - point.time) < checkRange
);

if (shouldCheck) {
    // 執行檢查邏輯
}
```

**使用防抖（Debounce）：**
```javascript
let lastCheckTime = 0;
const checkInterval = 0.5; // 每 0.5 秒檢查一次

player.on('timeupdate', function() {
    const currentTime = player.currentTime();
    if (currentTime - lastCheckTime < checkInterval) {
        return; // 跳過此次檢查
    }
    lastCheckTime = currentTime;
    // 執行檢查邏輯
});
```

## 實現建議

### 推薦方案：**方案 A + 優化**

1. **使用 `timeupdate` 事件**
2. **添加防重複切換機制**
3. **可選：添加範圍檢查以降低 CPU 使用**

### 配置方式建議

**方案 1：硬編碼在 JavaScript 中**
- 優點：簡單直接
- 缺點：需要修改代碼才能調整時間點

**方案 2：使用 data 屬性配置（推薦）**
```html
<div class="workDetailContent" data-work="3" 
     data-sync-times='[{"time": 142, "slide": 1}, {"time": 300, "slide": 2}]'>
```
- 優點：易於維護，無需修改 JavaScript
- 缺點：需要解析 JSON

**方案 3：使用配置物件**
```javascript
const workSyncConfig = {
    3: [
        { time: 142, slideIndex: 1 }, // 2:22
        { time: 300, slideIndex: 2 }, // 5:00
    ],
    // 其他作品...
};
```

## 注意事項

1. **時間精度：**
   - 音訊播放時間可能有微小誤差（±0.1-0.5 秒）
   - 建議使用時間範圍檢查（例如 142 ± 0.5 秒）

2. **用戶手動切換：**
   - 如果用戶手動切換 slide，應該暫停自動同步
   - 或允許用戶手動切換後，在下次到達時間點時重新同步

3. **播放暫停/跳轉：**
   - 當用戶暫停、跳轉或重新播放時，需要重置同步狀態
   - 確保不會在錯誤的時間點觸發切換

4. **多作品支援：**
   - 如果多個作品都需要此功能，需要為每個作品單獨配置
   - 確保代碼結構清晰，易於維護

## 結論

### ✅ **建議實施**

**理由：**
1. 技術完全可行，實現簡單
2. 性能影響極低到低，不會造成明顯問題
3. 用戶體驗提升明顯（音訊與視覺內容同步）

**建議實施步驟：**
1. 先為作品 3 實現（作為測試）
2. 測試性能和用戶體驗
3. 如果效果良好，擴展到其他需要同步的作品
4. 使用配置物件管理時間點，便於維護

**預期性能影響：**
- CPU 使用增加：< 1%
- 記憶體增加：< 1KB
- 電池消耗：可忽略不計
