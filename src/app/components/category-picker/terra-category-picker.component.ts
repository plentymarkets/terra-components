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
    },
        CategoryTreeConfig]
})
export class TerraCategoryPickerComponent implements OnInit, AfterContentChecked
{

    /**
     * @description Service, that is used to request the category data from the server
     */
    @Input() public inputCategoryService:TerraCategoryPickerBaseService;
    @Input() public inputIsDisabled:boolean;
    @Input() public inputName:string;

    private _value:number = 0;
    private _completeCategory:CategoryValueInterface = {
        id:               null,
        isActive:         null,
        isOpen:           null,
        isVisible:        null,
        name:             '',
        tooltip:          '',
        tooltipPlacement: '',
    };

    private _toggleTree:boolean = false;
    private _categoryName:string = '';
    private _list:Array<TerraNodeInterface<CategoryTreeData>> = [];

    constructor(private translation:TranslationService,
                public categoryTreeConfig:CategoryTreeConfig)
    {
    }

    public ngAfterContentChecked():void
    {
        if(this.categoryTreeConfig.list.length === 0)
        {
            this.categoryTreeConfig.list = this._list;
        }
    }

    public ngOnInit():void
    {
        if (isNullOrUndefined(this.inputName))
        {
            this.inputName = this.translation.translate('terraCategoryPicker.category');
        }
        this.categoryTreeConfig.list = this._list;
        this.getCategoriesByParent(null);
    }

    public getCompleteCategoryObject():CategoryValueInterface
    {
        return this._completeCategory;
    }

    // From ControlValueAccessor interface
    public writeValue(value:any):void
    {
        if(!isNullOrUndefined(value))
        {
            this.inputCategoryService.requestCategoryDataById(value).subscribe((data:any) =>
            {
                if(isNullOrUndefined(this.categoryTreeConfig.findNodeById(value)))
                {
                    this.addNodes(data, null);
                }

                    let nodeToSelect:TerraNodeInterface<CategoryTreeData> = this.categoryTreeConfig.findNodeById(value);

                    if(!isNullOrUndefined(nodeToSelect))
                    {
                        this.categoryTreeConfig.currentSelectedNode = nodeToSelect;
                        this._categoryName = this.categoryTreeConfig.currentSelectedNode.name;
                    }

                    this._value = value;
                    this.updateCompleteCategory(nodeToSelect);
                    this.onTouchedCallback();
                    this.onChangeCallback(this._value);
            });
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
        this._toggleTree = !this._toggleTree;
    }

    public onSelectNode():void
    {
        if(!isNullOrUndefined(this.categoryTreeConfig.currentSelectedNode))
        {
            this._categoryName = this.categoryTreeConfig.currentSelectedNode.name;
            this.writeValue(this.categoryTreeConfig.currentSelectedNode.id);
        }
        this._toggleTree = !this._toggleTree;
    }

    public reset():void
    {
        this.categoryTreeConfig.currentSelectedNode = {
            id:               null,
            isActive:         null,
            isOpen:           null,
            isVisible:        null,
            name:             '',
            tooltip:          '',
            tooltipPlacement: '',
        };
        this._categoryName = '';
        this._value = 0;

        this.onTouchedCallback();
        this.onChangeCallback(this._value);
    }

     private updateCompleteCategory(category:TerraNodeInterface<CategoryTreeData>):void
     {
        this._completeCategory.id = +category.id;
        this._completeCategory.isActive = category.isActive;
        this._completeCategory.isOpen = category.isOpen;
        this._completeCategory.isVisible = category.isVisible;
        this._completeCategory.name = category.name;
        this._completeCategory.tooltip = category.tooltip;
        this._completeCategory.tooltipPlacement = category.tooltipPlacement;
     }

    private getCategoriesByParentId(parentId:number | string):() => Observable<any>
    {
        return ():Observable<CategoryPagerDataInterface> => this.getCategories(parentId);
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

    private addNodes(data:any, parentNodeId:number | string):void
    {

        // List of Categories wich will be turned into Nodes to add to the node tree
        let entries:Array<CategoryDataInterface> = data.entries;

        // Necessary for re-initialzing of the Node Tree after data was loaded
        if(this.categoryTreeConfig.list.length === 1 && this.categoryTreeConfig.list[0] === this.categoryTreeConfig.currentSelectedNode)
        {
            this.categoryTreeConfig.removeNodeById(this.categoryTreeConfig.currentSelectedNode.id);
            this.categoryTreeConfig.list = [];
        }

        if(!isNullOrUndefined(entries))
        {
            entries.forEach((entry:any) =>
            {
                let categoryData:CategoryDataInterface = entry;
                let categoryDetail:CategoryDetailDataInterface = null;

                if(isNullOrUndefined(this.categoryTreeConfig.findNodeById(categoryData.id)))
                {
                    if(categoryData.type === 'container')
                    {
                        return;
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
                        tooltipPlacement: 'top'
                    };

                    let parentNode:TerraNodeInterface<CategoryTreeData>;

                    if(!isNullOrUndefined(categoryData.parentCategoryId))
                    {
                        parentNode = this.categoryTreeConfig.findNodeById(categoryData.parentCategoryId);
                    }

                    if(isNullOrUndefined(parentNode))
                    {
                        if(isNullOrUndefined(parentNodeId))
                        {
                            parentNode = null;
                        }
                        else
                        {
                            parentNode = this.categoryTreeConfig.findNodeById(parentNodeId);
                        }
                    }


                    if(categoryData.hasChildren)
                    {
                        childNode.onLazyLoad = this.getCategoriesByParentId(childNode.id);
                    }
                    this.categoryTreeConfig.addNode(childNode, parentNode);
                }
            });
        }

        this._list = this.categoryTreeConfig.list;
    }

    private getCategoriesByParent(parentNode:TerraNodeInterface<CategoryTreeData>):void
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

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback:() => void = () => undefined;

    private onChangeCallback:(_:any) => void = () => undefined;
}
