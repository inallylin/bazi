# bazi

A TypeScript library for calculating Bazi (八字 / Four Pillars of Destiny) charts.

## Installation

```bash
npm install bazi
```

## Usage

### 生成八字命盤

```ts
import { Bazi } from 'bazi'

const bazi = new Bazi('1990-01-27 18:00')

console.log(bazi.chart)
// {
//   year:  { stem: '庚', branch: '午' },
//   month: { stem: '丁', branch: '丑' },
//   day:   { stem: '壬', branch: '申' },
//   hour:  { stem: '壬', branch: '戌' },
// }
```

也可以傳入 `Date` 物件：

```ts
const bazi = new Bazi(new Date('1990-01-27T18:00:00'))
```

### 藏干（Hidden Stems）

```ts
import { getHiddenStems } from 'bazi'

getHiddenStems('寅')
// { 甲: 0.6, 丙: 0.3, 戊: 0.1 }
```

也可以透過 instance 呼叫：

```ts
bazi.getHiddenStems('寅')
// { 甲: 0.6, 丙: 0.3, 戊: 0.1 }
```

### 十二長生

```ts
import { getGrowthStage } from 'bazi'

getGrowthStage('甲', '亥') // '長生'
getGrowthStage('甲', '卯') // '帝旺'
```

### 五行 / 陰陽

```ts
import { getStemElement, getBranchElement, getStemPolarity } from 'bazi'

getStemElement('甲')    // '木'
getBranchElement('午')  // '火'
getStemPolarity('甲')   // '陽'
getStemPolarity('乙')   // '陰'
```

### 靜態資料

```ts
import { STEMS, BRANCHES, EARTHLY_BRANCH_MAP, GROWTH_STAGES } from 'bazi'

STEMS    // ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
BRANCHES // ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

EARTHLY_BRANCH_MAP['丑'] // { 己: 0.6, 癸: 0.3, 辛: 0.1 }
```

## API

### `class Bazi`

| 成員 | 說明 |
|------|------|
| `new Bazi(datetime)` | 傳入 ISO-8601 字串或 `Date` 物件 |
| `.chart` | `BaziChart`，包含年月日時四柱 |
| `.getHiddenStems(branch)` | 取得地支藏干及強度百分比 |
| `.getGrowthStage(stem, branch)` | 取得天干在地支的十二長生狀態 |

### Utility Functions

| 函數 | 說明 |
|------|------|
| `getHiddenStems(branch)` | 地支 → 藏干對照（含強度） |
| `getGrowthStage(stem, branch)` | 天干 × 地支 → 十二長生 |
| `getStemElement(stem)` | 天干 → 五行 |
| `getBranchElement(branch)` | 地支 → 五行 |
| `getStemPolarity(stem)` | 天干 → 陰陽 |
| `getBranchPolarity(branch)` | 地支 → 陰陽 |
| `getStemIndex(stem)` | 天干在六十甲子的序號（0–9） |
| `getBranchIndex(branch)` | 地支在六十甲子的序號（0–11） |

### Types

```ts
type Stem   = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸'
type Branch = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥'
type Element     = '木' | '火' | '土' | '金' | '水'
type Polarity    = '陽' | '陰'
type GrowthStage = '長生' | '沐浴' | '冠帶' | '臨官' | '帝旺' | '衰' | '病' | '死' | '墓' | '絕' | '胎' | '養'

interface Pillar    { stem: Stem; branch: Branch }
interface BaziChart { year: Pillar; month: Pillar; day: Pillar; hour: Pillar }

type HiddenStems = Partial<Record<Stem, number>> // stem → strength (%)
```

### Static Data

| 常數 | 內容 |
|------|------|
| `STEMS` | 十天干列表（依序） |
| `BRANCHES` | 十二地支列表（依序） |
| `GROWTH_STAGE_LIST` | 十二長生列表（依序） |
| `EARTHLY_BRANCH_MAP` | 藏干表 `Record<Branch, HiddenStems>` |
| `GROWTH_STAGES` | 十二長生對照表 `Record<Stem, Record<Branch, GrowthStage>>` |

## Development

```bash
npm test          # 執行單元測試
npm run test:watch    # 監聽模式
npm run typecheck     # TypeScript 型別檢查
npm run lint          # ESLint 檢查
npm run lint:fix      # ESLint 自動修正
npm run build         # 打包（ESM + CJS + .d.ts）
```

## License

MIT
