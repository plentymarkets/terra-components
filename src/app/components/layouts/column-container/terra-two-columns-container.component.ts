import {
    Component,
    Input
} from '@angular/core';
import { TwoColumnHelper } from '../../../helpers/two-column.helper';
import { TerraTwoColumnsConfig } from './config/terra-two-columns.config';

/**
 * @author mfrank
 */
@Component({
    selector: 'terra-2-col',
    styles:   [require('./terra-two-columns-container.component.scss')],
    template: require('./terra-two-columns-container.component.html'),
    providers: [TerraTwoColumnsConfig]
})
/**
 * @experimental TerraTwoColumnsContainerComponent is experimental and might be subject to drastic changes in the near future.
 */
export class TerraTwoColumnsContainerComponent
{
    public leftColumn:string;
    public rightColumn:string;

    private _leftColumnWidth:number = 2;


    @Input()
    public set leftColumnWidth(leftColumnWidth:number)
    {
        if(leftColumnWidth > 12 || leftColumnWidth < 1)
        {
            console.error('Given value for Input leftColumnWidth is lower than 1 or greater than 12. ' +
                          'It has been limited to this range to prevent invalid rendering. Please check your input value to avoid this error.');
        }

        this._leftColumnWidth = Math.min(TwoColumnHelper.maxColumnWidth, Math.max(1, leftColumnWidth));

        this.leftColumn = TwoColumnHelper.leftRightColXS()
                          + TwoColumnHelper.leftColMD(this._leftColumnWidth)
                          + TwoColumnHelper.leftColLG(this._leftColumnWidth);
        this.rightColumn = TwoColumnHelper.leftRightColXS()
                           + TwoColumnHelper.rightColMD(this._leftColumnWidth)
                           + TwoColumnHelper.rightColLG(this._leftColumnWidth);
    }

    public get leftColumnWidth():number
    {
        return this._leftColumnWidth;
    }

    constructor()
    {
        this.leftColumnWidth = this._leftColumnWidth; // trigger calculation for default values
    }
}
