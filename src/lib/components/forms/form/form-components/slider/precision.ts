export function calculatePrecision(interval: number): number {
    if (interval) {
        const intervalLength: number = interval.toString().length;
        const intervalTrunc: number = Math.trunc(interval).toString().length;
        const hasFractionDigits: boolean = intervalLength === intervalTrunc;

        return hasFractionDigits ? 0 : intervalLength - intervalTrunc - 1;
    } else {
        return 0;
    }
}
