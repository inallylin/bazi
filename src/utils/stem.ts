import { t } from '@/libs/translate'
import { getStemFelement } from '@/utils/felement'
import { deepClone, rotateByIndex } from '@/utils/tools'
import { getGrowthStageList } from '@/utils/growthStages'
import type { BranchIndex, Felement, GrowthStage, Interaction, ScoreEffect, StemIndex } from '@/types'

export type StemDetail = {
  index: StemIndex
  name: string
  felement: Felement
  polarity: 1 | 0
  getFinalScore: number
}

/**
 * Returns the polarity (陽 or 陰) of a given Heavenly Stem index.
 * Yang stems are even numbers (0, 2, 4, 6, 8), while Yin stems are odd numbers (1, 3, 5, 7, 9).
 * @param n - Index of the Heavenly Stem (0-9)
 * @returns Polarity (1 for Yang, 0 for Yin)
 */
export const getStemPolarity = (n: StemIndex): 1 | 0 => {
  return n % 2 === 0 ? 1 : 0
}

/**
 * Returns the list of 12 growth stages (長生十二神) for a given stem index.
 * The starting point and order of growth stages depend on the stem's polarity (Yang or Yin).
 * Yang stems start at specific branches (寅, 申, 巳, 亥) and follow the growth stage order in forward direction.
 * Yin stems use the corresponding Yang stem's starting point as 'illness' (the 8th growth stage) and follow the growth stage order in reverse direction.
 * @param stem - Index of the Heavenly Stem (0-9)
 * @returns Array of growth stages corresponding to the stem
 *
 * 陽干起於四隅：寅、申、巳、亥，順行, 陰干由雙生的陽干起點為病，逆行(起於四正:子、午、昴、酉), 本例使用陽干起點為病反推
 */
export const getStemGrowthStage = (stem: StemIndex): GrowthStage[] => {
  // 甲(0): 亥(branch-11)
  // 丙(2): 寅(branch-2)
  // 戊(4): 寅(branch-2)
  // 庚(6): 巳(branch-5)
  // 壬(8): 申(branch-8) }
  const startPoint = [11, 2, 2, 5, 8][Math.floor(stem / 2)]
  if (startPoint === undefined) {
    throw new Error(`Invalid stem index: ${stem}`)
  }
  if (stem % 2) {
    // Yin stem: use the corresponding Yang stem's start point as 'illness' (growth 8th), but reverse the order of growth stages
    return rotateByIndex(getGrowthStageList().reverse(), 12 - (startPoint + 8) % 12)
  } else {
    return rotateByIndex(getGrowthStageList(), 12 - startPoint)
  }
}

/**
 * Returns the growth stage (長生十二神) of a given stem when it is located in a specific branch.
 * This is determined by first calculating the growth stage list for the stem and then indexing it by the branch index.
 * @param stem - Index of the Heavenly Stem (0-9)
 * @param branchIndex - Index of the Earthly Branch (0-11)
 * @returns The growth stage of the stem in the specified branch
 */
export const getStemGrowthStageOnBranch = (stem: StemIndex, branchIndex: BranchIndex): GrowthStage => {
  return getStemGrowthStage(stem)[branchIndex]!
}

export const createStemDetail = (stemIndex: StemIndex, pararms: {
  position: number
}) => {
  const scoreEffects: ScoreEffect[] = []
  const scoreBase = 1
  const applyScoreEffect = (_interaction: Interaction) => {
    console.log('apply score effect', pararms.position)
  }

  return {
    index: stemIndex,
    name: t(`stem.${stemIndex}`),
    felement: getStemFelement(stemIndex),
    polarity: getStemPolarity(stemIndex),
    applyScoreEffect,
    getScoreEffects: () => deepClone(scoreEffects),
    get finalScore(): number {
      return scoreEffects.reduce((sum, e) => sum + e.delta, scoreBase)
    }
  }
}
