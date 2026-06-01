export const getNayinList = () => {
  return [
    '海中金', '爐中火', '大林木', '路旁土', '劍鋒金',
    '山頭火', '澗下水', '城頭土', '白蠟金', '楊柳木',
    '泉中水', '屋上土', '霹靂火', '松柏木', '長流水',
    '沙中金', '山下火', '平地木', '壁上土', '金箔金',
    '覆燈火', '天河水', '大驛土', '釵釧金', '桑柘木',
    '大溪水', '沙中土', '天上火', '石榴木', '大海水'
  ]
}

/**
 * Returns the Nayin (納音) element corresponding to a given cycle index.
 * The Nayin is determined by the 60-cycle index, with each pair of consecutive cycles sharing the same Nayin element.
 * The mapping is based on the traditional sequence of Nayin elements associated with the 60 combinations of Heavenly Stems and Earthly Branches.
 * @param cycleIndex - Index of the 60-cycle (0-59)
 * @returns The corresponding Nayin element, or null if the index is out of range
 */
export const getNayin = (cycleIndex: number): string | null => {
  return getNayinList()[Math.floor(cycleIndex / 2)] ?? null
}
