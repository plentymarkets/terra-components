import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { TerraFrontendStorageService } from './terra-frontend-storage.service';
import { TerraStorageObject } from './model/terra-storage-object';
import { TerraBaseStorageService } from './terra-base-storage.interface';
import { isNullOrUndefined } from 'util';
import { TerraNodeTreeConfig } from '../tree/node-tree/data/terra-node-tree.config';
import { TerraNodeInterface } from '../tree/node-tree/data/terra-node.interface';
import { TerraStorageObjectList } from './model/terra-storage-object-list';
import { StringHelper } from '../../helpers/string.helper';

@Component({
    selector:    'terra-file-browser',
    templateUrl: './terra-file-browser.component.html',
    styleUrls:   ['./terra-file-browser.component.scss'],
    providers:   [TerraNodeTreeConfig]
})
export class TerraFileBrowserComponent implements OnChanges, OnInit
{
    @Input()
    public set inputAllowedExtensions(extensions:Array<string>)
    {
        this._allowedExtensions = extensions.map((extension:string) => extension.toUpperCase());
    }

    public get inputAllowedExtensions():Array<string>
    {
        return this._allowedExtensions;
    }

    @Input()
    public inputAllowFolders:boolean = true;

    @Output()
    public readonly outputSelectedChange:EventEmitter<TerraStorageObject> = new EventEmitter<TerraStorageObject>();

    public onSelectedUrlChange:EventEmitter<string> = new EventEmitter();

    /** @description Notifies whenever the storage service or the storage root has been updated. */
    public updatedStorageRootAndService:EventEmitter<[TerraBaseStorageService, TerraStorageObject]> =  new EventEmitter();

    public _rightColumnWidth:number = 0;
    public _centerColumnWidth:number = 10;

    private _storageServices:Array<TerraBaseStorageService>;

    private _allowedExtensions:Array<string> = [];

    private readonly _defaultStorageServices:Array<TerraBaseStorageService>;

    @Input()
    public set inputStorageServices(services:Array<TerraBaseStorageService>)
    {
        this._storageServices = services;
    }

    public get inputStorageServices():Array<TerraBaseStorageService>
    {
        if(!isNullOrUndefined(this._storageServices) && this._storageServices.length > 0)
        {
            return this._storageServices;
        }

        return this._defaultStorageServices;
    }

    constructor(frontendStorageService:TerraFrontendStorageService,
                public _nodeTreeConfig:TerraNodeTreeConfig<{}>)
    {
        this._defaultStorageServices = [frontendStorageService];
    }

    public ngOnInit():void
    {
        if(isNullOrUndefined(this._storageServices))
        {
            this._renderTree(this.inputStorageServices);
        }
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputStorageServices'))
        {
            this._nodeTreeConfig.reset();
            this._renderTree(changes['inputStorageServices'].currentValue);
        }
    }

    public selectNode(storage:TerraStorageObject):void
    {
        let foundNode:TerraNodeInterface<{}> = this._nodeTreeConfig.findNodeById(storage.key);

        if(!isNullOrUndefined(foundNode))
        {
            foundNode.isOpen = true;
            this._nodeTreeConfig.currentSelectedNode = foundNode;
        }
    }

    public selectUrl(publicUrl:string):void
    {
        this.onSelectedUrlChange.emit(publicUrl);
    }

    public _showImagePreview(isPreviewEnabled:boolean):void
    {
        if(isPreviewEnabled)
        {
            this._centerColumnWidth = 8;
            this._rightColumnWidth = 2;
        }
        else
        {
            this._hideImagePreview();
        }
    }

    public _hideImagePreview():void
    {
        this._centerColumnWidth = 10;
        this._rightColumnWidth = 0;
    }

    private _renderTree(services:Array<TerraBaseStorageService>):void
    {
        if(isNullOrUndefined(services))
        {
            return;
        }

        services.forEach((service:TerraBaseStorageService) =>
        {
            let node:TerraNodeInterface<{}> = {
                id:        service.name,
                name:      service.name,
                isVisible: true
            };

            this._nodeTreeConfig.addNode(node);

            if(isNullOrUndefined(this._nodeTreeConfig.currentSelectedNode))
            {
                this._nodeTreeConfig.currentSelectedNode = node;
                node.isOpen = true;
            }

            service.getStorageList().subscribe((storage:TerraStorageObjectList) =>
            {
                node.children = [];
                if(!isNullOrUndefined(storage))
                {
                    let root:TerraStorageObject = storage.root;
                    node.id = root.key;

                    if(isNullOrUndefined(node.onClick))
                    {
                        // only one root folder is existing
                        this._addDefaultClickEventToNode(node, service, root);
                    }

                    this._getSortedList(root.children).forEach((child:TerraStorageObject) =>
                    {
                        this._recursiveCreateNode(child, node, service);
                    });
                }
            });
        });
    }

    private _addDefaultClickEventToNode(node:TerraNodeInterface<{}>,
                                       service:TerraBaseStorageService,
                                       root:TerraStorageObject):void
    {
        node.onClick = ():void => this.updatedStorageRootAndService.next([service, root]);
    }

    private _recursiveCreateNode(storage:TerraStorageObject,
                                parentNode:TerraNodeInterface<{}>,
                                service:TerraBaseStorageService):void
    {
        if(storage.isDirectory)
        {
            let name:string;

            if(StringHelper.isNullUndefinedOrEmpty(storage.name))
            {
                name = storage.key;
            }
            else
            {
                name = storage.name;
            }

            let directory:TerraNodeInterface<{}> = {
                id:        storage.key,
                name:      name,
                icon:      storage.icon,
                onClick:   ():void => this.updatedStorageRootAndService.next([service, storage]),
                isVisible: true
            };

            this._nodeTreeConfig.addNode(directory, parentNode);

            this._getSortedList(storage.children).forEach((childStorage:TerraStorageObject) =>
            {
                this._recursiveCreateNode(childStorage, directory, service);
            });
        }
    }

    private _getSortedList(list:Array<TerraStorageObject>):Array<TerraStorageObject>
    {
        return list.sort((objectA:TerraStorageObject, objectB:TerraStorageObject) =>
            {
                return objectA.name.localeCompare(objectB.name);
            }
        );
    }
}
