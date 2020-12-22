import { Component, OnInit, ViewChild } from '@angular/core';
import { TerraCheckboxComponent } from '../terra-checkbox.component';

@Component({
    selector: 'terra-checkbox-example',
    styleUrls: ['./terra-checkbox.component.example.scss'],
    templateUrl: './terra-checkbox.component.example.html'
})
export class TerraCheckboxComponentExample implements OnInit {
    public testCbState: boolean = false;

    @ViewChild('viewChildIndeterminateCb', { static: true })
    private viewChildIndeterminateCb: TerraCheckboxComponent;

    public ngOnInit(): void {
        this.viewChildIndeterminateCb.isIndeterminate = true;
    }

    public _getCheckboxIndeterminateState(): void {
        alert('Indeterminate state: ' + this.viewChildIndeterminateCb.isIndeterminate);
    }

    public _setCheckboxIndeterminateState(): void {
        this.viewChildIndeterminateCb.isIndeterminate = !this.viewChildIndeterminateCb.isIndeterminate;
    }

    public _setCheckboxValue(): void {
        this.testCbState = !this.testCbState;
    }
}
