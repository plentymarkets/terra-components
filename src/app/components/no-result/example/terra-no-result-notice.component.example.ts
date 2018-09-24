import {
    Component,
    OnInit
} from '@angular/core';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';

@Component({
    selector: 'terra-no-result-notice-example',
    styles:   [require('./terra-no-result-notice.component.example.scss')],
    template: require('./terra-no-result-notice.component.example.html'),
})
export class TerraNoResultNoticeComponentExample implements OnInit
{
    protected buttons:Array<TerraButtonInterface> = [];
    private result:boolean;

    public checkResult(value:boolean):void
    {
        this.result = value;
    }

    public ngOnInit():void
    {
        this.buttons.push({
            caption:       'Search',
            isTertiary:    true,
            icon:          'icon-add',
            clickFunction: ():void =>
                           {
                               this.result = true;
                           }
        });
    }

}
