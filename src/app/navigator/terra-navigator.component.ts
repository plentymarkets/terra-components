import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TerraNavigatorSplitViewConfig } from './config/terra-navigator-split-view.config';
import { TerraNavigatorNodeInterface } from './data/terra-navigator-node.interface';
import { TerraButtonGroupModule } from './button-group/terra-button-group.module';

/**
 * @author mscharf
 */
@Component({
               selector: 'terra-navigator',
               template: require('./terra-navigator.component.html'),
               styles:   [require('./terra-navigator.component.scss')]
           })
export class TerraNavigatorComponent implements OnInit
{
    @Input() inputNodes:Array<TerraNavigatorNodeInterface>;
    
    constructor(private _terraNavigatorSplitViewConfig:TerraNavigatorSplitViewConfig)
    {
    }
    
    ngOnInit()
    {
        console.log(this.inputNodes);
        
        this._terraNavigatorSplitViewConfig
            .addModule({
                           module:            TerraButtonGroupModule.forRoot(),
                           instanceKey:       '1',
                           defaultWidth:      'col-xs-2',
                           hidden:            false,
                           name:              'Menü',
                           mainComponentName: 'TerraButtonGroupComponent',
                           parameter:         {
                               nodes: this.inputNodes
                           }
                       });
        
        
    }
    
    
}
