import {
    Component,
    OnInit
} from '@angular/core';
import { TerraLeafInterface } from '../../leaf/terra-leaf.interface';

@Component({
    selector: 'terra-checkbox-tree-example',
    template: require('./terra-checkbox-tree.component.example.html'),
    styles:   [require('./terra-checkbox-tree.component.example.scss')]
})

export class TerraCheckboxTreeComponentExample implements OnInit
{

    private _checkboxLeafList:Array<TerraLeafInterface> = [];

    ngOnInit()
    {
        this._checkboxLeafList.push({
            caption:     'Leaf1',
            icon:        'icon-settings',
            value:       'leaf1Value',
            subLeafList: [
                {
                    caption:     'SubLeaf1',
                    value:       'subLeaf1Value',
                    subLeafList: [
                        {
                            caption: 'SubSubLeaf1',
                            value:   'subSubLeaf1Value',
                        },
                        {
                            caption: 'SubSubLeaf2',
                            value:   'subSubLeaf2Value',
                        }
                    ]
                },
                {caption: 'SubLeaf2'}
            ]
        });
        this._checkboxLeafList.push({
            caption: 'Leaf2',
            icon:    'icon-settings',
            value:   'leaf2Value',
        });
        this._checkboxLeafList.push({
            caption: 'Leaf3',
            value:   'leaf3Value',
        });
    }

}
