import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { TerraTagInterface } from '../tag/data/terra-tag.interface';

@Component({
    selector: 'terra-taglist',
    styleUrls:   ['./terra-taglist.component.scss'],
    templateUrl: './terra-taglist.component.html'
})
export class TerraTaglistComponent
{
    @Input()
    public inputTagList:Array<TerraTagInterface>;

    @Input()
    public isReadOnly:boolean;

    @Output()
    public onCloseTag:EventEmitter<number> = new EventEmitter<number>();
}
