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
               selector: 'plenty-overlay',
               styles:   [require('./plenty-overlay.component.scss')],
               template: require('./plenty-overlay.component.html')
           })
export class PlentyOverlay implements AfterViewInit
{
    @ViewChild('overlay') public overlay:ModalDirective;
    
    @Input() inputAddButtonTooltip:string;
    @Input() inputCancelButtonTooltip:string;
    @Input() inputSaveButtonTooltip:string;
    @Input() inputOverlayTitle:string;
    @Input() inputHasPrimaryButton:boolean = false;
    @Input() inputHasSecondaryButton:boolean = false;
    @Input() inputHasSaveButton:boolean = false;
    @Input() inputIsStatic:boolean = false;
    @Input() inputIsCloseable:boolean = true;
    @Input() inputIsLarge:boolean = false;
    @Input() inputIsSmall:boolean = false;
    
    @Output() outputPrimaryButtonClicked = new EventEmitter<PlentyOverlay>();
    @Output() outputSecondaryButtonClicked = new EventEmitter<PlentyOverlay>();
    @Output() outputSaveButtonClicked = new EventEmitter<PlentyOverlay>();
    
    constructor()
    {
    }
    
    ngAfterViewInit()
    {
        if(!this.inputIsCloseable)
        {
            this.inputIsStatic = true;
        }
        
        if(this.inputIsStatic)
        {
            this.overlay.config.backdrop = 'static';
            this.overlay.config.keyboard = false;
        }
    }
    
    private primaryClicked():void
    {
        this.outputPrimaryButtonClicked.emit(this);
    }
    
    private secondaryClicked():void
    {
        this.outputSecondaryButtonClicked.emit(this);
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
