import { ElementRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TooltipModule } from 'ngx-bootstrap';
import { LocalizationModule } from 'angular-l10n';
import { TerraTextInputComponent } from './terra-text-input.component';
import { l10nConfig } from '../../../../translation/l10n.config';
import { MockElementRef } from '../../../../testing/mock-element-ref';
import { TerraLabelTooltipDirective } from '../../../../helpers/terra-label-tooltip.directive';

describe('TerraTextInputComponent', () =>
{
    let component:TerraTextInputComponent;
    let fixture:ComponentFixture<TerraTextInputComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraTextInputComponent,
                TerraLabelTooltipDirective
            ],
            imports:      [
                TooltipModule.forRoot(),
                FormsModule,
                HttpModule,
                HttpClientModule,
                LocalizationModule.forRoot(l10nConfig)
            ],
            providers:    [
                {
                    provide:  ElementRef,
                    useClass: MockElementRef
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraTextInputComponent);
        component = fixture.componentInstance;

        component.value = null;

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
