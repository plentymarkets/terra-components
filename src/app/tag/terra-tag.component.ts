import {
    Component,
    OnInit,
    Input
} from '@angular/core';

@Component({
               selector: 'terra-tag',
               styles:   [require('./terra-tag.component.scss').toString()],
               template: require('./terra-tag.component.html')
           })
export class TerraTagComponent implements OnInit
{
    @Input() inputBadge:string;
    @Input() inputTag:string;
    
    constructor()
    {
    }
    
    ngOnInit()
    {
    }
}
