import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraNoResultNoticeComponent } from './terra-no-result-notice.component';
import { TerraButtonComponent } from '../..';
import { By } from '@angular/platform-browser';
import { noResultsNoticeMockButtons } from '../../testing/mock-buttons';
import {
    Component,
    DebugElement,
} from '@angular/core';

@Component({
    selector: 'terra-button',
    template: ''
})
class TerraButtonMockComponent extends TerraButtonComponent
{}

describe('TerraNoResultNoticeComponent', () =>
{
    let fixture:ComponentFixture<TerraNoResultNoticeComponent>;
    let component:TerraNoResultNoticeComponent;

    beforeEach(() =>
    {
        fixture = TestBed.configureTestingModule({
                declarations: [
                    TerraButtonMockComponent,
                    TerraNoResultNoticeComponent]
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
