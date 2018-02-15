import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TerraOverlayComponent } from '../terra-overlay.component';
import { TerraOverlayButtonInterface } from '../data/terra-overlay-button.interface';
import { TerraAlertComponent } from '../../../alert/terra-alert.component';



@Component({
    selector: 'terra-overlay-example',
    template: require('./terra-overlay.component.example.html')
})
export class TerraOverlayComponentExample implements OnInit
{
    @ViewChild('viewChildOverlayWithoutButtons') public viewChildOverlayWithoutButtons:TerraOverlayComponent;
    @ViewChild('viewChildOverlayWithPrimaryButton') public viewChildOverlayWithPrimaryButton:TerraOverlayComponent;
    @ViewChild('viewChildOverlayWithSecondaryButton') public viewChildOverlayWithSecondaryButton:TerraOverlayComponent;
    @ViewChild('viewChildAddProcessesToCategoryOverlay') public viewChildOverlayWithButtons:TerraOverlayComponent;
    @ViewChild('viewChildOverlayStatic') public viewChildOverlayStatic:TerraOverlayComponent;

    private _addButtonTooltip:string = 'Hinzufügen';
    private _cancelButtonTooltip:string = 'Abbrechen';

    private _primaryButtonInterface:TerraOverlayButtonInterface;
    private _secondaryButtonInterface:TerraOverlayButtonInterface;
    private _PrimaryButtonInterface:TerraOverlayButtonInterface;
    private _SecondaryButtonInterface:TerraOverlayButtonInterface;
    private _staticPrimaryButtonInterface:TerraOverlayButtonInterface;
    private _staticSecondaryButtonInterface:TerraOverlayButtonInterface;
    private _exampleText:string = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.' +
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

    private alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    public ngOnInit():void
    {
        this.primaryButtonInterface = {
            icon:          'icon-confirm',
            caption:       'Test',
            tooltipText:   this.addButtonTooltip,
            isDisabled:    false,
            clickFunction: ():void => this.primaryClicked(this.viewChildOverlayWithPrimaryButton)
        };

        this.secondaryButtonInterface = {
            icon:          'icon-cancel',
            caption:       'Cancel',
            tooltipText:   this.cancelButtonTooltip,
            isDisabled:    false,
            clickFunction: ():void => this.secondaryClicked(this.viewChildOverlayWithSecondaryButton)
        };

        this.PrimaryButtonInterface = {
            icon:          'icon-add',
            caption:       'Test',
            tooltipText:   this.addButtonTooltip,
            isDisabled:    false,
            clickFunction: ():void => this.primaryClicked(this.viewChildOverlayWithButtons)
        };

        this.SecondaryButtonInterface = {
            icon:          'icon-cancel',
            caption:       'Cancel',
            tooltipText:   this.cancelButtonTooltip,
            isDisabled:    false,
            clickFunction: ():void => this.secondaryClicked(this.viewChildOverlayWithButtons)
        };

        this.staticPrimaryButtonInterface = {
            icon:          'icon-add',
            caption:       'Test',
            tooltipText:   this.addButtonTooltip,
            isDisabled:    false,
            clickFunction: ():boolean => this.staticSecondaryButtonInterface.isDisabled = false
        };

        this.staticSecondaryButtonInterface = {
            icon:          'icon-cancel',
            caption:       'Cancel',
            tooltipText:   this.cancelButtonTooltip,
            isDisabled:    true,
            clickFunction: ():void => this.secondaryClicked(this.viewChildOverlayStatic)
        };
    }

    private openOverlayWithoutButtons():void
    {
        this.viewChildOverlayWithoutButtons.showOverlay();
    }

    private openOverlayWithPrimaryButton():void
    {
        this.viewChildOverlayWithPrimaryButton.showOverlay();
    }

    private openOverlayWithSecondaryButton():void
    {
        this.viewChildOverlayWithSecondaryButton.showOverlay();
    }

    private openOverlayWithButtons():void
    {
        this.viewChildOverlayWithButtons.showOverlay();
    }

    private openOverlayStatic():void
    {
        this.viewChildOverlayStatic.showOverlay();
    }

    private primaryClicked(overlay:TerraOverlayComponent):void
    {
        this.alert.addAlert({
            msg:              overlay.inputOverlayTitle + ' clicked',
            type:             'success',
            dismissOnTimeout: 0
        });
    }

    private secondaryClicked(overlay:TerraOverlayComponent):void
    {
        overlay.hideOverlay();
    }

    private addAlert():void
    {
        this.alert.addAlert({
            msg:              'Alert aus einem Overlay',
            type:             'success',
            dismissOnTimeout: 0
        });
    }


    public get addButtonTooltip():string
    {
        return this._addButtonTooltip;
    }

    public get cancelButtonTooltip():string
    {
        return this._cancelButtonTooltip;
    }

    public get primaryButtonInterface():TerraOverlayButtonInterface
    {
        return this._primaryButtonInterface;
    }

    public set primaryButtonInterface(value:TerraOverlayButtonInterface)
    {
        this._primaryButtonInterface = value;
    }


    public get secondaryButtonInterface():TerraOverlayButtonInterface
    {
        return this._secondaryButtonInterface;
    }

    public set secondaryButtonInterface(value:TerraOverlayButtonInterface)
    {
        this._secondaryButtonInterface = value;
    }

    public get PrimaryButtonInterface():TerraOverlayButtonInterface
    {
        return this._PrimaryButtonInterface;
    }

    public set PrimaryButtonInterface(value:TerraOverlayButtonInterface)
    {
        this._PrimaryButtonInterface = value;
    }

    public get SecondaryButtonInterface():TerraOverlayButtonInterface
    {
        return this._SecondaryButtonInterface;
    }

    public set SecondaryButtonInterface(value:TerraOverlayButtonInterface)
    {
        this._SecondaryButtonInterface = value;
    }


    public get staticPrimaryButtonInterface():TerraOverlayButtonInterface
    {
        return this._staticPrimaryButtonInterface;
    }

    public set staticPrimaryButtonInterface(value:TerraOverlayButtonInterface)
    {
        this._staticPrimaryButtonInterface = value;
    }

    public get staticSecondaryButtonInterface():TerraOverlayButtonInterface
    {
        return this._staticSecondaryButtonInterface;
    }

    public set staticSecondaryButtonInterface(value:TerraOverlayButtonInterface)
    {
        this._staticSecondaryButtonInterface = value;
    }
}
