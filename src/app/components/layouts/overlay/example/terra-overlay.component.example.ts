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
    @ViewChild('viewChildOverlayStatic') public viewChildOverlayStatic:TerraOverlayComponent;

    protected addButtonTooltip:string = 'Hinzufügen';
    protected cancelButtonTooltip:string = 'Abbrechen';
    protected primaryButtonInterface:TerraOverlayButtonInterface;
    protected secondaryButtonInterface:TerraOverlayButtonInterface;
    protected staticPrimaryButtonInterface:TerraOverlayButtonInterface;
    protected staticSecondaryButtonInterface:TerraOverlayButtonInterface;
    protected exampleText:string = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.' +
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

    protected openOverlayWithoutButtons():void
    {
        this.viewChildOverlayWithoutButtons.showOverlay();
    }

    protected openOverlayWithPrimaryButton():void
    {
        this.viewChildOverlayWithPrimaryButton.showOverlay();
    }

    protected openOverlayWithSecondaryButton():void
    {
        this.viewChildOverlayWithSecondaryButton.showOverlay();
    }

    protected openOverlayStatic():void
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
}
