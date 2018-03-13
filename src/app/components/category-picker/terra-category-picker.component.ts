import {
    AfterContentChecked,
    Component,
    forwardRef,
    Input,
    OnChanges,
    OnInit
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraCategoryPickerBaseService } from './service/terra-category-picker-base.service';
import { CategoryTreeConfig } from './config/category-tree.config';
import { TerraNodeInterface } from '../../../';
import { CategoryTreeData } from './data/category-tree.data';
import { CategoryDataInterface } from './data/category-data.interface';
import { CategoryDetailDataInterface } from './data/category-detail-data.interface';
import { isNullOrUndefined } from 'util';
import { CategoryPagerDataInterface } from './data/category-pager-data.interface';
import { CategoryValueInterface } from './data/category-value.interface';
import { Observable } from 'rxjs/Observable';

@Component({
    selector:  'terra-category-picker',
    template:  require('./terra-category-picker.component.html'),
    styles:    [require('./terra-category-picker.component.scss')],
    providers: [{
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TerraCategoryPickerComponent),
        multi:       true
    }]
})
export class TerraCategoryPickerComponent implements OnInit, ControlValueAccessor, AfterContentChecked
{

    /**
     * @description Service, that is used to request the category data from the server
     */
    @Input() public inputCategoryService:TerraCategoryPickerBaseService;
    @Input() public inputIsDisabled:boolean;

    //private _value:CategoryValueInterface = {
    //    id:               null,
    //    isActive:         null,
    //    isOpen:           null,
    //    isVisible:        null,
    //    name:             "",
    //    tooltip:          "",
    //    tooltipPlacement: ""
    //};

    private _value:number;
    private _completeCategory:CategoryValueInterface;
    private _toggleTree:boolean = false;
    private _categoryInputName:string = '';
    private _categoryInputValue:string = '';
    private _list:Array<TerraNodeInterface<CategoryTreeData>> = [];

    constructor(private translation:TranslationService,
                public categoryTreeConfig:CategoryTreeConfig)
    {
        this._categoryInputName = this.translation.translate('contentBuilder.category');
    }

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback:() => void = () =>
    {
    };

    private onChangeCallback:(_:any) => void = (_) =>
    {
    };

    public ngAfterContentChecked():void
    {
        if(this.categoryTreeConfig.list.length == 0)
        {
            this.categoryTreeConfig.list = this._list;
        }
    }

    public ngOnInit():void
    {
        this.categoryTreeConfig.list = this._list;
        this.getCategoriesByParent(null);
    }

    private getCategoriesByParentId(parentId:number | string):() => Observable<any>
    {
        return () => this.getCategories(parentId);
    }

    private getCategories(parentId:number | string):Observable<CategoryPagerDataInterface>
    {
        let obs:Observable<CategoryPagerDataInterface> = this.inputCategoryService.requestCategoryData(parentId);

        obs.subscribe((data:CategoryPagerDataInterface) =>
        {
            this.addNodes(data, parentId);
        });


        return obs;
    }

    private getCategoriesByParent(parentNode:TerraNodeInterface<CategoryTreeData>)
    {
        let id:number | string = null;

        if(!isNullOrUndefined(parentNode))
        {
            id = parentNode.id;
        }

        this.inputCategoryService.requestCategoryData(id).subscribe((data:CategoryPagerDataInterface) =>
        {
            if(isNullOrUndefined(parentNode))
            {
                this.addNodes(data, id);
            }
            else
            {
                this.addNodes(data, parentNode.id);
            }
        });
    }


    private addNodes(data:CategoryPagerDataInterface, parentNodeId:number | string):void
    {
        let entries:Array<CategoryDataInterface> = data.entries;

        for(let index in entries)
        {
            let categoryData:CategoryDataInterface = entries[index];
            let categoryDetail:CategoryDetailDataInterface = null;

            if(categoryData.type == 'container')
            {
                continue;
            }
            else
            {
                categoryDetail = categoryData.details[0];
            }

            let childNode:TerraNodeInterface<CategoryTreeData> = {
                id:               categoryData.id,
                name:             categoryDetail.name,
                isVisible:        true,
                tooltip:          'ID: ' + categoryData.id,
                tooltipPlacement: 'top',
            };

            let parentNode:TerraNodeInterface<CategoryTreeData>;

            if(isNullOrUndefined(parentNodeId))
            {
                parentNode = null;
            }
            else
            {
                parentNode = this.categoryTreeConfig.findNodeById(parentNodeId);
            }


            if(categoryData.hasChildren)
            {
                childNode.onLazyLoad = this.getCategoriesByParentId(childNode.id);
            }

            this.categoryTreeConfig.addNode(childNode, parentNode);
        }

        console.log(this.categoryTreeConfig.list);
    }

    public getCompleteCategoryObject():CategoryValueInterface
    {
        return this._completeCategory;
    }

    public get value():any
    {
        return this._value;
    };

    public set value(v:any)
    {
        if(v !== this._value && !isNullOrUndefined(v))
        {
            this._value = v.id;

            this._completeCategory = v.id;
            this._completeCategory.isActive = v.isActive;
            this._completeCategory.isOpen = v.isOpen;
            this._completeCategory.isVisible = v.isVisible;
            this._completeCategory.name = v.name;
            this._completeCategory.tooltip = v.tooltip;
            this._completeCategory.tooltipPlacement = v.tooltipPlacement;
            this.onTouchedCallback();
            this.onChangeCallback(this._value);
        }
    }

    //From ControlValueAccessor interface
    public writeValue(value:any):void
    {
        this.value = value;
    }

    //Set touched on blur
    public onBlur():void
    {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    registerOnChange(fn:any)
    {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn:any)
    {
        this.onTouchedCallback = fn;
    }

    public showTree():void
    {
        this._toggleTree = !this._toggleTree;
    }

    public onSelectNode():void
    {
        if(!isNullOrUndefined(this.categoryTreeConfig.currentSelectedNode))
        {
            this._categoryInputValue = this.categoryTreeConfig.currentSelectedNode.name;
            this.writeValue(this.categoryTreeConfig.currentSelectedNode);
        }
        this._toggleTree = !this._toggleTree;
    }
}
