/** @description A function, that calculates the precision on the given interval.
 * It will be used to format the value before it is displayed in the thumb label. */
export function calculatePrecision(interval: number): number {
    if (!interval) {
        return 0;
    }
    const intervalDigits: number = interval.toString().length;
    const integerDigits: number = Math.trunc(interval).toString().length;
    const fractionDigits: number = intervalDigits - integerDigits;

    return fractionDigits === 0 ? 0 : fractionDigits - 1;
}
