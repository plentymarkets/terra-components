import {
    Component,
    OnInit,
    Input
} from '@angular/core';

@Component({
               selector: 'plenty-tag',
               templateUrl: 'plenty-tag.component.html',
               styleUrls: ['plenty-tag.component.css']
           })
export class PlentyTag implements OnInit
{
    @Input() badge: string;
    @Input() tag: string;

    constructor()
    {
    }

    ngOnInit()
    {
    }

}
