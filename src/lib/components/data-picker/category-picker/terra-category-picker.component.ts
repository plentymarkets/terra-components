import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { L10nTranslationService } from 'angular-l10n';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraCategoryPickerBaseService } from './service/terra-category-picker-base.service';
import { TerraNodeInterface } from '../../tree/node-tree/data/terra-node.interface';
import { CategoryDataInterface } from './data/category-data.interface';
import { CategoryDetailDataInterface } from './data/category-detail-data.interface';
import { isNullOrUndefined } from 'util';
import { CategoryValueInterface } from './data/category-value.interface';
import { TerraNestedDataPickerComponent } from '../nested-data-picker/terra-nested-data-picker.component';
import { NestedDataTreeConfig } from '../nested-data-picker/config/nested-data-tree.config';
import { NestedDataInterface } from '../nested-data-picker/data/nested-data.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'terra-category-picker',
    templateUrl: './terra-category-picker.component.html',
    styleUrls: ['./terra-category-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraCategoryPickerComponent,
            multi: true
        },
        NestedDataTreeConfig
    ]
})
export class TerraCategoryPickerComponent
    extends TerraNestedDataPickerComponent
    implements OnInit, AfterContentChecked {
    /**
     * @description Service, that is used to request the category data from the server
     */
    @Input()
    public inputCategoryService: TerraCategoryPickerBaseService;

    /**
     * @description Language in which the categories shall be displayed
     */
    @Input()
    public inputLanguage: string;

    /**
     * @description PlentyId of the shop that is currently being worked on
     */
    @Input()
    public inputPlentyId: number;

    public _categoryName: string;
    public _isContainerCategorySelected: boolean;

    private readonly _completeCategory: CategoryValueInterface;
    private _list: Array<TerraNodeInterface<NestedDataInterface<CategoryDataInterface>>>;

    constructor(
        translation: L10nTranslationService,
        public _nestedTreeConfig: NestedDataTreeConfig<CategoryDataInterface>
    ) {
        super(translation, _nestedTreeConfig);
        this.value = 0;
        this._completeCategory = {
            id: null,
            isActive: null,
            isOpen: null,
            isVisible: null,
            name: '',
            tooltip: '',
            tooltipPlacement: ''
        };
        this._categoryName = '';
        this._list = [];
        this._isContainerCategorySelected = false;
        this._isNotInitialCall = false;
    }

    public ngAfterContentChecked(): void {
        if (this._nestedTreeConfig.list.length === 0) {
            this._nestedTreeConfig.list = this._list;
        }

        if (
            !isNullOrUndefined(this._nestedTreeConfig.currentSelectedNode) &&
            !isNullOrUndefined(this._nestedTreeConfig.currentSelectedNode.value)
        ) {
            this._isContainerCategorySelected =
                this._nestedTreeConfig.currentSelectedNode.value.data.type === 'container';
        }
    }

    public ngOnInit(): void {
        if (isNullOrUndefined(this.inputName)) {
            this.inputName = this._translation.translate('terraCategoryPicker.category');
        }
        this._nestedTreeConfig.list = this._list;
        this._getCategoriesByParent();
    }

    public getCompleteCategoryObject(): CategoryValueInterface {
        return this._completeCategory;
    }

    // From ControlValueAccessor interface
    public writeValue(value: any): void {
        if (!isNullOrUndefined(value) && value !== {} && value !== 0) {
            this.inputCategoryService.requestCategoryDataById(value).subscribe((data: any) => {
                if (isNullOrUndefined(this._nestedTreeConfig.findNodeById(value))) {
                    this.addNodes(data, null);
                }

                let nodeToSelect: TerraNodeInterface<NestedDataInterface<
                    CategoryDataInterface
                >> = this._nestedTreeConfig.findNodeById(value);

                if (!isNullOrUndefined(nodeToSelect)) {
                    this._nestedTreeConfig.currentSelectedNode = nodeToSelect;
                    this._categoryName = this._nestedTreeConfig.currentSelectedNode.name;
                }

                this.value = value;

                if (this._isNotInitialCall && nodeToSelect) {
                    this._updateCompleteCategory(nodeToSelect);
                    this._onTouchedCallback();
                    this._onChangeCallback(this.value);
                }
            });
        } else {
            this._nestedTreeConfig.currentSelectedNode = null;
            this._categoryName = '';
            this.value = null;
        }
    }

    public onSelectNode(): void {
        this._isNotInitialCall = true;

        if (!isNullOrUndefined(this._nestedTreeConfig.currentSelectedNode)) {
            this._categoryName = this._nestedTreeConfig.currentSelectedNode.name;
            this.writeValue(this._nestedTreeConfig.currentSelectedNode.id);
        }
        this.toggleTree = !this.toggleTree;
    }

    public reset(): void {
        this._nestedTreeConfig.currentSelectedNode = null;
        this._categoryName = '';
        this.value = 0;

        this._onTouchedCallback();
        this._onChangeCallback(this.value);
    }

    public addNodes(data: any, parentNodeId: number | string): void {
        // List of Categories which will be turned into Nodes to add to the node tree
        let entries: Array<{}> = data.entries;

        // Necessary for re-initializing of the Node Tree after data was loaded
        if (
            this._nestedTreeConfig.list.length === 1 &&
            this._nestedTreeConfig.list[0] === this._nestedTreeConfig.currentSelectedNode
        ) {
            this._nestedTreeConfig.removeNodeById(this._nestedTreeConfig.currentSelectedNode.id);
            this._nestedTreeConfig.list = [];
        }

        if (!isNullOrUndefined(entries)) {
            entries.forEach((entry: CategoryDataInterface) => {
                let categoryData: CategoryDataInterface = entry;
                let categoryDetail: CategoryDetailDataInterface = null;

                // If the node hasn't already been added the routine will be started
                if (
                    isNullOrUndefined(this._nestedTreeConfig.findNodeById(categoryData.id)) &&
                    categoryData.details.length > 0
                ) {
                    if (!isNullOrUndefined(this.inputLanguage)) {
                        categoryDetail = this._findCategoryDetails(categoryData);
                    } else if (categoryData.details.length > 0) {
                        // Downwardcompatability
                        categoryDetail = categoryData.details[0];
                    }

                    // Create Node to add to tree later
                    let childNode: TerraNodeInterface<NestedDataInterface<CategoryDataInterface>> = {
                        id: categoryData.id,
                        name: categoryDetail.name,
                        isVisible: true,
                        tooltip: 'ID: ' + categoryData.id,
                        tooltipPlacement: 'top',
                        tooltipOnlyEllipsis: false,
                        value: {
                            data: categoryData
                        }
                    };

                    let parentNode: TerraNodeInterface<NestedDataInterface<CategoryDataInterface>>;

                    // If the category has a parent, the parent node is created from the parentId in the category data
                    if (!isNullOrUndefined(categoryData.parentCategoryId)) {
                        parentNode = this._nestedTreeConfig.findNodeById(categoryData.parentCategoryId);
                    }

                    // If the parentNode is still null it is tried to create the parent node out of the given id
                    if (isNullOrUndefined(parentNode)) {
                        parentNode = this._nestedTreeConfig.findNodeById(parentNodeId);
                    }

                    // If the category has children the lazy-loading method will be added to the parent node
                    if (categoryData.hasChildren) {
                        childNode.onLazyLoad = (): Observable<TerraPagerInterface<CategoryDataInterface>> =>
                            this._getCategoriesByParentId(categoryData.id, categoryData.level + 1);
                    }

                    // The finished node is added to the node tree
                    this._nestedTreeConfig.addNode(childNode, parentNode);
                }
            });
        }
        // Current List is updated
        this._list = this._nestedTreeConfig.list;
    }

    private _updateCompleteCategory(category: TerraNodeInterface<NestedDataInterface<CategoryDataInterface>>): void {
        this._completeCategory.id = +category.id;
        this._completeCategory.isActive = category.isActive;
        this._completeCategory.isOpen = category.isOpen;
        this._completeCategory.isVisible = category.isVisible;
        this._completeCategory.name = category.name;
        this._completeCategory.tooltip = category.tooltip;
        this._completeCategory.tooltipPlacement = category.tooltipPlacement;
    }

    private _getCategoriesByParentId(
        parentId: number | string,
        level: number
    ): Observable<TerraPagerInterface<CategoryDataInterface>> {
        return this.inputCategoryService.requestCategoryData(parentId, level).pipe(
            tap((data: TerraPagerInterface<CategoryDataInterface>) => {
                this.addNodes(data, parentId);
            })
        );
    }

    private _findCategoryDetails(categoryData: CategoryDataInterface): CategoryDetailDataInterface {
        let categoryDetail: CategoryDetailDataInterface;

        categoryDetail = categoryData.details.find((foundDetail: CategoryDetailDataInterface) => {
            return (
                foundDetail.lang === this.inputLanguage &&
                (foundDetail.plentyId === this.inputPlentyId || isNullOrUndefined(this.inputPlentyId))
            );
        });

        // Check if there is a detail only for the language
        if (isNullOrUndefined(categoryDetail)) {
            categoryDetail = categoryData.details.find((foundDetail: CategoryDetailDataInterface) => {
                return foundDetail.lang === this.inputLanguage;
            });
        }

        // Check if there is a detail only for the plentyId
        if (isNullOrUndefined(categoryDetail)) {
            categoryDetail = categoryData.details.find((foundDetail: CategoryDetailDataInterface) => {
                return foundDetail.plentyId === this.inputPlentyId || isNullOrUndefined(this.inputPlentyId);
            });
        }

        // No details found with the given language and the given plentyId so just use the first language instead
        if (isNullOrUndefined(categoryDetail) && categoryData.details.length > 0) {
            categoryDetail = categoryData.details[0];
        }

        return categoryDetail;
    }

    private _getCategoriesByParent(): void {
        this.inputCategoryService
            .requestCategoryData(null, 1)
            .subscribe((data: TerraPagerInterface<CategoryDataInterface>) => {
                this.addNodes(data, null);
            });
    }
}
