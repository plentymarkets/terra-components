import { TerraInfoComponent } from './terra-info.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { L10nTranslationModule } from 'angular-l10n';
import { TerraPlacementEnum } from '../../helpers/enums/terra-placement.enum';
import { mockL10nConfig } from '../../testing/mock-l10n-config';
import { MockTooltipDirective } from '../../testing/mock-tooltip.directive';

describe('TerraInfoComponent:', () => {
    let component: TerraInfoComponent;
    let fixture: ComponentFixture<TerraInfoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MockTooltipDirective, TerraInfoComponent],
            imports: [L10nTranslationModule.forRoot(mockL10nConfig)]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TerraInfoComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should #textPlacement be set to top by default if not set by input`, () => {
        expect(component.textPlacement).toBe(TerraPlacementEnum.TOP);
    });
});
