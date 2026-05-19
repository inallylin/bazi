import lunisolar from 'lunisolar'
import { getGrowthStage, getHiddenStems } from '@/utils/index.js'
import { BRANCHES, STEMS } from '@/static/index.js'
import { char8ex } from '@lunisolar/plugin-char8ex'
import type { Lunisolar } from 'lunisolar'
import type { BaziChart, Branch, GrowthStage, HiddenStems, Pillar, Stem } from '@/types.js'

// TODO: lunisolar only use for biulding pillars
lunisolar.extend(char8ex)

export class Bazi {
  private readonly datetime: Date
  private readonly lunarData: Lunisolar
  public readonly chart: BaziChart

  /**
   * @param datetime - ISO-8601 string (e.g. '1990-01-01 18:00') or a Date object.
   */
  constructor(datetime: string | Date) {
    this.datetime = new Date(datetime)
    this.lunarData = lunisolar(datetime)
    console.log(this.lunarData.char8ex(1))
    if (isNaN(this.datetime.getTime())) {
      throw new Error(`Invalid datetime: "${datetime}"`)
    }
    this.chart = this.buildChart()
  }

  // ─── Public accessors ──────────────────────────────────────────────────────

  /** Returns the hidden stems (藏干) for a given branch. */
  getHiddenStems(branch: Branch): HiddenStems {
    return getHiddenStems(branch)
  }

  /** Returns the growth stage (十二長生) of a stem placed in a branch. */
  getGrowthStage(stem: Stem, branch: Branch): GrowthStage {
    return getGrowthStage(stem, branch)
  }

  // ─── Chart construction ────────────────────────────────────────────────────


  private buildChart(): BaziChart {
    const c8 = this.lunarData.char8ex(1)
    c8.gods.day.toString
    return {
      year:  this.getYearPillar(),
      month: this.getMonthPillar(),
      day:   this.getDayPillar(),
      hour:  this.getHourPillar()
    }
  }

  /**
   * 年柱 Year Pillar
   * TODO: Add solar-term boundary correction (立春).
   */
  private getYearPillar(): Pillar {
    const year = this.datetime.getFullYear()
    // Year 4 is the cycle base: 甲子 (stem 0, branch 0)
    const stemIndex   = (year - 4) % 10
    const branchIndex = (year - 4) % 12
    return {
      stem:   STEMS[(stemIndex + 10) % 10]!,
      branch: BRANCHES[(branchIndex + 12) % 12]!
    }
  }

  /**
   * 月柱 Month Pillar
   * TODO: Implement full solar-term (節氣) boundary logic.
   */
  private getMonthPillar(): Pillar {
    const month = this.datetime.getMonth() // 0-based
    const yearStemIndex = STEMS.indexOf(this.getYearPillar().stem)
    // Month branch: 寅 (index 2) corresponds to lunar month 1
    const branchIndex = (month + 2) % 12
    // Month stem derived from year stem group (甲己年起丙寅)
    const stemBase = (yearStemIndex % 5) * 2
    const stemIndex = (stemBase + month) % 10
    return {
      stem:   STEMS[stemIndex]!,
      branch: BRANCHES[branchIndex]!
    }
  }

  /**
   * 日柱 Day Pillar
   * TODO: Implement accurate day pillar calculation using Julian Day Number.
   */
  private getDayPillar(): Pillar {
    // Placeholder: compute rough sexagenary day index from a known epoch
    const epoch = new Date('1900-01-01')
    const days = Math.floor((this.datetime.getTime() - epoch.getTime()) / 86_400_000)
    // Jan 1 1900 = 甲戌 (stem 0, branch 10 mapped from conventional tables)
    const stemIndex   = (days + 0) % 10
    const branchIndex = (days + 10) % 12
    return {
      stem:   STEMS[(stemIndex + 10) % 10]!,
      branch: BRANCHES[(branchIndex + 12) % 12]!
    }
  }

  /**
   * 時柱 Hour Pillar
   * TODO: Add timezone and local solar time correction.
   */
  private getHourPillar(): Pillar {
    const hour = this.datetime.getHours()
    // Each 時辰 spans 2 hours; 子時 (branch 0) starts at 23:00
    const branchIndex = Math.floor((hour + 1) / 2) % 12
    const dayStemIndex = STEMS.indexOf(this.getDayPillar().stem)
    // Hour stem: derived from day stem group (甲己日起甲子時)
    const stemBase = (dayStemIndex % 5) * 2
    const stemIndex = (stemBase + branchIndex) % 10
    return {
      stem:   STEMS[stemIndex]!,
      branch: BRANCHES[branchIndex]!
    }
  }
}
