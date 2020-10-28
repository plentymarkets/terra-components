import { CheckboxGroupComponent } from './checkbox-group.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { L10nTranslationModule } from 'angular-l10n';
import { TerraMultiCheckBoxComponent } from '../multi-check-box/terra-multi-check-box.component';
import { TerraMultiCheckBoxValueInterface } from '../multi-check-box/data/terra-multi-check-box-value.interface';
import { TerraCheckboxComponent } from '../checkbox/terra-checkbox.component';
import { TooltipDirective } from '../../tooltip/tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../../testing/mock-router';
import Spy = jasmine.Spy;
import { mockL10nConfig } from 'src/lib/testing/mock-l10n-config';

describe('Component: CheckboxGroupComponent', () => {
    let component: CheckboxGroupComponent;
    let multicheckboxComponent: TerraMultiCheckBoxComponent;
    let fixture: ComponentFixture<CheckboxGroupComponent>;

    const checkboxValues: Array<TerraMultiCheckBoxValueInterface> = [
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
    const router: MockRouter = new MockRouter();

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TooltipDirective,
                CheckboxGroupComponent,
                TerraMultiCheckBoxComponent,
                TerraCheckboxComponent
            ],
            imports: [FormsModule, L10nTranslationModule.forRoot(mockL10nConfig)],
            providers: [
                {
                    provide: Router,
                    useValue: router
                }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxGroupComponent);
        component = fixture.componentInstance;
        multicheckboxComponent = fixture.debugElement.query(By.css('terra-multi-check-box')).componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it(`should init its inputs`, () => {
        expect(component.isDisabled).toBe(false);
        expect(component.checkboxValues).toEqual([]);
        expect(component.collapsed).toBe(false);
    });

    it('should pass properties "isDisabled", "name" and "collapsed" to terra-multi-check-box component', () => {
        component.isDisabled = true;
        component.name = 'Custom name';
        component.collapsed = true;
        fixture.detectChanges();

        expect(multicheckboxComponent.inputIsDisabled).toEqual(component.isDisabled);
        expect(multicheckboxComponent.inputName).toEqual(component.name);
        expect(multicheckboxComponent.collapsed).toEqual(true);
    });

    it('should check all checkboxes included in value list', (done: () => void) => {
        let writeValueSpy: Spy = spyOn(multicheckboxComponent, 'writeValue');
        component.checkboxValues = checkboxValues;
        component.writeValue([0, 2]);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
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

    it('should be able to check any checkbox also if `null` or `undefined` was set initially', () => {
        // initialization
        component.checkboxValues = checkboxValues;
        component.writeValue(null);
        fixture.detectChanges();

        // register spy
        let onChangeSpy: Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeSpy);

        // perform action -> change checkbox state
        multicheckboxComponent.checkboxStateChanges.emit([
            {
                caption: checkboxValues[1].caption,
                value: checkboxValues[1].value,
                selected: true
            }
        ]);
        expect(onChangeSpy).toHaveBeenCalledWith([1]);
    });

    it('should call registered #onChangeCallback with `null` if all selections have been reset', () => {
        // initialization
        component.checkboxValues = checkboxValues;
        component.writeValue([checkboxValues[1].value]);
        fixture.detectChanges();

        // register spy
        let onChangeSpy: Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeSpy);

        // perform action -> change checkbox state
        multicheckboxComponent.checkboxStateChanges.emit([
            {
                caption: checkboxValues[1].caption,
                value: checkboxValues[1].value,
                selected: false
            }
        ]);
        expect(onChangeSpy).toHaveBeenCalledWith(null);
    });

    it('should preserve sorting order when checkboxes are selected/deselected', () => {
        // initialization
        component.checkboxValues = checkboxValues;
        component.writeValue([checkboxValues[0].value, checkboxValues[2].value]);
        fixture.detectChanges();

        // register spy
        let onChangeSpy: Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeSpy);

        // prepare preselected checkbox object -> update checkbox group values
        let preselectedCheckbox: TerraMultiCheckBoxValueInterface = checkboxValues[1];
        preselectedCheckbox.selected = true;
        component._onMultiCheckboxChanged([preselectedCheckbox]);

        // check order of checkbox group values
        expect(onChangeSpy).toHaveBeenCalledWith([
            checkboxValues[0].value,
            checkboxValues[1].value,
            checkboxValues[2].value
        ]);
    });
});
