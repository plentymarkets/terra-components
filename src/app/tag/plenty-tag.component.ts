import {
    Component,
    OnInit,
    Input
} from '@angular/core';

@Component({
               selector: 'plenty-tag',
               styles:   [require('./plenty-tag.component.scss').toString()],
               template: require('./plenty-tag.component.html')
           })
export class PlentyTag implements OnInit
{
    @Input() badge:string;
    @Input() tag:string;

    constructor()
    {
    }

    ngOnInit()
    {
    }

}
