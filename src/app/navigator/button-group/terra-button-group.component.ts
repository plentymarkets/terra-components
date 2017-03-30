import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TerraButtonInterface } from '../../button/data/terra-button.interface';
import { TerraNavigatorSplitViewConfig } from '../config/terra-navigator-split-view.config';
import { TerraNavigatorNodeInterface } from '../data/terra-navigator-node.interface';

/**
 * @author mscharf
 */
@Component({
               selector: 'terra-log-settings',
               template: require('./terra-button-group.component.html'),
               styles:   [require('./terra-button-group.component.scss')]
           })
export class TerraButtonGroupComponent implements OnInit
{
    @Input() parameter;
    
    private _buttonList:Array<TerraButtonInterface>;
    
    public constructor(private _terraNavigatorSplitViewConfig:TerraNavigatorSplitViewConfig)
    {
        this._buttonList = [];
    }
    
    ngOnInit()
    {
        this.parameter
            .nodes
            .forEach((item:TerraNavigatorNodeInterface) =>
                     {
                         this._buttonList
                             .push({
                                       caption:       item.nodeName,
                                       clickFunction: () =>
                                                      {
                                                          this._terraNavigatorSplitViewConfig
                                                              .openNextLevel(item);
                    
                                                          this._buttonList
                                                              .forEach((btnItem) =>
                                                                       {
                                                                           if(item.nodeName == btnItem.caption)
                                                                           {
                                                                               btnItem.isActive = true;
                                                                           }
                                                                           else
                                                                           {
                                                                               btnItem.isActive = false;
                                                                           }
                                                                       });
                                                      }
                                   });
            
                     });
    }
}
