import lunisolar from 'lunisolar'
// import { getGrowthStage, getHiddenStems } from '@/utils/index.js'
// import { BRANCHES, STEMS } from '@/static/index.js'
import { char8ex } from '@lunisolar/plugin-char8ex'
import type { Lunisolar } from 'lunisolar'
import type { BaziChart, Branch, BranchIndex, GrowthStage, HiddenStems, Pillar, Stem, StemIndex } from '@/types'
import { getSolarTermDate } from './utils/solarTerms'
// import { createPillar } from './utils/pillar'

// TODO: lunisolar only use for biulding pillars
lunisolar.extend(char8ex)


export class Bazi {
  private readonly birthday: Date
  private readonly lunisolarDate: Lunisolar
  private readonly gender: 0 | 1
  // public readonly chart: BaziChart
  private readonly pillarNumbers: number[] = []

  /**
   * @param datetime - ISO-8601 string (e.g. '1990-01-01 18:00') or a Date object.
   */
  constructor(datetime: string | Date, params?: {
    gender?: 0 | 1 // 0 for female, 1 for male
  }) {
    this.birthday = new Date(datetime)
    this.lunisolarDate = lunisolar(datetime)
    this.gender = params?.gender ?? 1 // Default to male
    if (isNaN(this.birthday.getTime())) {
      throw new Error(`Invalid birthday: "${datetime}"`)
    }
    this.pillarNumbers = [
      this.getYearPillarNumber(),
      // this.getMonthPillarNumber(),
      // this.getDayPillarNumber(),
      // this.getHourPillarNumber()
    ]
    console.log(this.pillarNumbers)
    // this.chart = this.buildChart()
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


  // private buildChart(): BaziChart {
  //   const c8 = this.lunisolarDate.char8ex(1)
  //   c8.gods.day.toString
  //   return {
  //     year:  this.getYearPillar(),
  //     month: this.getMonthPillar(),
  //     day:   this.getDayPillar(),
  //     hour:  this.getHourPillar()
  //   }
  // }

  // TODO: move to solarTerm utils
  private getSolarTermCorrection(params: {
    date: Date
    target: 'year' | 'month'
  }): number {
    if (params.target === 'year')  
      // Adjust for 立春 (approx Feb 4): before that date, use previous year
      // const springHead = getSolarTermDate('start_spring', this.birthday.getFullYear())
      const springHead = getSolarTermDate(1, params.date.getFullYear())
      return params.date < springHead ? -1 : 0
    } else {
      // For month pillar, the solar term boundary is more complex and depends on the month and year
      // This is a simplified version that checks the "beginning of month" solar term for the given month
      const month = params.date.getMonth()
      const termDate = getSolarTermDate(month, params.date.getFullYear())
      return params.date < termDate ? -1 : 0
    }
  }


  private getYearPillarNumber(): number {
    const solarTermCorrection = this.getSolarTermCorrection({ date: this.birthday, target: 'year' }) 
    // Year 4 is the cycle base: 甲子 (stem 0, branch 0)
    const circleBase = 4
    const yearBase = this.birthday.getFullYear() - circleBase - solarTermCorrection
    const stemIndex   = yearBase % 10
    const branchIndex = yearBase % 12
    return stemIndex * 10 + branchIndex
  }


  private getMonthPillarNumber(): number {
    const solarTermCorrection = this.getSolarTermCorrection({ date: this.birthday, target: 'month' }) 
    const monthIndex = this.birthday.getMonth() + solarTermCorrection // 0-based month index with solar term correction
    const yearStemIndex = Math.floor(this.getYearPillarNumber() / 10)
    // Month branch: 寅 (index 2) corresponds to lunar month 1
    const branchIndex = (monthIndex + 2) % 12
    // Month stem derived from year stem group (甲己年起丙寅)
    // 甲己之年丙作首 [0, 5] → 2
    // 乙庚之年戊為頭 [1, 6] → 4
    // 丙辛之歲尋庚上 [2, 7] → 6
    // 丁壬壬寅順水流 [3, 8] → 8
    // 若問戊癸何方發, 甲寅之上好追求 [4, 9] → 0 (10%10 = 0)
    const stemHead = (yearStemIndex % 5) * 2
    const stemIndex = (stemHead + monthIndex) % 10
    return stemIndex * 10 + branchIndex
  }

  /**
   * 年柱 Year Pillar
   * TODO: Add solar-term boundary correction (立春).
   */
  // private getYearPillar(): PillarNumber {
  //   const y = this.datetime.getFullYear()
  //   const yearStemIndex = ((y - 4) % 10 + 10) % 10
  //   const yearBranchIndex = ((y - 4) % 12 + 12) % 12
  //   const yearPillar = createPillar(yearStemIndex, yearBranchIndex)
  //   const year = this.datetime.getFullYear()
  //   // Year 4 is the cycle base: 甲子 (stem 0, branch 0)
  //   const stemIndex   = (year - 4) % 10
  //   const branchIndex = (year - 4) % 12
  //   return {
  //     stem:   STEMS[(stemIndex + 10) % 10]!,
  //     branch: BRANCHES[(branchIndex + 12) % 12]!
  //   }
  // }

  /**
   * 月柱 Month Pillar
   * TODO: Implement full solar-term (節氣) boundary logic.
   */
  private getMonthPillar(): PillarNumber {
    // const month = this.datetime.getMonth() // 0-based
    // const yearStemIndex = STEMS.indexOf(this.getYearPillar().stem)
    // // Month branch: 寅 (index 2) corresponds to lunar month 1
    // const branchIndex = (month + 2) % 12
    // // Month stem derived from year stem group (甲己年起丙寅)
    // const stemBase = (yearStemIndex % 5) * 2
    // const stemIndex = (stemBase + month) % 10
    // return {
    //   stem:   STEMS[stemIndex]!,
    //   branch: BRANCHES[branchIndex]!
    // }
  }

  /**
   * 日柱 Day Pillar
   * TODO: Implement accurate day pillar calculation using Julian Day Number.
   */
  private getDayPillar(): PillarNumber {
    // // Placeholder: compute rough sexagenary day index from a known epoch
    // const epoch = new Date('1900-01-01')
    // const days = Math.floor((this.datetime.getTime() - epoch.getTime()) / 86_400_000)
    // // Jan 1 1900 = 甲戌 (stem 0, branch 10 mapped from conventional tables)
    // const stemIndex   = (days + 0) % 10
    // const branchIndex = (days + 10) % 12
    // return {
    //   stem:   STEMS[(stemIndex + 10) % 10]!,
    //   branch: BRANCHES[(branchIndex + 12) % 12]!
    // }
  }

  /**
   * 時柱 Hour Pillar
   * TODO: Add timezone and local solar time correction.
   */
  private getHourPillar(): PillarNumber {
    // const hour = this.datetime.getHours()
    // // Each 時辰 spans 2 hours; 子時 (branch 0) starts at 23:00
    // const branchIndex = Math.floor((hour + 1) / 2) % 12
    // const dayStemIndex = STEMS.indexOf(this.getDayPillar().stem)
    // // Hour stem: derived from day stem group (甲己日起甲子時)
    // const stemBase = (dayStemIndex % 5) * 2
    // const stemIndex = (stemBase + branchIndex) % 10
    // return {
    //   stem:   STEMS[stemIndex]!,
    //   branch: BRANCHES[branchIndex]!
    // }
  }
}
