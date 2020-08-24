import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { TerraOverlayButtonInterface } from './data/terra-overlay-button.interface';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';

/**
 * @author mfrank
 * @deprecated since v5. Use angular material's [dialog](https://material.angular.io/components/dialog) instead.
 */
@Component({
    selector: 'terra-overlay',
    templateUrl: './terra-overlay.component.html',
    styleUrls: ['./terra-overlay.component.scss']
})
export class TerraOverlayComponent implements AfterViewInit {
    @Input()
    public inputOverlayTitle: string;

    @Input()
    public inputPrimaryButtonInterface: TerraOverlayButtonInterface;

    @Input()
    public inputSecondaryButtonInterface: TerraOverlayButtonInterface;

    @Input()
    public inputIsStatic: boolean = false;

    @Input()
    public inputIsCloseable: boolean = true;

    @Input()
    public inputIsLarge: boolean = true;

    @Input()
    public inputIsSmall: boolean = false;

    @Input()
    public inputIsExtraLarge: boolean = false;

    @Output()
    public outputOnHide: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();

    @Output()
    public outputOnShow: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();

    public readonly _tooltipPlacement: TerraPlacementEnum.BOTTOM;

    @ViewChild('viewChildOverlay', { static: true })
    public _viewChildOverlay: ModalDirective;

    public ngAfterViewInit(): void {
        if (!this.inputIsCloseable) {
            this.inputIsStatic = true;
        }

        if (this.inputIsStatic) {
            this._viewChildOverlay.config.backdrop = 'static';
            this._viewChildOverlay.config.keyboard = false;
        }
    }

    public showOverlay(): void {
        this._viewChildOverlay.show();
    }

    public hideOverlay(): void {
        this._viewChildOverlay.hide();
    }

    public emitOutputOnShow(): void {
        this.outputOnShow.emit(this._viewChildOverlay);
    }

    public emitOutputOnHide(): void {
        this.outputOnHide.emit(this._viewChildOverlay);
    }
}
