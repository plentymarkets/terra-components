import {
    Injectable,
    NgZone
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TerraFileBrowserService
{
    private _dropzones:Array<HTMLElement> = [];
    private _globalListenersDefined:boolean = false;
    private _dragenterTarget:EventTarget = null;

    public isDragActive:BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private zone:NgZone)
    {
    }

    public addDropzone(dropzone:HTMLElement):void
    {
        if(!this._globalListenersDefined)
        {
            this.setupGlobalListeners();
        }
        this._dropzones.push(dropzone);
    }

    public removeDropzone(dropzone:HTMLElement):void
    {
        let idx:number = this._dropzones.indexOf(dropzone);
        if(idx >= 0)
        {
            this._dropzones.splice(idx, 1);
        }
    }

    private isDropzone(element:HTMLElement):boolean
    {
        return this._dropzones.some(
            (dropzone:HTMLElement) =>
            {
                return dropzone.contains(element);
            }
        )
    }

    private setupGlobalListeners():void
    {
        this.zone.runOutsideAngular(() =>
        {

            let setEffect = (event:DragEvent) =>
            {
                if(this.isDropzone(<HTMLElement>event.target))
                {
                    event.dataTransfer.effectAllowed = 'copy';
                    event.dataTransfer.dropEffect = 'copy'
                }
                else
                {
                    event.dataTransfer.effectAllowed = 'none';
                    event.dataTransfer.dropEffect = 'none'
                }
            };

            window.addEventListener('dragenter', (event:DragEvent) =>
            {
                this._dragenterTarget = event.target;
                event.preventDefault();
                if(!this.isDragActive.value)
                {
                    this.isDragActive.next(true);
                }
            });

            window.addEventListener('dragover', (event:DragEvent) =>
            {
                event.preventDefault();
                setEffect(event);
            });

            window.addEventListener('dragleave', (event:DragEvent) =>
            {
                if(event.target === this._dragenterTarget)
                {
                    this._dragenterTarget = null;
                    this.isDragActive.next(false);
                }
            });

            window.addEventListener('drop', (event:DragEvent) =>
            {
                event.preventDefault();
                this._dragenterTarget = null;
                if(this.isDragActive.value)
                {
                    this.isDragActive.next(false);
                }
            });

        });
        this._globalListenersDefined = true;
    }
}