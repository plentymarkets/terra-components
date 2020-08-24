import { Component, Input } from '@angular/core';
import { TerraButtonInterface } from '../buttons/button/data/terra-button.interface';

@Component({
    selector: 'terra-no-result-notice',
    styleUrls: ['./terra-no-result-notice.component.scss'],
    templateUrl: './terra-no-result-notice.component.html'
})
export class TerraNoResultNoticeComponent {
    @Input()
    public inputButtons: Array<TerraButtonInterface>;

    @Input()
    public inputTextPrimary: string;

    @Input()
    public inputTextSecondary: string;
}
