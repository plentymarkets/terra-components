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
    templateUrl: './terra-overlay.component.html',
    styleUrls:   ['./terra-overlay.component.scss']
})
export class TerraOverlayComponent implements AfterViewInit
{
    @ViewChild('viewChildOverlay')
    public viewChildOverlay:ModalDirective;

    @Input()
    public inputOverlayTitle:string;

    @Input()
    public inputPrimaryButtonInterface:TerraOverlayButtonInterface;

    @Input()
    public inputSecondaryButtonInterface:TerraOverlayButtonInterface;

    @Input()
    public inputIsStatic:boolean;

    @Input()
    public inputIsCloseable:boolean;

    @Input()
    public inputIsLarge:boolean;

    @Input()
    public inputIsSmall:boolean;

    @Input()
    public inputIsExtraLarge:boolean;

    @Output()
    public outputOnHide:EventEmitter<ModalDirective>;

    @Output()
    public outputOnShow:EventEmitter<ModalDirective>;

    constructor()
    {
        this.inputIsStatic = false;
        this.inputIsCloseable = true;
        this.inputIsExtraLarge = false;
        this.inputIsLarge = false;
        this.inputIsSmall = false;


        this.outputOnHide = new EventEmitter<ModalDirective>();
        this.outputOnShow = new EventEmitter<ModalDirective>();
    }

    public ngAfterViewInit():void
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
