import lunisolar from 'lunisolar'
// import { getGrowthStage, getHiddenStems } from '@/utils/index.js'
// import { BRANCHES, STEMS } from '@/static/index.js'
import { char8ex } from '@lunisolar/plugin-char8ex'
import type { Lunisolar } from 'lunisolar'
import type { BaziChart, Branch, BranchIndex, GrowthStage, HiddenStems, Pillar, Stem, StemIndex } from '@/types'
import { getSolarTermDate } from './utils/solarTerms';
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


  private getYearPillarNumber(): number {
    // Adjust for 立春 (approx Feb 4): before that date, use previous year
    const springHead = getSolarTermDate('start_spring', this.birthday.getFullYear())
    // Year 4 is the cycle base: 甲子 (stem 0, branch 0)
    const circleBase = 4
    const yearBase = this.birthday.getFullYear() - circleBase - (springHead < this.birthday ? 1 : 0)
    const stemIndex   = yearBase % 10
    const branchIndex = yearBase % 12
    return stemIndex * 10 + branchIndex
  }


  private getMonthPillarNumber(): number {
    // 甲己之年丙作首 [0, 5] → 2
    // 乙庚之年戊為頭 [1, 6] → 4
    // 丙辛之歲尋庚上 [2, 7] → 6
    // 丁壬壬寅順水流 [3, 8] → 8
    // 若問戊癸何方發, 甲寅之上好追求 [4, 9] → 0

    // ── Approximate Solar Term Start Days ──────────���─────────────────────────────
    // For each Gregorian month: day when the "beginning of month" solar term starts
    const TERM_DAY: Record<number, number> = {
      1: 5, 2: 4, 3: 6, 4: 5, 5: 6, 6: 6,
      7: 7, 8: 7, 9: 8, 10: 8, 11: 7, 12: 7
    }

    // Returns 0-based month index in the BaZi cycle: 0=寅(Feb), 1=卯(Mar)...11=丑(Jan)
    const baziMonthIndex = (month: number, day: number): number => {
      const td = TERM_DAY[month]!
      if (month === 1) {
        return day >= td ? 11 : 10; // 丑 or 子
      }
      const base = month - 2; // Feb=0, Mar=1 … Dec=10
      return day >= td ? base : Math.max(0, base - 1);
    }

    // const mIdx    = baziMonthIndex(birthMonth, birthDay);       // 0=寅
    // const monthBI = (mIdx + 2) % 12;                            // 寅=2, 卯=3 …
    // // Month stem base depends on year stem group (甲/己, 乙/庚, 丙/辛, 丁/壬, 戊/癸)
    // const MONTH_STEM_BASES = [2, 4, 6, 8, 0] // 丙 戊 庚 壬 甲
    // const monthSI = (MONTH_STEM_BASES[yearSI % 5] + mIdx) % 10;
    // const monthPillar = makePillar('月', monthSI, monthBI);
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
