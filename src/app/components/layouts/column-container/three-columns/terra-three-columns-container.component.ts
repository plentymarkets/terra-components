import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
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
export class TerraThreeColumnsContainerComponent implements OnChanges
{
    @Input()
    public leftColumnWidth:number = 2;

    @Input()
    public centerColumnWidth:number = 8;

    @Input()
    public rightColumnWidth:number = 2;

    protected leftColumn:string;
    protected centerColumn:string;
    protected rightColumn:string;


    constructor()
    {
        this.updateColumnStyles(this.leftColumnWidth, this.centerColumnWidth, this.rightColumnWidth);
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(this.leftColumnWidth + this.centerColumnWidth + this.rightColumnWidth > 12)
        {
            console.error('');
        }

        let columnsLeft:number = TwoColumnHelper.maxColumnWidth;

        let maxLeftColumnWidth:number = columnsLeft - TwoColumnHelper.minColumnWidth * 2;
        this.leftColumnWidth = Math.min(maxLeftColumnWidth, Math.max(TwoColumnHelper.minColumnWidth, changes['leftColumnWidth'] ? changes['leftColumnWidth'].currentValue : 0));

        columnsLeft -= this.leftColumnWidth;

        let maxCenterColumnWidth:number = columnsLeft - TwoColumnHelper.minColumnWidth;
        this.centerColumnWidth = Math.min(maxCenterColumnWidth, Math.max(TwoColumnHelper.minColumnWidth, changes['centerColumnWidth'] ? changes['centerColumnWidth'].currentValue : 0));
        columnsLeft -= this.centerColumnWidth;

        this.rightColumnWidth = Math.min(columnsLeft, Math.max(TwoColumnHelper.minColumnWidth, changes['rightColumnWidth'] ? changes['rightColumnWidth'].currentValue : 0));
        columnsLeft -= this.rightColumnWidth;

        if(columnsLeft > 0)
        {
            this.rightColumnWidth += columnsLeft;
        }

        this.updateColumnStyles(this.leftColumnWidth, this.centerColumnWidth, this.rightColumnWidth);
    }

    private updateColumnStyles(leftColumnWidth:number, centerColumnWidth:number, rightColumnWidth:number):void
    {
        this.leftColumn = this.getStylesForColumn(leftColumnWidth);
        this.centerColumn = this.getStylesForColumn(centerColumnWidth);
        this.rightColumn = this.getStylesForColumn(rightColumnWidth);
    }

    private getStylesForColumn(columnWidth:number):string
    {
        if(columnWidth)
        {
            return `col-xs-12 col-md-${columnWidth}`;
        }

        return null;
    }
}
