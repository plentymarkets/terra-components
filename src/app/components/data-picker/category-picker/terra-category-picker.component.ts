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
import { TerraNodeInterface } from '../../tree/node-tree/data/terra-node.interface';
import { CategoryDataInterface } from './data/category-data.interface';
import { CategoryDetailDataInterface } from './data/category-detail-data.interface';
import { isNullOrUndefined } from 'util';
import { CategoryValueInterface } from './data/category-value.interface';
import { Observable } from 'rxjs/Observable';
import { TerraNestedDataPickerComponent } from '../nested-data-picker/terra-nested-data-picker.component';
import { NestedDataTreeConfig } from '../nested-data-picker/config/nested-data-tree.config';
import { NestedDataInterface } from '../nested-data-picker/data/nested-data.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { TerraNodeTreeConfig } from '../../tree/node-tree/data/terra-node-tree.config';
import { tap } from 'rxjs/operators';

@Component({
    selector:  'terra-category-picker',
    template:  require('./terra-category-picker.component.html'),
    styles:    [require('./terra-category-picker.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraCategoryPickerComponent),
            multi:       true
        },
        TerraNodeTreeConfig,
        NestedDataTreeConfig
    ]
})
export class TerraCategoryPickerComponent extends TerraNestedDataPickerComponent implements OnInit, AfterContentChecked
{

    /**
     * @description Service, that is used to request the category data from the server
     */
    @Input()
    public inputCategoryService:TerraCategoryPickerBaseService;

    /**
     * @description Language in which the categories shall be displayed
     */
    @Input()
    public inputLanguage:string;

    private completeCategory:CategoryValueInterface;

    private categoryName:string;
    private list:Array<TerraNodeInterface<NestedDataInterface<CategoryDataInterface>>>;
    private isContainerCategorySelected:boolean;

    constructor(public translation:TranslationService,
                public nestedTreeConfig:NestedDataTreeConfig<CategoryDataInterface>)
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
        if(this.nestedTreeConfig.list.length === 0)
        {
            this.nestedTreeConfig.list = this.list;
        }

        if(!isNullOrUndefined(this.nestedTreeConfig.currentSelectedNode) && !isNullOrUndefined(this.nestedTreeConfig.currentSelectedNode.value))
        {
            this.isContainerCategorySelected = (this.nestedTreeConfig.currentSelectedNode.value.data.type === 'container');
        }
    }

    public ngOnInit():void
    {
        if(isNullOrUndefined(this.inputName))
        {
            this.inputName = this.translation.translate('terraCategoryPicker.category');
        }
        this.nestedTreeConfig.list = this.list;
        this.getCategoriesByParent();
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
                if(isNullOrUndefined(this.nestedTreeConfig.findNodeById(value)))
                {
                    this.addNodes(data, null);
                }

                let nodeToSelect:TerraNodeInterface<NestedDataInterface<CategoryDataInterface>> = this.nestedTreeConfig.findNodeById(value);

                if(!isNullOrUndefined(nodeToSelect))
                {
                    this.nestedTreeConfig.currentSelectedNode = nodeToSelect;
                    this.categoryName = this.nestedTreeConfig.currentSelectedNode.name;
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

        if(!isNullOrUndefined(this.nestedTreeConfig.currentSelectedNode))
        {
            this.categoryName = this.nestedTreeConfig.currentSelectedNode.name;
            this.writeValue(this.nestedTreeConfig.currentSelectedNode.id);
        }
        this.toggleTree = !this.toggleTree;
    }

    public reset():void
    {
        this.nestedTreeConfig.currentSelectedNode = null;
        this.categoryName = '';
        this.value = 0;

        this.onTouchedCallback();
        this.onChangeCallback(this.value);
    }

    private updateCompleteCategory(category:TerraNodeInterface<NestedDataInterface<CategoryDataInterface>>):void
    {
        this.completeCategory.id = +category.id;
        this.completeCategory.isActive = category.isActive;
        this.completeCategory.isOpen = category.isOpen;
        this.completeCategory.isVisible = category.isVisible;
        this.completeCategory.name = category.name;
        this.completeCategory.tooltip = category.tooltip;
        this.completeCategory.tooltipPlacement = category.tooltipPlacement;
    }

    private getCategoriesByParentId(parentId:number | string, level:number):Observable<TerraPagerInterface<CategoryDataInterface>>
    {
        return this.inputCategoryService.requestCategoryData(parentId, level).pipe(tap((data:TerraPagerInterface<CategoryDataInterface>) =>
        {
            this.addNodes(data, parentId);
        }));
    }

    public addNodes(data:any, parentNodeId:number | string):void
    {
        // List of Categories which will be turned into Nodes to add to the node tree
        let entries:Array<{}> = data.entries;

        // Necessary for re-initializing of the Node Tree after data was loaded
        if(this.nestedTreeConfig.list.length === 1 && this.nestedTreeConfig.list[0] === this.nestedTreeConfig.currentSelectedNode)
        {
            this.nestedTreeConfig.removeNodeById(this.nestedTreeConfig.currentSelectedNode.id);
            this.nestedTreeConfig.list = [];
        }

        if(!isNullOrUndefined(entries))
        {
            entries.forEach((entry:CategoryDataInterface) =>
            {
                let categoryData:CategoryDataInterface = entry;
                let categoryDetail:CategoryDetailDataInterface = null;

                // If the node hasn't already been added the routine will be started
                if(isNullOrUndefined(this.nestedTreeConfig.findNodeById(categoryData.id)) && categoryData.details.length > 0)
                {
                    if(!isNullOrUndefined(this.inputLanguage))
                    {
                        categoryDetail = categoryData.details.find((foundDetail:CategoryDetailDataInterface) =>
                        {
                            return foundDetail.lang === this.inputLanguage;
                        });

                        // No details found with the given language so just use the first language instead
                        if(isNullOrUndefined(categoryDetail))
                        {
                            categoryDetail = categoryData.details[0];
                        }
                    }
                    else // Downwardcompatability
                    {
                        categoryDetail = categoryData.details[0];
                    }

                    // Create Node to add to tree later
                    let childNode:TerraNodeInterface<NestedDataInterface<CategoryDataInterface>> = {
                        id:               categoryData.id,
                        name:             categoryDetail.name,
                        isVisible:        true,
                        tooltip:          'ID: ' + categoryData.id,
                        tooltipPlacement: 'top',
                        value:            {
                            data: categoryData
                        }
                    };

                    let parentNode:TerraNodeInterface<NestedDataInterface<CategoryDataInterface>>;

                    // If the category has a parent, the parent node is created from the parentId in the category data
                    if(!isNullOrUndefined(categoryData.parentCategoryId))
                    {
                        parentNode = this.nestedTreeConfig.findNodeById(categoryData.parentCategoryId);
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
                            parentNode = this.nestedTreeConfig.findNodeById(parentNodeId);
                        }
                    }

                    // If the category has children the lazy-loading method will be added to the parent node
                    if(categoryData.hasChildren)
                    {
                        childNode.onLazyLoad = ():Observable<TerraPagerInterface<CategoryDataInterface>> =>
                            this.getCategoriesByParentId(categoryData.id, categoryData.level + 1);
                    }

                    // The finished node is added to the node tree
                    this.nestedTreeConfig.addNode(childNode, parentNode);
                }
            });
        }
        // Current List is updated
        this.list = this.nestedTreeConfig.list;
    }

    private getCategoriesByParent():void
    {
        this.inputCategoryService.requestCategoryData(null, 1).subscribe((data:TerraPagerInterface<CategoryDataInterface>) =>
        {
            this.addNodes(data, null);
        });
    }
}
