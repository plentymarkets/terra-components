import { Component, Input } from '@angular/core';

@Component({
    selector: 'terra-tile',
    templateUrl: './terra-tile.component.html',
    styleUrls: ['./terra-tile.component.scss']
})
export class TerraTileComponent {

    /** @description Set the tile title.*/
    @Input()
    public inputTitle:string;

    /** @description Set secondary value.*/
    @Input()
    public inputSecValue:string;

    /** @description Set target.*/
    @Input()
    public inputTarget:string;

    /** @description Set value.*/
    @Input()
    public inputValue:string;

    /** @description Set time.*/
    @Input()
    public inputTime:string;

    /** @description Set unit.*/
    @Input()
    public inputUnit:string;

    /** @description Set background color.*/
    @Input()
    public inputColor:string;
}
