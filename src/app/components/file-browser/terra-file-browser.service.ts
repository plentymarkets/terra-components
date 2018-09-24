import {
    Injectable,
    NgZone
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isNullOrUndefined } from 'util';

@Injectable()
export class TerraFileBrowserService
{
    public isDragActive:BehaviorSubject<boolean> = new BehaviorSubject(false);

    private dropzones:Array<HTMLElement> = [];
    private globalListenersDefined:boolean = false;
    private dragenterTarget:EventTarget = null;

    constructor(private zone:NgZone)
    {
    }

    public addDropzone(dropzone:HTMLElement):void
    {
        if(!this.globalListenersDefined)
        {
            this.setupGlobalListeners();
        }
        this.dropzones.push(dropzone);
    }

    public removeDropzone(dropzone:HTMLElement):void
    {
        let idx:number = this.dropzones.indexOf(dropzone);
        if(idx >= 0)
        {
            this.dropzones.splice(idx, 1);
        }
    }

    private isDropzone(element:HTMLElement):boolean
    {
        return this.dropzones.some(
            (dropzone:HTMLElement) =>
            {
                return dropzone.contains(element);
            }
        );
    }

    private setupGlobalListeners():void
    {
        this.zone.runOutsideAngular(() =>
        {
            let setEffect:(event:Event) => void = (event:DragEvent):void =>
            {
                if(this.isDropzone(<HTMLElement> event.target))
                {
                    event.dataTransfer.effectAllowed = 'copy';
                    event.dataTransfer.dropEffect = 'copy';
                }
                else
                {
                    event.dataTransfer.effectAllowed = 'none';
                    event.dataTransfer.dropEffect = 'none';
                }
            };

            let isFileEvent:(event:DragEvent) => boolean = (event:DragEvent):boolean =>
            {
                return !isNullOrUndefined(event.dataTransfer.types) && event.dataTransfer.types.indexOf('Files') >= 0;
            };

            window.addEventListener('dragenter', (event:DragEvent) =>
            {
                if(isFileEvent(event))
                {
                    this.dragenterTarget = event.target;
                    event.preventDefault();
                    if(!this.isDragActive.value)
                    {
                        this.isDragActive.next(true);
                    }
                }
            });

            window.addEventListener('dragover', (event:DragEvent) =>
            {
                if(isFileEvent(event))
                {
                    event.preventDefault();
                    setEffect(event);
                }
            });

            window.addEventListener('dragleave', (event:DragEvent) =>
            {
                if(isFileEvent(event) && event.target === this.dragenterTarget)
                {
                    this.dragenterTarget = null;
                    this.isDragActive.next(false);
                }
            });

            window.addEventListener('drop', (event:DragEvent) =>
            {
                if(isFileEvent(event))
                {
                    event.preventDefault();
                    this.dragenterTarget = null;
                    if(this.isDragActive.value)
                    {
                        this.isDragActive.next(false);
                    }
                }
            });

        });
        this.globalListenersDefined = true;
    }
}
