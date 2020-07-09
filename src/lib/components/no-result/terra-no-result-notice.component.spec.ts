import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraNoResultNoticeComponent } from './terra-no-result-notice.component';
import {
    TerraButtonComponent,
    TooltipDirective
} from '../..';
import { By } from '@angular/platform-browser';
import { noResultsNoticeMockButtons } from '../../testing/mock-buttons';
import {
    DebugElement,
} from '@angular/core';
import { Router } from '@angular/router';
import { MockRouter } from '../../testing/mock-router';

fdescribe('TerraNorResultNoticeComponent', () =>
{
    let fixture:ComponentFixture<TerraNoResultNoticeComponent>;
    let component:TerraNoResultNoticeComponent;
    const router:MockRouter = new MockRouter();

    beforeEach(() =>
    {
        fixture = TestBed.configureTestingModule({
                declarations: [TooltipDirective,
                               TerraButtonComponent,
                               TerraNoResultNoticeComponent],
                providers:    [
                    {
                        provide:  Router,
                        useValue: router
                    }]
            }
        ).createComponent(TerraNoResultNoticeComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should highlight inner buttons', () =>
    {
        component.inputButtons = noResultsNoticeMockButtons;
        fixture.detectChanges();
        const buttons:Array<DebugElement> = fixture.debugElement.queryAll(By.css('terra-button'));
        let buttonComponent:TerraButtonComponent = buttons[0].componentInstance as TerraButtonComponent;
        fixture.detectChanges();
        expect(buttonComponent.inputIsHighlighted).toBe(true);
    });

    it('should ensure that inner buttons are not small', () =>
    {
        component.inputButtons = noResultsNoticeMockButtons;
        fixture.detectChanges();
        const buttons:Array<DebugElement> = fixture.debugElement.queryAll(By.css('terra-button'));
        let buttonComponent:TerraButtonComponent = buttons[0].componentInstance as TerraButtonComponent;
        fixture.detectChanges();
        expect(buttonComponent.inputIsSmall).toBe(false);
    });
});
