import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { DropEvent } from './dropEvent.interface';
import * as interact_ from 'interactjs';
import {
    Interactable,
    InteractEvent,
    InteractStatic
} from 'interactjs';

const interact:InteractStatic = interact_;

export type AcceptFn = (args:{
    interactEvent:InteractEvent,
    event:MouseEvent,
    isDropable:boolean,
    dropzone:Interactable,
    dropzoneElement:HTMLElement,
    draggable:Interactable,
    draggableElement:HTMLElement,
    dragData:any
}) => boolean;

/**
 * @deprecated since 5.x.x. Please use another DnD library e.g. Angular Material CDK.
 */
@Directive({
    selector: '[terraDropzone]'
})
export class TerraDropzoneDirective implements OnInit, OnChanges
{
    @Input()
    public accept:AcceptFn | string = '';

    @Input()
    public overlap:'pointer' | 'center' | number = 'pointer';

    @Input()
    public disabled:boolean = false;

    @Output()
    public dropActivate:EventEmitter<DropEvent> = new EventEmitter<DropEvent>();

    @Output()
    public dropDeactivate:EventEmitter<DropEvent> = new EventEmitter<DropEvent>();

    @Output()
    public dragEnter:EventEmitter<DropEvent> = new EventEmitter<DropEvent>();

    @Output()
    public dragLeave:EventEmitter<DropEvent> = new EventEmitter<DropEvent>();

    @Output()
    public dropMove:EventEmitter<DropEvent> = new EventEmitter<DropEvent>();

    @Output()
    public drop:EventEmitter<DropEvent> = new EventEmitter<DropEvent>();


    /* tslint:disable:no-output-on-prefix no-input-rename no-output-rename */
    /**
     * @deprecated since 3.x.x. Use accept instead
     */
    @Input('terra-dropzone-accept')
    public set dropzoneAccept(value:AcceptFn | string)
    {
        console.warn('`terra-dropzone-accept` is deprecated. Please use `accept` instead.');
        this.accept = value;
    }

    /**
     * @deprecated since 3.x.x. Use overlap instead
     */
    @Input('terra-dropzone-overlap')
    public set dropzoneOverlap(value:'pointer' | 'center' | number)
    {
        console.warn('`terra-dropzone-overlap` is deprecated. Please use `overlap` instead.');
        this.overlap = value;
    }

    /**
     * @deprecated since 3.x.x. Use disabled instead
     */
    @Input('terra-dropzone-disabled')
    public set dropzoneDisabled(value:boolean)
    {
        console.warn('`terra-dropzone-disabled` is deprecated. Please use `disabled` instead.');
        this.disabled = value;
    }

    /**
     * @deprecated since 3.x.x. Use dropActivate instead
     */
    @Output('terra-dropzone-onDropActivate')
    public onDropActivate:EventEmitter<DropEvent> = new EventEmitter<DropEvent>();

    /**
     * @deprecated since 3.x.x. Use dropDeactivate instead
     */
    @Output('terra-dropzone-onDropDeactivate')
    public onDropDeactivate:EventEmitter<DropEvent> = new EventEmitter<DropEvent>();

    /**
     * @deprecated since 3.x.x. Use dragEnter instead
     */
    @Output('terra-dropzone-onDragEnter')
    public onDragEnter:EventEmitter<DropEvent> = new EventEmitter<DropEvent>();

    /**
     * @deprecated since 3.x.x. Use dragLeave instead
     */
    @Output('terra-dropzone-onDragLeave')
    public onDragLeave:EventEmitter<DropEvent> = new EventEmitter<DropEvent>();

    /**
     * @deprecated since 3.x.x. Use dropMove instead
     */
    @Output('terra-dropzone-onDropMove')
    public onDropMove:EventEmitter<DropEvent> = new EventEmitter<DropEvent>();

    /**
     * @deprecated since 3.x.x. Use drop instead
     */
    @Output('terra-dropzone-onDrop')
    public onDrop:EventEmitter<DropEvent> = new EventEmitter<DropEvent>();
    /* tslint:enable:no-output-on-prefix no-input-rename no-output-rename */

    private _interactable:any = null;

    constructor(private _el:ElementRef)
    {
        this._init();
        console.warn('TerraDropzoneDirective is deprecated. Please use another DnD library e.g. Angular Material CDK.');
    }

    public ngOnInit():void
    {
        if(this.onDropActivate.observers.length > 0)
        {
            console.warn('`terra-dropzone-onDropActivate` is deprecated. Please use `dropActivate` instead.');
        }

        if(this.onDropDeactivate.observers.length > 0)
        {
            console.warn('`terra-dropzone-onDropDeactivate` is deprecated. Please use `dropDeactivate` instead.');
        }

        if(this.onDragEnter.observers.length > 0)
        {
            console.warn('`terra-dropzone-onDragEnter` is deprecated. Please use `dragEnter` instead.');
        }

        if(this.onDragLeave.observers.length > 0)
        {
            console.warn('`terra-dropzone-onDragLeave` is deprecated. Please use `dragLeave` instead.');
        }

        if(this.onDropMove.observers.length > 0)
        {
            console.warn('`terra-dropzone-onDropMove` is deprecated. Please use `dropMove` instead.');
        }

        if(this.onDrop.observers.length > 0)
        {
            console.warn('`terra-dropzone-onDrop` is deprecated. Please use `drop` instead.');
        }
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        this._init();
    }

    private _init():void
    {
        let createDropEvent:(event:DropEvent) => DropEvent = (event:DropEvent):DropEvent =>
        {
            event.dropData = (<any> event.relatedTarget).IA_DRAG_DATA;
            return event;
        };

        let config:any = this._initConfigObject(createDropEvent);

        if(typeof this.overlap === 'string'
           && parseFloat(this.overlap) >= 0
           && parseFloat(this.overlap) <= 1)
        {
            config.overlap = parseFloat(this.overlap);
        }
        else
        {
            config.overlap = this.overlap;
        }

        if(typeof this.accept === 'string' && this.accept.length > 0)
        {
            config.accept = this.accept;
        }
        else if(this.accept instanceof Function)
        {
            config.checker = (interactEvent:InteractEvent,
                              event:MouseEvent,
                              isDropable:boolean,
                              dropzone:Interactable,
                              dropElement:HTMLElement,
                              draggable:Interactable,
                              dragElement:HTMLElement):boolean | AcceptFn =>
            {
                if(isDropable)
                {
                    return (this.accept as AcceptFn)({
                        interactEvent:    interactEvent,
                        event:            event,
                        isDropable:       isDropable,
                        dropzone:         dropzone,
                        dropzoneElement:  dropElement,
                        draggable:        draggable,
                        draggableElement: dragElement,
                        dragData:         (<any> interactEvent.target).IA_DRAG_DATA
                    });
                }

                return false;
            };
        }

        if(!this._interactable)
        {
            this._interactable = interact(this._el.nativeElement);
        }
        this._interactable.dropzone(config);
    }

    private _initConfigObject(createDropEvent:(event:DropEvent) => DropEvent):any
    {
        return {
            enabled:          !this.disabled,
            ondropactivate:   (event:DropEvent):void =>
                              {
                                  this.onDropActivate.emit(
                                      createDropEvent(event)
                                  );
                                  this.dropActivate.emit(
                                      createDropEvent(event)
                                  );
                              },
            ondropdeactivate: (event:DropEvent):void =>
                              {
                                  this.onDropDeactivate.emit(
                                      createDropEvent(event)
                                  );
                                  this.dropDeactivate.emit(
                                      createDropEvent(event)
                                  );
                              },
            ondragenter:      (event:DropEvent):void =>
                              {
                                  this.onDragEnter.emit(
                                      createDropEvent(event)
                                  );
                                  this.dragEnter.emit(
                                      createDropEvent(event)
                                  );
                              },
            ondragleave:      (event:DropEvent):void =>
                              {
                                  this.onDragLeave.emit(
                                      createDropEvent(event)
                                  );
                                  this.dragLeave.emit(
                                      createDropEvent(event)
                                  );
                              },
            ondropmove:       (event:DropEvent):void =>
                              {
                                  this.onDropMove.emit(
                                      createDropEvent(event)
                                  );
                                  this.dropMove.emit(
                                      createDropEvent(event)
                                  );
                              },
            ondrop:           (event:DropEvent):void =>
                              {
                                  this.onDrop.emit(
                                      createDropEvent(event)
                                  );
                                  this.drop.emit(
                                      createDropEvent(event)
                                  );
                              }

        };
    }
}
