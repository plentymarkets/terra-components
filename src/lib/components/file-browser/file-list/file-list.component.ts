/* tslint:disable:max-file-line-count */
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TerraBaseStorageService } from '../terra-base-storage.interface';
import { TerraFileBrowser } from '../terra-file-browser';
import { TerraFileBrowserService } from '../terra-file-browser.service';
import { L10N_LOCALE, L10nIntlService, L10nLocale, L10nTranslationService } from 'angular-l10n';
import { TerraUploadProgress } from '../model/terra-upload-progress';
import { isNullOrUndefined } from 'util';
import { TerraBasePrivateStorageService } from '../terra-base-private-storage.interface';
import { TerraStorageObjectList } from '../model/terra-storage-object-list';
import { PathHelper } from '../../../helpers/path.helper';
import { TerraSimpleTableComponent } from '../../tables/simple/terra-simple-table.component';
import { TerraStorageObject } from '../model/terra-storage-object';
import { FileTypeHelper } from '../../../helpers/fileType.helper';
import { TerraSimpleTableRowInterface } from '../../tables/simple/row/terra-simple-table-row.interface';
import { ClipboardHelper } from '../../../helpers/clipboard.helper';
import { TerraSimpleTableCellInterface } from '../../tables/simple/cell/terra-simple-table-cell.interface';
import { AlertService } from '../../alert/alert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';

const MAX_UPLOAD_COUNT: number = 10;

@Component({
    selector: 'terra-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
    providers: [TerraFileBrowserService]
})
export class TerraFileListComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    // @TODO rename to storageService:TerraBaseStorageService
    @Input()
    public inputStorageServices: Array<TerraBaseStorageService> = null;

    @Output()
    public showImagePreview: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    public hideImagePreview: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public selectNode: EventEmitter<TerraStorageObject> = new EventEmitter<TerraStorageObject>();

    public imagePreviewObject: TerraStorageObject;

    @ViewChild('deleteConfirmationDialog', { static: true })
    public _deleteConfirmationDialog: TemplateRef<number>;

    public _translationPrefix: string = 'terraFileBrowser';

    public _isDragActive: boolean = false;
    public _progress: TerraUploadProgress = null;

    public _storageList: TerraStorageObjectList;

    public _showNewDirectoryPrompt: boolean = false;

    public _selectedStorageObjects: Array<TerraStorageObject> = [];

    public _fileTableRowList: Array<TerraSimpleTableRowInterface<TerraStorageObject>> = [];

    public selection: SelectionModel<TerraSimpleTableRowInterface<TerraStorageObject>> = new SelectionModel<
        TerraSimpleTableRowInterface<TerraStorageObject>
    >(true, []);

    public displayedColumns: Array<string>;

    private _activeStorageService: TerraBaseStorageService;

    public get activeStorageService(): TerraBaseStorageService {
        if (!isNullOrUndefined(this._activeStorageService)) {
            return this._activeStorageService;
        }

        if (!isNullOrUndefined(this.inputStorageServices)) {
            return this.inputStorageServices[0];
        }

        return null;
    }

    public set activeStorageService(service: TerraBaseStorageService) {
        if (service !== this._activeStorageService) {
            if (!isNullOrUndefined(this._storageSubscription)) {
                this._storageSubscription.unsubscribe();
                this._storageSubscription = null;
            }
            if (!isNullOrUndefined(this._progressSubscription)) {
                this._progressSubscription.unsubscribe();
                this._progressSubscription = null;
            }

            this._storageList = null;
            this._currentStorageRoot = null;
            this._activeStorageService = service;
            if (this.imagePreviewObject) {
                this.imagePreviewObject = null;
                this.showImagePreview.emit(this.activeStorageService.isImagePreviewEnabled);
            }
            this._renderFileList();
            this._storageSubscription = this.activeStorageService
                .getStorageList()
                .subscribe((storageList: TerraStorageObjectList): void => {
                    this._storageList = storageList;
                    this._renderFileList();
                });
            this._progressSubscription = this.activeStorageService.queue.status.subscribe(
                (progress: TerraUploadProgress) => {
                    this._progress = progress;

                    if (!isNullOrUndefined(this._progress)) {
                        if (typeof this._progress.sizeUploaded === 'number') {
                            this._progress.sizeUploaded = PathHelper.sizeString(this._progress.sizeUploaded);
                        }
                        if (typeof this._progress.sizeTotal === 'number') {
                            this._progress.sizeTotal = PathHelper.sizeString(this._progress.sizeTotal);
                        }

                        if (progress.filesTotal === progress.filesUploaded) {
                            this.selectNode.emit(this.currentStorageRoot);
                        }
                    }
                    this._changeDetector.detectChanges();
                }
            );
        }
    }

    @ViewChild('fileDropzone', { read: ElementRef, static: true })
    private _fileDropzoneElement: ElementRef;

    @ViewChild(TerraSimpleTableComponent)
    private _fileTableComponent: TerraSimpleTableComponent<TerraStorageObject>;

    private _dragSubscription: Subscription;

    private _storageSubscription: Subscription;

    private _progressSubscription: Subscription;

    private _currentStorageRoot: TerraStorageObject;

    private _imagePreviewTimeout: any;

    public get currentStorageRoot(): TerraStorageObject {
        if (!isNullOrUndefined(this._currentStorageRoot)) {
            return this._currentStorageRoot;
        }

        if (!isNullOrUndefined(this._storageList)) {
            return this._storageList.root;
        }

        return null;
    }

    public set currentStorageRoot(storageObject: TerraStorageObject) {
        if (
            (isNullOrUndefined(storageObject) || storageObject.isDirectory) &&
            this._currentStorageRoot !== storageObject
        ) {
            if (this.imagePreviewObject && storageObject !== this.imagePreviewObject) {
                this.imagePreviewObject = null;
                this.hideImagePreview.emit();
            }

            this._currentStorageRoot = storageObject;
            this._renderFileList();
        }
    }

    public get parentStorageObjects(): Array<TerraStorageObject> {
        let current: TerraStorageObject = this.currentStorageRoot;
        let parents: Array<TerraStorageObject> = [];

        if (!isNullOrUndefined(this.imagePreviewObject)) {
            parents.push(this.imagePreviewObject);
        }

        while (!isNullOrUndefined(current)) {
            parents.push(current);
            current = current.parent;
        }

        return parents.reverse();
    }

    private _newDirectoryName: string = '';

    public get newDirectoryName(): string {
        return this._newDirectoryName;
    }

    public set newDirectoryName(name: string) {
        this._newDirectoryName = this.activeStorageService.prepareKey(name, true, true);
    }

    constructor(
        @Inject(L10N_LOCALE) public _locale: L10nLocale,
        public _parentFileBrowser: TerraFileBrowser,
        private _changeDetector: ChangeDetectorRef,
        private _fileBrowserService: TerraFileBrowserService,
        public _translationService: L10nTranslationService,
        private _localeService: L10nIntlService,
        private _alertService: AlertService,
        private _dialog: MatDialog
    ) {}

    public ngOnInit(): void {
        if (!isNullOrUndefined(this.inputStorageServices) && this.inputStorageServices.length > 0) {
            this.activeStorageService = this.inputStorageServices[0];
        } else {
            console.error('At least one instance of TerraBaseStorageService is required');
        }

        this._dragSubscription = this._fileBrowserService.isDragActive.subscribe((isDragActive: boolean) => {
            this._isDragActive = isDragActive;
            this._changeDetector.detectChanges();
        });

        this._parentFileBrowser.onSelectedUrlChange.subscribe((selectedUrl: string) => {
            if (selectedUrl && this._storageList) {
                let object: TerraStorageObject = this._storageList.flatList.find(
                    (storage: TerraStorageObject): boolean => storage.publicUrl === selectedUrl
                );

                if (!isNullOrUndefined(object)) {
                    this.currentStorageRoot = object.parent;
                    if (FileTypeHelper.isWebImage(object.key)) {
                        this.imagePreviewObject = object;
                        this.showImagePreview.emit(this.activeStorageService.isImagePreviewEnabled);
                    }
                    this._fileTableComponent.inputHighlightedRow = this._fileTableRowList.find(
                        (r: TerraSimpleTableRowInterface<TerraStorageObject>): boolean => r.value === object
                    );
                }
            }
        });

        this._parentFileBrowser.updatedStorageRootAndService.subscribe(
            (value: [TerraBaseStorageService, TerraStorageObject]) => {
                this.activeStorageService = value[0];
                this.currentStorageRoot = value[1];
            }
        );
    }

    public ngAfterViewInit(): void {
        this._fileBrowserService.addDropzone(this._fileDropzoneElement.nativeElement);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('inputStorageServices')) {
            this.activeStorageService = this.inputStorageServices[0];
        }
    }

    public ngOnDestroy(): void {
        if (!isNullOrUndefined(this._storageSubscription)) {
            this._storageSubscription.unsubscribe();
        }

        if (!isNullOrUndefined(this._dragSubscription)) {
            this._dragSubscription.unsubscribe();
        }

        this._fileBrowserService.removeDropzone(this._fileDropzoneElement.nativeElement);
    }

    /* public onSelectionChange(rows: Array<TerraSimpleTableRowInterface<TerraStorageObject>>): void {
        this._selectedStorageObjects = rows.map((row: TerraSimpleTableRowInterface<TerraStorageObject>) => {
            return row.value;
        });
    }*/

    public onFileSelect(event: Event): void {
        let target: any = event.target || event.srcElement;

        if (!isNullOrUndefined(target) && !isNullOrUndefined(target.files)) {
            this._uploadFiles(target.files);

            // unset value of file input to allow selecting same file again
            (<HTMLInputElement>event.target).value = '';
        }
    }

    public onFileDrop(event: DragEvent): void {
        if (!isNullOrUndefined(event.dataTransfer.files)) {
            this._uploadFiles(event.dataTransfer.files);
        }
    }

    public _createDirectory(): void {
        let path: string = PathHelper.join(
            this.currentStorageRoot ? this.currentStorageRoot.key : '/',
            this.newDirectoryName
        );
        this._showNewDirectoryPrompt = false;
        this._newDirectoryName = null;
        this.activeStorageService.createDirectory(path).subscribe((response: any) => {
            this.selectNode.emit(this.currentStorageRoot);
        });
    }

    public _onRowClick(row: TerraSimpleTableRowInterface<TerraStorageObject>): void {
        let storageObject: TerraStorageObject = row.value;
        if (storageObject.isDirectory) {
            this.currentStorageRoot = storageObject;
            this.selectNode.emit(storageObject);
        }
    }

    public _onActiveRowChange(row: TerraSimpleTableRowInterface<TerraStorageObject>): void {
        let storageObject: TerraStorageObject = row.value;
        this._showOrHideImagePreview(storageObject);
        if (isNullOrUndefined(this._imagePreviewTimeout)) {
            clearTimeout(this._imagePreviewTimeout);
        }
        let debounceFn: Function = (): void => {
            if (!isNullOrUndefined(storageObject) && FileTypeHelper.isWebImage(storageObject.key)) {
                this.imagePreviewObject = storageObject;
            } else {
                this.imagePreviewObject = null;
            }

            this._parentFileBrowser.outputSelectedChange.emit(storageObject);
        };
        this._imagePreviewTimeout = setTimeout(debounceFn.bind(this), 500);
    }

    public _deleteSelected(): void {
        this._openDeleteDialog(this.selection.selected);
    }

    public _isPublicHeaderList(): boolean {
        if (this.activeStorageService instanceof TerraBasePrivateStorageService) {
            return false;
        } else {
            return true;
        }
    }

    public isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this._fileTableRowList.length;
        return numSelected === numRows;
    }

    public masterToggle(): void {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this._fileTableRowList);
    }

    public _deleteButtonListener(event: Event, row: any): void {
        this._openDeleteDialog([row]);
        event.stopPropagation();
        event.preventDefault();
    }

    public _clipBoardButtonListener(event: MouseEvent, row: any): void {
        ClipboardHelper.copyText(row.value.publicUrl);
        event.stopPropagation();
    }

    public _downloadButtonListener(event: MouseEvent, row: any): void {
        (<TerraBasePrivateStorageService>this.activeStorageService).downloadFile(row.value.key);
        event.stopPropagation();
    }

    public _openDeleteDialog(objectsToDelete: Array<TerraSimpleTableRowInterface<TerraStorageObject>>): void {
        const objects = objectsToDelete.map((v: TerraSimpleTableRowInterface<TerraStorageObject>) => v.value);
        const deleteCount: number = this._getDeleteCount(objects);

        const deleteConfirmationDialog: MatDialogRef<number, boolean> = this._dialog.open(
            this._deleteConfirmationDialog,
            {
                data: deleteCount
            }
        );

        deleteConfirmationDialog.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this._deleteObjects(objects);
            }
        });
    }

    private _renderFileList(): void {
        if (!isNullOrUndefined(this.activeStorageService)) {
            this._createHeaderListDependingOnAccessLevel();
        }

        if (!isNullOrUndefined(this.currentStorageRoot)) {
            this._fillTableRowList();
        } else {
            this._fileTableRowList = [];
        }

        this._selectedStorageObjects = [];
        this._parentFileBrowser.outputSelectedChange.emit(null);
        this._changeDetector.detectChanges();
        this.selection.clear();
    }

    private _fillTableRowList(): void {
        this._fileTableRowList = this.currentStorageRoot.children
            .filter((storageObject: TerraStorageObject) => {
                return storageObject.isFile || this._parentFileBrowser.inputAllowFolders;
            })
            .sort((objectA: TerraStorageObject, objectB: TerraStorageObject) => {
                return objectA.name.localeCompare(objectB.name);
            })
            .filter((storageObject: TerraStorageObject) => this._isAllowed(storageObject.key))
            .map((storageObject: TerraStorageObject) => {
                return this._createTableRow(storageObject);
            });
    }

    private _createTableRow(storageObject: TerraStorageObject): TerraSimpleTableRowInterface<TerraStorageObject> {
        let cellList: Array<TerraSimpleTableCellInterface> = [];

        cellList.push({
            caption: storageObject.name,
            icon: storageObject.icon
        });

        if (!(this.activeStorageService instanceof TerraBasePrivateStorageService)) {
            cellList.push({
                caption: storageObject.isFile ? storageObject.publicUrl : ''
            });

            /*this._addClipboardButton(storageObject, cellList);*/
        }

        cellList.push(
            {
                caption: storageObject.isFile ? storageObject.sizeString : ''
            },
            {
                caption: storageObject.isFile
                    ? this._localeService.formatDate(
                          storageObject.lastModified,
                          { dateStyle: 'medium', timeStyle: 'medium' },
                          this._locale.language
                      )
                    : ''
            }
        );
        return {
            cellList: cellList,
            value: storageObject,
            disabled: !this._isAllowed(storageObject.key)
        };
    }

    private _createHeaderListDependingOnAccessLevel(): void {
        if (this.activeStorageService instanceof TerraBasePrivateStorageService) {
            this._createPrivateHeaderList();
        } else {
            this._createPublicHeaderList();
        }
    }

    private _createPublicHeaderList(): void {
        this.displayedColumns = [
            'checkbox',
            'fileName',
            'fileURL',
            'copyIntoClipboard',
            'fileSize',
            'lastModified',
            'deleteBtn'
        ];
    }

    private _createPrivateHeaderList(): void {
        this.displayedColumns = ['checkbox', 'fileName', 'fileSize', 'lastModified', 'downloadBtn', 'deleteBtn'];
    }

    private _isAllowed(filename: string): boolean {
        if (isNullOrUndefined(filename)) {
            return false;
        }

        return (
            this._parentFileBrowser.inputAllowedExtensions.length <= 0 ||
            this._parentFileBrowser.inputAllowedExtensions.indexOf(PathHelper.extName(filename).toUpperCase()) >= 0 ||
            PathHelper.isDirectory(filename)
        );
    }

    private _showOrHideImagePreview(storageObject: TerraStorageObject): void {
        if (!isNullOrUndefined(storageObject) && FileTypeHelper.isWebImage(storageObject.key)) {
            this.showImagePreview.emit(this.activeStorageService.isImagePreviewEnabled);
        } else {
            this.hideImagePreview.emit();
        }
    }

    private _uploadFiles(fileList: FileList | Array<File>): void {
        const queueLength: number = !this._progress ? 0 : this._progress.filesTotal - this._progress.filesUploaded;
        if (fileList.length + queueLength > MAX_UPLOAD_COUNT) {
            this._alertService.error(
                this._translationService.translate('terraFileBrowser.error.tooManyFiles', { max: MAX_UPLOAD_COUNT })
            );
            return;
        }

        let uploadPrefix: string = this.currentStorageRoot ? this.currentStorageRoot.key : '/';
        this.activeStorageService.uploadFiles(fileList, uploadPrefix);
    }

    private _deleteObjects(objectsToDelete: Array<TerraStorageObject>): void {
        const keyList: Array<string> = objectsToDelete.map((object: TerraStorageObject) => object.key);
        this.activeStorageService.deleteFiles(keyList).subscribe(() => {
            if (!isNullOrUndefined(this.imagePreviewObject) && keyList.indexOf(this.imagePreviewObject.key) >= 0) {
                this.imagePreviewObject = null;
                this.hideImagePreview.emit();
            }
            this.selectNode.emit(this.currentStorageRoot);
        });
    }

    private _getDeleteCount(objectsToDelete: Array<TerraStorageObject>): number {
        if (isNullOrUndefined(objectsToDelete)) {
            return 0;
        }

        return objectsToDelete
            .map((object: TerraStorageObject) => {
                return object.fileCount;
            })
            .reduce((sum: number, current: number) => {
                return sum + current;
            }, 0);
    }
}
