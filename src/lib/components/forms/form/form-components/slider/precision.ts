/** A function that calculates the precision (aka number of fractional digits) of the given interval. */
export function getNumberOfFractionalDigits(interval: number): number {
    if (!interval) {
        return 0;
    }
    const intervalDigits: number = interval.toString().length;
    const integerDigits: number = Math.trunc(interval).toString().length;
    const fractionDigits: number = intervalDigits - integerDigits;

    return fractionDigits === 0 ? 0 : fractionDigits - 1;
}
