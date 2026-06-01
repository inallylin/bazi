import { getMonthIndexByBranch } from '@/utils/branch'
import type { BranchIndex, Felement, StemIndex } from '@/types'

export const getFelementList = (): Felement[] => {
  return [
    'wood',
    'fire',
    'earth',
    'metal',
    'water'
  ]
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
  return getFelementList()[Math.floor(n / 2)]!
}