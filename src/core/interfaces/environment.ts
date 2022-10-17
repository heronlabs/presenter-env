export interface Environment<T> {
  getValueByKey(key: string): T;
}
