import {
    Component,
    Input
} from '@angular/core';
import { TerraButtonInterface } from '../buttons/button/data/terra-button.interface';

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
}
