
import type { StemIndex, BranchIndex } from '@/types'

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

export const getStemBranchFromCycleIndex = (cycleIndex: number): [StemIndex, BranchIndex] => {
  // This is a simplified implementation; a full inverse calculation would be more complex
  const stemIndex = cycleIndex % 10 as StemIndex
  const branchIndex = cycleIndex % 12 as BranchIndex
  return [stemIndex, branchIndex]
}



