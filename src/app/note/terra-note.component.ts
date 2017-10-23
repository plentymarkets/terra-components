import {
    Component,
    Input,
    OnInit
} from '@angular/core';

@Component({
    selector: 'terra-note',
    styles:   [require('./terra-note.component.scss')],
    template: require('./terra-note.component.html')
})
export class TerraNoteComponent implements OnInit
{
    @Input() inputIsSelected:boolean;
    @Input() inputId:number;

    constructor()
    {
    }

    ngOnInit()
    {
    }
}
