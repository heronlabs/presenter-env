export class ValueUndefined extends Error {
  private constructor(key: string) {
    super(`'Value Undefined' | ${key}`);
  }

  public static make(key: string): Error {
    return new ValueUndefined(key);
  }
}
