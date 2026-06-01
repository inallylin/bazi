import type { Branch, Felement, Stem } from '@/types'
import type { BranchDetail } from '@/utils/branch'
import type { StemDetail } from '@/utils/stem'

export type InteractionType =
  'orientation' | // 三會
  'season' |      // 三合
  'merge' |       // 合
  'clash' |       // 沖
  'punish' |      // 刑
  'harm' |        // 害
  'break'         // 破

export type Interaction<T extends 'stem' | 'branch' = 'branch'> = {
  title: string
  type: InteractionType | 'stem'
  memberMap: Partial<Record<T extends 'stem' ? Stem : Branch, (T extends 'stem' ? StemDetail : BranchDetail)[]>>
  transform: Felement | null
}

export type InteractionTemplate<T extends InteractionType | 'stem' = InteractionType> = {
  title: string
  description: string
  type: T
  members: T extends 'stem' ? Stem[] : Branch[]
  transform: Felement | null
}

export type ScoreCalculation = {
  interaction: Interaction
  formula: (_n: number) => number
  sort: number
}

export type Score = {
  base: number
  calculations: ScoreCalculation[]
  final: number
}
