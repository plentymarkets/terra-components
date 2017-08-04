import {
    Component,
    Input,
    OnInit
} from '@angular/core';

@Component({
               selector: 'terra-tag',
               styles:   [require('./terra-tag.component.scss')],
               template: require('./terra-tag.component.html')
           })
export class TerraTagComponent implements OnInit
{
    @Input() inputBadge:string;
    @Input() inputIsTagged:boolean;
    @Input() inputIsTaggable:boolean;

    constructor()
    {
        this.inputIsTagged = false;
        this.inputIsTaggable = false;
    }

    ngOnInit()
    {
    }
}
