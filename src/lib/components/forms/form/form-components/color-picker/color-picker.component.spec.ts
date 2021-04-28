import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { ColorPickerComponent } from './color-picker.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';

describe('ColorPickerComponent', () => {

    let fixture: ComponentFixture<ColorPickerComponent>;
    let component: ColorPickerComponent;
    let loader: HarnessLoader;
    let input: MatInputHarness;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [MatFormFieldModule, MatInputModule, NoopAnimationsModule, FormsModule],
            declarations: [ColorPickerComponent, MockTooltipDirective]
        });

        fixture = TestBed.createComponent(ColorPickerComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();

        input = await loader.getHarness(MatInputHarness);
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        expect(input).toBeTruthy();
    });

    it('should disable the input when #isDisabled is set', async () => {
        expect(await input.isDisabled()).toBe(false);
        component.isDisabled = true;
        fixture.detectChanges();

        expect(await input.isDisabled()).toBe(true);
    });

    it('should have #name as label of the input', async () => {
        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        expect(await formField.getLabel()).toBe('');

        component.name = 'My Label';
        fixture.detectChanges();
        expect(await formField.getLabel()).toBe(component.name);
    });

    it('should set required validation when #isRequired is set', async () => {
        expect(await input.isRequired()).toBe(false);
        component.isRequired = true;
        fixture.detectChanges();

        expect(await input.isRequired()).toBe(true);
    });
});
