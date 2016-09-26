import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation
} from '@angular/core';

@Component({
               selector:  'plenty-button',
               styles:    [require('./plenty-button.component.scss')],
               template:  require('./plenty-button.component.html'),
               encapsulation: ViewEncapsulation.None,
           })

export class PlentyButton
{
    @Input() isPrimary:boolean;
    @Input() isSecondary:boolean;
    @Input() isSmall:boolean;
    @Input() isLarge:boolean;
    @Input() isDisabled:boolean;
    @Input() caption:string;
    @Input() icon:string;
    @Input() type:string;
    @Input() isAlignRight:boolean;
    @Input() isHidden:boolean;
    @Input() tooltipText:string;
    @Input() tooltipPlacement:string; //top, bottom, left, right
    @Output() clicked = new EventEmitter<any>();

    constructor()
    {
        this.tooltipPlacement = 'top';
    }

    private click():void
    {
        this.clicked.emit(null);
    }
}
