import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { TerraTagInterface } from '../tag/data/terra-tag.interface';

@Component({
    selector: 'terra-taglist',
    styles:   [require('./terra-taglist.component.scss')],
    template: require('./terra-taglist.component.html')
})
export class TerraTaglistComponent implements OnInit
{
    @Input()
    public inputTagList:Array<TerraTagInterface>;

    @Input()
    public isReadOnly:boolean;

    /* tslint:disable:no-output-on-prefix */
    /**
     * @deprecated use closeTag instead
     */
    @Output()
    public onCloseTag:EventEmitter<number> = new EventEmitter<number>();
    /* tslint:enable:no-output-on-prefix */

    @Output()
    public closeTag:EventEmitter<number> = new EventEmitter<number>();

    public ngOnInit():void
    {
        if(this.onCloseTag.observers.length > 0)
        {
            console.warn('`onCloseTag` is deprecated. Please use `closeTag` instead.');
        }
    }
}
