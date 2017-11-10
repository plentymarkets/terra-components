import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";
import { TerraFrontendStorageService } from "./terra-frontend-storage.service";
import { TerraStorageObjectList } from "./model/terra-storage-object-list";
import { TerraStorageObject } from "./model/terra-storage-object";
import { PathHelper } from "./helper/path.helper";
import { TerraTextInputComponent } from "../forms/input/text-input/terra-text-input.component";
import { ClipboardHelper } from "./helper/clipboard.helper";
import { FileType } from "./helper/fileType.helper";
import * as moment from "moment";
import { TranslationService } from "angular-l10n";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'terra-file-browser',
    template: require('./terra-file-browser.component.html'),
    styles:   [
        require('./terra-file-browser.component.scss'),
        require('./terra-file-browser.component.glob.scss').toString()
    ],
})
export class TerraFileBrowserComponent implements OnInit, OnDestroy
{
    private _translationPrefix:string = "terraFileBrowser";

    @Input()
    public inputAllowedExtensions:Array<string> = [];

    @Output()
    public outputSelected:EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('fileChooser', {read: ElementRef})
    public fileChooserElement:ElementRef;

    @ViewChild('fileDropzone', {read: ElementRef})
    public fileDropzoneElement:ElementRef;

    public storageList:TerraStorageObjectList;

    private _storageListSubscription:Subscription;

    public uploadProgresses:{ [key:string]:number } = {};

    public showNewDirectoryPrompt:boolean = false;
    public newDirectoryName:string;

    public deletableObjectKey:string = null;

    public isFileDragged:boolean = false;

    private _currentRoot:TerraStorageObject;

    private _selectedStorageObjectName:string;

    private _globalListeners:{ [event:string]:(...args:any[]) => void } = {};

    constructor(private frontendStorageService:TerraFrontendStorageService,
                private translation:TranslationService,
                private changeDetector:ChangeDetectorRef)
    {
    }

    public get currentRoot():TerraStorageObject
    {
        if(this._currentRoot)
        {
            return this._currentRoot;
        }

        if(this.storageList)
        {
            return this.storageList.root;
        }
        return null;
    }

    public get selectedStorageObject():TerraStorageObject
    {
        if(!this.currentRoot || !this._selectedStorageObjectName)
        {
            return null;
        }
        return this.currentRoot.getChild(this._selectedStorageObjectName);
    }

    public set selectedStorageObject(object:TerraStorageObject)
    {
        if(!object)
        {
            this._selectedStorageObjectName = null;
            this.outputSelected.emit(null);
        }
        else
        {
            this._selectedStorageObjectName = object.name;
            this.outputSelected.emit(object.publicUrl);
        }
    }

    public get parentObjects():Array<TerraStorageObject>
    {
        let current:TerraStorageObject = this.currentRoot;
        let parents:Array<TerraStorageObject> = [];
        while(current)
        {
            parents.push(current);
            current = current.parent;
        }

        return parents.reverse();
    }

    public ngOnInit():void
    {
        let registerGlobalEvent:(event:string, callback:(event:Event) => void) => void;

        registerGlobalEvent = (event:string, callback:(event:Event) => void) =>
        {
            this._globalListeners[event] = callback;
            document.addEventListener(event, callback.bind(this));
        };

        let self = this;
        let dragLeaveTimeout:any;

        registerGlobalEvent("dragover", (event:DragEvent) =>
        {
            event.preventDefault();

            if(this.fileDropzoneElement.nativeElement.contains(event.target))
            {
                event.dataTransfer.dropEffect = "copy";
            }
            else
            {
                event.dataTransfer.dropEffect = "none";
            }

            if(!self.isFileDragged)
            {
                self.isFileDragged = true;
                self.changeDetector.detectChanges();
            }

            if(dragLeaveTimeout)
            {
                clearTimeout(dragLeaveTimeout);
                dragLeaveTimeout = null;
            }
        });

        registerGlobalEvent("dragleave", (event:DragEvent) =>
        {
            dragLeaveTimeout = setTimeout(() =>
            {
                self.isFileDragged = false;
                self.changeDetector.detectChanges();
                dragLeaveTimeout = null;
            }, 100);
        });

        registerGlobalEvent("drop", (event:DragEvent) =>
        {
            event.preventDefault();
            event.stopPropagation();
            self.isFileDragged = false;
            self.changeDetector.detectChanges();
            dragLeaveTimeout = null;
        });

        this._storageListSubscription = this.frontendStorageService.listFiles().subscribe((objectList:TerraStorageObjectList) =>
        {
            this.storageList = objectList;
            this.changeDetector.detectChanges();
        });
    }

    public ngOnDestroy():void
    {
        Object.keys(this._globalListeners).forEach(event =>
        {
            document.removeEventListener(event, this._globalListeners[event]);
        });
        this._globalListeners = {};

        this._storageListSubscription.unsubscribe();
    }

    public selectObject(object:TerraStorageObject):void
    {
        if(object.isDirectory)
        {
            this._currentRoot = object;
            this.selectedStorageObject = null;
        }
        else
        {
            if(this.isAllowed(object.key))
            {
                this.selectedStorageObject = object;
            }
        }
    }

    public selectUrl(url:string):void
    {
        if(this.storageList && url)
        {
            let cdnExp = /^.*\/frontend\/(.*)$/;
            let selectedKey:string;
            if(cdnExp.test(url))
            {
                selectedKey = cdnExp.exec(url)[1];
            }

            let preselectedObject = this.storageList.root.find(selectedKey);
            if(preselectedObject)
            {
                this._currentRoot = preselectedObject.parent;
                this._selectedStorageObjectName = preselectedObject.name;
                this.outputSelected.emit(preselectedObject.publicUrl);
            }
            this.changeDetector.detectChanges();
        }
    }

    public showFileChooser():void
    {
        this.fileChooserElement.nativeElement.click();
    }

    public createDirectory():void
    {
        if(!this.newDirectoryName)
        {
            this.showNewDirectoryPrompt = true;
        }
        else
        {
            let path:string = this.currentRoot ? this.currentRoot.key : "/";
            path = PathHelper.join(path, this.newDirectoryName);
            this.showNewDirectoryPrompt = false;
            this.newDirectoryName = null;
            this.frontendStorageService.createDirectory(path);
        }
    }

    public setNewDirectoryName(value:string)
    {
        this.newDirectoryName = this.frontendStorageService.prepareKey(value, true);
    }

    public dropFiles(event:DragEvent):void
    {
        event.preventDefault();
        event.stopPropagation();
        this.isFileDragged = false;
        this.changeDetector.detectChanges();

        this.frontendStorageService.uploadFiles(event.dataTransfer.files || [], this.getUploadPrefix());
    }

    public selectFiles(event:Event):void
    {
        if(event.srcElement)
        {
            this.frontendStorageService
                .uploadFiles((<any>event.srcElement).files || [], this.getUploadPrefix());
        }
    }

    private getUploadPrefix():string
    {
        if(this.currentRoot)
        {
            return this.currentRoot.key;
        }
        return "/";
    }

    public deleteObject():void
    {
        if(this.selectedStorageObject && this.selectedStorageObject.key === this.deletableObjectKey)
        {
            this.selectedStorageObject = null;
        }

        if(this.currentRoot && this.currentRoot.key === this.deletableObjectKey)
        {
            this._currentRoot = this.currentRoot.parent;
        }

        this.frontendStorageService.deleteFile(this.deletableObjectKey);
        this.deletableObjectKey = null;
    }

    public copyToClipboard(event:TerraTextInputComponent):void
    {
        ClipboardHelper.copyText(this.selectedStorageObject.publicUrl);
    }

    public getIconClass(filename:string):string
    {
        if(!filename)
        {
            return "";
        }

        if(PathHelper.isDirectory(filename))
        {
            return "icon-folder";
        }
        return FileType.mapIconClass(filename);
    }

    public isWebImage(filename:string):boolean
    {
        return !!filename && FileType.isWebImage(filename);
    }

    public getSizeString(size:number):string
    {
        if(typeof size !== "number")
        {
            return "0B";
        }
        return PathHelper.sizeString(size);
    }

    public getFormattedDate(date:Date):string
    {
        return moment(date).format('YYYY-MM-DD HH:mm');
    }

    public isAllowed(filename:string):boolean
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
