export function round(value: number, decimals: number): number {
    const factor: number = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}
