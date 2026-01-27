# URL 路由說明文件

## 概述

本專案使用 Hash 路由系統來管理頁面狀態和語言切換。所有 URL 都基於 `index.html`，通過 hash 來區分不同的頁面和語言。

## URL 結構

### 基本格式
```
https://your-domain.com/in_search_of_light/index.html#hash
```

### Hash 規則
- **中文版**：無 hash 或空 hash 表示中文
- **英文版**：`#en` 表示英文
- **作品詳情**：使用作品英文名稱作為 hash（如 `#Work_1`）
- **組合格式**：英文版作品詳情使用 `#en/Work_1` 格式（語言/作品名稱）

---

## 完整 URL 列表

### 一、展覽簡介（Exhibition）

#### 中文版
```
index.html
index.html#
```

#### 英文版
```
index.html#en
```

---

### 二、語音導覽（Audio Guide）

#### 中文版
```
index.html#audio
```

#### 英文版
```
index.html#en/audio
```

---

### 三、作品詳情（Work Detail）

#### 作品 1：台灣山脈系列（Taiwan Mountains Series）

**中文版：**
```
index.html#Work_1
```

**英文版：**
```
index.html#en/Work_1
```

#### 作品 2：比西里岸之夢（Dream of Pisirian）

**中文版：**
```
index.html#Work_2
```

**英文版：**
```
index.html#en/Work_2
```

#### 作品 3：巴黎聖母院系列、淨化之夜系列（Notre-Dame de Paris Series, Purification Night Series）

**中文版：**
```
index.html#Work_3
```

**英文版：**
```
index.html#en/Work_3
```

#### 作品 4：百年廟系列（Century Temple Series）

**中文版：**
```
index.html#Work_4
```

**英文版：**
```
index.html#en/Work_4
```

#### 作品 5：對永恆的冥想系列（Meditation on Eternity Series）

**中文版：**
```
index.html#Work_5
```

**英文版：**
```
index.html#en/Work_5
```

#### 作品 6：銀湖系列（Silver Lake Series）

**中文版：**
```
index.html#Work_6
```

**英文版：**
```
index.html#en/Work_6
```

#### 作品 7：留言互動牆（Message Wall）

**中文版：**
```
index.html#Work_7
```

**英文版：**
```
index.html#en/Work_7
```

#### 作品 8：江賢二藝術園區的自然、建築、藝術（Nature, Architecture, and Art of Paul Chiang Art Center）

**中文版：**
```
index.html#Work_8
```

**英文版：**
```
index.html#en/Work_8
```

#### 作品 9：（如果有）

**中文版：**
```
index.html#Work_9
```

**英文版：**
```
index.html#en/Work_9
```

---

## 作品名稱對照表

| 作品編號 | 中文名稱 | 英文名稱 | Hash 值 |
|---------|---------|---------|---------|
| 1 | 台灣山脈系列 | Taiwan Mountains Series | `Work_1` |
| 2 | 比西里岸之夢 | Dream of Pisirian | `Work_2` |
| 3 | 巴黎聖母院系列、淨化之夜系列 | Notre-Dame de Paris Series, Purification Night Series | `Work_3` |
| 4 | 百年廟系列 | Century Temple Series | `Work_4` |
| 5 | 對永恆的冥想系列 | Meditation on Eternity Series | `Work_5` |
| 6 | 銀湖系列 | Silver Lake Series | `Work_6` |
| 7 | 留言互動牆 | Message Wall | `Work_7` |
| 8 | 江賢二藝術園區的自然、建築、藝術 | Nature, Architecture, and Art of Paul Chiang Art Center | `Work_8` |
| 9 | （待定） | （待定） | `Work_9` |

---

## 路由邏輯說明

### 語言切換
- 點擊語言按鈕（EN/中文）時，會更新 URL hash
- 如果當前在展覽簡介頁面：
  - 切換到英文：`index.html` → `index.html#en`
  - 切換到中文：`index.html#en` → `index.html`
- 如果當前在作品詳情頁面：
  - 切換到英文：`index.html#Work_1` → `index.html#en/Work_1`
  - 切換到中文：`index.html#en/Work_1` → `index.html#Work_1`
- 如果當前在語音導覽頁面：
  - 切換到英文：`index.html#audio` → `index.html#en/audio`
  - 切換到中文：`index.html#en/audio` → `index.html#audio`

### Hash 解析順序
1. 檢查是否有語言前綴（`en/`）
2. 如果有語言前綴，提取語言並移除前綴
3. 檢查剩餘 hash 是否為基本 tab（`exhibition` 或 `audio`）
4. 檢查剩餘 hash 是否為作品名稱（`Work_1` 到 `Work_9`）
5. 預設返回展覽簡介

### 語言狀態保存
- 使用 `localStorage` 保存用戶的語言選擇
- 如果 URL 中沒有語言 hash，會從 `localStorage` 讀取
- 預設語言為中文

---

## Hash 格式說明

### 格式規則
- **中文展覽簡介**：`index.html` 或 `index.html#`
- **英文展覽簡介**：`index.html#en`
- **中文語音導覽**：`index.html#audio`
- **英文語音導覽**：`index.html#en/audio`
- **中文作品詳情**：`index.html#Work_1`（Work_1 到 Work_9）
- **英文作品詳情**：`index.html#en/Work_1`（Work_1 到 Work_9）

### 分隔符號
- 使用 `/` 作為語言和內容之間的分隔符號
- 格式：`#語言/內容`
- 例如：`#en/Work_1` 表示英文版的 Work_1 作品

---

## 更新記錄

- 2025-01-XX：建立初始文件
- 2025-01-XX：修復語言切換時 URL 不更新的問題，實作 `#en/Work_1` 格式
