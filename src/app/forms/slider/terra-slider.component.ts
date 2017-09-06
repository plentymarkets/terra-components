import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { GridOptions } from '../../interactables/gridOptions.interface';

@Component({
    selector: 'terra-slider',
    template: require('./terra-slider.component.html'),
    styles:   [require('./terra-slider.component.scss')]
})
export class TerraSliderComponent implements OnInit
{

    @Input()
    public inputValue:number;

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

    @ViewChild('sliderBar', {read: ElementRef})
    private sliderBarElement:ElementRef;

    constructor(private element:ElementRef, private changeDetector:ChangeDetectorRef)
    {
    }

    public get handlePosition():number
    {
        let sliderWidth:number = this.sliderBarElement.nativeElement.getBoundingClientRect().width;
        let percentage:number = Math.abs(this.inputMin - this.inputValue) / Math.abs(this.inputMin - this.inputMax);
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

    public set handlePosition(value:number)
    {
        let sliderWidth:number = this.sliderBarElement.nativeElement.getBoundingClientRect().width;
        let percentage:number = ( value / sliderWidth ) * 100;
        let percentageValue:number = Math.abs(this.inputMin - this.inputMax) / 100;
        // console.log( percentage + "% * " + percentageValue + " = " + percentage * percentageValue );
        this.inputValue = this.inputMin + (percentage * percentageValue);

        if(this.inputInterval > 0)
        {
            let diff = this.inputValue % this.inputInterval;
            if(diff !== 0)
            {
                if(diff < this.inputInterval / 2)
                {
                    this.inputValue -= diff;
                }
                else
                {
                    this.inputValue += this.inputInterval - diff;
                }
            }
        }


        if(this.inputValue < this.inputMin)
        {
            this.inputValue = this.inputMin;
        }

        if(this.inputValue > this.inputMax)
        {
            this.inputValue = this.inputMax;
        }

        this.inputValueChange.emit(this.inputValue);

        this.changeDetector.detectChanges();
    }

    private get grid():GridOptions
    {
        if(this.inputInterval > 0)
        {
            let stepSize:number = Math.abs(this.inputMin - this.inputMax) / this.inputInterval;

            return {
                x: this.element.nativeElement.getBoundingClientRect().width / stepSize,
                y: 0
            };
        }

        return null;
    }

    public ngOnInit():void
    {
        if(isNullOrUndefined(this.inputValue))
        {
            this.inputValue = this.inputMin + (Math.abs(this.inputMin - this.inputMax) / 2);
        }

        if(isNullOrUndefined(this.inputPrecision))
        {
            if(this.inputInterval > 0)
            {
                let numberOfSteps:number = Math.abs(this.inputMin - this.inputMax) / this.inputInterval;
                let stepSize:number = Math.abs(this.inputMin - this.inputMax) / numberOfSteps;
                let steps:number[] = [];
                let current:number = this.inputMin;
                while(current <= this.inputMax)
                {
                    steps.push(current);
                    current += stepSize;
                }

                this.inputPrecision = Math.max(
                    ...steps.map(step =>
                    {
                        let parts = ("" + step).split(".");
                        if(!parts[1])
                        {
                            return 0;
                        }
                        else
                        {
                            let match = /[1-9]/g.exec(parts[1].substr(0, 3));
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
                this.inputPrecision = 5 - Math.max(("" + this.inputMin).length, ("" + this.inputMax).length);
            }

        }

        if(this.inputPrecision > 3)
        {
            this.inputPrecision = 3
        }
    }

    public onDrag(event:Interact.InteractEvent)
    {
        this.moveToPosition(event.pageX);
    }

    public onBarClicked(event:MouseEvent)
    {
        this.moveToPosition(event.pageX);
    }

    private moveToPosition(position:number)
    {
        let sliderRect = this.sliderBarElement.nativeElement.getBoundingClientRect();
        this.handlePosition = position - sliderRect.left;
    }

    public getTicks()
    {
        let tickPositions:number[] = [];
        if(this.inputInterval > 0)
        {
            let numberOfTicks:number = Math.abs(this.inputMin - this.inputMax) / this.inputInterval;
            for(let i = 1; i < numberOfTicks; i++)
            {
                tickPositions.push(i * (100 / numberOfTicks));
            }
        }
        else
        {
            tickPositions = [10,
                             20,
                             30,
                             40,
                             50,
                             60,
                             70,
                             80,
                             90]
        }

        return tickPositions.map((percentage:number) =>
        {
            return {
                position: percentage,
                caption:  this.inputMin + (Math.abs(this.inputMin - this.inputMax) * (percentage / 100))
            };
        });
    }
}