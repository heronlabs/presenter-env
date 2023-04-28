export interface Environment<T> {
  getValueByKey(key: string): Promise<T>;
}
