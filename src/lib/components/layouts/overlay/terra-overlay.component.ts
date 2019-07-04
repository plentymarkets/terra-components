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
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';

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
    @ViewChild('viewChildOverlay')
    public viewChildOverlay:ModalDirective;

    @Input()
    public inputOverlayTitle:string;

    @Input()
    public inputPrimaryButtonInterface:TerraOverlayButtonInterface;

    @Input()
    public inputSecondaryButtonInterface:TerraOverlayButtonInterface;

    @Input()
    public inputIsStatic:boolean = false;

    @Input()
    public inputIsCloseable:boolean = true;

    @Input()
    public inputIsLarge:boolean = true;

    @Input()
    public inputIsSmall:boolean = false;

    @Input()
    public inputIsExtraLarge:boolean = false;

    @Output()
    public outputOnHide:EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();

    @Output()
    public outputOnShow:EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();

    protected readonly tooltipPlacement:TerraPlacementEnum.BOTTOM;

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
        this.outputOnShow.emit(this.viewChildOverlay);
    }

    public emitOutputOnHide():void
    {
        this.outputOnHide.emit(this.viewChildOverlay);
    }
}
