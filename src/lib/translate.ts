import { getLocale } from '@/lib/locale'

const TRANSLATIONS = Object.freeze({
  zh: {
    'stem.0': '甲',
    'stem.1': '乙',
    'stem.2': '丙',
    'stem.3': '丁',
    'stem.4': '戊',
    'stem.5': '己',
    'stem.6': '庚',
    'stem.7': '辛',
    'stem.8': '壬',
    'stem.9': '癸',
    'branch.0': '子',
    'branch.1': '丑',
    'branch.2': '寅',
    'branch.3': '卯',
    'branch.4': '辰',
    'branch.5': '巳',
    'branch.6': '午',
    'branch.7': '未',
    'branch.8': '申',
    'branch.9': '酉',
    'branch.10': '戌',
    'branch.11': '亥',
    'pillar.year': '年柱',
    'pillar.month': '月柱',
    'element.wood': '木',
    'polarity.1': '陽',
    'polarity.0': '陰',
    'growthStage.帝旺': '帝旺'
  },
  en: {
    'stem.0': 'Jia',
    'stem.1': 'Yi',
    'stem.2': 'Bing',
    'stem.3': 'Ding',
    'stem.4': 'Wu',
    'stem.5': 'Ji',
    'stem.6': 'Geng',
    'stem.7': 'Xin',
    'stem.8': 'Ren',
    'stem.9': 'Gui',
    'branch.0': 'Zi',
    'branch.1': 'Chou',
    'branch.2': 'Yin',
    'branch.3': 'Mao',
    'branch.4': 'Chen',
    'branch.5': 'Si',
    'branch.6': 'Wu',
    'branch.7': 'Wei',
    'branch.8': 'Shen',
    'branch.9': 'You',
    'branch.10': 'Xu',
    'branch.11': 'Hai',
    'pillar.year': 'Year Pillar',
    'pillar.month': 'Month Pillar',
    'element.wood': 'Wood',
    'polarity.1': 'Yang',
    'polarity.0': 'Yin',
    'growthStage.帝旺': 'Emperor Peak'
  }
})

export type TranslationKey = keyof typeof TRANSLATIONS['zh']

export function t(key: TranslationKey): string {
  const locale = getLocale()
  return TRANSLATIONS[locale][key] ?? key
}
