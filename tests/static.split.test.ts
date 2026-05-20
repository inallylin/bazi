import { describe, it, expect } from 'vitest'
import { getFelementList, getGrowthStageList, getNayinList } from '@/lib/static'

describe('static modules split', () => {
  it('felement list has 5 elements', () => {
    const list = getFelementList()
    expect(list).toHaveLength(5)
    expect(list[0]).toBe('wood')
  })

  it('growth stage list has 12 elements', () => {
    const list = getGrowthStageList()
    expect(list).toHaveLength(12)
    expect(list).toContain('birth')
  })

  it('nayin list has 30 entries', () => {
    const list = getNayinList()
    expect(list).toHaveLength(30)
    expect(list[0]).toBe('海中金')
  })
})
