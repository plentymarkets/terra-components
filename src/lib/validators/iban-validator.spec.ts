import { ibanValidator } from './iban-validator';
import { FormControl, ValidationErrors } from '@angular/forms';

/**
 * All IBANs below has been taken from https://www.iban-bic.com/sample_accounts.html
 */
describe('ibanValidator', () => {
  it(`should return #null for valid IBANs`, () => {
    expect(ibanValidator(new FormControl('DE12500105170648489890'))).toBeNull();
    expect(ibanValidator(new FormControl('EE342200221034126658'))).toBeNull();
    expect(ibanValidator(new FormControl('AL90208110080000001039531801'))).toBeNull();
    expect(ibanValidator(new FormControl('NO5015032080119'))).toBeNull();
    expect(ibanValidator(new FormControl('AT022050302101023600'))).toBeNull();
  });

  it(`should return a ValidationError for invalid IBANs`, () => {
    const error: ValidationErrors = { iban: true };
    // changed one character of valid IBANs
    expect(ibanValidator(new FormControl('DE12500105170648487890'))).toEqual(error);
    expect(ibanValidator(new FormControl('EE342200221034122658'))).toEqual(error);
    expect(ibanValidator(new FormControl('AL90208110080000101039531801'))).toEqual(error);
    expect(ibanValidator(new FormControl('NO5015032080319'))).toEqual(error);
    expect(ibanValidator(new FormControl('AT022050302171023600'))).toEqual(error);
  });

  it(`should be usable as Validator for reactive forms`, () => {
    let formControl: FormControl = new FormControl('', ibanValidator);
    expect(formControl.valid).toBe(false);

    formControl.setValue('DE12500105170648489890');
    expect(formControl.valid).toBe(true);

    // changed one character of the valid IBAN
    formControl.setValue('DE12500105171648489890');
    expect(formControl.valid).toBe(false);
  });
});
