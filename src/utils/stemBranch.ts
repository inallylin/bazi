
import { getFelementList, getGrowthStageList, getNayinList } from '@/lib/static'
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

/**
 * Calculates the month index based on the branch index, with the starting point at 寅 (index 2).
 * This is used to determine the month of the lunar calendar corresponding to a given branch.
 * @param branchIndex - Index of the Earthly Branch (0-11)
 * @returns Month index (0-11) where 0 corresponds to 寅, 1 to 卯, ..., 11 to 丑
 *
 * 月支對應月令：寅(1月), 卯(2月), 辰(3月), 巳(4月), 午(5月), 未(6月), 申(7月), 酉(8月), 戌(9月), 亥(10月), 子(11月), 丑(12月)
 */
const getMonthIndexByBranch = (branchIndex: BranchIndex): number => {
  const idx = branchIndex - 1 // 寅(2) should correspond to month index 0, so we subtract 1
  return idx < 0 ? idx + 12 : idx
}

/**
 * Returns the Five Element (五行) corresponding to a given Heavenly Stem index.
 * The mapping is based on the traditional association of the 10 Heavenly Stems with the Five Elements:
 * - 甲(0) and 乙(1) → Wood
 * - 丙(2) and 丁(3) → Fire
 * - 戊(4) and 己(5) → Earth
 * - 庚(6) and 辛(7) → Metal
 * - 壬(8) and 癸(9) → Water
 * @param n - Index of the Heavenly Stem (0-9)
 * @returns The corresponding Five Element (Felement)
 */
export const getStemFelement = (n: StemIndex): Felement => {
  return getFelementList()[n / 2]!
}

/**
 * Returns the Five Element (五行) corresponding to a given Earthly Branch index.
 * The mapping is based on the traditional association of the 12 Earthly Branches with the Five Elements, where certain branches are associated with a primary element and others have a secondary 'earth' element:
 * - 寅(2), 卯(3) → Wood
 */
export const getBranchFelement = (n: BranchIndex): Felement => {
  const monthIdx = getMonthIndexByBranch(n)
  const felementListWithoutEarth = getFelementList().filter(v => v !== 'earth')
  const felement = felementListWithoutEarth[Math.floor(monthIdx / 3)]!
  const remainder = monthIdx % 3
  return remainder ? felement : 'earth'
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
 * Returns the Nayin (納音) element corresponding to a given cycle index.
 * The Nayin is determined by the 60-cycle index, with each pair of consecutive cycles sharing the same Nayin element.
 * The mapping is based on the traditional sequence of Nayin elements associated with the 60 combinations of Heavenly Stems and Earthly Branches.
 * @param cycleIndex - Index of the 60-cycle (0-59)
 * @returns The corresponding Nayin element, or null if the index is out of range
 */
export const getNayin = (cycleIndex: number): string | null => {
  return getNayinList()[Math.floor(cycleIndex / 2)] ?? null
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

/**
 * Rotates an array by a given index, effectively shifting the elements to the left and wrapping around.
 * For example, rotateByIndex([1, 2, 3, 4], 1) returns [2, 3, 4, 1].
 * @param arr - The array to rotate
 * @param index - The number of positions to rotate the array by
 * @returns A new array that has been rotated by the specified index
 *
 * 例如：rotateByIndex([1, 2, 3, 4], 1) 返回 [2, 3, 4, 1]
 */
const rotateByIndex = (arr: any[], index: number) => {
  const safeIndex = index % arr.length
  return arr.slice(safeIndex).concat(arr.slice(0, safeIndex))
}

