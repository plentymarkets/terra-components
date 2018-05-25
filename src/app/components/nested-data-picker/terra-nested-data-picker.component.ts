import {
    AfterContentChecked,
    Component,
    forwardRef,
    Input,
    OnInit
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NestedDataTreeConfig } from './config/nested-data-tree.config';
import { NestedDataInterface } from './data/nested-data.interface';
import { TerraNodeInterface } from '../tree/node-tree/data/terra-node.interface';
import { isNullOrUndefined, isNull } from 'util';
import { NestedValueInterface } from './data/nested-value.interface';
import { TerraNestedDataPickerBaseService } from './service/terra-nested-data-picker-base.service';
import { Observable } from 'rxjs/Observable';

@Component({
   selector:  'terra-nested-data-picker',
   template:  require('./terra-nested-data-picker.component.html'),
   styles:    [require('./terra-nested-data-picker.component.scss')],
   providers: [{
       provide:     NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => TerraNestedDataPickerComponent),
       multi:       true
   },
               NestedDataTreeConfig]
})
export class TerraNestedDataPickerComponent implements OnInit, AfterContentChecked
{
    /**
     * @description Service, that is used to request the category data from the server
     */
    @Input()
    public set inputNestedService(service:TerraNestedDataPickerBaseService)
    {
        this.nestedService = service;
        if (!isNullOrUndefined(service))
        {
            this.getNestedData();
        }
    }
    public nestedService:TerraNestedDataPickerBaseService;

    @Input()
    public inputIsDisabled:boolean;

    /**
     * @description Tooltip that is shown on the TextInput
     */
    @Input()
    public inputTooltipText:string;

    @Input()
    public inputName:string;

    public toggleTree:boolean = false;
    public isNotInitialCall:boolean;
    public value:number | string;
    private completeNestedData:NestedValueInterface;
    private nestedDataName:string;
    private nestedList:Array<TerraNodeInterface<NestedDataInterface>>;

    constructor(public translation:TranslationService,
                public nestedTreeConfig:NestedDataTreeConfig)
    {
        this.value = 0;
        this.completeNestedData = {
            id:               null,
            isActive:         null,
            isOpen:           null,
            isVisible:        null,
            name:             '',
            tooltip:          '',
            tooltipPlacement: '',
        };
        this.nestedList = [];
        this.nestedDataName = '';
        this.isNotInitialCall = false;
    }

    public ngAfterContentChecked():void
    {
        if(this.nestedTreeConfig.list.length === 0)
        {
            this.nestedTreeConfig.list = this.nestedList;
        }

    }

    public ngOnInit():void
    {
        if(isNullOrUndefined(this.inputName))
        {
            this.inputName = this.translation.translate('terraNestedDataPicker.category');
        }
        this.nestedTreeConfig.list = this.nestedList;
    }

    // From ControlValueAccessor interface
    public writeValue(value:string | number):void
    {

        if(!isNullOrUndefined(value))
        {
               let nodeToSelect:TerraNodeInterface<NestedDataInterface> = this.nestedTreeConfig.findNodeById(value);

               if(!isNullOrUndefined(nodeToSelect))
               {
                   this.nestedTreeConfig.currentSelectedNode = nodeToSelect;
                   this.nestedDataName = this.nestedTreeConfig.currentSelectedNode.name;
               }

               this.value = value;

               if(this.isNotInitialCall)
               {
                   this.updateCompleteNestedData(nodeToSelect);
                   this.onTouchedCallback();
                   this.onChangeCallback(this.value);
               }
        }
    }

    // Set touched on blur
    public onBlur():void
    {
         this.onTouchedCallback();
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn:any):void
    {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn:any):void
    {
        this.onTouchedCallback = fn;
    }

    public showTree():void
    {
      this.toggleTree = !this.toggleTree;
    }

    public onSelectNode():void
    {
        this.isNotInitialCall = true;

        if(!isNullOrUndefined(this.nestedTreeConfig.currentSelectedNode))
        {
            this.nestedDataName = this.nestedTreeConfig.currentSelectedNode.name;
            this.writeValue(this.nestedTreeConfig.currentSelectedNode.id);
        }
        this.toggleTree = !this.toggleTree;
    }

    public reset():void
    {
        this.nestedTreeConfig.currentSelectedNode = {
            id:               null,
            isActive:         null,
            isOpen:           null,
            isVisible:        null,
            name:             '',
            tooltip:          '',
            tooltipPlacement: '',
        };
        this.nestedDataName = '';
        this.value = 0;

        this.onTouchedCallback();
        this.onChangeCallback(this.value);
    }

    private updateCompleteNestedData(nested:TerraNodeInterface<NestedDataInterface>):void
    {
        this.completeNestedData.id = +nested.id;
        this.completeNestedData.isActive = nested.isActive;
        this.completeNestedData.isOpen = nested.isOpen;
        this.completeNestedData.isVisible = nested.isVisible;
        this.completeNestedData.name = nested.name;
        this.completeNestedData.tooltip = nested.tooltip;
        this.completeNestedData.tooltipPlacement = nested.tooltipPlacement;
    }


    private getNestedData():void
    {
        let obs:Observable<Array<NestedDataInterface>> = this.nestedService.requestNestedData();

        obs.subscribe((data:Array<NestedDataInterface>) =>
                      {
                          console.log(data);
                          this.addNodes(data, null);
                      });
    }

    public addNodes(nestedData:Array<NestedDataInterface>, parentId:number | string):void
    {
        for (let nested of nestedData)
        {
            let newParentId:string;
            if(parentId)
            {
                newParentId = parentId + '-' + nested.key;
                this.nestedTreeConfig.addChildToNodeById(parentId, {
                    id: newParentId,
                    name: nested.label,
                    tooltip: 'ID: ' + nested.key,
                    tooltipPlacement: 'top',
                    isVisible:true,
                });
            }
            else
            {
                newParentId = nested.key;
                this.nestedTreeConfig.addNode( {
                    id: newParentId,
                    name: nested.label,
                    tooltip: 'ID: ' + nested.key,
                    tooltipPlacement: 'top',
                    isVisible:true,
                });
            }
            if(!isNullOrUndefined(nested.children))
            {
                this.addNodes(nested.children, newParentId);
            }
        }
    }
    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    public onTouchedCallback:() => void = () => undefined;

    public onChangeCallback:(_:any) => void = () => undefined;
}
