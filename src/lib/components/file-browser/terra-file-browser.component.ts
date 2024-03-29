import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TerraFrontendStorageService } from './terra-frontend-storage.service';
import { TerraStorageObject } from './model/terra-storage-object';
import { TerraBaseStorageService } from './terra-base-storage.interface';
import { TerraStorageObjectList } from './model/terra-storage-object-list';
import { StringHelper } from '../../helpers/string.helper';
import { TerraFileBrowser } from './terra-file-browser';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TerraFileBrowserNode } from './data/terra-file-browser-node.interface';

@Component({
    selector: 'terra-file-browser',
    templateUrl: './terra-file-browser.component.html',
    providers: [{ provide: TerraFileBrowser, useExisting: TerraFileBrowserComponent }]
})
export class TerraFileBrowserComponent extends TerraFileBrowser implements OnChanges, OnInit {
    @Input()
    public set inputAllowedExtensions(extensions: Array<string>) {
        this._allowedExtensions = extensions.map((extension: string) => extension.toUpperCase());
    }

    public get inputAllowedExtensions(): Array<string> {
        return this._allowedExtensions;
    }

    @Input()
    public inputAllowFolders: boolean = true;

    @Output()
    public outputSelectedChange: EventEmitter<TerraStorageObject> = new EventEmitter<TerraStorageObject>();

    public onSelectedUrlChange: EventEmitter<string> = new EventEmitter();

    public _treeControl: NestedTreeControl<TerraFileBrowserNode> = new NestedTreeControl<TerraFileBrowserNode>(
        (node: TerraFileBrowserNode): Array<TerraFileBrowserNode> => node.children
    );
    public _dataSource: MatTreeNestedDataSource<TerraFileBrowserNode> = new MatTreeNestedDataSource<
        TerraFileBrowserNode
    >();

    /** @description Notifies whenever the storage service or the storage root has been updated. */
    public updatedStorageRootAndService: EventEmitter<
        [TerraBaseStorageService, TerraStorageObject]
    > = new EventEmitter();

    public _rightColumnWidth: number = 0;
    public _centerColumnWidth: number = 10;
    public _currentSelectedNode: TerraFileBrowserNode;

    public _hasChild: (_: number, node: TerraFileBrowserNode) => boolean = (
        _: number,
        node: TerraFileBrowserNode
    ): boolean => node?.children?.length > 0;

    private _storageServices: Array<TerraBaseStorageService>;

    private _allowedExtensions: Array<string> = [];

    private readonly _defaultStorageServices: Array<TerraBaseStorageService>;

    @Input()
    public set inputStorageServices(services: Array<TerraBaseStorageService>) {
        this._storageServices = services;
    }

    public get inputStorageServices(): Array<TerraBaseStorageService> {
        if (this._storageServices?.length) {
            return this._storageServices;
        }

        return this._defaultStorageServices;
    }

    constructor(frontendStorageService: TerraFrontendStorageService) {
        super();
        this._defaultStorageServices = [frontendStorageService];
    }

    public ngOnInit(): void {
        if (!this._storageServices) {
            this._renderTree(this.inputStorageServices);
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('inputStorageServices')) {
            this._renderTree(changes['inputStorageServices'].currentValue);
        }
    }

    public selectNode(storage: TerraStorageObject): void {
        // check if storage is new by checking if parent exists
        if (!storage.parent) {
            // and reassign the data to get the tree updated
            const copy: Array<TerraFileBrowserNode> = this._dataSource.data;
            this._dataSource.data = [];
            this._dataSource.data = copy;

            // use current selected node here since the new folder is added but not opened
            this._recursiveExpandParents(this._currentSelectedNode);
        }

        const foundNode: TerraFileBrowserNode = this._recursiveFindNodeByKey(this._dataSource.data, storage.key);

        if (foundNode) {
            this._treeControl.expand(foundNode);
        }
    }

    public selectUrl(publicUrl: string): void {
        this.onSelectedUrlChange.emit(publicUrl);
    }

    public _showImagePreview(isPreviewEnabled: boolean): void {
        if (isPreviewEnabled) {
            this._centerColumnWidth = 8;
            this._rightColumnWidth = 2;
        } else {
            this._hideImagePreview();
        }
    }

    public _hideImagePreview(): void {
        this._centerColumnWidth = 10;
        this._rightColumnWidth = 0;
    }

    public _onNodeClick(event: MouseEvent, node: TerraFileBrowserNode): void {
        event.stopPropagation();

        if (node.onClick) {
            node.onClick();
        }

        this._currentSelectedNode = node;
    }

    private _recursiveExpandParents(node: TerraFileBrowserNode): void {
        const parentNode: TerraFileBrowserNode = this._recursiveFindNodeByKey(this._dataSource.data, node.parentKey);

        if (parentNode && !this._treeControl.isExpanded(parentNode)) {
            this._treeControl.expand(parentNode);

            this._recursiveExpandParents(parentNode);
        }
    }

    private _recursiveFindNodeByKey(nodeList: Array<TerraFileBrowserNode>, key: string): TerraFileBrowserNode {
        let foundNode: TerraFileBrowserNode = null;

        if (key?.length > 0) {
            for (let node of nodeList) {
                if (node?.key.toString() === key.toString()) {
                    foundNode = node;

                    return foundNode;
                } else if (node.children) {
                    foundNode = this._recursiveFindNodeByKey(node.children, key);

                    if (foundNode) {
                        break;
                    }
                }
            }
        }

        return foundNode;
    }

    private _renderTree(services: Array<TerraBaseStorageService>): void {
        if (!services) {
            return;
        }

        const nodeList: Array<TerraFileBrowserNode> = [];

        services.forEach((service: TerraBaseStorageService) => {
            const node: TerraFileBrowserNode = {
                key: service.name,
                name: service.name,
                parentKey: null // first entry does not have a parent
            };

            if (!this._currentSelectedNode) {
                this._currentSelectedNode = node;
                this._treeControl.expand(node);
            }

            nodeList.push(node);

            service.getStorageList().subscribe((storage: TerraStorageObjectList) => {
                node.children = [];
                if (storage) {
                    let root: TerraStorageObject = storage.root;
                    node.key = root.key;

                    if (!node.onClick) {
                        // only one root folder is existing
                        node.onClick = (): void => this.updatedStorageRootAndService.next([service, root]);
                    }

                    this._getSortedList(root.children).forEach((child: TerraStorageObject) => {
                        this._recursiveCreateNode(child, node, service);
                    });

                    this._dataSource.data = nodeList;
                }
            });
        });
    }

    private _recursiveCreateNode(
        storage: TerraStorageObject,
        parentNode: TerraFileBrowserNode,
        service: TerraBaseStorageService
    ): void {
        if (storage.isDirectory) {
            let name: string;

            if (StringHelper.isNullUndefinedOrEmpty(storage.name)) {
                name = storage.key;
            } else {
                name = storage.name;
            }

            const directory: TerraFileBrowserNode = {
                key: storage.key,
                name: name,
                icon: storage.icon,
                parentKey: parentNode.key,
                onClick: (): void => this.updatedStorageRootAndService.next([service, storage]),
                children: []
            };

            parentNode.children.push(directory);

            this._getSortedList(storage.children).forEach((childStorage: TerraStorageObject) => {
                this._recursiveCreateNode(childStorage, directory, service);
            });
        }
    }

    private _getSortedList(list: Array<TerraStorageObject>): Array<TerraStorageObject> {
        return list.sort((objectA: TerraStorageObject, objectB: TerraStorageObject) => {
            return objectA.name.localeCompare(objectB.name);
        });
    }
}
