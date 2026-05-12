export { EARTHLY_BRANCH_MAP } from '@/static/earthlyBranchMap.js'
export { GROWTH_STAGES } from '@/static/growthStages.js'

/** Ordered list of the 10 Heavenly Stems */
export const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const

/** Ordered list of the 12 Earthly Branches */
export const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const

/** Ordered list of the 12 Growth Stages */
export const GROWTH_STAGE_LIST = [
  '長生', '沐浴', '冠帶', '臨官', '帝旺', '衰',
  '病',  '死',  '墓',  '絕',  '胎',  '養'
] as const
