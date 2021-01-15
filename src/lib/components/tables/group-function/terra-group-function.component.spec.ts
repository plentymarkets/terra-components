import { ComponentFixture, TestBed } from '@angular/core/testing';
import { L10nTranslationModule } from 'angular-l10n';
import { TerraGroupFunctionComponent } from './terra-group-function.component';
import { TerraButtonComponent } from '../../buttons/button/terra-button.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockL10nConfig } from '../../../testing/mock-l10n-config';
import { MockTooltipDirective } from '../../../testing/mock-tooltip.directive';

describe('Component: TerraGroupFunctionComponent', () => {
    let component: TerraGroupFunctionComponent;
    let fixture: ComponentFixture<TerraGroupFunctionComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MockTooltipDirective, TerraGroupFunctionComponent, TerraButtonComponent],
            imports: [NoopAnimationsModule, L10nTranslationModule.forRoot(mockL10nConfig)]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TerraGroupFunctionComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the component properties', () => {
        expect(component.show).toEqual(false);
        expect(component.disableExecution).toEqual(true);
        expect(component.executeGroupFunction).toBeTruthy();
    });
});
