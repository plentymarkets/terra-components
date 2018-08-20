import {
    Component
} from '@angular/core';

@Component({
    selector: 'terra-toggle-example',
    styles:   [require('./terra-toggle.component.example.scss')],
    template: require('./terra-toggle.component.example.html'),
})
export class TerraToggleComponentExample
{
    protected isToggled:boolean = false;

    protected showMessage(msg:string):void
    {
        alert(msg);
    }
}
