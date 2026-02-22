# ZAP 資安掃描報告修正說明

## 報告資訊
- **掃描日期**：2026-02-13
- **掃描工具**：OWASP ZAP 2.17.0
- **掃描目標**：http://in-search-of-light.wistronladiesopen.com

---

## 問題摘要

| # | 問題名稱 | 風險等級 | 狀態 | 說明 |
|---|---------|---------|------|------|
| 1 | CSP: script-src unsafe-inline | Medium | ⚠️ 無法修正 | Video.js 和 GTM 需要 unsafe-inline |
| 2 | CSP: style-src unsafe-inline | Medium | ⚠️ 無法修正 | Video.js 需要 unsafe-inline |
| 3 | Sub Resource Integrity Attribute Missing | Medium | ⚠️ 技術限制 | Google Fonts 不支援 SRI |
| 4 | CSP: Duplicate host | Low | ✅ 已修正 | 移除重複的 `*.google.com` |

---

## 詳細說明

### 問題 1：CSP: script-src unsafe-inline（Medium）

**問題描述**：
Content Security Policy (CSP) 中的 `script-src` 指令包含 `'unsafe-inline'`，這允許執行內聯腳本，可能增加 XSS（跨站腳本攻擊）的風險。

**無法修正原因**：
1. **Video.js 播放器**：Video.js 會動態注入內聯腳本來控制播放器行為
2. **Google Tag Manager (GTM)**：GTM 需要執行動態生成的內聯腳本來追蹤用戶行為

**替代方案（如需完全移除）**：
- 使用 CSP nonce 或 hash 機制
- 但 GTM 動態生成的腳本無法預先計算 hash
- 需要放棄 GTM，改用伺服器端追蹤
- 需要放棄 Video.js，改用原生 `<video>` 標籤

**風險評估**：
這是使用 Video.js 和 GTM 的常見權衡。許多大型網站（包括使用 GTM 的網站）都需要 `unsafe-inline`。建議透過其他安全措施（如輸入驗證、輸出編碼）來降低 XSS 風險。

---

### 問題 2：CSP: style-src unsafe-inline（Medium）

**問題描述**：
Content Security Policy (CSP) 中的 `style-src` 指令包含 `'unsafe-inline'`，這允許內聯樣式。

**無法修正原因**：
1. **Video.js 播放器**：Video.js 會動態注入內聯樣式來控制播放器外觀
2. **動態樣式需求**：部分 JavaScript 功能需要動態設定元素樣式

**風險評估**：
相較於 `script-src` 的 `unsafe-inline`，`style-src` 的 `unsafe-inline` 風險較低。CSS 注入攻擊的危害性遠低於 JavaScript 注入。

---

### 問題 3：Sub Resource Integrity Attribute Missing（Medium）

**問題描述**：
Google Fonts 的 `<link>` 標籤缺少 `integrity` 屬性，無法驗證外部資源的完整性。

**技術限制**：
Google Fonts **不支援 Subresource Integrity (SRI)**，原因如下：
1. Google Fonts 會根據用戶的瀏覽器動態生成不同的 CSS
2. 不同瀏覽器會收到不同的字體格式（woff2、woff、ttf 等）
3. 因此無法使用固定的 integrity hash

**替代方案**：
如需完全修正，可將 Google Fonts 下載到本地自行託管：
1. 使用 [google-webfonts-helper](https://gwfh.mranftl.com/fonts) 下載字體
2. 將字體檔案放入 `/webfonts/` 目錄
3. 建立本地 CSS 檔案
4. 更新 `index.html` 中的字體引用
5. 更新 CSP 設定

**風險評估**：
Google Fonts 是受信任的 Google 服務，被篡改的風險極低。此問題的實際安全風險較低。

---

### 問題 4：CSP: Duplicate host（Low）✅ 已修正

**問題描述**：
CSP 中的 `img-src` 指令有重複的 `*.google.com` 項目。

**修正內容**：
已於 `staticwebapp.config.json` 中移除重複的 `*.google.com`。

**修正前**：
```
img-src 'self' blob: data: *.wistron.com *.wistronladiesopen.com *.google.com.tw *.google-analytics.com *.googletagmanager.com *.google.com *.bing.com *.google.com *.youtube.com *.ytimg.com;
```

**修正後**：
```
img-src 'self' blob: data: *.wistron.com *.wistronladiesopen.com *.google.com.tw *.google-analytics.com *.googletagmanager.com *.google.com *.bing.com *.youtube.com *.ytimg.com;
```

---

## 結論

### 已修正項目
- ✅ CSP: Duplicate host（移除重複的 `*.google.com`）

### 無法修正項目（技術限制）
- ⚠️ CSP: script-src unsafe-inline（Video.js 和 GTM 需求）
- ⚠️ CSP: style-src unsafe-inline（Video.js 需求）
- ⚠️ Sub Resource Integrity Missing（Google Fonts 不支援 SRI）

### 建議
1. **接受現有風險**：上述無法修正的項目是使用第三方服務（Video.js、GTM、Google Fonts）的常見權衡
2. **加強其他安全措施**：
   - 確保所有用戶輸入都經過驗證和編碼
   - 定期更新第三方函式庫
   - 監控網站異常行為
3. **如需完全合規**：需要重新評估是否繼續使用 Video.js、GTM 和 Google Fonts

---

## 修正日期
- **2026-02-22**：修正 CSP 重複 host 問題，完成報告文件化
