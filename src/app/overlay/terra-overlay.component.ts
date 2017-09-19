import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { TerraOverlayButtonInterface } from './data/terra-overlay-button.interface';

/**
 * @author mfrank
 */
@Component({
    selector: 'terra-overlay',
    template: require('./terra-overlay.component.html'),
    styles:   [require('./terra-overlay.component.scss')]
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
    @Output() outputOnHide:EventEmitter<ModalDirective>;
    @Output() outputOnShow:EventEmitter<ModalDirective>;

    constructor()
    {
        this.inputIsStatic = false;
        this.inputIsCloseable = true;
        this.inputIsLarge = false;
        this.inputIsSmall = false;

        this.outputOnHide = new EventEmitter<ModalDirective>();
        this.outputOnShow = new EventEmitter<ModalDirective>();
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

    public emitOutputOnShow():void
    {
        this.outputOnShow.emit(null);
    }

    public emitOutputOnHide():void
    {
        this.outputOnHide.emit(null);
    }
}
