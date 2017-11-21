import {
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { TerraNodeTreeConfig } from './data/terra-node-tree.config';
import { TerraNodeInterface } from './data/terra-node.interface';

@Component({
               selector: 'terra-node-tree',
               styles:   [require('./terra-node-tree.component.scss')],
               template: require('./terra-node-tree.component.html')
           })
export class TerraNodeTreeComponent implements OnDestroy, OnInit
{
    @Input()
    inputConfig:TerraNodeTreeConfig;

    constructor()
    {

    }

    public ngOnInit():void
    {
        this.inputConfig.addNodeEventEmitter.subscribe((value:TerraNodeInterface) =>
                                                       {
                                                           //this.inputConfig.list.push(value);
                                                       });
    }

    public ngOnDestroy():void
    {
        this.inputConfig.reset();
    }
}