import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { TerraFrontendStorageService } from './terra-frontend-storage.service';
import { TerraStorageObject } from './model/terra-storage-object';
import { TerraBaseStorageService } from './terra-base-storage.interface';
import { isNullOrUndefined } from 'util';
import { TerraNodeTreeConfig } from './../tree/node-tree/data/terra-node-tree.config';
import { TerraNodeInterface } from './../tree/node-tree/data/terra-node.interface';
import { TerraStorageObjectList } from './model/terra-storage-object-list';
import { TerraFileListComponent } from './file-list/file-list.component';
import { StringHelper } from '../../helpers/string.helper';

@Component({
    selector:  'terra-file-browser',
    template:  require('./terra-file-browser.component.html'),
    providers: [TerraNodeTreeConfig],
    styles:    [
        require('./terra-file-browser.component.scss'),
        require('./terra-file-browser.component.glob.scss').toString()
    ]
})
export class TerraFileBrowserComponent implements OnInit
{
    @Input()
    public set inputAllowedExtensions(extensions:Array<string>)
    {
        this.allowedExtensions = extensions.map((extension:string) => extension.toUpperCase());
    }

    public get inputAllowedExtensions():Array<string>
    {
        return this.allowedExtensions;
    }

    @Input()
    public inputAllowFolders:boolean = true;

    @Output()
    public outputSelectedChange:EventEmitter<TerraStorageObject> = new EventEmitter<TerraStorageObject>();

    public onSelectedUrlChange:EventEmitter<string> = new EventEmitter();

    @ViewChild(TerraFileListComponent)
    protected fileListComponent:TerraFileListComponent;

    private storageServices:Array<TerraBaseStorageService>;

    private allowedExtensions:Array<string> = [];

    private currentSelectedNode:TerraNodeInterface<{}>;

    @Input()
    public set inputStorageServices(services:Array<TerraBaseStorageService>)
    {
        this.storageServices = services;
    }

    public get inputStorageServices():Array<TerraBaseStorageService>
    {
        if(!isNullOrUndefined(this.storageServices) && this.storageServices.length > 0)
        {
            return this.storageServices;
        }

        return [this.frontendStorageService];
    }

    constructor(private frontendStorageService:TerraFrontendStorageService,
                protected nodeTreeConfig:TerraNodeTreeConfig<{}>)
    {
    }

    public ngOnInit():void
    {
        this.inputStorageServices.forEach((service:TerraBaseStorageService) =>
        {
            let node:TerraNodeInterface<{}> = {
                id:        service.name,
                name:      service.name,
                isVisible: true,
                children:  []
            };

            this.nodeTreeConfig.addNode(node);

            service.getStorageList().subscribe((storage:TerraStorageObjectList) =>
            {
                node.children = [];

                if(!isNullOrUndefined(storage))
                {
                    let root:TerraStorageObject = storage.root;

                    this.recursiveCreateNode(root, node, service);
                }
            });
        });
    }

    private recursiveCreateNode(storage:TerraStorageObject,
                                parentNode:TerraNodeInterface<{}>,
                                service:TerraBaseStorageService):void
    {
        if(!isNullOrUndefined(storage.children) && storage.isDirectory)
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
                onClick:   ():void =>
                           {
                               this.fileListComponent.activeStorageService = service;
                               this.fileListComponent.currentStorageRoot = storage;
                               this.currentSelectedNode = directory;
                           },
                isVisible: true
            };

            if(isNullOrUndefined(this.currentSelectedNode))
            {
                this.currentSelectedNode = directory;
            }
            this.nodeTreeConfig.addChildToNodeById(parentNode.id, directory);

            this.currentSelectedNode.isOpen = true;
            this.nodeTreeConfig.currentSelectedNode = this.currentSelectedNode;

            storage.children.forEach((childStorage:TerraStorageObject) =>
            {
                this.recursiveCreateNode(childStorage, directory, service);
            });
        }
    }

    public selectNode(storage:TerraStorageObject):void
    {
        let foundNode:TerraNodeInterface<{}> = this.nodeTreeConfig.findNodeById(storage.key);

        if(!isNullOrUndefined(foundNode))
        {
            this.nodeTreeConfig.currentSelectedNode = foundNode;
        }
    }

    public selectUrl(publicUrl:string):void
    {
        this.onSelectedUrlChange.emit(publicUrl);
    }
}
