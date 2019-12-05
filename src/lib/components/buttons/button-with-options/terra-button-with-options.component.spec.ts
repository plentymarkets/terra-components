import { TerraButtonWithOptionsComponent } from './terra-button-with-options.component';
import {
    ComponentFixture,
    async,
    TestBed
} from '@angular/core/testing';
import { TerraButtonComponent } from '../../../..';
import { TooltipModule } from 'ngx-bootstrap';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../app/translation/l10n.config';

describe('TerraButtonWithOptionsComponent:', () =>
{
    let component:TerraButtonWithOptionsComponent;
    let fixture:ComponentFixture<TerraButtonWithOptionsComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraButtonComponent,
                           TerraButtonWithOptionsComponent
            ],
            imports:      [TooltipModule.forRoot(),
                           LocalizationModule.forRoot(l10nConfig)
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraButtonWithOptionsComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should init its inputs', () =>
    {
        expect(component.inputIsDisabled).toEqual(false);
        expect(component.inputIsSmall).toEqual(false);
    });

});