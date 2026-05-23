import lunisolar from 'lunisolar'
import { char8ex } from '@lunisolar/plugin-char8ex'
import { getSolarTermCorrection } from '@/utils/solarTerms'
import { t } from '@/libs/translate'
import { getCycleIndex } from '@/utils/stemBranch'
import type { BaziChart, Pillar, StemIndex, BranchIndex } from '@/types'
import type { Lunisolar } from 'lunisolar'

// TODO: lunisolar only use for biulding pillars
lunisolar.extend(char8ex)

export class Bazi {
  private readonly birthday: Date
  private readonly lunisolarDate: Lunisolar
  private readonly gender: 0 | 1
  public readonly chart: null | BaziChart = null

  /**
   * @param datetime - ISO-8601 string (e.g. '1990-01-01 18:00') or a Date object.
   */
  constructor(datetime: string | Date, params?: {
    gender?: 0 | 1 // 0 for female, 1 for male
    locale?: 'en' | 'zh' // For future use in formatting outputs
  }) {
    this.birthday = new Date(datetime)
    this.lunisolarDate = lunisolar(datetime)
    this.gender = params?.gender ?? 1 // Default to male
    if (isNaN(this.birthday.getTime())) {
      throw new Error(`Invalid birthday: "${datetime}"`)
    }
    this.chart = this.buildChart()
  }

  // ─── Public accessors ──────────────────────────────────────────────────────

  // /** Returns the hidden stems (藏干) for a given branch. */
  // getHiddenStems(branch: Branch): HiddenStems {
  //   return getHiddenStems(branch)
  // }

  // /** Returns the growth stage (十二長生) of a stem placed in a branch. */
  // getGrowthStage(stem: Stem, branch: Branch): GrowthStage {
  //   return getGrowthStage(stem, branch)
  // }

  // ─── Chart construction ────────────────────────────────────────────────────

  private buildChart(): BaziChart {
    const year = this.buildYearPillar()
    const month = this.buildMonthPillar(year.stemIndex)
    const day = this.buildDayPillar()
    const hour = this.buildHourPillar(day.stemIndex)
    return {
      year,
      month,
      day,
      hour
    }
  }

  private createPillar(stemIndex: StemIndex, branchIndex: BranchIndex): Pillar {
    return {
      index: getCycleIndex(stemIndex, branchIndex),
      stemIndex,
      branchIndex,
      stem: t(`stem.${stemIndex}`),
      branch: t(`branch.${branchIndex}`)
    }
  }


  private buildYearPillar(): Pillar {
    const solarTermCorrection = getSolarTermCorrection({ date: this.birthday, target: 'year' })
    // Year 4 is the cycle base: 甲子 (stem 0, branch 0)
    const circleBase = 4
    const yearBase = this.birthday.getFullYear() - circleBase + solarTermCorrection
    const stemIndex   = yearBase % 10 as StemIndex
    const branchIndex = yearBase % 12 as BranchIndex
    return this.createPillar(stemIndex, branchIndex)
  }

  private getBranchStemHead(stemIndex: StemIndex): StemIndex {
    // Month stem derived from year stem group (甲己年起丙寅)
    // 甲己之年丙作首 [0, 5] → 2
    // 乙庚之年戊為頭 [1, 6] → 4
    // 丙辛之歲尋庚上 [2, 7] → 6
    // 丁壬壬寅順水流 [3, 8] → 8
    // 若問戊癸何方發, 甲寅之上好追求 [4, 9] → 0
    return ((stemIndex + 1) % 5) * 2 as StemIndex
  }

  private buildMonthPillar(yearStemIndex: StemIndex): Pillar {
    const solarTermCorrection = getSolarTermCorrection({ date: this.birthday, target: 'month' })
    // 0-based month index with solar term correction
    const monthIndex = this.birthday.getMonth() + solarTermCorrection
    const branchIndex = (monthIndex + 1) % 12 as BranchIndex

    const stemHead = this.getBranchStemHead(yearStemIndex)
    const stemIndex = (stemHead + monthIndex - 1) % 10 as StemIndex

    return this.createPillar(stemIndex, branchIndex)
  }

  // 高氏日柱公式：由公曆年月日直接求儒略日（JDN），不依賴 epoch 毫秒差，避免時區問題
  private static julianDayNumber(year: number, month: number, day: number): number {
    const a = Math.floor((14 - month) / 12)
    const y = year + 4800 - a
    const m = month + 12 * a - 3
    return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
  }

  private buildDayPillar(): Pillar {
    // 換日：子時（23:00）起為次日的日柱
    const targetDate = this.birthday.getHours() >= 23
      ? new Date(this.birthday.getFullYear(), this.birthday.getMonth(), this.birthday.getDate() + 1)
      : this.birthday

    // JDN 2415011 = 甲子日基準（1900-01-01 甲戌 JDN=2415021，甲子在其前 10 日）
    const jdn = Bazi.julianDayNumber(
      targetDate.getFullYear(),
      targetDate.getMonth() + 1,
      targetDate.getDate()
    )
    const pos = ((jdn - 2415011) % 60 + 60) % 60

    const stemIndex   = pos % 10 as StemIndex
    const branchIndex = pos % 12 as BranchIndex
    return this.createPillar(stemIndex, branchIndex)
  }

  private buildHourPillar(dayStemIndex: StemIndex): Pillar {
    const hour = this.birthday.getHours()
    // Each 時辰 spans 2 hours; 子時 (branch 0) starts at 23:00
    const branchIndex = Math.floor((hour + 1) / 2) % 12 as BranchIndex

    const stemHead = this.getBranchStemHead(dayStemIndex)
    const stemIndex = (stemHead + branchIndex - 2) % 10 as StemIndex

    return this.createPillar(stemIndex, branchIndex)
  }
}
