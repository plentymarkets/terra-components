import { TerraValidators } from './validators';
import { FormControl } from '@angular/forms';
import { ibanValidator } from './iban-validator';
import Spy = jasmine.Spy;

describe('TerraValidators', () => {
    it('.iban', () => {
        let spy: Spy = spyOn(TerraValidators, 'iban').and.callThrough();
        let control: FormControl = new FormControl('', TerraValidators.iban);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(control);
        expect(control.errors).toEqual(ibanValidator(control));
        expect(control.valid).toBe(false);

        control.setValue('DE12500105170648489890');
        expect(spy).toHaveBeenCalledTimes(2);
        expect(control.errors).toEqual(ibanValidator(control));
        expect(control.valid).toBe(true);

        control.setValue('DE1250010517064848989');
        expect(spy).toHaveBeenCalledTimes(3);
        expect(control.errors).toEqual(ibanValidator(control));
        expect(control.valid).toBe(false);
    });
});
