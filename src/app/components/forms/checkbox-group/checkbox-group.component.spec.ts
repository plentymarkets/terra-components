import { CheckboxGroupComponent } from './checkbox-group.component';
import {
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    TerraCheckboxComponent,
    TerraMultiCheckBoxComponent,
    TerraMultiCheckBoxValueInterface
} from '../../../..';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../translation/l10n.config';
import Spy = jasmine.Spy;

describe('Component: CheckboxGroupComponent', () =>
{
    let component:CheckboxGroupComponent;
    let multicheckboxComponent:TerraMultiCheckBoxComponent;
    let fixture:ComponentFixture<CheckboxGroupComponent>;

    const checkboxValues:Array<TerraMultiCheckBoxValueInterface> = [
        {
            caption: 'A',
            value: 0
        },
        {
            caption: 'B',
            value: 1
        },
        {
            caption: 'C',
            value: 2
        }
    ];

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [CheckboxGroupComponent,
                               TerraMultiCheckBoxComponent,
                               TerraCheckboxComponent],
                imports:      [
                    HttpClientModule,
                    TooltipModule.forRoot(),
                    FormsModule,
                    LocalizationModule.forRoot(l10nConfig)
                ]
            }
        ).compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(CheckboxGroupComponent);
        component = fixture.componentInstance;
        multicheckboxComponent = fixture.debugElement.query(By.css('terra-multi-check-box')).componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should pass properties "isDisabled" and "name" to terra-multi-check-box component', () =>
    {
        component.isDisabled = true;
        component.name = 'Custom name';
        fixture.detectChanges();

        expect(multicheckboxComponent.inputIsDisabled).toEqual(component.isDisabled);
        expect(multicheckboxComponent.inputName).toEqual(component.name);
    });

    it('should check all checkboxes included in value list', (done:() => void) =>
    {
        let writeValueSpy:Spy = spyOn(multicheckboxComponent, 'writeValue');
        component.checkboxValues = checkboxValues;
        component.writeValue([0, 2]);
        fixture.detectChanges();

        fixture.whenStable().then(() =>
        {
            expect(writeValueSpy).toHaveBeenCalledWith([
                {
                    caption: 'A',
                    value: 0,
                    selected: true
                },
                {
                    caption: 'B',
                    value: 1,
                    selected: false
                },
                {
                    caption: 'C',
                    value: 2,
                    selected: true
                }
            ]);

            done();
        });
    });

    it('should be able to check any checkbox also if `null` or `undefined` was set initially', () =>
    {
        // initialization
        component.checkboxValues = checkboxValues;
        component.writeValue(null);
        fixture.detectChanges();

        // register spy
        let onChangeSpy:Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeSpy);

        // perform action -> change checkbox state
        multicheckboxComponent.checkboxStateChanges.emit([{
            caption: checkboxValues[1].caption,
            value: checkboxValues[1].value,
            selected: true
        }]);
        expect(onChangeSpy).toHaveBeenCalledWith([1]);
    });

    it('should call registered #onChangeCallback with `null` if all selections have been reset', () =>
    {
        // initialization
        component.checkboxValues = checkboxValues;
        component.writeValue([checkboxValues[1].value]);
        fixture.detectChanges();

        // register spy
        let onChangeSpy:Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeSpy);

        // perform action -> change checkbox state
        multicheckboxComponent.checkboxStateChanges.emit([{
            caption: checkboxValues[1].caption,
            value: checkboxValues[1].value,
            selected: false
        }]);
        expect(onChangeSpy).toHaveBeenCalledWith(null);
    });
});
