import {
    Component,
    Input
} from '@angular/core';
import { TerraButtonInterface } from "../terra-components.module";

@Component({
    selector: 'terra-no-result-notice',
    styles:   [require('./terra-no-result-notice.component.scss')],
    template: require('./terra-no-result-notice.component.html')
})
export class TerraNoResultNoticeComponent
{
    @Input() inputButtons:Array<TerraButtonInterface>;
    @Input() inputTextPrimary:string;
    @Input() inputTextSecondary:string;

    constructor()
    {
    }
}
