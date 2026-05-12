import { describe, expect, it } from 'vitest'
import {
  getBranchElement,
  getBranchIndex,
  getBranchPolarity,
  getGrowthStage,
  getHiddenStems,
  getStemElement,
  getStemIndex,
  getStemPolarity
} from '@/utils/index'

describe('getHiddenStems', () => {
  it('子 contains only 癸 at 1', () => {
    expect(getHiddenStems('子')).toEqual({ 癸: 1 })
  })

  it('丑 contains 己, 癸, 辛', () => {
    const result = getHiddenStems('丑')
    expect(result['己']).toBe(0.6)
    expect(result['癸']).toBe(0.3)
    expect(result['辛']).toBe(0.1)
  })

  it('strengths sum to 1', () => {
    const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const
    for (const branch of branches) {
      const stems = getHiddenStems(branch)
      const total = Object.values(stems).reduce((a, b) => a + b, 0)
      expect(total).toBeCloseTo(1)
    }
  })
})

describe('getGrowthStage', () => {
  it('甲 in 亥 is 長生', () => {
    expect(getGrowthStage('甲', '亥')).toBe('長生')
  })

  it('甲 in 卯 is 帝旺', () => {
    expect(getGrowthStage('甲', '卯')).toBe('帝旺')
  })

  it('庚 in 酉 is 帝旺', () => {
    expect(getGrowthStage('庚', '酉')).toBe('帝旺')
  })

  it('壬 in 子 is 帝旺', () => {
    expect(getGrowthStage('壬', '子')).toBe('帝旺')
  })
})

describe('getStemElement', () => {
  it('甲 is 木', () => expect(getStemElement('甲')).toBe('木'))
  it('丙 is 火', () => expect(getStemElement('丙')).toBe('火'))
  it('戊 is 土', () => expect(getStemElement('戊')).toBe('土'))
  it('庚 is 金', () => expect(getStemElement('庚')).toBe('金'))
  it('壬 is 水', () => expect(getStemElement('壬')).toBe('水'))
})

describe('getBranchElement', () => {
  it('子 is 水', () => expect(getBranchElement('子')).toBe('水'))
  it('午 is 火', () => expect(getBranchElement('午')).toBe('火'))
  it('辰 is 土', () => expect(getBranchElement('辰')).toBe('土'))
})

describe('polarity', () => {
  it('甲 is 陽', () => expect(getStemPolarity('甲')).toBe('陽'))
  it('乙 is 陰', () => expect(getStemPolarity('乙')).toBe('陰'))
  it('子 is 陽', () => expect(getBranchPolarity('子')).toBe('陽'))
  it('丑 is 陰', () => expect(getBranchPolarity('丑')).toBe('陰'))
})

describe('index helpers', () => {
  it('getStemIndex 甲 is 0', () => expect(getStemIndex('甲')).toBe(0))
  it('getStemIndex 癸 is 9', () => expect(getStemIndex('癸')).toBe(9))
  it('getBranchIndex 子 is 0', () => expect(getBranchIndex('子')).toBe(0))
  it('getBranchIndex 亥 is 11', () => expect(getBranchIndex('亥')).toBe(11))
})
