/** @deprecated since v11. Use `str === null || str === undefined || str.length === 0` instead. */
export class StringHelper {
    public static isNullUndefinedOrEmpty(str: string): boolean {
        return str === null || str === undefined || str.length === 0;
    }
}
