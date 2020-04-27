import { isNullOrUndefined } from 'util';

export class StringHelper {
  public static isNullUndefinedOrEmpty(str: string): boolean {
    return isNullOrUndefined(str) || str.length === 0;
  }
}
