import {
    Component,
    ViewChild,
    Input,
    AfterViewInit
} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { TerraOverlayButtonInterface } from './data/terra-overlay-button.interface';

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
    
    @Input() inputOverlayTitle:string;
    @Input() inputPrimaryButtonInterface:TerraOverlayButtonInterface;
    @Input() inputSecondaryButtonInterface:TerraOverlayButtonInterface;
    @Input() inputIsStatic:boolean;
    @Input() inputIsCloseable:boolean;
    @Input() inputIsLarge:boolean;
    @Input() inputIsSmall:boolean;
    
    constructor()
    {
        this.inputIsStatic = false;
        this.inputIsCloseable = true;
        this.inputIsLarge = false;
        this.inputIsSmall = false;
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
    
    public showOverlay():void
    {
        this.viewChildOverlay.show();
    }
    
    public hideOverlay():void
    {
        this.viewChildOverlay.hide();
    }
}
