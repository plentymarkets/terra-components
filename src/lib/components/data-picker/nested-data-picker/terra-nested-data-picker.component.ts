import { AfterContentChecked, Component, Inject, Input, OnInit } from '@angular/core';
import { L10nLocale, L10nTranslationService, L10N_LOCALE } from 'angular-l10n';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NestedDataTreeConfig } from './config/nested-data-tree.config';
import { NestedDataInterface } from './data/nested-data.interface';
import { TerraNodeInterface } from '../../tree/node-tree/data/terra-node.interface';
import { isNullOrUndefined } from 'util';
import { NestedValueInterface } from './data/nested-value.interface';
import { TerraNestedDataPickerBaseService } from './service/terra-nested-data-picker-base.service';
import { TerraNodeTreeConfig } from '../../tree/node-tree/data/terra-node-tree.config';
import { NestedDetailDataInterface } from './data/nested-detail-data.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { noop, Observable } from 'rxjs';

@Component({
    selector: 'terra-nested-data-picker',
    templateUrl: './terra-nested-data-picker.component.html',
    styleUrls: ['./terra-nested-data-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraNestedDataPickerComponent,
            multi: true
        },
        NestedDataTreeConfig,
        TerraNodeTreeConfig
    ]
})
export class TerraNestedDataPickerComponent implements OnInit, AfterContentChecked {
    /**
     * @description Service, that is used to request the nested data from the server
     */
    @Input()
    public inputNestedService: TerraNestedDataPickerBaseService<{}>;

    @Input()
    public inputIsDisabled: boolean;

    /**
     * @description Tooltip that is shown on the TextInput
     */
    @Input()
    public inputTooltipText: string;

    @Input()
    public inputName: string;

    @Input()
    public displayResetButton: boolean = false;
    @Input()
    public displaySearch: boolean = false;

    @Input()
    public showFullSelectionPath: boolean = false;

    public toggleTree: boolean = false;

    public _nestedDataName: string;

    public value: number | string;
    protected _isNotInitialCall: boolean;

    protected _onTouchedCallback: () => void = noop;
    protected _onChangeCallback: (_: any) => void = noop;

    private _completeNestedData: NestedValueInterface;
    private _nestedList: Array<TerraNodeInterface<NestedDataInterface<{}>>>;

    constructor(
        @Inject(L10N_LOCALE) public _locale: L10nLocale,
        public _translation: L10nTranslationService,
        public _nestedTreeConfig: TerraNodeTreeConfig<{}>
    ) {
        this.value = null;
        this._completeNestedData = {
            id: null,
            isActive: null,
            isOpen: null,
            isVisible: null,
            name: '',
            tooltip: '',
            tooltipPlacement: ''
        };
        this._nestedList = [];
        this._nestedDataName = '';
        this._isNotInitialCall = false;
    }

    public ngAfterContentChecked(): void {
        if (this._nestedTreeConfig.list.length === 0) {
            this._nestedTreeConfig.list = this._nestedList;
        }
    }

    public ngOnInit(): void {
        if (isNullOrUndefined(this.inputName)) {
            this.inputName = this._translation.translate('terraNestedDataPicker.nested');
        }
        this._nestedTreeConfig.list = this._nestedList;
        this.getNestedDataByParent(null);
    }

    // From ControlValueAccessor interface
    public writeValue(value: any): void {
        if (!isNullOrUndefined(value)) {
            this.inputNestedService.requestNestedDataById(value).subscribe((data: any) => {
                if (isNullOrUndefined(this._nestedTreeConfig.findNodeById(value))) {
                    this.addNodes(data, null);
                }

                let nodeToSelect: TerraNodeInterface<NestedDataInterface<{}>> = this._nestedTreeConfig.findNodeById(
                    value
                );

                if (!isNullOrUndefined(nodeToSelect)) {
                    this._nestedTreeConfig.currentSelectedNode = nodeToSelect;
                    if (
                        this.showFullSelectionPath &&
                        !isNullOrUndefined(this._nestedTreeConfig.currentSelectedNode.parent)
                    ) {
                        this._nestedDataName =
                            this._nestedTreeConfig.currentSelectedNode.parent.name +
                            ' / ' +
                            this._nestedTreeConfig.currentSelectedNode.name;
                    } else {
                        this._nestedDataName = this._nestedTreeConfig.currentSelectedNode.name;
                    }
                }

                this.value = value;

                if (this._isNotInitialCall) {
                    this.updateCompleteNestedData(nodeToSelect);
                    this._onTouchedCallback();
                    this._onChangeCallback(this.value);
                }
            });
        }
    }

    public onSelectNode(): void {
        this._isNotInitialCall = true;
        if (!isNullOrUndefined(this._nestedTreeConfig.currentSelectedNode)) {
            if (this.showFullSelectionPath && !isNullOrUndefined(this._nestedTreeConfig.currentSelectedNode.parent)) {
                this._nestedDataName =
                    this._nestedTreeConfig.currentSelectedNode.parent.name +
                    ' / ' +
                    this._nestedTreeConfig.currentSelectedNode.name;
            } else {
                this._nestedDataName = this._nestedTreeConfig.currentSelectedNode.name;
            }
            this.writeValue(this._nestedTreeConfig.currentSelectedNode.id);
        }
        this.toggleTree = !this.toggleTree;
    }

    public reset(): void {
        this._nestedTreeConfig.currentSelectedNode = null;
        this._nestedDataName = '';
        this.value = 0;

        this._onTouchedCallback();
        this._onChangeCallback(this.value);
    }

    // Set touched on blur
    public onBlur(): void {
        this._onTouchedCallback();
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: any): void {
        this._onTouchedCallback = fn;
    }

    public showTree(): void {
        this.toggleTree = !this.toggleTree;
    }

    public addNodes(nestedData: TerraPagerInterface<{}>, parentId: number | string): void {
        // List of Categories which will be turned into Nodes to add to the node tree
        let entries: Array<{}> = nestedData.entries;

        // Necessary for re-initializing of the Node Tree after data was loaded
        if (
            this._nestedTreeConfig.list.length === 1 &&
            this._nestedTreeConfig.list[0] === this._nestedTreeConfig.currentSelectedNode
        ) {
            this._nestedTreeConfig.removeNodeById(this._nestedTreeConfig.currentSelectedNode.id);
            this._nestedTreeConfig.list = [];
        }

        if (!isNullOrUndefined(entries)) {
            entries.forEach((entry: NestedDataInterface<{}>) => {
                let nestData: NestedDataInterface<{}> = entry;
                let nestedDetail: NestedDetailDataInterface = null;

                // If the node hasn't already been added the routine will be started
                if (
                    isNullOrUndefined(this._nestedTreeConfig.findNodeById(nestData.id)) &&
                    nestData.details.length > 0
                ) {
                    nestedDetail = nestData.details[0];

                    // Create Node to add to tree later
                    let childNode: TerraNodeInterface<NestedDataInterface<{}>> = {
                        id: entry.id,
                        name: nestedDetail.name,
                        isVisible: true,
                        tooltip: 'ID: ' + nestData.id,
                        tooltipPlacement: 'top',
                        value: {
                            data: nestData
                        }
                    };

                    let parentNode: TerraNodeInterface<NestedDataInterface<{}>>;

                    // If the category has a parent, the parent node is created from the parentId in the category data
                    if (!isNullOrUndefined(nestData.parentId)) {
                        parentNode = this._nestedTreeConfig.findNodeById(nestData.parentId);
                    }

                    // If the parentNode is still null it is tried to create the parent node out of the given id
                    if (isNullOrUndefined(parentNode)) {
                        parentNode = this._nestedTreeConfig.findNodeById(parentId);
                    }
                    // If the category has children the lazy-loading method will be added to the parent node
                    if (nestData.hasChildren) {
                        childNode.onLazyLoad = this.getNestedDataByParentId(childNode.id);
                    }

                    // The finished node is added to the node tree
                    this._nestedTreeConfig.addNode(childNode, parentNode);
                }
            });
        }
        // Current List is updated
        this._nestedList = this._nestedTreeConfig.list;
    }

    private updateCompleteNestedData(nested: TerraNodeInterface<NestedDataInterface<{}>>): void {
        this._completeNestedData.id = +nested.id;
        this._completeNestedData.isActive = nested.isActive;
        this._completeNestedData.isOpen = nested.isOpen;
        this._completeNestedData.isVisible = nested.isVisible;
        this._completeNestedData.name = nested.name;
        this._completeNestedData.tooltip = nested.tooltip;
        this._completeNestedData.tooltipPlacement = nested.tooltipPlacement;
    }

    private getNestedData(parentId: number | string): Observable<TerraPagerInterface<{}>> {
        let obs: Observable<TerraPagerInterface<{}>> = this.inputNestedService.requestNestedData(parentId);

        obs.subscribe((data: TerraPagerInterface<{}>) => {
            this.addNodes(data, parentId);
        });

        return obs;
    }

    private getNestedDataByParent(parentNode: NestedDataInterface<{}>): void {
        let id: number | string = null;

        if (!isNullOrUndefined(parentNode)) {
            id = parentNode.id;
        }

        this.inputNestedService.requestNestedData(id).subscribe((data: TerraPagerInterface<{}>) => {
            if (isNullOrUndefined(parentNode)) {
                this.addNodes(data, id);
            } else {
                this.addNodes(data, parentNode.id);
            }
        });
    }

    private getNestedDataByParentId(parentId: number | string): () => Observable<TerraPagerInterface<{}>> {
        return (): Observable<TerraPagerInterface<{}>> => this.getNestedData(parentId);
    }
}
