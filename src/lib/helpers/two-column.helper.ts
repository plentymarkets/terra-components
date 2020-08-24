import { ColumnContainerConfig } from '../components/layouts/column-container/column-container.config';

export class TwoColumnHelper {
    public static colXS: string = 'col-12';
    public static colMD: string = 'col-md-';
    public static colLG: string = 'col-lg-';
    public static spacer: string = ' ';
    public static hiddenXS: string = 'hidden-xs';

    public static leftRightColXS(): string {
        return this.colXS + this.spacer;
    }

    public static leftColMD(leftColumnWidth: number): string {
        return this.colMD + this.calculatedLeftColumnMDWidth(leftColumnWidth) + this.spacer;
    }

    public static leftColLG(leftColumnWidth: number): string {
        return this.colLG + leftColumnWidth;
    }

    public static rightColMD(leftColumnWidth: number): string {
        return this.colMD + this.calculatedRightColumnMDWidth(leftColumnWidth) + this.spacer;
    }

    public static rightColLG(leftColumnWidth: number): string {
        return this.colLG + this.calculatedRightColumnLGWidth(leftColumnWidth);
    }

    public static leftRightHiddenXS(): string {
        return this.hiddenXS + this.spacer;
    }

    public static calculatedLeftColumnMDWidth(leftColumnWidth: number): number {
        return leftColumnWidth === ColumnContainerConfig.maxColumnWidth ? leftColumnWidth : leftColumnWidth + 1;
    }

    public static calculatedRightColumnMDWidth(leftColumnWidth: number): number {
        return ColumnContainerConfig.maxColumnWidth - this.calculatedLeftColumnMDWidth(leftColumnWidth);
    }

    public static calculatedRightColumnLGWidth(leftColumnWidth: number): number {
        return ColumnContainerConfig.maxColumnWidth - leftColumnWidth;
    }
}
