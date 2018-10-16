import {
    Component,
    Input
} from '@angular/core';
import { TwoColumnHelper } from '../../../../helpers/two-column.helper';

/**
 * @author mfrank
 */
@Component({
    selector: 'terra-3-col',
    styles:   [require('./terra-three-columns-container.component.scss')],
    template: require('./terra-three-columns-container.component.html')
})
/**
 * @experimental TerraThreeColumnsContainerComponent is experimental and might be subject to drastic changes in the near future.
 */
export class TerraThreeColumnsContainerComponent
{
    public leftColumn:string;
    public centerColumn:string;
    public rightColumn:string;

    private _leftColumnWidth:number = 2;
    private _rightColumnWidth:number = 2;
    private _centerColumnWidth:number = 8;

    @Input()
    public set leftColumnWidth(leftColumnWidth:number)
    {
        if(leftColumnWidth > 12 || leftColumnWidth < 1)
        {
            console.error('Given value for Input leftColumnWidth is lower than 1 or greater than 12. ' +
                          'It has been limited to this range to prevent invalid rendering. Please check your input value to avoid this error.');
        }

        let maxLeftColumnWidth:number = TwoColumnHelper.maxColumnWidth - TwoColumnHelper.minColumnWidth - this._rightColumnWidth;

        this._leftColumnWidth = Math.min(maxLeftColumnWidth, Math.max(TwoColumnHelper.minColumnWidth, leftColumnWidth));
        this._centerColumnWidth = TwoColumnHelper.maxColumnWidth - this._leftColumnWidth - this._rightColumnWidth;

        this.updateColumnStyles();
    }

    @Input()
    public set rightColumnWidth(rightColumnWidth:number)
    {
        if(rightColumnWidth > 12 || rightColumnWidth < 1)
        {
            console.error('Given value for Input rightColumnWidth is lower than 1 or greater than 12. ' +
                          'It has been limited to this range to prevent invalid rendering. Please check your input value to avoid this error.');
        }

        let maxRightColumnWidth:number = TwoColumnHelper.maxColumnWidth - TwoColumnHelper.minColumnWidth - this._leftColumnWidth;

        this._rightColumnWidth = Math.min(maxRightColumnWidth, Math.max(TwoColumnHelper.minColumnWidth, rightColumnWidth));
        this._centerColumnWidth = TwoColumnHelper.maxColumnWidth - this._leftColumnWidth - this._rightColumnWidth;

        this.updateColumnStyles();
    }

    public get leftColumnWidth():number
    {
        return this._leftColumnWidth;
    }

    constructor()
    {
        // trigger calculation for default values
        this.leftColumnWidth = this._leftColumnWidth;
        this.rightColumnWidth = this._rightColumnWidth;
    }

    private updateColumnStyles():void
    {
        this.leftColumn = this.getStylesForColumn(this._leftColumnWidth);
        this.centerColumn = this.getStylesForColumn(this._centerColumnWidth);
        this.rightColumn = this.getStylesForColumn(this._rightColumnWidth);
    }

    private getStylesForColumn(columnWidth:number):string
    {
        return `col-xs-12 col-md-${columnWidth}`;
    }
}
