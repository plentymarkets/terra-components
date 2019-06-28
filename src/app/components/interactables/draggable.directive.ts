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
import { GridOptions } from './gridOptions.interface';
import { DraggableOptions } from './draggableOptions.interface';
import { RestrictOptions } from './restrictOptions.interface';
import { InertiaOptions } from './inertiaOptions.interface';
import {
    Interactable,
    InteractEvent
} from 'interactjs';
import interact = require('interactjs');

@Directive({
    selector: '[terraDraggable]'
})
export class TerraDraggableDirective implements OnInit, OnChanges
{
    @Input()
    public options?:DraggableOptions = null;

    @Input()
    public disabled:boolean = false;

    @Input()
    public grid:GridOptions = null;

    @Input()
    public restrict:RestrictOptions = null;

    @Input()
    public inertia:boolean | InertiaOptions = false;

    @Input()
    public dragData:any;

    @Output()
    public start:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    @Output()
    public move:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    @Output()
    public end:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    /* tslint:disable:no-output-on-prefix no-input-rename no-output-rename */
    /**
     * @deprecated since 3.x.x. Use options instead.
     */
    @Input('terraDraggable')
    public set draggableOptions(value:DraggableOptions)
    {
        console.warn('`terraDraggable` is deprecated. Please use `options` instead.');
        this.options = value;
    }

    /**
     * @deprecated since 3.x.x. Use disabled instead.
     */
    @Input('terra-draggable-disabled')
    public set draggableDisabled(value:boolean)
    {
        console.warn('`terra-draggable-disabled` is deprecated. Please use `disabled` instead.');
        this.disabled = value;
    }

    /**
     * @deprecated since 3.x.x. Use grid instead.
     */
    @Input('terra-draggable-grid')
    public set draggableGrid(value:GridOptions)
    {
        console.warn('`terra-draggable-grid` is deprecated. Please use `grid` instead.');
        this.grid = value;
    }

    /**
     * @deprecated since 3.x.x. Use restrict instead.
     */
    @Input('terra-draggable-restrict')
    public set draggableRestrict(value:RestrictOptions)
    {
        console.warn('`terra-draggable-restrict` is deprecated. Please use `restrict` instead.');
        this.restrict = value;
    }

    /**
     * @deprecated since 3.x.x. Use inertia instead.
     */
    @Input('tera-draggable-inertia')
    public set draggableInertia(value:boolean | InertiaOptions)
    {
        console.warn('`terraDraggable` is deprecated. Please use `options` instead.');
        this.inertia = value;
    }

    /**
     * @deprecated since 3.x.x. Use DragData instead.
     */
    @Input('terra-draggable-data')
    public set draggableDragData(value:any)
    {
        console.warn('`terraDraggable` is deprecated. Please use `options` instead.');
        this.dragData = value;
    }

    /**
     * @deprecated since 3.x.x. Use start instead.
     */
    @Output('terra-draggable-onStart')
    public onStart:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    /**
     * @deprecated since 3.x.x. Use move instead.
     */
    @Output('terra-draggable-onMove')
    public onMove:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    /**
     * @deprecated since 3.x.x. Use end instead.
     */
    @Output('terra-draggable-onEnd')
    public onEnd:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();
    /* tslint:enable:no-output-on-prefix no-input-rename no-output-rename */

    private interactable:Interactable;

    constructor(private el:ElementRef)
    {
        this.init();
    }

    public ngOnInit():void
    {
        if(this.onStart.observers.length > 0)
        {
            console.warn('`terra-draggable-onStart` is deprecated. Please use `start` instead.');
        }

        if(this.onMove.observers.length > 0)
        {
            console.warn('`terra-draggable-onMove` is deprecated. Please use `move` instead.');
        }

        if(this.onEnd.observers.length > 0)
        {
            console.warn('`terra-draggable-onEnd` is deprecated. Please use `end` instead.');
        }
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        Object.keys(changes).forEach((changedProperty:string) =>
        {
            if(typeof changes[changedProperty].currentValue === 'object')
            {
                this.prepareImmutableInput(changedProperty);
            }
        });

        this.init();
    }

    private prepareImmutableInput(input:string):void
    {
        if(this[input] && typeof this[input] === 'object')
        {
            Object.keys(this[input])
                  .filter((property:string) =>
                  {
                      return this[input].propertyIsEnumerable(property);
                  })
                  .forEach((property:string) =>
                  {
                      // this[input]["_" + property] = this[input][property];
                      Object.defineProperty(
                          this[input],
                          '_' + property,
                          {
                              configurable: false,
                              enumerable:   false,
                              writable:     true,
                              value:        this[input][property]
                          }
                      );

                      Object.defineProperty(this[input], property,
                          {
                              configurable: true,
                              enumerable:   true,
                              get:          ():any =>
                                            {
                                                return this[input]['_' + property];
                                            },
                              set:          (value:any):void =>
                                            {
                                                this[input]['_' + property] = value;
                                                this.init();
                                            }
                          }
                      );

                  });
        }
    }

    private init():void
    {
        let draggableConfig:any = {
            max:          (this.options || {}).max || 1,
            maxPerElemet: (this.options || {}).maxPerElement || Infinity,
            autoScroll:   (this.options || {}).autoScroll || false,
            axis:         (this.options || {}).axis || 'xy',
            manualStart:  (this.options || {}).manualStart || false,
            inertia:      this.inertia,
            enabled:      !this.disabled,
            allowFrom:    (this.options || {}).allowFrom || null,
            ignoreFrom:   (this.options || {}).ignoreFrom || null,
            styleCursor:  false,
            onstart:      (event:InteractEvent):void =>
                          {
                              this.onStart.emit(event);
                              this.start.emit(event);
                              event.target.IA_DRAG_DATA = this.dragData;
                          },
            onmove:       (event:InteractEvent):void =>
                          {
                              this.onMove.emit(event);
                              this.move.emit(event);
                              event.target.IA_DRAG_DATA = this.dragData;
                          },
            onend:        (event:InteractEvent):void =>
                          {
                              this.onEnd.emit(event);
                              this.end.emit(event);
                              event.target.IA_DRAG_DATA = null;
                          },
        };

        if(this.grid)
        {
            draggableConfig.snap = {
                targets:        [
                    (x:number, y:number):{ x:number, y:number, range:number } =>
                    {
                        return this.handleSnap(x, y);
                    }
                ],
                endOnly:        this.grid && this.grid.endOnly,
                relativePoints: this.grid.relativePoints
            };
        }

        if(this.restrict)
        {
            draggableConfig.restrict = this.restrict;
        }

        if(!this.interactable)
        {
            this.interactable = interact(this.el.nativeElement);
        }

        this.interactable.draggable(draggableConfig);
    }

    private handleSnap(x:number, y:number):{ x:number, y:number, range:number }
    {
        if(this.grid)
        {
            let offset:{ x:number, y:number } = {
                x: 0,
                y: 0
            };

            if(this.grid.offset)
            {
                offset = this.grid.offset;
            }

            return {
                x:     Math.round((x - offset.x) / this.grid.x) * this.grid.x,
                y:     Math.round((y - offset.y) / this.grid.y) * this.grid.y,
                range: (this.grid.range || Infinity)
            };
        }
        else
        {
            // Snap is disabled
            return {
                x:     x,
                y:     y,
                range: 0
            };
        }
    }
}
