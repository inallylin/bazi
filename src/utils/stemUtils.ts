import { STEMS, BRANCHES } from '@/static/index.js'
import type { Branch, Felement, Polarity, Stem } from '@/types.js'

const STEM_ELEMENTS: Record<Stem, Felement> = {
  甲: 'wood', 乙: 'wood',
  丙: 'fire', 丁: 'fire',
  戊: 'earth', 己: 'earth',
  庚: 'metal', 辛: 'metal',
  壬: 'water', 癸: 'water'
}

const BRANCH_ELEMENTS: Record<Branch, Felement> = {
  寅: 'wood', 卯: 'wood',
  巳: 'fire', 午: 'fire',
  辰: 'earth', 未: 'earth', 戌: 'earth', 丑: 'earth',
  申: 'metal', 酉: 'metal',
  亥: 'water', 子: 'water'
}

/** Returns the Five Element (五行) of a Heavenly Stem. */
export const getStemFelement = (stem: Stem): Felement => STEM_ELEMENTS[stem]

/** Returns the Five Element (五行) of an Earthly Branch. */
export const getBranchFelement = (branch: Branch): Felement => BRANCH_ELEMENTS[branch]

/** Returns the polarity (陰陽) of a Heavenly Stem. */
export const getStemPolarity = (stem: Stem): 1 | 0 => {
  // return STEMS.indexOf(stem) % 2 === 0 ? '陽' : '陰'
  return STEMS.indexOf(stem) % 2 === 0 ? 1 : 0
}

/** Returns the polarity (陰陽) of an Earthly Branch. */
export const getBranchPolarity = (branch: Branch): Polarity => {
  return BRANCHES.indexOf(branch) % 2 === 0 ? '陽' : '陰'
}

/** Returns the index (0–9) of a Heavenly Stem. */
export const getStemIndex = (stem: Stem): number => STEMS.indexOf(stem)

/** Returns the index (0–11) of an Earthly Branch. */
export const getBranchIndex = (branch: Branch): number => BRANCHES.indexOf(branch)
