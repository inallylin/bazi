import type { BranchIndex, StemIndex } from '@/types'

/**
 * 地支藏干表
 * Maps each Earthly Branch to its hidden Heavenly Stems and their relative strength (0–1).
 * Percentages reflect the conventional weighting used in Bazi analysis.
 */
// 甲乙丙丁 戊己庚辛 壬癸
export const getHiddenStems = (branch: BranchIndex): Array<{
  stem: StemIndex
  proportion: number
}> => {
  if (branch < 0 || branch > 11) {
    throw new Error('Invalid branch index. Must be between 0 and 11.')
  }
  const allBranchHiddenStems: Array<Array<{
    stem: StemIndex
    proportion: number
  }>> = [
    [ // 子
      { stem: 9, proportion: 1 }
    ],
    [ // 丑
      { stem: 5, proportion: 0.6 },
      { stem: 9, proportion: 0.3 },
      { stem: 7, proportion: 0.1 }
    ],
    [ // 寅
      { stem: 0, proportion: 0.6 },
      { stem: 2, proportion: 0.3 },
      { stem: 4, proportion: 0.1 }
    ],
    [ // 卯
      { stem: 1, proportion: 1 }
    ],
    [ // 辰
      { stem: 4, proportion: 0.6 },
      { stem: 1, proportion: 0.3 },
      { stem: 9, proportion: 0.1 }
    ],
    [ // 巳
      { stem: 2, proportion: 0.6 },
      { stem: 6, proportion: 0.3 },
      { stem: 4, proportion: 0.1 }
    ],
    [ // 午
      { stem: 3, proportion: 0.7 },
      { stem: 5, proportion: 0.3 }
    ],
    [ // 未
      { stem: 5, proportion: 0.6 },
      { stem: 3, proportion: 0.3 },
      { stem: 1, proportion: 0.1 }
    ],
    [ // 申
      { stem: 6, proportion: 0.6 },
      { stem: 8, proportion: 0.3 },
      { stem: 4, proportion: 0.1 }
    ],
    [ // 酉
      { stem: 7, proportion: 1 }
    ],
    [ // 戌
      { stem: 4, proportion: 0.6 },
      { stem: 7, proportion: 0.3 },
      { stem: 3, proportion: 0.1 }
    ],
    [ // 亥
      { stem: 8, proportion: 0.7 },
      { stem: 0, proportion: 0.3 }
    ]
  ]
  return allBranchHiddenStems[branch]!
}
