import { terraDecimalValidator } from './terra-decimal-validator';
import {
    FormControl,
    ValidationErrors
} from '@angular/forms';

describe('TerraDecimalValidator:', () =>
{
    function applyValidator(value:string | number, maxLength:number, decimals:number):ValidationErrors
    {
        const control:FormControl = new FormControl(value);
        return terraDecimalValidator(maxLength, decimals)(control);
    }

    it('should return an error if there are too many separators', () =>
    {
        expect(applyValidator('3.3.5', 0, 0)).toEqual({'terraDecimal': 'Invalid amount of separators'});
    });

    it('should return an error if maxLength is exceeded', () =>
    {
        expect(applyValidator(100.23, 2, 3)).toEqual({'terraDecimal': 'Invalid max length before separator'});
    });

    it('should return an error if there are too many decimals', () =>
    {
        expect(applyValidator(1.234, 3, 2)).toEqual({'terraDecimal': 'Invalid max length after separator'})
    });

    it('should not return an error if the value is valid', () =>
    {
        expect(applyValidator(1.1, 2, 1)).toBeNull();
        expect(applyValidator(25.28, Infinity, 2)).toBeNull();
        expect(applyValidator(20, 2, 0)).toBeNull();
        expect(applyValidator(null, 1, 0)).toBeNull();
    });
});
