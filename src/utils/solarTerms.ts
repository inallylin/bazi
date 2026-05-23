import vsop87Bearth from 'astronomia/data/vsop87Bearth'
import planetposition from 'astronomia/planetposition'
import solstice from 'astronomia/solstice'

// 24 節氣：黃經度數（春分=0° 起，每 15° 一個）
type SolarTerm =
  'spring_equinox'
  | 'qingming'
  | 'grain_rain'
  | 'start_summer'
  | 'lesser_full'
  | 'grain_in_beard'
  | 'summer_solstice'
  | 'lesser_heat'
  | 'greater_heat'
  | 'start_autumn'
  | 'limit_heat'
  | 'white_dew'
  | 'autumn_equinox'
  | 'cold_dew'
  | 'frost_descent'
  | 'start_winter'
  | 'lesser_snow'
  | 'greater_snow'
  | 'winter_solstice'
  | 'lesser_cold'
  | 'greater_cold'
  | 'start_spring'
  | 'rain_water'
  | 'awakening_of_insects'

const getSolarTermMap = (): Record<SolarTerm, number> => {
  return {
    spring_equinox: 0,          // 春分
    qingming: 15,               // 清明
    grain_rain: 30,             // 穀雨
    start_summer: 45,           // 立夏
    lesser_full: 60,            // 小滿
    grain_in_beard: 75,         // 芒種
    summer_solstice: 90,        // 夏至
    lesser_heat: 105,           // 小暑
    greater_heat: 120,          // 大暑
    start_autumn: 135,          // 立秋
    limit_heat: 150,            // 處暑
    white_dew: 165,             // 白露
    autumn_equinox: 180,        // 秋分
    cold_dew: 195,              // 寒露
    frost_descent: 210,         // 霜降
    start_winter: 225,          // 立冬
    lesser_snow: 240,           // 小雪
    greater_snow: 255,          // 大雪
    winter_solstice: 270,       // 冬至
    lesser_cold: 285,           // 小寒
    greater_cold: 300,          // 大寒
    start_spring: 315,          // 立春
    rain_water: 330,            // 雨水
    awakening_of_insects: 345   // 驚蟄
  }
}

// Julian Day → JS Date
const jdeToDate = (jde: number) => {
  const unixMs = (jde - 2440587.5) * 86400000
  return new Date(unixMs)
}


export const getSolarTermDate = (solarTerm: SolarTerm, year: number = new Date().getFullYear()) => {
  // 載入 VSOP87 地球資料（節氣計算只需要 Earth）
  const earth = new planetposition.Planet(vsop87Bearth)

  const lon = getSolarTermMap()[solarTerm]
  // 小寒(285°)~驚蟄(345°) 落在 1~3 月，longitude() 要用前一年起算
  const calcYear = lon >= 285 ? year - 1 : year
  // solarTerm(year, longitude, earth) → 回傳 Julian Day Number
  const jde = solstice.longitude(calcYear, earth, lon * Math.PI / 180)

  return jdeToDate(jde)
}

export const getMonthSolarTerm = (month: number): SolarTerm | null => {
  // 月柱的節氣界線是以「月建」為基準，對應到節氣則是每月的「節氣」（如立春、驚蟄等）
  // 月建對應的節氣如下（0-based month index）：
  // 0: 寅月 → 立春 (315°)
  // 1: 卯月 → 驚蟄 (345°)
  // 2: 辰月 → 清明 (15°)
  // 3: 巳月 → 立夏 (45°)
  // 4: 午月 → 芒種 (75°)
  // 5: 未月 → 小暑 (105°)
  // 6: 申月 → 立秋 (135°)
  // 7: 酉月 → 白露 (165°)
  // 8: 戌月 → 寒露 (195°)
  // 9: 亥月 → 立冬 (225°)
  // 10: 子月 → 大雪 (255°)
  // 11: 丑月 → 小寒 (285°)
  const solarTerms: SolarTerm[] = [
    'start_spring',
    'awakening_of_insects',
    'qingming',
    'start_summer',
    'grain_in_beard',
    'lesser_heat',
    'start_autumn',
    'white_dew',
    'cold_dew',
    'start_winter',
    'greater_snow',
    'lesser_cold'
  ]
  return solarTerms[month % 12] ?? null
}

export const getSolarTermCorrection = (params: {
  date: Date
  target: 'year' | 'month'
}): number => {
  if (params.target === 'year') {
    // Adjust for 立春 (approx Feb 4): before that date, use previous year
    const springHead = getSolarTermDate('start_spring', params.date.getFullYear())
    return params.date < springHead ? -1 : 0
  } else {
    // For month pillar, the solar term boundary is more complex and depends on the month and year
    // This is a simplified version that checks the "beginning of month" solar term for the given month
    const monthSolarTerm = getMonthSolarTerm(params.date.getMonth() - 1)
    if (!monthSolarTerm) {
      // No correction if month is out of range (should not happen for valid dates)
      return 0
    }
    const termDate = getSolarTermDate(monthSolarTerm, params.date.getFullYear())
    return params.date < termDate ? -1 : 0
  }
}
