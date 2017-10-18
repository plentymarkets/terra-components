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

    private _fileTableHeaderList: Array<TerraSimpleTableHeaderCellInterface> = [
        { caption: "Dateiname", width: 35 },
        { caption: "Datei-URL", width: 35 },
        { caption: "Dateigröße", width: 35 },
        { caption: "Letze Änderung", width: 35 },
    ];

    private _fileTableRowList: Array<TerraSimpleTableRowInterface> = [];

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

    private renderFileList()
    {
        if ( this.currentStorageRoot )
        {
            this._fileTableRowList = this.currentStorageRoot.children.map(
                ( storageObject: TerraStorageObject) => {
                    return {
                        cellList: [
                            { caption: storageObject.name },
                            { caption: storageObject.publicUrl },
                            { caption: storageObject.sizeString },
                            { caption: moment(storageObject.lastModified).format('YYYY-MM-DD HH:mm') }
                        ]
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
}