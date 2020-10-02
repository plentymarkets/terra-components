import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerraNoResultNoticeComponent } from './terra-no-result-notice.component';
import { TerraButtonComponent } from '../buttons/button/terra-button.component';
import { By } from '@angular/platform-browser';
import { noResultsNoticeMockButtons } from '../../testing/mock-buttons';
import { Component, DebugElement } from '@angular/core';

@Component({
    selector: 'terra-button',
    template: ''
})
class TerraButtonMockComponent extends TerraButtonComponent {}

describe('TerraNoResultNoticeComponent', () => {
    let fixture: ComponentFixture<TerraNoResultNoticeComponent>;
    let component: TerraNoResultNoticeComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TerraButtonMockComponent, TerraNoResultNoticeComponent]
        }).createComponent(TerraNoResultNoticeComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should highlight inner buttons', () => {
        component.inputButtons = noResultsNoticeMockButtons;
        fixture.detectChanges();
        const buttons: Array<DebugElement> = fixture.debugElement.queryAll(By.directive(TerraButtonComponent));
        expect(
            buttons.every(
                (button: DebugElement) => (button.componentInstance as TerraButtonComponent).inputIsHighlighted
            )
        ).toBe(true);
    });

    it('should ensure that inner buttons are not small', () => {
        component.inputButtons = noResultsNoticeMockButtons;
        fixture.detectChanges();
        const buttons: Array<DebugElement> = fixture.debugElement.queryAll(By.directive(TerraButtonComponent));
        expect(
            buttons.every((button: DebugElement) => !(button.componentInstance as TerraButtonComponent).inputIsSmall)
        ).toBe(true);
    });

    it('should set a primary and a secondary text between their own `div` element', () => {
        component.inputTextPrimary = 'primary text';
        component.inputTextSecondary = 'secondary text';
        fixture.detectChanges();
        const primaryDiv: HTMLDivElement = fixture.debugElement.query(By.css('div.text-prime'))
            .nativeElement as HTMLDivElement;
        const secondaryDiv: HTMLDivElement = fixture.debugElement.query(By.css('div.text-second'))
            .nativeElement as HTMLDivElement;
        expect(primaryDiv.textContent).toBe(component.inputTextPrimary);
        expect(secondaryDiv.textContent).toBe(component.inputTextSecondary);
    });
});
