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


type BranchInteraction = {
  title: string
  type: InteractionType
  members: Partial<Record<Branch, BranchDetail | null>> // 參與這個關係的地支，null表示缺失
  transform: Felement | null // 如果這個關係會產生質變
  outsideBranches: Branch[] // 不參與這個關係但會受到影響的地支（例如妒合的地支），量變 * 0.9
}

// const setInteractionMultiplier = (branchInteraction: BranchInteraction) => {
//   if (branchInteraction.type === 'orientation') {}
// }

// 子丑寅卯 辰巳午未 申酉戌亥
// TODO: 抽 JSON(or純靜態Fn)+Utils
// const interactionTemplates: BranchInteraction[] = [
//   // 三會: 缺一不可
//   // - 寅卯辰三會東方木
//   // - 巳午未三會南方火
//   // - 申酉戌三會西方金
//   // - 亥子丑三會北方水
//   {
//     title: '寅卯辰三會東方木',
//     type: 'orientation',
//     members: {
//       寅: null,
//       卯: null,
//       辰: null
//     },
//     transform: 'wood',
//     outsideBranches: []
//   },
//   {
//     title: '巳午未三會南方火',
//     type: 'orientation',
//     members: {
//       巳: null,
//       午: null,
//       未: null
//     },
//     transform: 'fire',
//     outsideBranches: []
//   },
//   {
//     title: '申酉戌三會西方金',
//     type: 'orientation',
//     members: {
//       申: null,
//       酉: null,
//       戌: null
//     },
//     transform: 'metal',
//     outsideBranches: []
//   },
//   {
//     title: '亥子丑三會北方水',
//     type: 'orientation',
//     members: {
//       亥: null,
//       子: null,
//       丑: null
//     },
//     transform: 'water',
//     outsideBranches: []
//   },
//   // 三合: 全合 1.8 半合 1.25(等流年大運生效)
//   {
//     title: '亥卯未合木',
//     type: 'season',
//     members: {
//       亥: null,
//       卯: null,
//       未: null
//     },
//     transform: 'wood',
//     outsideBranches: []
//   },
//   {
//     title: '寅午戌合火',
//     type: 'season',
//     members: {
//       寅: null,
//       午: null,
//       戌: null
//     },
//     transform: 'fire',
//     outsideBranches: []
//   },
//   {
//     title: '巳酉丑合金',
//     type: 'season',
//     members: {
//       巳: null,
//       酉: null,
//       丑: null
//     },
//     transform: 'metal',
//     outsideBranches: []
//   },
//   {
//     title: '申子辰合水',
//     type: 'season',
//     members: {
//       申: null,
//       子: null,
//       辰: null
//     },
//     transform: 'water',
//     outsideBranches: []
//   },
//   // 合: 六合 1.4
//   {
//     title: '子丑合土',
//     type: 'merge',
//     members: {
//       子: null,
//       丑: null
//     },
//     transform: 'earth',
//     outsideBranches: []
//   },
//   {
//     title: '寅亥合木',
//     type: 'merge',
//     members: {
//       寅: null,
//       亥: null
//     },
//     transform: 'wood',
//     outsideBranches: []
//   },
//   {
//     title: '卯戌合火',
//     type: 'merge',
//     members: {
//       卯: null,
//       戌: null
//     },
//     transform: 'fire',
//     outsideBranches: []
//   },{
//     title: '辰酉合金',
//     type: 'merge',
//     members: {
//       辰: null,
//       酉: null
//     },
//     transform: 'metal',
//     outsideBranches: []
//   },
//   {
//     title: '巳申合水',
//     type: 'merge',
//     members: {
//       巳: null,
//       申: null
//     },
//     transform: 'water',
//     outsideBranches: []
//   }, {
//     title: '午未合火',
//     type: 'merge',
//     members: {
//       午: null,
//       未: null
//     },
//     transform: 'fire',
//     outsideBranches: []
//   }
// ]


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