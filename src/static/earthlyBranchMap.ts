import type { Branch, HiddenStems } from '@/types.js'

/**
 * 地支藏干表
 * Maps each Earthly Branch to its hidden Heavenly Stems and their relative strength (0–1).
 * Percentages reflect the conventional weighting used in Bazi analysis.
 */
export const EARTHLY_BRANCH_MAP: Record<Branch, HiddenStems> = Object.freeze({
  子: Object.freeze({ 癸: 1 }),
  丑: Object.freeze({ 己: 0.6, 癸: 0.3, 辛: 0.1 }),
  寅: Object.freeze({ 甲: 0.6, 丙: 0.3, 戊: 0.1 }),
  卯: Object.freeze({ 乙: 1 }),
  辰: Object.freeze({ 戊: 0.6, 乙: 0.3, 癸: 0.1 }),
  巳: Object.freeze({ 丙: 0.6, 庚: 0.3, 戊: 0.1 }),
  午: Object.freeze({ 丁: 0.7, 己: 0.3 }),
  未: Object.freeze({ 己: 0.6, 丁: 0.3, 乙: 0.1 }),
  申: Object.freeze({ 庚: 0.6, 壬: 0.3, 戊: 0.1 }),
  酉: Object.freeze({ 辛: 1 }),
  戌: Object.freeze({ 戊: 0.6, 辛: 0.3, 丁: 0.1 }),
  亥: Object.freeze({ 壬: 0.7, 甲: 0.3 })
})
