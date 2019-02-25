import { TerraCheckboxComponent } from './terra-checkbox.component';
import Spy = jasmine.Spy;

fdescribe('Component: TerraCheckboxComponent', () =>
{
    let component:TerraCheckboxComponent;
    beforeEach(() =>
    {
        component = new TerraCheckboxComponent();
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should not call change callback if a new value is set via #writeValue()', () =>
    {
        let onChangeSpy:Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeSpy);

        component.writeValue(!component.value); // toggle value
        expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('should call change callback if the value changes by clicking the checkbox', () =>
    {
        let onChangeSpy:Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeSpy);

        component.writeValue(!component.value); // toggle value
        expect(onChangeSpy).toHaveBeenCalled();
    });
});
