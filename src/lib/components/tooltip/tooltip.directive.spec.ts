import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    Component,
    DebugElement
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';

@Component({
    template: `
                  <button [tooltip]="'Test'" [placement]="'left'"></button>`
})
class TooltipDirectiveHostComponent
{
}

fdescribe('TooltipDirective', () =>
{
    let component:TooltipDirectiveHostComponent;
    let fixture:ComponentFixture<TooltipDirectiveHostComponent>;
    let inputEl:DebugElement;
    let directive:TooltipDirective;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TooltipDirective,
                TooltipDirectiveHostComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TooltipDirectiveHostComponent);
        component = fixture.componentInstance;
        directive = fixture.debugElement.query(By.directive(TooltipDirective)).injector.get(TooltipDirective);

        inputEl = fixture.debugElement.query(By.css('button'));
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('hover', () =>
    {
        directive.ngOnInit();
        fixture.detectChanges();
        inputEl.triggerEventHandler('mouseover', null);
        fixture.detectChanges();
        expect(document.body.getElementsByClassName('tooltip').length).toEqual(1);

        inputEl.triggerEventHandler('mouseout', null);
        fixture.detectChanges();
        expect(document.body.getElementsByClassName('tooltip').length).toEqual(0);
    });
});
