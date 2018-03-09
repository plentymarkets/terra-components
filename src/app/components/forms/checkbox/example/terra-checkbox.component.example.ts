import {
    Component,
    OnInit,
    ViewChild
} from "@angular/core";
import { TerraCheckboxComponent } from '../terra-checkbox.component';

@Component({
    selector: 'terra-checkbox-example',
    styles:   [require('./terra-checkbox.component.example.scss')],
    template: require('./terra-checkbox.component.example.html'),
})
export class TerraCheckboxComponentExample implements OnInit
{
    @ViewChild('viewChildIndeterminateCb') private viewChildIndeterminateCb:TerraCheckboxComponent;
    @ViewChild('viewChildTestCb') private viewChildTestCb:TerraCheckboxComponent;
    public ngOnInit():void
    {
        this.viewChildIndeterminateCb.isIndeterminate = true;
    }

    private getCheckboxIndeterminateState():void
    {
        alert('Indeterminate state: ' + this.viewChildIndeterminateCb.isIndeterminate);
    }

    private setCheckboxIndeterminateState():void
    {
        this.viewChildIndeterminateCb.isIndeterminate = !this.viewChildIndeterminateCb.isIndeterminate;
    }

    private setCheckboxValue():void
    {
        this.viewChildTestCb.value = !this.viewChildTestCb.value;
    }
}