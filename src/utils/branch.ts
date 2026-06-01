import { t } from '@/libs/translate'
import type { BranchIndex, StemIndex, Felement, ScoreEffect, Interaction } from '@/types'
import { getBranchFelement } from '@/utils/felement'
import { deepClone } from '@/utils/tools'

export type BranchDetail = {
  index: BranchIndex
  name: string
  felement: Felement
  // hiddenStems: Partial<Record<Stem, number>>
  applyScoreEffect: (interaction: Interaction) => void
  getScoreEffects: () => ScoreEffect[]
  get finalScore(): number
}


/**
 * Calculates the month index based on the branch index, with the starting point at 寅 (index 2).
 * This is used to determine the month of the lunar calendar corresponding to a given branch.
 * @param branchIndex - Index of the Earthly Branch (0-11)
 * @returns Month index (0-11) where 0 corresponds to 寅, 1 to 卯, ..., 11 to 丑
 *
 * 月支對應月令：寅(1月), 卯(2月), 辰(3月), 巳(4月), 午(5月), 未(6月), 申(7月), 酉(8月), 戌(9月), 亥(10月), 子(11月), 丑(12月)
 */
export const getMonthIndexByBranch = (branchIndex: BranchIndex): number => {
  const idx = branchIndex - 1 // 寅(2) should correspond to month index 0, so we subtract 1
  return idx < 0 ? idx + 12 : idx
}

export const createBranchDetail = (branchIndex: BranchIndex, pararms: {
  onStem: StemIndex
  position: number
}): BranchDetail => {
  const hiddenStems: any[] = []
  const scoreEffects: ScoreEffect[] = []
  const scoreBase = 1
  const applyScoreEffect = (_interaction: Interaction) => {
    console.log('apply score effect', pararms.position)
  }

  return {
    index: branchIndex,
    name: t(`branch.${branchIndex}`),
    felement: getBranchFelement(branchIndex),
    applyScoreEffect,
    // hiddenStems, 
    getScoreEffects: () => deepClone(scoreEffects),
    get finalScore(): number {
      return scoreEffects.reduce((sum, e) => sum + e.delta, scoreBase)
    }
  }
}
