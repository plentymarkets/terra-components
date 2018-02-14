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
    @ViewChild('viewChildIndeterminateCb') viewChildIndeterminateCb:TerraCheckboxComponent;
    @ViewChild('viewChildTestCb') viewChildTestCb:TerraCheckboxComponent;

    constructor()
    {
    }

    ngOnInit()
    {
        this.viewChildIndeterminateCb.isIndeterminate = true;
    }

    getCheckboxIndeterminateState()
    {
        alert('Indeterminate state: ' + this.viewChildIndeterminateCb.isIndeterminate);
    }

    setCheckboxIndeterminateState()
    {
        this.viewChildIndeterminateCb.isIndeterminate = !this.viewChildIndeterminateCb.isIndeterminate;
    }

    setCheckboxValue()
    {
        this.viewChildTestCb.value = !this.viewChildTestCb.value;
    }
}