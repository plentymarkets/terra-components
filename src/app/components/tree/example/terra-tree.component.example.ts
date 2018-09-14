import {
    Component,
    OnInit
} from '@angular/core';
import { TerraLeafInterface } from '../leaf/terra-leaf.interface';

@Component({
    selector: 'terra-tree-example',
    template: require('./terra-tree.component.example.html'),
    styles:   [require('./terra-tree.component.example.scss')]
})

export class TerraTreeComponentExample implements OnInit
{
    protected leafList:Array<TerraLeafInterface> = [];

    public ngOnInit():void
    {
        this.leafList.push({
            caption:     'Basic-Settings',
            icon:        'icon-settings',
            subLeafList: [
                {
                    caption:     'User',
                    subLeafList: [
                        {
                            caption: 'Accounts'
                        },
                        {
                            caption: 'Role'
                        }
                    ]
                },
                {
                    caption: 'API'
                }
            ]
        });
        this.leafList.push({
            caption:     'Client (Store)',
            subLeafList: [
                {
                    caption: 'Global-Settings'
                },
                {
                    caption: 'Standard'
                }
            ]
        });
        this.leafList.push({
            caption:     'Item',
            icon:        'icon-item',
            subLeafList: [
                {
                    caption: 'Basic-Settings'
                },
                {
                    caption: 'Item availability'
                }
            ]
        });
    }
}
