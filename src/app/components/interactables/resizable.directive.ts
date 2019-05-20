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
import { ResizeOptions } from './resizeOptions.interface';
import { InertiaOptions } from './inertiaOptions.interface';
import { RestrictOptions } from './restrictOptions.interface';
import { GridOptions } from './gridOptions.interface';
import {
    Interactable,
    InteractEvent
} from 'interactjs';
import interact = require('interactjs');

@Directive({
    selector: '[terraResizable]'
})
export class TerraResizableDirective implements OnInit, OnChanges
{
    @Input()
    public resizableOptions:ResizeOptions = null;

    @Input()
    public resizableDisabled:boolean = false;

    @Input()
    public resizableGrid:false | GridOptions = false;

    @Input()
    public resizableRestrict:RestrictOptions = null;

    @Input()
    public resizableInertia:boolean | InertiaOptions = false;

    @Output()
    public resizableStart:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    @Output()
    public resizableMove:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    @Output()
    public resizableEnd:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    /* tslint:disable:no-output-on-prefix no-input-rename no-output-rename */
    /**
     * @deprecated use resizableOptions instead
     */
    @Input('terra-resizable')
    public set options(value:ResizeOptions)
    {
        console.warn('`terra-resizable` is deprecated. Please use `resizableOptions` instead.');
        this.resizableOptions = value;
    }

    /**
     * @deprecated use resizableDisabled instead
     */
    @Input('terra-resizable-disabled')
    public set disabled(value:boolean)
    {
        console.warn('`terra-resizable-disabled` is deprecated. Please use `resizableDisabled` instead.');
        this.resizableDisabled = value;
    }

    /**
     * @deprecated use resizableGrid instead
     */
    @Input('terra-resizable-grid')
    public set grid(value:false | GridOptions)
    {
        console.warn('`terra-resizable-grid` is deprecated. Please use `resizableGrid` instead.');
        this.resizableGrid = value;
    }

    /**
     * @deprecated use resizableRestrict instead
     */
    @Input('terra-resizable-restrict')
    public set restrict(value:RestrictOptions)
    {
        console.warn('`terra-resizable-restrict` is deprecated. Please use `resizableRestrict` instead.');
        this.resizableRestrict = value;
    }

    /**
     * @deprecated use resizableInertia instead
     */
    @Input('terra-resizable-inertia')
    public set inertia(value:boolean | InertiaOptions)
    {
        console.warn('`terra-resizable-inertia` is deprecated. Please use `resizableInertia` instead.');
        this.resizableInertia = value;
    }

    /**
     * @deprecated use resizableStart instead
     */
    @Output('terra-resizable-onStart')
    public onStart:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    /**
     * @deprecated use resizableMove instead
     */
    @Output('terra-resizable-onMove')
    public onMove:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    /**
     * @deprecated use resizableEnd instead
     */
    @Output('terra-resizable-onEnd')
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
            console.warn('`terra-resizable-onStart` is deprecated. Please use `resizableStart` instead.');
        }

        if(this.onMove.observers.length > 0)
        {
            console.warn('`terra-resizable-onMove` is deprecated. Please use `resizableMove` instead.');
        }

        if(this.onEnd.observers.length > 0)
        {
            console.warn('`terra-resizable-onEnd` is deprecated. Please use `resizableEnd` instead.');
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

                      Object.defineProperty(
                          this[input],
                          property,
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
        let resizableConfig:any = {
            edges:               this.resizableOptions.edges,
            invert:              this.resizableOptions.invert || 'none',
            squareResize:        !!this.resizableOptions.squareResize,
            preserveAspectRatio: !!this.resizableOptions.preserveAspectRatio,
            inertia:             this.resizableInertia,
            enabled:             !this.resizableDisabled,
            onstart:             (event:InteractEvent):void =>
                                 {
                                     this.onStart.emit(event);
                                     this.resizableStart.emit(event);
                                 },
            onmove:              (event:InteractEvent):void =>
                                 {
                                     this.onMove.emit(event);
                                     this.resizableMove.emit(event);
                                 },
            onend:               (event:InteractEvent):void =>
                                 {
                                     this.onEnd.emit(event);
                                     this.resizableEnd.emit(event);
                                 },
        };

        if(this.resizableGrid)
        {
            resizableConfig.snap = {
                targets:        [
                    (x:number, y:number):{ x:number, y:number, range:number } =>
                    {
                        return this.handleSnap(x, y);
                    }
                ],
                endOnly:        this.resizableGrid && this.resizableGrid.endOnly,
                relativePoints: this.resizableGrid.relativePoints
            };
        }

        if(this.resizableRestrict)
        {
            resizableConfig.resizableRestrict = this.resizableRestrict;
        }

        if(!this.interactable)
        {
            this.interactable = interact(this.el.nativeElement);
        }

        this.interactable.resizable(resizableConfig);
    }

    private handleSnap(x:number, y:number):{ x:number, y:number, range:number }
    {
        if(this.resizableGrid)
        {
            let offset:{ x:number, y:number } = {
                x: 0,
                y: 0
            };

            if(this.resizableGrid.offset)
            {
                offset = this.resizableGrid.offset;
            }

            return {
                x:     Math.round((x - offset.x) / this.resizableGrid.x) * this.resizableGrid.x,
                y:     Math.round((y - offset.y) / this.resizableGrid.y) * this.resizableGrid.y,
                range: (this.resizableGrid.range || Infinity)
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
