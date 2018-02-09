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
    @Input()
    public inputIsSelected:boolean;

    @Input()
    public inputId:number;

    @Input()
    public inputHeaderText:string;

    @Input()
    public inputNoteText:string;

    constructor()
    {
    }
}
