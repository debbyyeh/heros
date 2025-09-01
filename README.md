# Heroes 小專案

**說明**

這是一個以 React 為核心、模擬英雄資料管理的前端小專案。功能涵蓋：顯示英雄列表、點選查看英雄能力值與編輯，並與後端 API 互動（GET / PATCH）。此 README 包含專案執行方式、資料夾與架構說明、設計理念、使用到的第三方套件與理由、註解原則、遇到的問題與解法、測試 cases 與 UX 亮點等。

---

## 快速開始（如何執行）

```bash
# Clone
git clone https://github.com/debbyyeh/heros.git
cd heroes

# Install
npm install

# Run (開發模式)
npm run dev

# Build
npm run build

# Run production preview
npm run preview
```

> 開發環境假設 Node.js >= 18。若使用 Vite，請參考 `package.json` 裡的 script。

---

## 路由與頁面

- `/heroes` — Hero List Page（英雄總覽）
- `/heroes/:heroId` — Hero Profile Page（英雄個別頁）
- `*` 以及 Error Page（錯誤頁）

設計重點：
- 允許使用者直接輸入或分享 `/heroes/:id` 的 URL 可正確載入畫面（也就是 refresh/share 都能正常運作）。
- 為避免重複 fetch，`/heroes` 與 `/heroes/:id` 共用同一份資料來源（資料存在 store，且 `:id` 視為 `heroes` 的子路徑）。

---

## 功能重點（專案初期先列出要完成的功能）

- 顯示全部英雄列表
- 點選英雄卡片顯示能力值
- 編輯能力值並儲存（包含驗證：點數分配完整）
- 與後端 API 互動（GET heroes、GET hero/:id、PATCH hero/:id/profile）
- 手機與桌機響應式樣式
- 錯誤處理與 loading 狀態顯示
- 必要時編寫測試（列出 cases，有時間再實作）

---

## 專案資料夾（結構）

```
heroes/
├── node_modules/
├── public/
│ └── hero.svg
├── src/
│ ├── assets/ # 靜態資源
│ ├── components/ # 共用與功能元件
│ │ ├── heroesList/ # 英雄列表
│ │ │ ├── index.tsx
│ │ │ └── style.tsx
│ │ ├── heroProfileList/ # 英雄詳細資訊
│ │ ├── popup/ # 彈出視窗
│ │ └── profileInfo/ # 個別 profile 顯示
│ ├── domain/
│ │ └── heroStore.ts # Zustand 狀態管理
│ ├── pages/ # 頁面 (HeroesPage, HeroProfilePage)
│ ├── styles/
│ │└── global.css #全域樣式
│ ├── util/
│ │ └── apiUtil.ts # API 呼叫工具
│ ├── App.tsx
│ ├── main.tsx
│ └── vite-env.d.ts
└── vite.config.ts
```

**設計理念說明**：
- `domain`：放置與業務邏輯有關的程式碼，例如 state 管理（Zustand）、複雜的同步/非同步流程。將資料取得與商業邏輯抽離頁面元件，利於測試與重用。
- `utils/api.ts`：統一處理 fetch、response 檢查與錯誤訊息格式化（例如 API 回傳 200 但空 body 要處理）。
- `components`：小型元件分開目錄並包含 style 檔案（styled-components）。

---

## Application 邏輯架構

1. 根據路徑載入 `HeroesPage` 或 `HeroProfile`，若只輸入根網址則會自動倒轉到 /heroes 頁面。
2. `HeroesPage` 會檢查 store 是否已有 heroes 資料：
   - 若無，呼叫 `heroService.fetchHeroes()` 並將資料儲存在 `heroStore`。
   - 若有，直接使用 store 資料以避免重覆 fetch。
3. 點選卡片時：
   - 導航至 `/heroes/:id`。
   - `HeroProfile` 從 store 根據 id 取得 hero 資料；若不在 store，則 fetch 個別 hero 資料。
4. 編輯能力值：
   - 用兩份資料儲存（TempData 以及原有從 API 拿回的資料）TempData 用於尚未儲存前的畫面顯示。
   - 點擊儲存會呼叫 `heroService.updateProfile(id, payload)`，處理 loading 與錯誤狀態。
   - 成功後更新 `heroStore`，並回到顯示最新狀態。
5. 若在編輯時嘗試離開（例如切換到另一個卡片），顯示確認對話框以避免未儲存資料遺失。

---

## 使用到的第三方 library 與理由

- **react-router**：負責路由導覽，使用感和社群支援度高，能輕鬆處理 nested routes 與 shareable URLs。
- **zustand**：輕量型全域狀態管理，API 簡潔，適合小型專案，不需要 Redux 的樣板程式。
- **styled-components**（CSS-in-JS）：方便把樣式與元件綁在一起，利於 component 化、動態 props styling 與容易做 RWD。
- **vite**：以往都使用 CRA 快速產出資料夾，但 CRA 今年與 React 分手後，官方建議使用 Vite 取代。而其顯著的速度提升與更佳縮短流程時間都讓體驗有所加分。

理由總結：這個專案範圍小、以開發速度與可維護性為優先，因此選擇簡潔、社群成熟、學習成本低的套件。

---

## 註解原則（code comment）

- **何時寫註解**：
  - 當程式邏輯與原始需求不同步，或有特別 trade-off（例如為了 UX 而做的非常規處理）時，會加上 TODO 或 NOTE 註解，方便 code review 討論。
  - 當某段 code 的目的不直觀（例如對 API response 做特殊容錯）時，寫註解說明為何這樣處理。
  - 複雜的計算或驗證邏輯也會註明數學或流程來源。

- **註解風格**：
  - 以短句為主，說明「為何」而非「做什麼」（因為程式碼通常可以說明做什麼）。
  - 使用 `// TODO:` 或 `// NOTE:` 來標示需要團隊討論或待處理項目。

---

## 在此專案中遇到的問題與解法

1. **無設計稿，排版與間距難掌握**
   - 解法：先以 UX 優先，訂出 spacing scale（例如 8px 基底），並把重點元件（按鈕、卡片）定義成 component，統一管理。

2. **路由分開導致重複 fetch**
   - 解法：把 `/heroes` 與 `/:id` 視為同一資料來源，使用 store 共用資料，路由改為 `heroes` 下的 nested route 或把 profile 當 overlay，但保持 URL 可分享。

3. **API 回傳 200 但 response body 不是 JSON（例如瀏覽器回傳 "OK"）導致 parse error**
   - 解法：在 `utils/api.ts` 做 defensive parsing：先檢查 `res.headers.get('content-type')`，再決定要不要調 `res.json()`，遇到非 JSON 秀友善錯誤訊息。

4. **使用 React 19 的新 Hook（如 use()）時不確定寫法會不會出錯**
   - 解法：查官方文件與社群實作後，若不確定就先採漸進式使用，並在 code review 加上註解請同事確認；或暫時回退到穩定寫法以保證 deliverable。

---

## UX 亮點與 edge cases

- 根據不同斷點調整卡片大小，手機版額外提供卡片點擊後縮小圖片的交互，避免點擊後還需往下滑。
- 編輯時若點選其他卡片或離開頁面會跳出提示，避免未儲存資料遺失。
- 顯示明確的操作提示（錯誤、成功、儲存中），並在儲存 API 呼叫期間禁用重複點擊。
- 驗證：剩餘點數（remainingPoints）必須為 0 才能儲存，否則顯示警告。

---
