import { Stem } from "@/types"

type Interaction = {
    
}

type ScoreCalculation = {
    interaction: Interaction
    formula: (_n: number) => number
    sort: number
}

type Score = {
    base: number
    calculations: ScoreCalculation[]
    final: number
}

type StemDetail = {
    id: number
    name: Stem
    felement: string
    polarity: 1 | 0
    score: Score
}

type BranchDetail = {}

type Pillar = {
    stem: StemDetail
    branch: BranchDetail
    interaction: Interaction
}


export const createPillar = () => {
// const pi = {
//   stem: {
//     id: 1,
//     name: '甲',
//     element: '木',
//     polarity: '陽',
//     score: {
//       base: 1,
//       calculations: [],
//       final: 1
//     },
//     roots: [{
//       branch: {},
//       distance: 0,
//       stage: '墓' // 這裡指的是對這個天干的十二長生狀態
//     }]
//   },
//   branch: {
//     id: 10,
//     name: '酉',
//     hiddenStems: [{
//       id: 8,
//       stem: '辛',
//       element: '木',
//       polarity: '陰',
//       score: {
//         base: 24,
//         calculations: [],
//         final: 1
//       }
//     }],
//     stage: '墓' // 這裡指的是對日主的十二長生狀態
//   },
//   interaction: {} // 蓋頭/截腳給自己的天干或地支產生一個calculation
// }
}