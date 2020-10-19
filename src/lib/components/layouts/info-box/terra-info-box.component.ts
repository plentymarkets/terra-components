import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { TerraTagInterface } from '../tag/data/terra-tag.interface';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';

@Component({
    selector: 'terra-info-box',
    styleUrls: ['./terra-info-box.component.scss'],
    templateUrl: './terra-info-box.component.html'
})
/** @deprecated since v5.0. Please use mat-card instead*/
export class TerraInfoBoxComponent {
    @Input()
    public inputTagList: Array<TerraTagInterface>;

    @Input()
    public inputButtonList: Array<TerraButtonInterface>;

    @Input()
    public inputAddBox: boolean;

    @Input()
    public inputIsEmpty: boolean;

    @Input()
    public inputIsSelected: boolean;

    @Input()
    public inputId: number;

    @Input()
    public inputNoWordBreak: boolean;

    @ViewChild('buttonRef', { static: true })
    public _buttonRef: ElementRef;

    public get hasButtons(): boolean {
        return (
            (!isNullOrUndefined(this._buttonRef.nativeElement.childNodes) &&
                this._buttonRef.nativeElement.childNodes > 0) ||
            (!isNullOrUndefined(this.inputButtonList) && this.inputButtonList.length > 0)
        );
    }

    public get hasFooter(): boolean {
        return (
            !isNullOrUndefined(this.inputId) || (!isNullOrUndefined(this.inputTagList) && this.inputTagList.length > 0)
        );
    }
}
