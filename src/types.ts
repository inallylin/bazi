/** 天干 Heavenly Stems */
export type Stem =
  | '甲' | '乙' | '丙' | '丁' | '戊'
  | '己' | '庚' | '辛' | '壬' | '癸'

/** 地支 Earthly Branches */
export type Branch =
  | '子' | '丑' | '寅' | '卯' | '辰' | '巳'
  | '午' | '未' | '申' | '酉' | '戌' | '亥'

/** 五行 Five Elements */
export type Element = '木' | '火' | '土' | '金' | '水'

/** 陰陽 Polarity */
export type Polarity = '陽' | '陰'

/** 十二長生 Twelve Growth Stages */
export type GrowthStage =
  | '長生' | '沐浴' | '冠帶' | '臨官' | '帝旺' | '衰'
  | '病'  | '死'  | '墓'  | '絕'  | '胎'  | '養'

/** 四柱 A single pillar (stem + branch pair) */
export interface Pillar {
  stem: Stem;
  branch: Branch;
}

/** 八字命盤 The full Bazi chart */
export interface BaziChart {
  year:  Pillar;
  month: Pillar;
  day:   Pillar;
  hour:  Pillar;
}

/** 藏干 Hidden stem entry: stem → strength percentage */
export type HiddenStems = Partial<Record<Stem, number>>
