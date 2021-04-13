import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { SelectComponent } from './select.component';
import { MatSelectHarness } from '@angular/material/select/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

describe('SelectComponent', () => {
    let fixture: ComponentFixture<SelectComponent>;
    let component: SelectComponent;
    let loader: HarnessLoader;
    let input: MatSelectHarness;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [MatSelectModule, FormsModule],
            declarations: [SelectComponent, MockTooltipDirective]
        });

        fixture = TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();

        input = await loader.getHarness(MatSelectHarness);
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        expect(input).toBeTruthy();
    });
});
