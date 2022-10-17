export class FileNotExists extends Error {
  private constructor(path: string) {
    super(`File path '${path}' was not found!`);
  }

  public static make(path: string): Error {
    return new FileNotExists(path);
  }
}
