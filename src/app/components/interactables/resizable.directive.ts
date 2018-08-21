import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
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
export class TerraResizableDirective implements OnChanges
{
    @Input('terra-resizable')
    public options:ResizeOptions = null;

    @Input('terra-resizable-disabled')
    public disabled:boolean = false;

    @Input('terra-resizable-grid')
    public grid:false | GridOptions = false;

    @Input('terra-resizable-restrict')
    public restrict:RestrictOptions = null;

    @Input('terra-resizable-inertia')
    public inertia:boolean | InertiaOptions = false;

    @Output('terra-resizable-onStart')
    public onStart:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    @Output('terra-resizable-onMove')
    public onMove:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    @Output('terra-resizable-onEnd')
    public onEnd:EventEmitter<InteractEvent> = new EventEmitter<InteractEvent>();

    private interactable:Interactable;

    constructor(private el:ElementRef)
    {
        this.init();
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
                                 },
            onmove:              (event:InteractEvent):void =>
                                 {
                                     this.onMove.emit(event);
                                 },
            onend:               (event:InteractEvent):void =>
                                 {
                                     this.onEnd.emit(event);
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
