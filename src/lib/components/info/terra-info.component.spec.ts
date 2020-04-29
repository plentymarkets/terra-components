import { TerraInfoComponent } from './terra-info.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../app/translation/l10n.config';
import { TerraPlacementEnum } from '../../helpers/enums/terra-placement.enum';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../testing/mock-router';

describe('TerraInfoComponent:', () => {
    let component: TerraInfoComponent;
    let fixture: ComponentFixture<TerraInfoComponent>;
    const router: MockRouter = new MockRouter();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TooltipDirective, TerraInfoComponent],
            imports: [LocalizationModule.forRoot(l10nConfig)],
            providers: [
                {
                    provide: Router,
                    useValue: router
                }
            ]
        }).compileComponents();
    }));

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
