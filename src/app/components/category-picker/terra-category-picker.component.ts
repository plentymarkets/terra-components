import {
    AfterContentChecked,
    Component,
    forwardRef,
    Input,
    OnInit
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraCategoryPickerBaseService } from './service/terra-category-picker-base.service';
import { CategoryTreeConfig } from './config/category-tree.config';
import { TerraNodeInterface } from '../tree/node-tree/data/terra-node.interface';
import { CategoryTreeData } from './data/category-tree.data';
import { CategoryDataInterface } from './data/category-data.interface';
import { CategoryDetailDataInterface } from './data/category-detail-data.interface';
import { isNullOrUndefined } from 'util';
import { CategoryPagerDataInterface } from './data/category-pager-data.interface';

@Component({
    selector:  'terra-category-picker',
    template:  require('./terra-category-picker.component.html'),
    styles:    [
        require('./terra-category-picker.component.scss').toString()
    ],
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
    @Input() inputCategoryService:TerraCategoryPickerBaseService;

    private _value:TerraNodeInterface<CategoryTreeData>;
    private _toggleTree:boolean = false;
    private _categoryInputName:string = '';
    private _categoryInputValue:string = '';

    private _onChangeCallback:(value:any) => void;
    private _onTouchedCallback:(value:any) => void;
    private _list:Array<TerraNodeInterface<CategoryTreeData>> = [];

    constructor(private translation:TranslationService,
                public categoryTreeConfig:CategoryTreeConfig)
    {
        this._categoryInputName = this.translation.translate('contentBuilder.category');
        // initialize callbacks
        this._onChangeCallback = (value:any) => {
        };
        this._onTouchedCallback = (value:any) => {
        };
    }

    ngAfterContentChecked():void
    {
        this.categoryTreeConfig.list = this._list;
    }

    public ngOnInit():void
    {
        this.categoryTreeConfig.list = this._list;
        this.getCategoriesByParent(null);
    }

    private getCategoriesByParent(parentNode:TerraNodeInterface<CategoryTreeData>)
    {
        let id:number | string = null;

        if(!isNullOrUndefined(parentNode))
        {
            id = parentNode.id;
        }

        this.inputCategoryService.requestCategoryData(id).subscribe((data:CategoryPagerDataInterface) => {
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

                let childNode = {
                    id:               categoryData.id,
                    name:             categoryDetail.name,
                    isVisible:        true,
                    tooltip:          'ID: ' + categoryData.id,
                    tooltipPlacement: 'top'
                };

                this.categoryTreeConfig.addNode(childNode, parentNode);
                if(categoryData.hasChildren)
                {
                    this.getCategoriesByParent(childNode);
                }
            }
        });
    }

    public get value():any
    {
        return this._value;
    };

    public set value(v:any)
    {
        if(v !== this._value)
        {
            this._value = v;
            this._onChangeCallback(this._value);
        }
    }

    public writeValue(value:TerraNodeInterface<CategoryTreeData>):void
    {
        this._value = value;
    }

    public registerOnChange(fn:any):void
    {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this._onTouchedCallback = fn;
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
