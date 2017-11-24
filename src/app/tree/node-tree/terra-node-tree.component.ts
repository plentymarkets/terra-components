import {
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { TerraNodeTreeConfig } from './data/terra-node-tree.config';
import { TerraNodeInterface } from './data/terra-node.interface';
import { isNullOrUndefined } from 'util';

@Component({
               selector: 'terra-node-tree',
               styles:   [require('./terra-node-tree.component.scss')],
               template: require('./terra-node-tree.component.html')
           })
export class TerraNodeTreeComponent<D> implements OnDestroy, OnInit
{
    /**
     * @description The config to handle actions on tree or node.
     */
    @Input() inputConfig:TerraNodeTreeConfig<D>;

    constructor()
    {
    }

    public ngOnInit():void
    {
    }

    public ngOnDestroy():void
    {
        this.inputConfig.reset();
    }
}