import {
    Component,
    Input
} from '@angular/core';

/**
 * @author mfrank
 */
@Component({
    selector: 'terra-2-col',
    template: require('./terra-two-columns-container.component.html')
})
export class TerraTwoColumnsContainerComponent
{
    protected leftColumn:string;
    protected rightColumn:string;

    private readonly colXS:string = 'col-xs-12';
    private readonly colMD:string = 'col-md-';
    private readonly colLG:string = 'col-lg-';
    private readonly spacer:string = ' ';
    private readonly maxColumnWidth:number = 12;
    private _leftColumnWidth:number = 12;

    @Input()
    public set leftColumnWidth(leftColumnWidth:number)
    {
        if(leftColumnWidth > 12 || leftColumnWidth < 1)
        {
            console.error('Input leftColumnWidth is greater then 12 or lower than 1. It is set so 12 or 1 to prevent invalid rendering. ' +
                          'Please check your input value to avoid these error.');
        }

        this._leftColumnWidth = Math.min(this.maxColumnWidth, Math.max(1, leftColumnWidth));

        this.leftColumn = this.leftRightColXS() + this.leftColMD() + this.leftColLG();
        this.rightColumn = this.leftRightColXS() + this.rightColMD() + this.rightColLG();
    }

    private leftRightColXS():string
    {
        return this.colXS + this.spacer;
    }

    private leftColMD():string
    {
        return this.colMD + this.calculatedLeftColumnMDWidth() + this.spacer;
    }

    private leftColLG():string
    {
        return this.colLG + this._leftColumnWidth;
    }

    private rightColMD():string
    {
        return this.colMD + this.calculatedRightColumnMDWidth() + this.spacer;
    }

    private rightColLG():string
    {
        return this.colLG + this.calculatedRightColumnLGWidth();
    }

    private calculatedLeftColumnMDWidth():number
    {
        return (this._leftColumnWidth === this.maxColumnWidth) ? this._leftColumnWidth : this._leftColumnWidth + 1;
    }

    private calculatedRightColumnMDWidth():number
    {
        return this.maxColumnWidth - this.calculatedLeftColumnMDWidth();
    }

    private calculatedRightColumnLGWidth():number
    {
        return this.maxColumnWidth - this._leftColumnWidth;
    }
}
