import type { Interaction } from '@/static/interaction'
import type { Branch, Felement, GrowthStage, Stem } from '@/types'
import { getBranchElement, getStemFelement, getStemPolarity } from './stemUtils'
import { getGrowthStage, getHiddenStems } from './branchUtils'

type ScoreCalculation = {
  interaction: Interaction
  formula: (_n: number) => number
  sort: number
}

type Score = {
  base: number
  calculations: ScoreCalculation[]
  final: number
}

export type StemDetail = {
  name: Stem
  felement: Felement
  polarity: 1 | 0
  score: Score
}

export type BranchDetail = {
  name: Branch,
  felement: Felement
  hiddenStems: (StemDetail & {
    proportion: number
  })[],
  stage: GrowthStage
}

export type Pillar = {
  stem: StemDetail
  branch: BranchDetail
  interaction: Interaction
}

// 蓋頭/截腳
const getPillarInteraction = (stemDetail: StemDetail, branch: BranchDetail): Interaction => {
  return {}
}

const createStemDetail = (stem: Stem): StemDetail => {
  return {
    name: stem,
    felement: getStemFelement(stem),
    polarity: getStemPolarity(stem),
    score: {
      base: 1,
      calculations: [],
      final: 1
    }
  }
}

const createBranchDetail = (branch: Branch, params: {
  onStem: Stem
}): BranchDetail => {
  // const stemMapInBranch = getHiddenStems(branch)
  // const hiddenStems = Object.entries(stemMapInBranch).map
  return {
    name: branch,
    felement: getBranchElement(branch),
    hiddenStems: [],
    stage: getGrowthStage(params.onStem, branch)
  }
}

export const createPillar = (params: {
  dayMaster: Stem
  stem: Stem
  branch: Branch
}): Pillar => {
  const stem = createStemDetail(params.stem)
  const branch = createBranchDetail(params.branch, { onStem: params.dayMaster })
  return {
    stem,
    branch,
    interaction: getPillarInteraction(stem, branch)
  }
}
