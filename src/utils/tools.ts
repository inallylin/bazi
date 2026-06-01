/**
 * Rotates an array by a given index, effectively shifting the elements to the left and wrapping around.
 * For example, rotateByIndex([1, 2, 3, 4], 1) returns [2, 3, 4, 1].
 * @param arr - The array to rotate
 * @param index - The number of positions to rotate the array by
 * @returns A new array that has been rotated by the specified index
 *
 * 例如：rotateByIndex([1, 2, 3, 4], 1) 返回 [2, 3, 4, 1]
 */
export const rotateByIndex = (arr: any[], index: number) => {
  const safeIndex = index % arr.length
  return arr.slice(safeIndex).concat(arr.slice(0, safeIndex))
}

export const deepClone = <T>(obj: T): T => {
  return structuredClone(obj)
  // return JSON.parse(JSON.stringify(obj))
}