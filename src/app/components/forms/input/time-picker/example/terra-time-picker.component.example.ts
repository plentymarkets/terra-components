import {
    Component
} from '@angular/core';

@Component({
    selector: 'terra-time-picker-example',
    styles:   [require('./terra-time-picker.component.example.scss')],
    template: require('./terra-time-picker.component.example.html'),
})
export class TerraTimePickerComponentExample
{
    public date:Date = new Date();

}
