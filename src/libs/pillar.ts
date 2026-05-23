import { getBranchFelement, getStemFelement, getCycleIndex, getStemPolarity } from '@/lib/utils'
import type { Interaction } from '@/static/interaction'
import type { BranchIndex, Felement, GrowthStage, StemIndex } from '@/types'
import { t } from '@/lib/translate'

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
  id: number
  name: string
  felement: Felement
  polarity: 1 | 0
  score: Score
}

export type BranchDetail = {
  id: number
  name: string
  felement: Felement
  hiddenStems: Array<{
    proportion: number
    stem: StemDetail
  }>,
  stage: GrowthStage | null // 對日主的長生狀態
}
export class Pillar {
  private readonly cycleIndex: number
  public readonly stemDetail: StemDetail
  public readonly branchDetail: BranchDetail
  public readonly interactions: Interaction[]

  /**
   * @param stemIndex - 0-9
   * @param branchIndex - 0-11
   */
  constructor(stemIndex: StemIndex, branchIndex: BranchIndex) {
    this.cycleIndex = getCycleIndex(stemIndex, branchIndex)
    this.stemDetail = this.createStemDetail(stemIndex)
    this.branchDetail = this.createBranchDetail(branchIndex)
    this.interactions = []
  }

  // ─── Private methods ─────────────────────────────────────────────────────────

  private createStemDetail(n: StemIndex): StemDetail {
    return {
      id: n,
      name: t(`stem.${n}`),
      felement: getStemFelement(n),
      polarity: getStemPolarity(n),
      score: {
        base: 1,
        calculations: [],
        final: 1
      }
    }
  }

  private createBranchDetail(n: BranchIndex): BranchDetail {
  // const stemMapInBranch = getHiddenStems(branch)
  // const hiddenStems = Object.entries(stemMapInBranch).map
    return {
      id: n,
      name: t(`branch.${n}`),
      felement: getBranchFelement(n),
      hiddenStems: [],
      stage: null
    }
  }

  // ─── Public accessors ──────────────────────────────────────────────────────
  get stem(): StemDetail {
    return this.stemDetail
  }
  applyDayMaster(n: number): void {}
}
