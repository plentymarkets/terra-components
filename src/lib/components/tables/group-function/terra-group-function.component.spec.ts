import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../app/translation/l10n.config';
import { TerraGroupFunctionComponent } from './terra-group-function.component';
import { TerraButtonComponent } from '../../buttons/button/terra-button.component';
import { TooltipModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Component: TerraGroupFunctionComponent', () =>
{
    let component:TerraGroupFunctionComponent;
    let fixture:ComponentFixture<TerraGroupFunctionComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraGroupFunctionComponent,
                TerraButtonComponent
            ],
            imports:      [
                TooltipModule.forRoot(),
                NoopAnimationsModule,
                HttpClientModule,
                LocalizationModule.forRoot(l10nConfig)
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraGroupFunctionComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize the component properties', () =>
    {
        expect(component.show).toEqual(false);
        expect(component.disableExecution).toEqual(true);
        expect(component.executeGroupFunction).toBeTruthy();
    });
});
