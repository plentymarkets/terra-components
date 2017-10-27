import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector: 'terra-note',
    styles:   [require('./terra-note.component.scss')],
    template: require('./terra-note.component.html')
})
export class TerraNoteComponent
{
    @Input() inputIsSelected:boolean;
    @Input() inputId:number;
    @Input() inputHeaderText:string;
    @Input() inputNoteText:string;

    constructor()
    {
    }
}
