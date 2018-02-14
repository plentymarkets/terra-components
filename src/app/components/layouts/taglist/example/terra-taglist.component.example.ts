import {
    Component
} from "@angular/core";
import { TerraTagInterface } from '../../tag/data/terra-tag.interface';

@Component({
    selector: 'terra-taglist-example',
    styles:   [require('./terra-taglist.component.example.scss')],
    template: require('./terra-taglist.component.example.html'),
})
export class TerraTaglistComponentExample
{
    private tagList:Array<TerraTagInterface> = [
        {
            badge: 'tag1'
        },
        {
            badge: 'tag2'
        },
        {
            badge: 'tag3'
        }
    ];
}

