export class StringHelper {
    public static isNullUndefinedOrEmpty(str: string): boolean {
        return str === null || str === undefined || str.length === 0;
    }
}
