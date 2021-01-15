import { Component, OnInit, ViewChild } from '@angular/core';
import { TerraOverlayComponent } from '../terra-overlay.component';
import { TerraOverlayButtonInterface } from '../data/terra-overlay-button.interface';
import { AlertService } from '../../../alert';

@Component({
    selector: 'terra-overlay-example',
    templateUrl: './terra-overlay.component.example.html'
})
export class TerraOverlayComponentExample implements OnInit {
    public _addButtonTooltip: string = 'Hinzufügen';
    public _cancelButtonTooltip: string = 'Abbrechen';
    public _primaryButtonInterface: TerraOverlayButtonInterface;
    public _secondaryButtonInterface: TerraOverlayButtonInterface;
    public _staticPrimaryButtonInterface: TerraOverlayButtonInterface;
    public _staticSecondaryButtonInterface: TerraOverlayButtonInterface;
    public _exampleText: string =
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.' +
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ' +
        'ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, ' +
        'fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, ' +
        'justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper ' +
        'nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. ' +
        'Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius ' +
        'laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies ' +
        'nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, ' +
        'sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. ' +
        'Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ' +
        'ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. ' +
        'Donec sodales sagittis magna.';

    @ViewChild('viewChildOverlayWithoutButtons', { static: true })
    private _viewChildOverlayWithoutButtons: TerraOverlayComponent;

    @ViewChild('viewChildOverlayWithPrimaryButton', { static: true })
    private _viewChildOverlayWithPrimaryButton: TerraOverlayComponent;

    @ViewChild('viewChildOverlayWithSecondaryButton', { static: true })
    private _viewChildOverlayWithSecondaryButton: TerraOverlayComponent;

    @ViewChild('viewChildOverlayStatic', { static: true })
    private _viewChildOverlayStatic: TerraOverlayComponent;

    constructor(private _alertService: AlertService) {}

    public ngOnInit(): void {
        this._primaryButtonInterface = {
            icon: 'icon-confirm',
            caption: 'Test',
            tooltipText: this._addButtonTooltip,
            isDisabled: false,
            clickFunction: (): void => this._primaryClicked(this._viewChildOverlayWithPrimaryButton)
        };

        this._secondaryButtonInterface = {
            icon: 'icon-cancel',
            caption: 'Cancel',
            tooltipText: this._cancelButtonTooltip,
            isDisabled: false,
            clickFunction: (): void => this._secondaryClicked(this._viewChildOverlayWithSecondaryButton)
        };

        this._staticPrimaryButtonInterface = {
            icon: 'icon-add',
            caption: 'Test',
            tooltipText: this._addButtonTooltip,
            isDisabled: false,
            clickFunction: (): boolean => (this._staticSecondaryButtonInterface.isDisabled = false)
        };

        this._staticSecondaryButtonInterface = {
            icon: 'icon-cancel',
            caption: 'Cancel',
            tooltipText: this._cancelButtonTooltip,
            isDisabled: true,
            clickFunction: (): void => this._secondaryClicked(this._viewChildOverlayStatic)
        };
    }

    public _openOverlayWithoutButtons(): void {
        this._viewChildOverlayWithoutButtons.showOverlay();
    }

    public _openOverlayWithPrimaryButton(): void {
        this._viewChildOverlayWithPrimaryButton.showOverlay();
    }

    public _openOverlayWithSecondaryButton(): void {
        this._viewChildOverlayWithSecondaryButton.showOverlay();
    }

    public _openOverlayStatic(): void {
        this._viewChildOverlayStatic.showOverlay();
    }

    private _primaryClicked(overlay: TerraOverlayComponent): void {
        this._alertService.success(overlay.inputOverlayTitle + ' clicked');
    }

    private _secondaryClicked(overlay: TerraOverlayComponent): void {
        overlay.hideOverlay();
    }
}
