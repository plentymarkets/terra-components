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
    public options:ResizeOptions = null;

    @Input()
    public disabled:boolean = false;

    @Input()
    public grid:false | GridOptions = false;

    @Input()
    public restrict:RestrictOptions = null;

    @Input()
    public inertia:boolean | InertiaOptions = false;

    @Output()
    public start:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    @Output()
    public move:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    @Output()
    public end:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    /* tslint:disable:no-output-on-prefix no-input-rename no-output-rename */
    /**
     * @deprecated use options instead
     */
    @Input('terra-resizable')
    public set terraOptions(value:ResizeOptions)
    {
        console.warn('`terra-resizable` is deprecated. Please use `options` instead.');
        this.options = value;
    }

    /**
     * @deprecated use disabled instead
     */
    @Input('terra-resizable-disabled')
    public set terraDisabled(value:boolean)
    {
        console.warn('`terra-resizable-disabled` is deprecated. Please use `disabled` instead.');
        this.disabled = value;
    }

    /**
     * @deprecated use grid instead
     */
    @Input('terra-resizable-grid')
    public set terraGrid(value:false | GridOptions)
    {
        console.warn('`terra-resizable-grid` is deprecated. Please use `grid` instead.');
        this.grid = value;
    }

    /**
     * @deprecated use restrict instead
     */
    @Input('terra-resizable-restrict')
    public set terraRestrict(value:RestrictOptions)
    {
        console.warn('`terra-resizable-restrict` is deprecated. Please use `restrict` instead.');
        this.restrict = value;
    }

    /**
     * @deprecated use inertia instead
     */
    @Input('terra-resizable-inertia')
    public set terraInertia(value:boolean | InertiaOptions)
    {
        console.warn('`terra-resizable-inertia` is deprecated. Please use `inertia` instead.');
        this.inertia = value;
    }

    /**
     * @deprecated use start instead
     */
    @Output('terra-resizable-onStart')
    public onStart:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    /**
     * @deprecated use move instead
     */
    @Output('terra-resizable-onMove')
    public onMove:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    /**
     * @deprecated use end instead
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
            console.warn('`terra-resizable-onStart` is deprecated. Please use `start` instead.');
        }

        if(this.onMove.observers.length > 0)
        {
            console.warn('`terra-resizable-onMove` is deprecated. Please use `move` instead.');
        }

        if(this.onEnd.observers.length > 0)
        {
            console.warn('`terra-resizable-onEnd` is deprecated. Please use `end` instead.');
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
            edges:               this.options.edges,
            invert:              this.options.invert || 'none',
            squareResize:        !!this.options.squareResize,
            preserveAspectRatio: !!this.options.preserveAspectRatio,
            inertia:             this.inertia,
            enabled:             !this.disabled,
            onstart:             (event:InteractEvent):void =>
                                 {
                                     this.onStart.emit(event);
                                     this.start.emit(event);
                                 },
            onmove:              (event:InteractEvent):void =>
                                 {
                                     this.onMove.emit(event);
                                     this.move.emit(event);
                                 },
            onend:               (event:InteractEvent):void =>
                                 {
                                     this.onEnd.emit(event);
                                     this.end.emit(event);
                                 },
        };

        if(this.grid)
        {
            resizableConfig.snap = {
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
            resizableConfig.restrict = this.restrict;
        }

        if(!this.interactable)
        {
            this.interactable = interact(this.el.nativeElement);
        }

        this.interactable.resizable(resizableConfig);
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
