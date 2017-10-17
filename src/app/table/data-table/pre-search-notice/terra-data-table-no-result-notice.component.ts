import {
    Component,
    Input
} from '@angular/core';
import { TerraButtonInterface } from "../../../terra-components.module";

@Component({
               selector: 'no-result-notice',
               styles:   [require('./terra-data-table-no-result-notice.component.scss')],
               template: require('./terra-data-table-no-result-notice.component.html')
           })
export class TerraDataTableNoResultNoticeComponent
{
    @Input() inputButtons:Array<TerraButtonInterface>;
    @Input() inputTextPrimary:string;
    @Input() inputTextSecondary:string;
    
    constructor()
    {
    }
}
