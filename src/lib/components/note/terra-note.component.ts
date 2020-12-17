import { Component, Input } from '@angular/core';

@Component({
    selector: 'terra-note',
    styleUrls: ['./terra-note.component.scss'],
    templateUrl: './terra-note.component.html'
})
/** @deprecated since v5.0. Please use mat-card instead */
export class TerraNoteComponent {
    @Input()
    public inputIsSelected: boolean;

    @Input()
    public inputId: number;

    @Input()
    public inputHeaderText: string;

    @Input()
    public inputNoteText: string;
}
