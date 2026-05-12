import { describe, expect, it } from 'vitest'
import { Bazi } from '@/Bazi'

describe('Bazi constructor', () => {
  it('accepts an ISO string', () => {
    const bazi = new Bazi('1990-01-27 18:00')
    expect(bazi.chart).toBeDefined()
  })

  it('accepts a Date object', () => {
    const bazi = new Bazi(new Date('1990-01-27T18:00:00'))
    expect(bazi.chart).toBeDefined()
  })

  it('throws on an invalid date string', () => {
    expect(() => new Bazi('not-a-date')).toThrow('Invalid datetime')
  })
})

describe('Bazi.chart structure', () => {
  const bazi = new Bazi('1990-01-27 18:00')

  it('has four pillars', () => {
    expect(bazi.chart).toHaveProperty('year')
    expect(bazi.chart).toHaveProperty('month')
    expect(bazi.chart).toHaveProperty('day')
    expect(bazi.chart).toHaveProperty('hour')
  })

  it('each pillar has stem and branch', () => {
    for (const pillar of Object.values(bazi.chart)) {
      expect(pillar).toHaveProperty('stem')
      expect(pillar).toHaveProperty('branch')
      expect(typeof pillar.stem).toBe('string')
      expect(typeof pillar.branch).toBe('string')
    }
  })
})

describe('Bazi instance methods', () => {
  const bazi = new Bazi('1990-01-27 18:00')

  it('getHiddenStems delegates to util', () => {
    expect(bazi.getHiddenStems('子')).toEqual({ 癸: 1 })
  })

  it('getGrowthStage delegates to util', () => {
    expect(bazi.getGrowthStage('甲', '亥')).toBe('長生')
  })
})
