import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
               selector:    'plenty-button',
               templateUrl: './plenty-button.component.html',
               styleUrls:   ['./plenty-button.component.css']
           })

export class PlentyButton
{
    @Input() isPrimary: boolean;
    @Input() isSecondary: boolean;
    @Input() isSmall: boolean;
    @Input() isLarge: boolean;
    @Input() isDisabled: boolean;
    @Input() caption: string;
    @Input() icon: string;
    @Input() type: string;
    @Input() isAlignRight: boolean;
    @Input() isHidden: boolean;
    @Input() tooltipText: string;
    @Input() tooltipPlacement: string; //top, bottom, left, right
    @Output() clicked = new EventEmitter<any>();

    constructor()
    {
        this.tooltipPlacement = 'top';
    }

    private click(): void
    {
        this.clicked.emit(null);
    }
}
