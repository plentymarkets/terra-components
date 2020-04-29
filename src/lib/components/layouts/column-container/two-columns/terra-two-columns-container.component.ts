import { Component, Input } from '@angular/core';
import { TwoColumnHelper } from '../../../../helpers/two-column.helper';
import { ColumnContainerConfig } from '../column-container.config';

/**
 * @author mfrank
 */
@Component({
    selector: 'terra-2-col',
    styleUrls: ['./terra-two-columns-container.component.scss'],
    templateUrl: './terra-two-columns-container.component.html'
})
/**
 * @experimental TerraTwoColumnsContainerComponent is experimental and might be subject to drastic changes in the near future.
 */
export class TerraTwoColumnsContainerComponent {
    public _leftColumn: string;
    public _rightColumn: string;

    private _leftColumnWidth: number = 2;

    @Input()
    public set leftColumnWidth(leftColumnWidth: number) {
        if (leftColumnWidth > 12 || leftColumnWidth < 1) {
            console.error(
                'Given value for Input _leftColumnWidth is lower than 1 or greater than 12. ' +
                    'It has been limited to this range to prevent invalid rendering. Please check your input value to avoid this error.'
            );
        }

        this._leftColumnWidth = Math.min(ColumnContainerConfig.maxColumnWidth - 1, Math.max(1, leftColumnWidth));

        this._leftColumn =
            TwoColumnHelper.leftRightColXS() +
            TwoColumnHelper.leftColMD(this._leftColumnWidth) +
            TwoColumnHelper.leftColLG(this._leftColumnWidth);
        this._rightColumn =
            TwoColumnHelper.leftRightColXS() +
            TwoColumnHelper.rightColMD(this._leftColumnWidth) +
            TwoColumnHelper.rightColLG(this._leftColumnWidth);
    }

    public get leftColumnWidth(): number {
        return this._leftColumnWidth;
    }

    constructor() {
        this.leftColumnWidth = this._leftColumnWidth; // trigger calculation for default values
    }
}
