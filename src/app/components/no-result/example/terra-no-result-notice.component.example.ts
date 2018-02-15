import {
    Component,
    OnInit
} from "@angular/core";
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';

@Component({
    selector: 'terra-no-result-notice-example',
    styles:   [require('./terra-no-result-notice.component.example.scss')],
    template: require('./terra-no-result-notice.component.example.html'),
})
export class TerraNoResultNoticeComponentExample implements OnInit
{
    private _inputNoResultButtons:Array<TerraButtonInterface>;
    private _result:boolean;

    public checkResult(value):void
    {
        this._result = value;
    }


    ngOnInit()
    {
        this._inputNoResultButtons = [];

        this._inputNoResultButtons.push
        ({
            caption:       'Search',
            isTertiary:    true,
            icon:          'icon-add',
            clickFunction: ():void =>
                           {
                               this._result = true;
                           }
        });
    }

}