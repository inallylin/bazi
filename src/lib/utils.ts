
import { getFelementList, getGrowthStageList, getNayinList } from '@/lib/static'
import type { BranchIndex, Felement, GrowthStage, StemIndex } from '@/types'
import { t } from './translate';

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


export const getNayin = (cycleIndex: number): string | null => {
  return getNayinList()[Math.floor(cycleIndex / 2)] ?? null
}

export const getStemGrowthStage = (stem: StemIndex): GrowthStage[] => {

  // 甲己: 0, 5 → 長生在寅 (index 2)
  // 乙庚: 1, 6 → 長生在卯 (index 3)
  // 丙辛: 2, 7 → 長生在辰 (index 4)
  // 丁壬: 3, 8 → 長生在巳 (index 5)
  // 戊癸: 4, 9 → 長生在午 (index 6)
  // const baseIndex = Math.floor(stem / 2) * 2 + 2
  // const growthStages = getGrowthStageList()
  // return Array(12).fill(0).map((_, i) => growthStages[(baseIndex + i) % 12]!)
}

export const getGrowthStageOnBranch = (stem: StemIndex, branchIndex: BranchIndex): GrowthStage | null => {
  console.log(getGrowthStageList())
  return null
}

const rotateByIndex = (arr: any[], index: number) => {
  // 確保輸入的索引在合理範圍內
  const safeIndex = index % arr.length
  return arr.slice(safeIndex).concat(arr.slice(0, safeIndex))
}

// 子丑寅卯 辰巳午未 申酉戌亥
export const test = (stemIndex: StemIndex) => {
  // 陽干起於四隅：寅、申、巳、亥，順行
  // Yang stems start at the four corners: 寅, 申, 巳, 亥, in forward order
  // { 甲(0): 亥(branch-11), 丙(2): 寅(branch-2), 戊(4): 寅(branch-2), 庚(6): 巳(branch-5), 壬(8): 申(branch-8) }
  // Yin stem: 由雙生的陽干起點為病，逆行
  // Yin stem: use the corresponding Yang stem's start point as 'illness' (growth 8th), but reverse the order of growth stages
  const startPoint = [11, 2, 2, 5, 8][Math.floor(stemIndex / 2)]!
  console.log(111, stemIndex % 2, JSON.stringify(getGrowthStageList()))
  if (stemIndex % 2) {
    console.log('YIN')
    return rotateByIndex(getGrowthStageList().reverse(), 12 - (startPoint + 8) % 12)
  // Yang stem
  } else {
    return rotateByIndex(getGrowthStageList(), 12 - startPoint)
  }
}
