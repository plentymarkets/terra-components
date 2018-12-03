import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { GridOptions } from '../../interactables/gridOptions.interface';
import { TerraSliderTick } from './data/terra-slider-tick';
import { InteractEvent } from 'interactjs';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
    selector: 'terra-slider',
    template: require('./terra-slider.component.html'),
    styles:   [require('./terra-slider.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraSliderComponent),
            multi:       true
        }
    ]
})
export class TerraSliderComponent implements OnInit, OnChanges, ControlValueAccessor
{
    /**
     * @deprecated use `ngModel` instead
     */
    @Input()
    public inputValue:number;

    /**
     * @deprecated use `ngModelChange` instead
     */
    @Output()
    public inputValueChange:EventEmitter<number> = new EventEmitter<number>();

    @Input()
    public inputName:string;

    @Input()
    public inputMin:number = 0;

    @Input()
    public inputMax:number = 1;

    @Input()
    public inputInterval:number = 0;

    @Input()
    public inputPrecision:number = null;

    @Input()
    public inputShowMinMax:boolean = false;

    @Input()
    public inputShowTicks:boolean = false;

    @Input()
    public inputIsDisabled:boolean = false;

    protected value:number;

    @ViewChild('sliderBar', {read: ElementRef})
    private sliderBarElement:ElementRef;

    constructor(private element:ElementRef, private changeDetector:ChangeDetectorRef)
    {
    }

    /**
     * @public
     * @param changes
     */
    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputValue'))
        {
            this.value = this.inputValue; // for backwards compatibility
        }
    }

    /**
     * get position of slider element in px to left bound
     * @returns {number}
     * @public
     */
    public get handlePosition():number
    {
        let sliderWidth:number = this.sliderBarElement.nativeElement.getBoundingClientRect().width;
        let percentage:number = Math.abs(this.inputMin - this.value) / this.calculateRangeOfSlider();

        if(percentage < 0)
        {
            return 0;
        }

        if(percentage > 1)
        {
            return sliderWidth;
        }

        return sliderWidth * percentage;
    }

    /**
     * set position of slider element in px to left bound
     * @public
     * @param value
     */
    public set handlePosition(value:number)
    {
        let sliderWidth:number = this.sliderBarElement.nativeElement.getBoundingClientRect().width;
        let percentage:number = (value / sliderWidth) * 100;
        let valuePerPercent:number = this.calculateRangeOfSlider() / 100;
        this.value = this.inputMin + (percentage * valuePerPercent);

        if(this.inputInterval > 0)
        {
            let diff:number = this.value % this.inputInterval;
            if(diff !== 0)
            {
                if(diff < this.inputInterval / 2)
                {
                    this.value -= diff;
                }
                else
                {
                    this.value += this.inputInterval - diff;
                }
            }
        }

        if(this.value < this.inputMin)
        {
            this.value = this.inputMin;
        }

        if(this.value > this.inputMax)
        {
            this.value = this.inputMax;
        }

        this.inputValueChange.emit(this.value);
        this.changeCallback(this.value);
        this.touchedCallback();
        this.inputValue = this.value; // for backwards compatibility

        this.changeDetector.detectChanges();
    }

    protected get grid():GridOptions
    {
        if(this.inputInterval > 0)
        {
            return {
                x: this.element.nativeElement.getBoundingClientRect().width / this.calculateNumberOfSteps(),
                y: 0
            };
        }

        return null;
    }

    /**
     * @public
     */
    public ngOnInit():void
    {
        if(isNullOrUndefined(this.value))
        {
            this.value = this.inputMin + (this.calculateRangeOfSlider() / 2);
        }

        if(isNullOrUndefined(this.inputPrecision))
        {
            if(this.inputInterval > 0)
            {
                let stepSize:number = this.inputInterval;
                let steps:Array<number> = [];
                let current:number = this.inputMin;

                while(current <= this.inputMax)
                {
                    steps.push(current);
                    current += stepSize;
                }

                this.inputPrecision = Math.max(
                    ...steps.map((step:number):number =>
                    {
                        let parts:Array<string> = ('' + step).split('.');

                        if(!parts[1])
                        {
                            return 0;
                        }
                        else
                        {
                            let match:RegExpExecArray = /[1-9]/g.exec(parts[1].substr(0, 3));

                            if(match)
                            {
                                return match.index;
                            }
                            else
                            {
                                return 0;
                            }
                        }
                    })
                );
            }
            else
            {
                this.inputPrecision = 5 - Math.max(('' + this.inputMin).length, ('' + this.inputMax).length);
            }

        }

        if(this.inputPrecision > 3)
        {
            this.inputPrecision = 3;
        }
    }

    /**
     * handle drag event
     * @public
     * @param event
     */
    public onDrag(event:InteractEvent):void
    {
        this.moveToPosition(event.pageX);
    }

    /**
     * handle click event on bar
     * @public
     * @param event
     */
    public onBarClicked(event:MouseEvent):void
    {
        this.moveToPosition(event.pageX);
    }

    private moveToPosition(position:number):void
    {
        if(!this.inputIsDisabled)
        {
            let sliderRect:any | ClientRect = this.sliderBarElement.nativeElement.getBoundingClientRect();
            this.handlePosition = position - sliderRect.left;
        }
    }

    /**
     * get ticks
     * @returns {Array<TerraSliderTick>}
     * @public
     */
    public getTicks():Array<TerraSliderTick>
    {
        let ticks:Array<TerraSliderTick> = [];
        let numberOfTicks:number = 10;

        if(this.inputInterval > 0)
        {
            numberOfTicks = this.calculateNumberOfSteps();
        }

        for(let i:number = 1; i < numberOfTicks; i++)
        {
            let positionInPercent:number = i * (100 / numberOfTicks);

            ticks.push(
                new TerraSliderTick(
                    positionInPercent,
                    this.calculateValueFromPercent(positionInPercent)
                )
            );
        }

        return ticks;
    }

    private calculateRangeOfSlider():number
    {
        return Math.abs(this.inputMin - this.inputMax);
    }

    private calculateValueFromPercent(positionInPercent:number):number
    {
        return this.inputMin + (this.calculateRangeOfSlider() * (positionInPercent / 100));
    }

    private calculateNumberOfSteps():number
    {
        return this.calculateRangeOfSlider() / this.inputInterval;
    }

    private changeCallback:(value:number) => void = ():void => undefined;
    private touchedCallback:() => void = ():void => undefined;

    /**
     * @public
     * @param fn
     */
    public registerOnChange(fn:any):void
    {
        this.changeCallback = fn;
    }

    /**
     * @public
     * @param fn
     */
    public registerOnTouched(fn:any):void
    {
        this.touchedCallback = fn;
    }

    /**
     * @public
     * @param value
     */
    public writeValue(value:number):void
    {
        this.value = value;
    }
}
