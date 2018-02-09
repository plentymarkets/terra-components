import {
    Component,
    Input
} from '@angular/core';
import { TerraButtonInterface } from '../../../';

@Component({
    selector: 'terra-no-result-notice',
    styles:   [require('./terra-no-result-notice.component.scss')],
    template: require('./terra-no-result-notice.component.html')
})
export class TerraNoResultNoticeComponent
{
    @Input()
    public inputButtons:Array<TerraButtonInterface>;

    @Input()
    public inputTextPrimary:string;

    @Input()
    public inputTextSecondary:string;

    constructor()
    {
    }
}
