import {
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TerraStorageObjectList } from '../model/terra-storage-object-list';
import { TerraSimpleTableHeaderCellInterface } from '../../table/simple/cell/terra-simple-table-header-cell.interface';
import { TerraSimpleTableRowInterface } from '../../table/simple/row/terra-simple-table-row.interface';
import { TerraStorageObject } from '../model/terra-storage-object';
import * as moment from "moment";
import { TerraFrontendStorageService } from '../terra-frontend-storage.service';
import { TerraBaseStorageService } from '../terra-base-storage.interface';
import { TerraButtonInterface } from '../../button/data/terra-button.interface';
import { PathHelper } from '../helper/path.helper';

@Component({
    selector: 'terra-file-list',
    template: require('./file-list.component.html'),
    styles: [require('./file-list.component.scss')]
})
export class TerraFileListComponent implements OnInit, OnDestroy
{

    public _storageService: TerraBaseStorageService;

    @Input()
    public set storageService( service: TerraBaseStorageService )
    {
        this._storageService = service;
    }

    public get storageService(): TerraBaseStorageService
    {
        return this._storageService || this._frontendStorageService;
    }

    @Input()
    public inputAllowedExtensions: string[];

    private _storageSubscription: Subscription;

    private _storageList: TerraStorageObjectList;

    private _currentStorageRoot: TerraStorageObject;

    public get currentStorageRoot(): TerraStorageObject
    {
        if ( this._currentStorageRoot )
        {
            return this._currentStorageRoot;
        }

        if ( this._storageList )
        {
            return this._storageList.root;
        }

        return null;
    }

    public get parentStorageObjects():Array<TerraStorageObject>
    {
        let current:TerraStorageObject = this.currentStorageRoot;
        let parents:Array<TerraStorageObject> = [];
        while(current)
        {
            parents.push(current);
            current = current.parent;
        }

        return parents.reverse();
    }

    private _fileTableHeaderList: Array<TerraSimpleTableHeaderCellInterface> = [
        { caption: "Dateiname", width: "30%" },
        { caption: "Datei-URL", width: "50%" },
        { caption: "Dateigröße", width: "7.5%" },
        { caption: "Letze Änderung", width: "12.5%" },
        { caption: "", width: "1" }
    ];

    private _fileTableRowList: Array<TerraSimpleTableRowInterface<TerraStorageObject>> = [];

    constructor(
        private _changeDetector: ChangeDetectorRef,
        private _frontendStorageService: TerraFrontendStorageService )
    {
    }

    public ngOnInit(): void
    {
        this._storageSubscription = this.storageService
                                        .getStorageList()
                                        .subscribe(( storageList) => {
                                            this._storageList = storageList;
                                            this.renderFileList();
                                        });
    }

    public ngOnDestroy(): void
    {
        if ( this._storageSubscription )
        {
            this._storageSubscription.unsubscribe();
        }
    }

    private renderFileList(): void
    {
        if ( this.currentStorageRoot )
        {
            this._fileTableRowList = this.currentStorageRoot.children.map(
                ( storageObject: TerraStorageObject) => {
                    let deleteButton: TerraButtonInterface = {
                        icon: 'icon-delete',
                        clickFunction: () => {
                            console.log( "delete", storageObject );
                        },
                        isSecondary: true,
                        tooltipText: 'Datei löschen',
                        tooltipPlacement: 'left'
                    };
                    return {
                        cellList: [
                            { caption: storageObject.name },
                            { caption: storageObject.publicUrl },
                            { caption: storageObject.sizeString },
                            { caption: moment(storageObject.lastModified).format('YYYY-MM-DD HH:mm') },
                            { buttonList: [ deleteButton ] }
                        ],
                        value: storageObject
                    };
                }
            )
        }
        else
        {
            this._fileTableRowList = [];
        }

        this._changeDetector.detectChanges();
    }

    private isAllowed(filename:string):boolean
    {
        if(!filename)
        {
            return false;
        }

        return this.inputAllowedExtensions.length <= 0
               || this.inputAllowedExtensions.indexOf(PathHelper.extName(filename)) >= 0
               || PathHelper.isDirectory(filename)
    }
}