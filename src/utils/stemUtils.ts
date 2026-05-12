import { STEMS, BRANCHES } from '@/static/index.js'
import type { Branch, Element, Polarity, Stem } from '@/types.js'

const STEM_ELEMENTS: Record<Stem, Element> = {
  甲: '木', 乙: '木',
  丙: '火', 丁: '火',
  戊: '土', 己: '土',
  庚: '金', 辛: '金',
  壬: '水', 癸: '水'
}

const BRANCH_ELEMENTS: Record<Branch, Element> = {
  寅: '木', 卯: '木',
  巳: '火', 午: '火',
  辰: '土', 未: '土', 戌: '土', 丑: '土',
  申: '金', 酉: '金',
  亥: '水', 子: '水'
}

/** Returns the Five Element (五行) of a Heavenly Stem. */
export const getStemElement = (stem: Stem): Element => STEM_ELEMENTS[stem]

/** Returns the Five Element (五行) of an Earthly Branch. */
export const getBranchElement = (branch: Branch): Element => BRANCH_ELEMENTS[branch]

/** Returns the polarity (陰陽) of a Heavenly Stem. */
export const getStemPolarity = (stem: Stem): Polarity => {
  return STEMS.indexOf(stem) % 2 === 0 ? '陽' : '陰'
}

/** Returns the polarity (陰陽) of an Earthly Branch. */
export const getBranchPolarity = (branch: Branch): Polarity => {
  return BRANCHES.indexOf(branch) % 2 === 0 ? '陽' : '陰'
}

/** Returns the index (0–9) of a Heavenly Stem. */
export const getStemIndex = (stem: Stem): number => STEMS.indexOf(stem)

/** Returns the index (0–11) of an Earthly Branch. */
export const getBranchIndex = (branch: Branch): number => BRANCHES.indexOf(branch)
