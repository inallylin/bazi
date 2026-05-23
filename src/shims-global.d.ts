declare global {
  /**
   * 給文字提醒但不強制規定文內容
   */
  type WeakStringType<T> = (T extends string ? T : keyof T) | (string & NonNullable<unknown>)

  /**
   * 將物件 T 的屬性鍵轉換為字串陣列，並保留原始值的型別。
   */
  type Entries<T> = {
    [K in keyof T]-?: [K, T[K]]
  }[keyof T][]

}

export {}
