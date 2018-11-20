import { async } from '@angular/core/testing';
import { TerraInputComponent } from './terra-input.component';
import { TerraRegex } from '../../../helpers/regex/terra-regex';
import {
    FormControl,
    Validators
} from '@angular/forms';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';

describe('TerraInputComponent', () =>
{
    let component:TerraInputComponent;
    const testString:string = 'Test string';

    beforeEach(async(() =>
    {
        component = new TerraInputComponent(TerraRegex.MIXED);
        component.value = null;
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should be valid', () =>
    {
        const formControl:FormControl = new FormControl(testString, [Validators.pattern(TerraRegex.MIXED)]);

        component.value = testString;
        component.validate(formControl);

        expect(component.isValid).toBeTruthy();
    });

    it('should be invalid', () =>
    {
        const formControl:FormControl = new FormControl(testString, [Validators.pattern(TerraRegex.NUMERIC)]);

        component = new TerraInputComponent(TerraRegex.NUMERIC);
        component.value = testString;
        component.validate(formControl);

        expect(component.isValid).toBeFalsy();
    });

    it('should have TooltipPlacement.TOP as default', () =>
    {
        expect(component.inputTooltipPlacement).toBe(TerraPlacementEnum.TOP);
    });

    it('should not have TooltipPlacement.TOP when changed to TerraPlacementEnum.BOTTOM', () =>
    {
        component.inputTooltipPlacement = TerraPlacementEnum.BOTTOM;

        expect(component.inputTooltipPlacement).not.toBe(TerraPlacementEnum.TOP);
    });

    it('should not be small as default', () =>
    {
        expect(component.inputIsSmall).toBeFalsy();
    });

    it('should be small if it set to true', () =>
    {
        component.inputIsSmall = true;

        expect(component.inputIsSmall).toBeTruthy();
    });
});
