/** A function, that calculates the number of fractional digits of the given number. */
export function getNumberOfFractionalDigits(num: number): number {
    if (!num) {
        return 0;
    }
    const totalDigits: number = num.toString().length;
    const integerDigits: number = Math.trunc(num).toString().length;
    return Math.max(totalDigits - integerDigits - 1, 0);
}
