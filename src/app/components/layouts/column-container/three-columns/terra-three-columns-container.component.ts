import {
    Component,
    Input
} from '@angular/core';
import { TwoColumnHelper } from '../../../../helpers/two-column.helper';
import { isNullOrUndefined } from 'util';

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
    protected leftColumn:string;
    protected centerColumn:string;
    protected rightColumn:string;

    private _leftColumnWidth:number = 4;
    private _rightColumnWidth:number = 4;
    private _centerColumnWidth:number = 4;

    @Input()
    public set columnWidths(widths:Array<number>)
    {
        if(isNullOrUndefined(widths) || widths.length === 0)
        {
            return;
        }

        if(widths.length > 3)
        {
            widths = widths.slice(0, 2); // ignore more than three column widths
        }

        switch(widths.length)
        {
            case 1:
                let maxLeftColumnWidth:number = TwoColumnHelper.maxColumnWidth - TwoColumnHelper.minColumnWidth * 2;
                this._leftColumnWidth = Math.min(maxLeftColumnWidth, Math.max(TwoColumnHelper.minColumnWidth, leftColumnWidth));
                this._centerColumnWidth = Math.floor((TwoColumnHelper.maxColumnWidth - widths[0]) / 2);
                this._rightColumnWidth = TwoColumnHelper.maxColumnWidth - this._leftColumnWidth - this._centerColumnWidth;
                break;
            case 2: break;
            case 3: break;
            default:
                console.error('Given value for Input leftColumnWidth is lower than 1 or greater than 12. ' +
                              'It has been limited to this range to prevent invalid rendering. Please check your input value to avoid this error.');
                break;
        }

        this.updateColumnStyles();
    }

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
