import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TerraCheckboxComponent } from '../terra-checkbox.component';

@Component({
    selector: 'terra-checkbox-example',
    styles:   [require('./terra-checkbox.component.example.scss')],
    template: require('./terra-checkbox.component.example.html'),
})
export class TerraCheckboxComponentExample implements OnInit
{
    @ViewChild('viewChildIndeterminateCb')
    public viewChildIndeterminateCb:TerraCheckboxComponent;

    @ViewChild('viewChildTestCb')
    public viewChildTestCb:TerraCheckboxComponent;

    public ngOnInit():void
    {
        this.viewChildIndeterminateCb.isIndeterminate = true;
    }

    public getCheckboxIndeterminateState():void
    {
        alert('Indeterminate state: ' + this.viewChildIndeterminateCb.isIndeterminate);
    }

    public setCheckboxIndeterminateState():void
    {
        this.viewChildIndeterminateCb.isIndeterminate = !this.viewChildIndeterminateCb.isIndeterminate;
    }

    public setCheckboxValue():void
    {
        this.viewChildTestCb.value = !this.viewChildTestCb.value;
    }
}
