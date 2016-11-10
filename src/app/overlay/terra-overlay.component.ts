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
               selector: 'terra-overlay',
               styles:   [require('./terra-overlay.component.scss').toString()],
               template: require('./terra-overlay.component.html')
           })
export class TerraOverlayComponent implements AfterViewInit
{
    @ViewChild('viewChildOverlay') viewChildOverlay:ModalDirective;
    
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
    
    @Output() outputPrimaryButtonClicked = new EventEmitter<TerraOverlayComponent>();
    @Output() outputSecondaryButtonClicked = new EventEmitter<TerraOverlayComponent>();
    @Output() outputSaveButtonClicked = new EventEmitter<TerraOverlayComponent>();
    
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
            this.viewChildOverlay.config.backdrop = 'static';
            this.viewChildOverlay.config.keyboard = false;
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
        this.viewChildOverlay.show();
    }
    
    public hideOverlay():void
    {
        this.viewChildOverlay.hide();
    }
}
