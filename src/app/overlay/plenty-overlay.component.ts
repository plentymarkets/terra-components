import {
    Component,
    ViewChild,
    Input,
    Output,
    AfterViewInit,
    EventEmitter
} from '@angular/core';
import {
    ModalDirective
} from 'ng2-bootstrap/ng2-bootstrap';

/**
 * @author mfrank
 */
@Component({
               selector:  'plenty-overlay',
               // templateUrl: 'plenty-overlay.component.html',
               styleUrls: ['plenty-overlay.component.css'],
               template:  `<div bsModal #overlay="bs-modal" class="modal fade" tabindex="-1" role="dialog" >
                              <div class="modal-dialog modal-lg" [ngClass]="{'modal-lg': isLarge, 'modal-sm': isSmall}">
                                <div class="modal-content">
                                  <div class="modal-header" *ngIf="isCloseable && overlayTitle">
                                    <plenty-button *ngIf="isCloseable" [isAlignRight]="true" icon="icon-close" (clicked)="overlay.hide()"></plenty-button>
                                    <h4 class="modal-title">{{overlayTitle}}</h4>
                                  </div>
                                  <div class="modal-body">
                                    <ng-content></ng-content>
                                  </div>
                                  <div class="modal-footer" *ngIf="hasPrimaryButton || hasSecondaryButton || hasSaveButton">
                                    <plenty-button *ngIf="hasPrimaryButton" [isAlignRight]="false" [isPrimary]="true" caption="Add" icon="icon-add" tooltipText="{{addButtonTooltip}}" tooltipPlacement="bottom" (clicked)="primaryClicked()"></plenty-button>
                                    <plenty-button *ngIf="hasSaveButton" [isAlignRight]="false" [isPrimary]="true" caption="Save" icon="icon-save" tooltipText="{{savelButtonTooltip}}" tooltipPlacement="bottom" (clicked)="primaryClicked()"></plenty-button>
                                    <plenty-button *ngIf="hasSecondaryButton" [isAlignRight]="false" [isSecondary]="true" caption="Cancel" icon="icon-cancel" tooltipText="{{cancelButtonTooltip}}" tooltipPlacement="bottom" (clicked)="secondaryClicked()"></plenty-button>
                                  </div>
                                </div>
                              </div>
                            </div>`
           })
export class PlentyOverlay implements AfterViewInit
{
    @ViewChild('overlay') public overlay:ModalDirective;

    @Input() addButtonTooltip:string;
    @Input() cancelButtonTooltip:string;
    @Input() saveButtonTooltip:string;
    @Input() overlayTitle:string;
    @Input() hasPrimaryButton:boolean = false;
    @Input() hasSecondaryButton:boolean = false;
    @Input() hasSaveButton:boolean = false;
    @Input() isStatic:boolean = false;
    @Input() isCloseable:boolean = true;
    @Input() isLarge:boolean = false;
    @Input() isSmall:boolean = false;

    @Output() primaryButtonClicked = new EventEmitter<PlentyOverlay>();
    @Output() secondaryButtonClicked = new EventEmitter<PlentyOverlay>();
    @Output() saveButtonClicked = new EventEmitter<PlentyOverlay>();

    constructor()
    {
    }

    ngAfterViewInit()
    {
        if(!this.isCloseable)
        {
            this.isStatic = true;
        }

        if(this.isStatic)
        {
            this.overlay.config.backdrop = 'static';
            this.overlay.config.keyboard = false;
        }
    }

    private primaryClicked():void
    {
        this.primaryButtonClicked.emit(this);
    }

    private secondaryClicked():void
    {
        this.secondaryButtonClicked.emit(this);
    }

    public showOverlay():void
    {
        this.overlay.show();
    }

    public hideOverlay():void
    {
        this.overlay.hide();
    }
}
