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
                name: 'Terra'
            },
            {
                name: 'Terra',
                color: 'red'
            },
            {
                name: 'Terra',
                color:'#f3f3f3'
            },
            {
                name: 'Terra',
                isTaggable: true
            },
            {
                name: 'Terra',
                isTaggable: true,
                isTagged: true
            }
        );
    }
}
