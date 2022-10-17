export class ValueIsNotNumber extends Error {
  private constructor(key: string) {
    super(`Value Is Not Number | ${key}`);
  }

  public static make(key: string): Error {
    return new ValueIsNotNumber(key);
  }
}
