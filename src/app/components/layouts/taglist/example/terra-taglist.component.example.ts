import { Component } from '@angular/core';
import { TerraTagInterface } from '../../tag/data/terra-tag.interface';

@Component({
    selector: 'terra-taglist-example',
    styles:   [require('./terra-taglist.component.example.scss')],
    template: require('./terra-taglist.component.example.html'),
})
export class TerraTaglistComponentExample
{
    public infoBoxTagList:Array<TerraTagInterface> = [];

    constructor()
    {
        this.infoBoxTagList.push(
            {
                badge: 'Terra'
            },
            {
                badge: 'Terra',
                color: 'red'
            },
            {
                badge: 'Terra',
                color:'#f3f3f3'
            },
            {
                badge: 'Terra',
                isTaggable: true
            },
            {
                badge: 'Terra',
                isTaggable: true,
                isTagged: true
            }
        );
    }
}
