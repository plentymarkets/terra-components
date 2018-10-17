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
 * @description Container which displays content/views in 3 columns using bootstraps grid system.
 * You can specifiy the width of the columns by using the three given inputs.
 * The sum of all given column width must be 12 at all times to ensure the deserved behaviour. If not, the column widths are calculated automatically.
 */
export class TerraThreeColumnsContainerComponent implements OnChanges
{
    /**
     * @description size of the left column
     */
    @Input()
    public leftColumnWidth:number = 4;

    /**
     * @description size of the center column
     */
    @Input()
    public centerColumnWidth:number = 4;

    /**
     * @description size of the right column. Default 4
     */
    @Input()
    public rightColumnWidth:number = 4;

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(this.leftColumnWidth + this.centerColumnWidth + this.rightColumnWidth > 12)
        {
            console.error('You have exceeded the maximum amount of columns. The columns are now sized automatically.');
        }

        let columnsLeft:number = TwoColumnHelper.maxColumnWidth;

        this.leftColumnWidth = Math.min(columnsLeft, Math.max(TwoColumnHelper.minColumnWidth, this.leftColumnWidth));

        columnsLeft -= this.leftColumnWidth;

        this.centerColumnWidth = Math.min(columnsLeft, Math.max(TwoColumnHelper.minColumnWidth, this.centerColumnWidth));
        columnsLeft -= this.centerColumnWidth;

        this.rightColumnWidth = Math.min(columnsLeft, Math.max(TwoColumnHelper.minColumnWidth, this.rightColumnWidth));
        columnsLeft -= this.rightColumnWidth;

        if(columnsLeft > 0)
        {
            this.rightColumnWidth += columnsLeft;
        }
    }

    protected getStylesForColumn(columnWidth:number):string
    {
        if(columnWidth)
        {
            return `col-xs-12 col-md-${columnWidth}`;
        }

        return null;
    }
}
