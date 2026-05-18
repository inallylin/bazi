import type { Branch } from '@/types'

// 三會, 缺一不可
export const getInteractions = (_branch: Branch) => {}

type InteractionType = 
  'orientation' | // 三會: 春木夏火秋金冬水，一方的三個地支同時出現, 2 缺一不可
  'season' | // 三合: 長生+地旺+墓庫, 全合1.8半合1.25(等流年大運生效)
  'merge' | // 合 1.4
  'clash' | // 沖 0.5
  'punish' | // 刑 0.8 合絆=0.8 但作用不太一樣
  'harm' | // 害 0.9 妒合=0.9 但作用不太一樣
  'break' // 破 0.95

type Felement = 'wood' | 'fire' | 'earth' | 'metal' | 'water'

type Calculation = {
  interaction: BranchInteraction
  multiplier: number // 關係產生的計算係數（例如1.8、0.75等）
  transform: Felement | null // 關係導致的質變（例如三會導致的五行轉化）
}

type BranchDetail = {
  calculation: Calculation
}

type StemInteraction = {
  
}

type BranchInteraction = {
  title: string
  type: InteractionType
  memberMap: Partial<Record<Branch, BranchDetail | null>> // 參與這個關係的地支，null表示缺失
  transform: Felement | null // 如果這個關係會產生質變
  outsiders: BranchDetail[] // 不參與這個關係但會受到影響的地支（例如妒合的地支），量變 * 0.9
}

type BranchInteractionTemplate = {
  title: string
  type: InteractionType
  members: Branch[]
  transform: Felement | null
}

const getBranchInteractionList = (): BranchInteractionTemplate[] => {
  return [
    {
      title: '寅卯辰三會東方木',
      type: 'orientation',
      members: ['寅', '卯', '辰'],
      transform: 'wood'
    }, {
      title: '巳午未三會南方火',
      type: 'orientation',
      members: ['巳', '午', '未'],
      transform: 'fire'
    },
    {
      title: '申酉戌三會西方金',
      type: 'orientation',
      members: ['申', '酉', '戌'],
      transform: 'metal'
    },
    {
      title: '亥子丑三會北方水',
      type: 'orientation',
      members: ['亥', '子', '丑'],
      transform: 'water'
    },
    {
      title: '亥卯未合木',
      type: 'season',
      members: ['亥', '卯', '未'],
      transform: 'wood'
    },
    {
      title: '寅午戌合火',
      type: 'season',
      members: ['寅', '午', '戌'],
      transform: 'fire'
    },
    {
      title: '巳酉丑合金',
      type: 'season',
      members: ['巳', '酉', '丑'],
      transform: 'metal'
    },
    {
      title: '申子辰合水',
      type: 'season',
      members: ['申', '子', '辰'],
      transform: 'water'
    },
    {
      title: '子丑合土',
      type: 'merge',
      members: ['子', '丑'],
      transform: 'earth'
    },
    {
      title: '寅亥合木',
      type: 'merge',
      members: ['寅', '亥'],
      transform: 'wood'
    },
    {
      title: '卯戌合火',
      type: 'merge',
      members: ['卯', '戌'],
      transform: 'fire'
    }, {
      title: '辰酉合金',
      type: 'merge',
      members: ['辰', '酉'],
      transform: 'metal'
    },
    {
      title: '巳申合水',
      type: 'merge',
      members: ['巳', '申'],
      transform: 'water'
    },
    {
      title: '午未合火',
      type: 'merge',
      members: ['午', '未'],
      transform: 'fire'
    },
    {
      title: '子午沖',
      type: 'clash',
      members: ['子', '午'],
      transform: null
    },
    {
      title: '丑未沖',
      type: 'clash',
      members: ['丑', '未'],
      transform: null
    },
    {
      title: '寅申沖',
      type: 'clash',
      members: ['寅', '申'],
      transform: null
    },
    {
      title: '卯酉沖',
      type: 'clash',
      members: ['卯', '酉'],
      transform: null
    },
    {
      title: '辰戌沖',
      type: 'clash',
      members: ['辰', '戌'],
      transform: null
    },
    {
      title: '巳亥沖',
      type: 'clash',
      members: ['巳', '亥'],
      transform: null 
    },
    {
      title: '子未害',
      type: 'harm',
      members: ['子', '未'],
      transform: null
    },
    {
      title: '丑午害',
      type: 'harm',
      members: ['丑', '午'],
      transform: null
    },
    {
      title: '寅巳害',
      type: 'harm',
      members: ['寅', '巳'],
      transform: null
    },
    {
      title: '卯辰害',
      type: 'harm',
      members: ['卯', '辰'],
      transform: null
    },
    {
      title: '申亥害',
      type: 'harm',
      members: ['申', '亥'],
      transform: null
    },
    { title: '酉戌害',
      type: 'harm',
      members: ['酉', '戌'],
      transform: null
    },
    {
      title: '子酉破',
      type: 'break',
      members: ['子', '酉'],
      transform: null
    },
    {
      title: '寅亥破',
      type: 'break',
      members: ['寅', '亥'],
      transform: null
    },
    {
      title: '辰丑破',
      type: 'break',
      members: ['辰', '丑'],
      transform: null
    },
    {
      title: '午卯破',
      type: 'break',
      members: ['午', '卯'],
      transform: null
    },
    {
      title: '申巳破',
      type: 'break',
      members: ['申', '巳'],
      transform: null
    },
    {
      title: '戌未破',
      type: 'break',
      members: ['戌', '未'],
      transform: null
    },
    {
      title: '寅巳申刑',
      type: 'punish',
      members: ['寅', '巳', '申'],
      transform: null
    },
    { title: '丑戌未刑',
      type: 'punish',
      members: ['丑', '戌', '未'],
      transform: null
    },
    {
      title: '子卯刑',
      type: 'punish',
      members: ['子', '卯'],
      transform: null
    },
    {
      title: '自刑',
      type: 'punish',
      members: ['辰', '午', '酉', '亥'],
      transform: null
    }
  ]
}

const getBranchInsteractions = (branch: Branch): BranchInteraction[] => {
  const allInteractions = getBranchInteractionList()
  return allInteractions
    .filter(interaction => interaction.members.includes(branch))
    .map(interaction => {
      const memberMap = Object.fromEntries(
        interaction.members.map(member => [member, null])
      ) as Partial<Record<Branch, BranchDetail | null>>
      return {
        title: interaction.title,
        type: interaction.type,
        memberMap,
        transform: interaction.transform,
        outsiders: []
      }
    })
}

const setInteractionMultiplier = (branchInteraction: BranchInteraction) => {
  const emptyCount = Object.values(branchInteraction.memberMap).filter(v => !v).length
  // 三會: 春木夏火秋金冬水，一方的三個地支同時出現, 缺一不可, x2
  if (branchInteraction.type === 'orientation') {
    if (emptyCount === 0) {
      return (_n: number) => _n * 1.8
    } else {
      return null
    }
    // 三合: 長生+地旺+墓庫, 全合1.8半合1.25(等流年大運生效)
  } else if (branchInteraction.type === 'season') {
    if (emptyCount === 0) {
      return (_n: number) => _n * 1.8
    } else if (emptyCount === 1) {
      return (_n: number) => _n * 1.25
    } else {
      return null
    }
    // 合 1.4
  } else if (branchInteraction.type === 'merge') {
    if (!emptyCount) {
      return (_n: number) => _n * 1.4
    } else {
      return null
    }
    // 沖 0.5
  } else if (branchInteraction.type === 'clash') {
    if (!emptyCount) {
      return (_n: number) => _n * 0.5
    } else {
      return null
    }
    // 刑 0.8 合絆=0.8 但作用不太一樣
  } else if (branchInteraction.type === 'punish') {
    if (!emptyCount) {
      return (_n: number) => _n * 0.8
    } else {
      return null
    }
    // 害 0.9 妒合=0.9 但作用不太一樣
  } else if (branchInteraction.type === 'harm') {
    if (!emptyCount) {
      return (_n: number) => _n * 0.9
    } else {
      return null
    }
}

// 子丑寅卯 辰巳午未 申酉戌亥



// 子丑寅卯 辰巳午未 申酉戌亥

// - 六沖的組合
//     - 子午沖（北水 沖 南火）1,7
//     - 丑未沖（濕土 沖 燥土）2,8
//     - 寅申沖（東木 沖 西金）3,9
//     - 卯酉沖（東木 沖 西金）4,10
//     - 辰戌沖（水庫 沖 火庫）5,11
//     - 巳亥沖（南火 沖 北水）6,12
// 害：代表多疑、善變不一致
// - 子未 1,8
// - 丑午 2,7
// - 寅巳 3,6
// - 卯辰 4,5
// - 申亥 9,12
// - 酉戌 10,11
// #### 破
// 破：代表好勝、嫉妒心胸狹隘
// - 子酉 1,10
// - 寅亥 3,12
// - 辰丑 5,2
// - 午卯 7,4
// - 申巳 9,6
// - 戌未 11,8
// #### 相刑	內耗/不穩	0.8 ~ 0.9
// 刑：代表霸道、專制不妥協
// - 寅巳申（無恩之刑）3,6,9
// - 丑戌未（持勢之刑）2,8,11
// - 子卯（無禮之刑） 1,4
// - 辰午酉亥（自刑）5,7,10,12