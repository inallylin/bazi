import type { GrowthStage } from '@/types'

export const getGrowthStageList = (): GrowthStage[] => {
  return [
    'birth', //'長生'
    'bath', // '沐浴'
    'crown', // '冠帶'
    'maturity', // '臨官'
    'prime', // '帝旺'
    'decline', // '衰'
    'illness', // '病'
    'death', // '死'
    'grave', // '墓'
    'vanish', // '絕'
    'embryo', // '胎'
    'incubation' // '養'
  ]
}
