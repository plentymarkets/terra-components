import {
    AfterContentChecked,
    Component,
    forwardRef,
    Input,
    OnInit
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraCategoryPickerBaseService } from './service/terra-category-picker-base.service';
import { CategoryTreeConfig } from './config/category-tree.config';
import { TerraNodeInterface } from '../tree/node-tree/data/terra-node.interface';
import { CategoryDataInterface } from './data/category-data.interface';
import { CategoryDetailDataInterface } from './data/category-detail-data.interface';
import { isNullOrUndefined } from 'util';
import { CategoryPagerDataInterface } from './data/category-pager-data.interface';
import { CategoryValueInterface } from './data/category-value.interface';
import { Observable } from 'rxjs/Observable';
import { TerraNestedDataPickerComponent } from '../nested-data-picker/terra-nested-data-picker.component';
import { NestedDataTreeConfig } from '../nested-data-picker/config/nested-data-tree.config';

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
export class TerraCategoryPickerComponent extends TerraNestedDataPickerComponent implements OnInit, AfterContentChecked
{

    /**
     * @description Service, that is used to request the category data from the server
     */
    @Input()
    public inputCategoryService:TerraCategoryPickerBaseService;

    private completeCategory:CategoryValueInterface;

    private categoryName:string;
    private list:Array<TerraNodeInterface<CategoryDataInterface>>;
    private isContainerCategorySelected:boolean;

    constructor(public translation:TranslationService,
                public categoryTreeConfig:CategoryTreeConfig,
                public nestedTreeConfig:NestedDataTreeConfig)
    {
        super(translation, nestedTreeConfig);
        this.value = 0;
        this.completeCategory = {
            id:               null,
            isActive:         null,
            isOpen:           null,
            isVisible:        null,
            name:             '',
            tooltip:          '',
            tooltipPlacement: '',
        };
        this.categoryName = '';
        this.list = [];
        this.isContainerCategorySelected = false;
        this.isNotInitialCall = false;
    }

    public ngAfterContentChecked():void
    {
        if(this.categoryTreeConfig.list.length === 0)
        {
            this.categoryTreeConfig.list = this.list;
        }

        if(!isNullOrUndefined(this.categoryTreeConfig.currentSelectedNode) && !isNullOrUndefined(this.categoryTreeConfig.currentSelectedNode.value))
        {
            this.isContainerCategorySelected = (this.categoryTreeConfig.currentSelectedNode.value.type === 'container');
        }
    }

    public ngOnInit():void
    {
        if(isNullOrUndefined(this.inputName))
        {
            this.inputName = this.translation.translate('terraCategoryPicker.category');
        }
        this.categoryTreeConfig.list = this.list;
        this.getCategoriesByParent(null);
    }

    public getCompleteCategoryObject():CategoryValueInterface
    {
        return this.completeCategory;
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

                let nodeToSelect:TerraNodeInterface<CategoryDataInterface> = this.categoryTreeConfig.findNodeById(value);

                if(!isNullOrUndefined(nodeToSelect))
                {
                    this.categoryTreeConfig.currentSelectedNode = nodeToSelect;
                    this.categoryName = this.categoryTreeConfig.currentSelectedNode.name;
                }

                this.value = value;

                if(this.isNotInitialCall)
                {
                    this.updateCompleteCategory(nodeToSelect);
                    this.onTouchedCallback();
                    this.onChangeCallback(this.value);
                }
            });
        }
    }
    public onSelectNode():void
    {
        this.isNotInitialCall = true;

        if(!isNullOrUndefined(this.categoryTreeConfig.currentSelectedNode))
        {
            this.categoryName = this.categoryTreeConfig.currentSelectedNode.name;
            this.writeValue(this.categoryTreeConfig.currentSelectedNode.id);
        }
        this.toggleTree = !this.toggleTree;
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
        this.categoryName = '';
        this.value = 0;

        this.onTouchedCallback();
        this.onChangeCallback(this.value);
    }

    private updateCompleteCategory(category:TerraNodeInterface<CategoryDataInterface>):void
    {
        this.completeCategory.id = +category.id;
        this.completeCategory.isActive = category.isActive;
        this.completeCategory.isOpen = category.isOpen;
        this.completeCategory.isVisible = category.isVisible;
        this.completeCategory.name = category.name;
        this.completeCategory.tooltip = category.tooltip;
        this.completeCategory.tooltipPlacement = category.tooltipPlacement;
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

    public addNodes(data:any, parentNodeId:number | string):void
    {
        // List of Categories which will be turned into Nodes to add to the node tree
        let entries:Array<CategoryDataInterface> = data.entries;

        // Necessary for re-initializing of the Node Tree after data was loaded
        if(this.categoryTreeConfig.list.length === 1 && this.categoryTreeConfig.list[0] === this.categoryTreeConfig.currentSelectedNode)
        {
            this.categoryTreeConfig.removeNodeById(this.categoryTreeConfig.currentSelectedNode.id);
            this.categoryTreeConfig.list = [];
        }

        if(!isNullOrUndefined(entries))
        {
            entries.forEach((entry:CategoryDataInterface) =>
            {
                let categoryData:CategoryDataInterface = entry;
                let categoryDetail:CategoryDetailDataInterface = null;

                // If the node hasn't already been added the routine will be started
                if(isNullOrUndefined(this.categoryTreeConfig.findNodeById(categoryData.id)) && categoryData.details.length > 0)
                {
                    categoryDetail = categoryData.details[0];

                    // Create Node to add to tree later
                    let childNode:TerraNodeInterface<CategoryDataInterface> = {
                        id:               categoryData.id,
                        name:             categoryDetail.name,
                        isVisible:        true,
                        tooltip:          'ID: ' + categoryData.id,
                        tooltipPlacement: 'top',
                        value:            categoryData
                    };

                    let parentNode:TerraNodeInterface<CategoryDataInterface>;

                    // If the category has a parent, the parent node is created from the parentId in the category data
                    if(!isNullOrUndefined(categoryData.parentCategoryId))
                    {
                        parentNode = this.categoryTreeConfig.findNodeById(categoryData.parentCategoryId);
                    }

                    // If the parentNode is still null it is tried to create the parent node out of the given id
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

                    // If the category has children the lazy-loading method will be added to the parent node
                    if(categoryData.hasChildren)
                    {
                        childNode.onLazyLoad = this.getCategoriesByParentId(childNode.id);
                    }

                    // The finished node is added to the node tree
                    this.categoryTreeConfig.addNode(childNode, parentNode);
                }
            });
        }
        // Current List is updated
        this.list = this.categoryTreeConfig.list;
    }

    private getCategoriesByParent(parentNode:TerraNodeInterface<CategoryDataInterface>):void
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
}
