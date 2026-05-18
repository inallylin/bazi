import type { Branch, Stem } from '@/types'
import type { StemDetail, BranchDetail } from '@/utils/pillar'

type InteractionType =
  'orientation' | // 三會: 春木夏火秋金冬水，一方的三個地支同時出現, 2 缺一不可
  'season' | // 三合: 長生+地旺+墓庫, 全合1.8半合1.25(等流年大運生效)
  'merge' | // 合 1.4
  'clash' | // 沖 0.5
  'punish' | // 刑 0.8 合絆=0.8 但作用不太一樣
  'harm' | // 害 0.9 妒合=0.9 但作用不太一樣
  'break' // 破 0.95

type Felement = 'wood' | 'fire' | 'earth' | 'metal' | 'water'

// 'stem'類型專門用於天干的合化關係
export type Interaction<T extends 'stem' | 'branch' = 'branch'> = {
  title: string
  type: InteractionType | 'stem'
  memberMap: Partial<Record<T extends 'stem' ? Stem : Branch, (T extends 'stem' ? StemDetail : BranchDetail)[]>> // 參與這個關係的地支，null表示缺失
  transform: Felement | null // 如果這個關係會產生質變
}

type Calculation = {
  multiplier: number // 關係產生的計算係數（例如1.8、0.75等）
  transform: Felement | null // 關係導致的質變（例如三會導致的五行轉化）
}

type InteractionTemplate<T extends InteractionType | 'stem' = InteractionType> = {
  title: string
  description: string
  type: T
  members: T extends 'stem' ? Stem[] : Branch[]
  transform: Felement | null
}

const getStemInteractionList = (): InteractionTemplate<'stem'>[] => {
  return [
    {
      title: '甲己合化土',
      description: '中正之合。甲屬陽木，己屬陰土，中正平和。',
      type: 'stem',
      members: ['甲', '己'],
      transform: 'earth'
    },
    {
      title: '乙庚合化金',
      description: '仁義之合。乙屬陰木，庚屬陽金，剛柔相濟。',
      type: 'stem',
      members: ['乙', '庚'],
      transform: 'metal'
    },
    {
      title: '丙辛合化水',
      description: '威制之合。丙屬陽火，辛屬陰金，嚴肅內斂。',
      type: 'stem',
      members: ['丙', '辛'],
      transform: 'water'
    },
    {
      title: '丁壬合化木',
      description: '仁壽之合。丁屬陰火，壬屬陽水，恩怨分明。',
      type: 'stem',
      members: ['丁', '壬'],
      transform: 'wood'
    },
    {
      title: '戊癸合化火',
      description: '無情之合。戊屬陽土，癸屬陰水，老少相配。',
      type: 'stem',
      members: ['戊', '癸'],
      transform: 'fire'
    }
  ]
}

const getBranchInteractionList = (): InteractionTemplate[] => {
  return [
    {
      title: '寅卯辰三會東方木',
      description: '',
      type: 'orientation',
      members: ['寅', '卯', '辰'],
      transform: 'wood'
    }, {
      title: '巳午未三會南方火',
      description: '',
      type: 'orientation',
      members: ['巳', '午', '未'],
      transform: 'fire'
    },
    {
      title: '申酉戌三會西方金',
      description: '',
      type: 'orientation',
      members: ['申', '酉', '戌'],
      transform: 'metal'
    },
    {
      title: '亥子丑三會北方水',
      description: '',
      type: 'orientation',
      members: ['亥', '子', '丑'],
      transform: 'water'
    },
    {
      title: '亥卯未合木',
      description: '',
      type: 'season',
      members: ['亥', '卯', '未'],
      transform: 'wood'
    },
    {
      title: '寅午戌合火',
      description: '',
      type: 'season',
      members: ['寅', '午', '戌'],
      transform: 'fire'
    },
    {
      title: '巳酉丑合金',
      description: '',
      type: 'season',
      members: ['巳', '酉', '丑'],
      transform: 'metal'
    },
    {
      title: '申子辰合水',
      description: '',
      type: 'season',
      members: ['申', '子', '辰'],
      transform: 'water'
    },
    {
      title: '子丑合土',
      description: '',
      type: 'merge',
      members: ['子', '丑'],
      transform: 'earth'
    },
    {
      title: '寅亥合木',
      description: '',
      type: 'merge',
      members: ['寅', '亥'],
      transform: 'wood'
    },
    {
      title: '卯戌合火',
      description: '',
      type: 'merge',
      members: ['卯', '戌'],
      transform: 'fire'
    }, {
      title: '辰酉合金',
      description: '',
      type: 'merge',
      members: ['辰', '酉'],
      transform: 'metal'
    },
    {
      title: '巳申合水',
      description: '',
      type: 'merge',
      members: ['巳', '申'],
      transform: 'water'
    },
    {
      title: '午未合火',
      description: '',
      type: 'merge',
      members: ['午', '未'],
      transform: 'fire'
    },
    {
      title: '子午沖',
      description: '',
      type: 'clash',
      members: ['子', '午'],
      transform: null
    },
    {
      title: '丑未沖',
      description: '',
      type: 'clash',
      members: ['丑', '未'],
      transform: null
    },
    {
      title: '寅申沖',
      description: '',
      type: 'clash',
      members: ['寅', '申'],
      transform: null
    },
    {
      title: '卯酉沖',
      description: '',
      type: 'clash',
      members: ['卯', '酉'],
      transform: null
    },
    {
      title: '辰戌沖',
      description: '',
      type: 'clash',
      members: ['辰', '戌'],
      transform: null
    },
    {
      title: '巳亥沖',
      description: '',
      type: 'clash',
      members: ['巳', '亥'],
      transform: null
    },
    {
      title: '子未害',
      description: '',
      type: 'harm',
      members: ['子', '未'],
      transform: null
    },
    {
      title: '丑午害',
      description: '',
      type: 'harm',
      members: ['丑', '午'],
      transform: null
    },
    {
      title: '寅巳害',
      description: '',
      type: 'harm',
      members: ['寅', '巳'],
      transform: null
    },
    {
      title: '卯辰害',
      description: '',
      type: 'harm',
      members: ['卯', '辰'],
      transform: null
    },
    {
      title: '申亥害',
      description: '',
      type: 'harm',
      members: ['申', '亥'],
      transform: null
    },
    { title: '酉戌害',
      description: '',
      type: 'harm',
      members: ['酉', '戌'],
      transform: null
    },
    {
      title: '子酉破',
      description: '',
      type: 'break',
      members: ['子', '酉'],
      transform: null
    },
    {
      title: '寅亥破',
      description: '',
      type: 'break',
      members: ['寅', '亥'],
      transform: null
    },
    {
      title: '辰丑破',
      description: '',
      type: 'break',
      members: ['辰', '丑'],
      transform: null
    },
    {
      title: '午卯破',
      description: '',
      type: 'break',
      members: ['午', '卯'],
      transform: null
    },
    {
      title: '申巳破',
      description: '',
      type: 'break',
      members: ['申', '巳'],
      transform: null
    },
    {
      title: '戌未破',
      description: '',
      type: 'break',
      members: ['戌', '未'],
      transform: null
    },
    {
      title: '寅巳申刑',
      description: '恃勢之刑',
      type: 'punish',
      members: ['寅', '巳', '申'],
      transform: null
    },
    { title: '丑戌未刑',
      description: '無恩之刑',
      type: 'punish',
      members: ['丑', '戌', '未'],
      transform: null
    },
    {
      title: '子卯刑',
      description: '無禮之刑',
      type: 'punish',
      members: ['子', '卯'],
      transform: null
    },
    {
      title: '辰辰自刑',
      description: '',
      type: 'punish',
      members: ['辰'],
      transform: null
    },
    {
      title: '午午自刑',
      description: '',
      type: 'punish',
      members: ['午'],
      transform: null
    },
    {
      title: '酉酉自刑',
      description: '',
      type: 'punish',
      members: ['酉'],
      transform: null
    },
    {
      title: '亥亥自刑',
      description: '',
      type: 'punish',
      members: ['亥'],
      transform: null
    }
  ]
}

export const getStemInteractions = (stem: Stem): Interaction<'stem'>[] => {
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

export const getBranchInsteractions = (branch: Branch): Interaction<'branch'>[] => {
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
