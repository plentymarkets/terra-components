import {
    ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output,
    ViewChild
} from "@angular/core";
import { isNullOrUndefined } from "util";
import { GridOptions } from "../../interactables/gridOptions.interface";

@Component({
    selector: 'terra-slider',
    template: require('./terra-slider.component.html'),
    styles: [require('./terra-slider.component.scss')]
})
export class TerraSliderComponent implements OnInit
{

    @Input()
    public inputValue: number;

    @Output()
    public inputValueChange: EventEmitter<number> = new EventEmitter<number>();

    @Input()
    public inputMin: number = 0;

    @Input()
    public inputMax: number = 1;

    @Input()
    public inputInterval: number = 0;

    @ViewChild('sliderBar', { read: ElementRef })
    private sliderBarElement: ElementRef;

    constructor( private element: ElementRef, private changeDetector: ChangeDetectorRef )
    {
    }

    public get handlePosition(): number
    {
        let sliderWidth: number = this.sliderBarElement.nativeElement.getBoundingClientRect().width;
        let percentage: number = ( this.inputValue / Math.abs( this.inputMin - this.inputMax ) );

        if ( percentage < 0 )
        {
            return 0;
        }

        if ( percentage > 1 )
        {
            return sliderWidth;
        }

        return sliderWidth * percentage;
    }

    public set handlePosition( value: number )
    {
        let sliderWidth: number = this.sliderBarElement.nativeElement.getBoundingClientRect().width;
        let percentage: number = ( value / sliderWidth ) * 100;
        let percentageValue: number = Math.abs( this.inputMin - this.inputMax ) / 100;
        this.inputValue = Math.round(this.inputMin + (percentage * percentageValue));

        let diff = this.inputValue % this.inputInterval;
        if ( diff !== 0 )
        {
            if ( diff < this.inputInterval / 2 )
            {
                this.inputValue -= diff;
            }
            else
            {
                this.inputValue += this.inputInterval - diff;
            }
        }


        if ( this.inputValue < this.inputMin )
        {
            this.inputValue = this.inputMin;
        }

        if ( this.inputValue > this.inputMax )
        {
            this.inputValue = this.inputMax;
        }

        this.inputValueChange.emit( this.inputValue );

        this.changeDetector.detectChanges();
    }

    private get grid(): GridOptions
    {
        if ( this.inputInterval > 0 )
        {
            let stepSize: number = Math.abs( this.inputMin - this.inputMax ) / this.inputInterval;

            return {
                x: this.element.nativeElement.getBoundingClientRect().width / stepSize,
                y: 0
            };
        }

        return null;
    }

    public ngOnInit(): void
    {
        if ( isNullOrUndefined( this.inputValue ) )
        {
            this.inputValue = (this.inputMax + this.inputMin ) / 2;
        }
    }

    public onDrag( event: Interact.InteractEvent )
    {
        this.moveToPosition( event.pageX );
    }

    public onBarClicked( event: MouseEvent )
    {
        this.moveToPosition( event.pageX );
    }

    private moveToPosition( position: number )
    {
        let sliderRect = this.sliderBarElement.nativeElement.getBoundingClientRect();
        this.handlePosition = position - sliderRect.left;
    }
}