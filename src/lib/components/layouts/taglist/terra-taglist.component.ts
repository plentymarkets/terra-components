import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TerraTagInterface } from '../tag/data/terra-tag.interface';

/**
 * @deprecated since v5. Use angular material's [chip-list](https://material.angular.io/components/chips/overview) instead.
 */
@Component({
    selector: 'terra-taglist',
    styleUrls: ['./terra-taglist.component.scss'],
    templateUrl: './terra-taglist.component.html'
})
export class TerraTaglistComponent {
    @Input()
    public inputTagList: Array<TerraTagInterface>;

    @Input()
    public isReadOnly: boolean;

    @Output()
    public closeTag: EventEmitter<number> = new EventEmitter<number>();
}
