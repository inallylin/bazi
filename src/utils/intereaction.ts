import { getBranchInteractionList, getStemInteractionList } from '@/utils/interaction.static'
import type { BranchIndex, Interaction, StemIndex } from '@/types'
import type { Branch, Felement, Stem } from '@/types'


type Calculation = {
  multiplier: number // 關係產生的計算係數（例如1.8、0.75等）
  transform: Felement | null // 關係導致的質變（例如三會導致的五行轉化）
}

export const getStemInteractions = (stemIndex: StemIndex): Interaction<'stem'>[] => {
  const allInteractions = getStemInteractionList()
  return allInteractions
    .filter(interaction => interaction.members.includes(stem))
    .map(interaction => {
      const memberMap = Object.fromEntries(
        interaction.members.map(member => [member, []])
      ) as Partial<Record<Stem, StemDetail[]>>
      return {
        title: interaction.title,
        type: interaction.type,
        memberMap,
        transform: interaction.transform
      }
    })
}

export const getBranchInsteractions = (branchIndex: BranchIndex): Interaction<'branch'>[] => {
  const allInteractions = getBranchInteractionList()
  return allInteractions
    .filter(interaction => interaction.members.includes(branch))
    .map(interaction => {
      const memberMap = Object.fromEntries(
        interaction.members.map(member => [member, []])
      ) as Partial<Record<Branch, BranchDetail[]>>
      return {
        title: interaction.title,
        type: interaction.type,
        memberMap,
        transform: interaction.transform
      }
    })
}

export const getPillarInteraction = (_stemIndex: StemIndex, _branchIndex: BranchIndex): Interaction => {
  return {}
}

// 妒合=0.9, 合絆=0.8, 沒有質變

// 回傳的係數每個坑都要拿一份，如果坑上有多人平均分攤
// 例如三合, 如果是全合1.8 [亥亥卯未] 亥每位只能拿1.8/2, 卯*1.8, 未*1.8

export const setInteractionMultiplier = (branchInteraction: Interaction<'branch'>): Calculation | null => {
  const seatCounts = Object.values(branchInteraction.memberMap).map(s => s.length)
  const emptyCount = seatCounts.filter(v => !v).length
  const hasMultiple = seatCounts.some(count => count > 1)
  // 三半合x1.25(可等流年大運生效)
  if (branchInteraction.type === 'season' && emptyCount === 1) {
    const isStock = seatCounts[0] === 0 // 庫旺 vs 生旺
    return {
      multiplier: isStock ? 1.1 : 1.25,
      transform: null
    }
  }
  if (emptyCount) {
    return null
  }
  // 三會: 春木夏火秋金冬水，一方的三個地支同時出現, 缺一不可, x2
  if (branchInteraction.type === 'orientation') {
    return {
      multiplier: 2 * (hasMultiple ? 1.2 : 1),
      transform: branchInteraction.transform
    }
  // 三合: 長生+地旺+墓庫, 全合x1.8
  } else if (branchInteraction.type === 'season') {
    return {
      multiplier: 1.8,
      transform: branchInteraction.transform
    }
    // 合 1.4
  } else if (branchInteraction.type === 'merge') {
    return {
      multiplier: 1.4,
      transform: branchInteraction.transform
    }
    // 沖 0.5
  } else if (branchInteraction.type === 'clash') {
    return {
      multiplier: 0.5,
      transform: null
    }
    // 刑 0.8
  } else if (branchInteraction.type === 'punish') {
    const isSelfPunishSuccess = seatCounts.length === 1 && (seatCounts[0] ?? 0) > 1
    return {
      multiplier: isSelfPunishSuccess ? 0.8 : 1,
      transform: null
    }
    // 害 0.9
  } else if (branchInteraction.type === 'harm') {
    return {
      multiplier: 0.9,
      transform: null
    }
  } else {
    return null
  }
}
