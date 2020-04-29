import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ColumnContainerConfig } from '../column-container.config';

/**
 * @author mfrank
 * @experimental TerraThreeColumnsContainerComponent is experimental and might be subject to drastic changes in the near future.
 * It is also not compatible with the mobileRouting directive yet.
 *
 * @description Container which displays content/views in 3 columns using bootstraps grid system.
 * You can specify the width of the columns by using the three given inputs.
 * The sum of width of all given columns must amount to 12 at all times to ensure the deserved behaviour.
 * If not, the column widths are calculated automatically.
 */
@Component({
    selector: 'terra-3-col',
    styleUrls: ['./terra-three-columns-container.component.scss'],
    templateUrl: './terra-three-columns-container.component.html'
})
export class TerraThreeColumnsContainerComponent implements OnChanges {
    /**
     * @description size of the left column
     */
    @Input()
    public leftColumnWidth: number = 4;

    /**
     * @description size of the center column
     */
    @Input()
    public centerColumnWidth: number = 4;

    /**
     * @description size of the right column. Default 4
     */
    @Input()
    public rightColumnWidth: number = 4;

    /**
     * Component's life cycle hook which is executed when the value of any input changes.
     * It validates the given input values and updates the view.
     * @param changes
     */
    public ngOnChanges(changes?: SimpleChanges): void {
        if (this.leftColumnWidth + this.centerColumnWidth + this.rightColumnWidth > 12) {
            console.error('You have exceeded the maximum amount of columns. The columns are now sized automatically.');
        }

        let columnsLeft: number = ColumnContainerConfig.maxColumnWidth;

        this.leftColumnWidth = Math.min(
            columnsLeft,
            Math.max(ColumnContainerConfig.minColumnWidth, this.leftColumnWidth)
        );
        columnsLeft -= this.leftColumnWidth;

        this.centerColumnWidth = Math.min(
            columnsLeft,
            Math.max(ColumnContainerConfig.minColumnWidth, this.centerColumnWidth)
        );
        columnsLeft -= this.centerColumnWidth;

        this.rightColumnWidth = Math.min(
            columnsLeft,
            Math.max(ColumnContainerConfig.minColumnWidth, this.rightColumnWidth)
        );
        columnsLeft -= this.rightColumnWidth;

        if (columnsLeft > 0) {
            this.rightColumnWidth += columnsLeft;
        }
    }

    public _getStylesForColumn(columnWidth: number): string {
        if (columnWidth) {
            return `col-12 col-md-${columnWidth}`;
        }

        return null;
    }
}
