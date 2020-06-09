import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    Component,
    DebugElement,
    SimpleChange
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../testing/mock-router';

@Component({
    template: `<label [tcTooltip]="'Test'">test</label>`
})
class TooltipDirectiveHostComponent
{
}

describe('TooltipDirective', () =>
{
    let component:TooltipDirectiveHostComponent;
    let fixture:ComponentFixture<TooltipDirectiveHostComponent>;
    let inputEl:DebugElement;
    let directive:TooltipDirective;
    const router:MockRouter = new MockRouter();

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TooltipDirective,
                TooltipDirectiveHostComponent
            ],
            providers:    [
                {
                    provide:  Router,
                    useValue: router
                }]
        });
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TooltipDirectiveHostComponent);
        component = fixture.componentInstance;
        directive = fixture.debugElement.query(By.directive(TooltipDirective)).injector.get(TooltipDirective);

        inputEl = fixture.debugElement.query(By.css('label'));
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should trigger the tooltip on `mouseover` and hide it on `mouseout`', () =>
    {
        fixture.detectChanges();
        inputEl.triggerEventHandler('mouseover', new Event('MouseEvent'));
        fixture.detectChanges();

        expect(document.body.lastElementChild).toBeTruthy();
        expect(document.body.lastElementChild.matches('div[data-tippy-root]')).toBe(true);

        inputEl.triggerEventHandler('mouseout', new Event('MouseEvent'));
        fixture.detectChanges();
        expect(document.body.lastElementChild.matches('div[data-tippy-root]')).toBe(false);
    });

    it('should not trigger the tooltip when `isDisabled`', () =>
    {
        directive.isDisabled = true;
        directive.ngOnChanges({
            isDisabled: new SimpleChange(null, true, true)
        });

        inputEl.triggerEventHandler('mouseover', new Event('MouseEvent'));
        fixture.detectChanges();
        expect(document.body.lastElementChild.matches('div[data-tippy-root]')).toBe(false);
    });
});
