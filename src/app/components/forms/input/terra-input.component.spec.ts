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

    beforeEach(() =>
    {
        component = new TerraInputComponent(TerraRegex.MIXED);
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

        expect(component.isValid).toBe(true);
    });

    it('should be invalid', () =>
    {
        const formControl:FormControl = new FormControl(testString, [Validators.pattern(TerraRegex.NUMERIC)]);

        component = new TerraInputComponent(TerraRegex.NUMERIC);
        component.value = testString;
        component.validate(formControl);

        expect(component.isValid).toBe(false);
    });

    it('should have TooltipPlacement.TOP as default', () =>
    {
        expect(component.inputTooltipPlacement).toBe(TerraPlacementEnum.TOP);
    });

    it('should have TooltipPlacement.BOTTOM` when changed to `TerraPlacementEnum.BOTTOM` and not `TerraPlacementEnum.TOP', () =>
    {
        component.inputTooltipPlacement = TerraPlacementEnum.BOTTOM;

        expect(component.inputTooltipPlacement).not.toBe(TerraPlacementEnum.TOP);
        expect(component.inputTooltipPlacement).toBe(TerraPlacementEnum.BOTTOM);
    });

    it('should not be small as default', () =>
    {
        expect(component.inputIsSmall).toBe(false);
    });

    it('should be small if it set to true', () =>
    {
        component.inputIsSmall = true;

        expect(component.inputIsSmall).toBe(true);
    });
});
