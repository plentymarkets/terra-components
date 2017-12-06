import {
    Component,
    Input,
    OnInit
} from '@angular/core';

@Component({
    selector: 'terra-indicator',
    styles:   [require('./terra-indicator.component.scss')],
    template: require('./terra-indicator.component.html')
})
export class TerraIndicatorComponent implements OnInit
{
    @Input() inputLabel:string;
    @Input() inputType:string;

    constructor()
    {
        this.inputType = 'default';
    }

    ngOnInit()
    {
    }
}
