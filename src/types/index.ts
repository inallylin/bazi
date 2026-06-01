/** 天干 Heavenly Stems */
export type Stem =
  | '甲' | '乙' | '丙' | '丁' | '戊'
  | '己' | '庚' | '辛' | '壬' | '癸'

/** 地支 Earthly Branches */
export type Branch =
  | '子' | '丑' | '寅' | '卯' | '辰' | '巳'
  | '午' | '未' | '申' | '酉' | '戌' | '亥'

/** 五行 Five Elements */
// export type Felement = '木' | '火' | '土' | '金' | '水'
export type Felement = 'wood' | 'fire' | 'earth' | 'metal' | 'water'

/** 陰陽 Polarity */
export type Polarity = '陽' | '陰'

/** 十二長生 Twelve Growth Stages */
export type GrowthStage =
  'birth'        // '長生'
  | 'bath'       // '沐浴'
  | 'crown'      // '冠帶'
  | 'maturity'   // '臨官'
  | 'prime'      // '帝旺'
  | 'decline'    // '衰'
  | 'illness'    // '病'
  | 'death'      // '死'
  | 'grave'      // '墓'
  | 'vanish'     // '絕'
  | 'embryo'     // '胎'
  | 'incubation' // '養'

/** 四柱 A single pillar (stem + branch pair) */
export interface Pillar {
  index: number
  stem: {
    index: StemIndex
    name: string
  }
  branch: {
    index: BranchIndex
    name: string
  }
}

export type PillarType = 'year' | 'month' | 'day' | 'hour'

/** 八字命盤 The full Bazi chart */
export interface BaziChart extends Record<PillarType, Pillar> {}

/** 藏干 Hidden stem entry: stem → strength percentage */
export type HiddenStems = Partial<Record<Stem, number>>


// (36) 9分/干: 1base + (8根base * 十二長生加成衰減 * 距離加成衰減 * 根系強弱百分比(例如原24->12=0.5))
// (64) 地支: [24, 18, 12, 10]

// 命宮口訣：「寅宮起正月，順數至生月；依月起生時，逆數至卯止。」
// 白話文公式：14 - (生月 + 生時) = 命宮地支 (負數+12)

// 身宮口訣：「寅宮起正月，順數至生月；依月起生時，順數至酉止。」
// 白話文公式： 2 + (生月 + 生時) = 身宮地支 (超過12則減12)

// 五虎遁訣取天干
// 乙庚之年戊為頭
// 丙辛之歲尋庚上
// 丁壬壬寅順水流
// 若問戊癸何方發
// 甲寅之上好追求

// lunisolar是對的 胎元:「月干順推一位，月支順推三位。」
// 也就是說：天干 ＋ 1，地支 ＋ 3。

// 日主決定
// const tenGods = ['比肩', '劫財', '食神', '傷官', '偏財', '正財', '七殺', '正官', '偏印', '正印'] as const
// const interactions = [{}] 先拿四柱文字可以對到的所有interaction, 再依座位看合刻關係



export type StemIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type BranchIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type { Interaction, InteractionTemplate, InteractionType, Score, ScoreCalculation } from './interaction'
export type { ScoreEffect } from '@/types/score'
