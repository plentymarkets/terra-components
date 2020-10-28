import { TerraInfoComponent } from './terra-info.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { L10nTranslationModule } from 'angular-l10n';
import { TerraPlacementEnum } from '../../helpers/enums/terra-placement.enum';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../testing/mock-router';
import { mockL10nConfig } from 'src/lib/testing/mock-l10n-config';

describe('TerraInfoComponent:', () => {
    let component: TerraInfoComponent;
    let fixture: ComponentFixture<TerraInfoComponent>;
    const router: MockRouter = new MockRouter();

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TooltipDirective, TerraInfoComponent],
            imports: [L10nTranslationModule.forRoot(mockL10nConfig)],
            providers: [
                {
                    provide: Router,
                    useValue: router
                }
            ]
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
