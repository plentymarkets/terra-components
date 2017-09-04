import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TerraNavigatorSplitViewConfig } from '../config/terra-navigator-split-view.config';
import { TerraNavigatorNodeInterface } from '../data/terra-navigator-node.interface';
import { TerraButtonGroupInterface } from './data/terra-button-group.interface';
import { isNullOrUndefined } from 'util';

/**
 * @author mscharf
 */
@Component({
               selector: 'terra-button-group',
               template: require('./terra-button-group.component.html'),
               styles:   [require('./terra-button-group.component.scss')]
           })
export class TerraButtonGroupComponent<D> implements OnInit
{
    @Input() parameter:any;

    private _buttonList:Array<TerraButtonGroupInterface>;

    public constructor(private _terraNavigatorSplitViewConfig:TerraNavigatorSplitViewConfig<D>)
    {
        this._buttonList = [];
    }

    ngOnInit()
    {
        this._terraNavigatorSplitViewConfig.observableUpdateActiveItem
            .subscribe((nodes:Array<TerraNavigatorNodeInterface<D>>) =>
                       {
                           this.setRecursiveItemActive(nodes);
                       });

        this.parameter.nodes
            .forEach((item:TerraNavigatorNodeInterface<D>) =>
                     {
                         let hasChildren = false;

                         if(!isNullOrUndefined(item.children))
                         {
                             hasChildren = true;
                         }

                         let button:TerraButtonGroupInterface = {
                             caption:       item.nodeName,
                             clickFunction: () =>
                                            {
                                                this._terraNavigatorSplitViewConfig.openNextLevel(item);

                                                item.isButtonClicked = true;
                                                this._buttonList
                                                    .forEach((btnItem) =>
                                                             {
                                                                 if(item.nodeName === btnItem.caption)
                                                                 {
                                                                     btnItem.isActive = true;
                                                                 }
                                                                 else
                                                                 {
                                                                     btnItem.isActive = false;
                                                                 }
                                                             });
                                            },
                             hasChildren:   hasChildren,
                             isVisible:     isNullOrUndefined(item.isVisible) || item.isVisible,
                         };

                         this._buttonList
                             .push(button);

                         if(!isNullOrUndefined(item.nodeIcon))
                         {
                             this._buttonList[this._buttonList.length - 1].icon = item.nodeIcon;
                         }
                     });

        this.setRecursiveItemActive(this.parameter.nodes);
    }

    private setRecursiveItemActive(list:Array<TerraNavigatorNodeInterface<D>>)
    {
        list.forEach((item:TerraNavigatorNodeInterface<D>) =>
                     {
                         if(item.isActive)
                         {
                             setTimeout(() =>
                                        {
                                            this._terraNavigatorSplitViewConfig
                                                .openNextLevel(item);
                                        });

                             let btn:TerraButtonGroupInterface =
                                 this._buttonList.find((btn:TerraButtonGroupInterface) =>
                                                       {
                                                           return btn.caption === item.nodeName;
                                                       });

                             if(!isNullOrUndefined(btn))
                             {
                                 btn.isActive = item.isActive;
                             }
                         }
                         else
                         {
                             if(item.children)
                             {
                                 this.setRecursiveItemActive(item.children);
                             }
                         }
                     });
    }
}
