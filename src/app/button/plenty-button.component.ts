import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
               selector:  'plenty-button',
               // templateUrl: 'plenty-button.component.html',
               // styleUrls: ['plenty-button.component.css'],
               styles:    [``],
               template:  `<div class="btn-handler"
                                 tooltipPlacement="{{tooltipPlacement}}"
                                 tooltip="{{tooltipText}}"
                                 tooltipEnable="{{tooltipText}}"
                                 [ngClass]="{'pull-xs-right': isAlignRight,
                                             'disabled': isDisabled}">
                              <button class="btn"
                                      [ngClass]="{'btn-brand-primary' : isPrimary,
                                                  'btn-brand-secondary' : isSecondary,
                                                  'btn-sm' : isSmall,
                                                  'btn-lg' : isLarge}"
                                      [disabled]="isDisabled"
                                      [hidden]="isHidden"
                                      [type]="type"
                                      (click)="click()">
                                <!--[tooltipAnimation]="{{tooltipAnimation}}">-->
                                <span *ngIf="icon" class="icon_dist_top" [ngClass]="icon"></span>
                            
                                {{caption}}
                            
                              </button>
                          </div>`
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
