import {
    AfterViewInit,
    Component,
    Input
} from '@angular/core';
import { TerraPlacementEnum } from './terra-placement.enum';
import Coordinates = JQuery.Coordinates;

export interface Position
{
    width:number;
    height:number;
    position:Coordinates;
}

@Component({
    selector: 'terra-info',
    styles:   [require('./terra-info.component.scss')],
    template: require('./terra-info.component.html')
})
export class TerraInfoComponent implements AfterViewInit
{
    @Input() inputTextPlacement:TerraPlacementEnum;
    @Input() inputIsDisabled:boolean;
    @Input() inputText:string;
    @Input() inputReferenceId:string;

    private _locationCss:any = {
        width:  0,
        height: 0,
        left:   0,
        top:    0
    };

    constructor()
    {
        this.inputTextPlacement = TerraPlacementEnum.LEFT;
    }

    public ngAfterViewInit():void
    {
        let referenceElemPosition:Position = this.getReferenceElemPosition();

        console.log(referenceElemPosition.width + '  ' + referenceElemPosition.height + '  ' + referenceElemPosition.position.top + '  ' + referenceElemPosition.position.left);
        this.setTextPosition(referenceElemPosition);
    }

    private setTextPosition(position:Position):void
    {
        //$('info-text').css('width', width);
        //$('info-text').css('height', height);
        //$('info-text').css('top', position.top);
        //$('info-text').css('left', position.left);

        this._locationCss = {
            width:  position.width,
            height: position.height,
            left:   position.position.left,
            top:    position.position.top
        };
    }

    private getReferenceElemPosition():Position
    {
        let referenceElem = $('terra-info').find(this.inputReferenceId);

        let position:Position;

        position = {
            width:    referenceElem.children().width(),
            height:   referenceElem.children().height(),
            position: referenceElem.children().position()
        };

        return position;
    }

    private updateTextPosition():void
    {
        let referenceElemPosition:Position = this.getReferenceElemPosition();
        this._locationCss = {
            width:  referenceElemPosition.width,
            height: referenceElemPosition.height,
            left:   referenceElemPosition.position.left,
            top:    referenceElemPosition.position.top
        };
    }
}
