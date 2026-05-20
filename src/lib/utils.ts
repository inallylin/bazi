
import type { BranchIndex, Felement, GrowthStage, StemIndex } from '@/types'

/**
 * Calculates the 60-cycle index for a given stem and branch index.
 * Starting point (index 0) is 甲子 (stem 0, branch 0).
 * @param stemIndex - Index of the Heavenly Stem (0-9)
 * @param branchIndex - Index of the Earthly Branch (0-11)
 * @returns Cycle index (0-59)
 *
 * 中國剩餘定理 (Chinese remainder theorem): n ≡ s (mod 10), n ≡ b (mod 12) → n = (36s + 25b) % 60
 */
export const getCycleIndex = (stemIndex: number, branchIndex: number): number => {
  return ((stemIndex * 36 + branchIndex * 25) % 60 + 60) % 60
}

const getFelementList = (): Felement[] => {
  return [
    'wood',
    'fire',
    'earth',
    'metal',
    'water'
  ]
}

const getMonthIndexByBranch = (branchIndex: BranchIndex): number => {
  const idx = branchIndex - 2
  return idx < 0 ? idx + 12 : idx
}

export const getStemFelement = (n: StemIndex): Felement => {
  return getFelementList()[n / 2]!
}

export const getBranchFelement = (n: BranchIndex): Felement => {
  const idx = getMonthIndexByBranch(n)
  const felement = getFelementList()[Math.floor(idx / 4)]!
  const remainder = idx % 4
  return remainder === 3 ? 'earth' : felement
}


export const getStemPolarity = (n: StemIndex): 1 | 0 => {
  return n % 2 === 0 ? 1 : 0
}

// ── Nayin (納音) Table ────────────────────────────────────────────────────────
// 30 entries — one per adjacent pair in the 60-jiazi cycle
const NAYIN: string[] = [
  '海中金', '爐中火', '大林木', '路旁土', '劍鋒金',
  '山頭火', '澗下水', '城頭土', '白蠟金', '楊柳木',
  '泉中水', '屋上土', '霹靂火', '松柏木', '長流水',
  '沙中金', '山下火', '平地木', '壁上土', '金箔金',
  '覆燈火', '天河水', '大驛土', '釵釧金', '桑柘木',
  '大溪水', '沙中土', '天上火', '石榴木', '大海水'
]

export const getTakeSound = (cycleIndex: number): string | null => {
  return NAYIN[Math.floor(cycleIndex / 2)] ?? null
}

const getGrowthStageList = (): GrowthStage[] => {
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

const getGrowthStage = (stem: StemIndex, branchIndex: BranchIndex): GrowthStage | null => {
  console.log(getGrowthStageList())
  return null
}
