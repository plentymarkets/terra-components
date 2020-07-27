import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    Component,
    DebugElement,
    SimpleChange,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';
import {
    Router,
    RouterEvent
} from '@angular/router';
import { Subject } from 'rxjs';


const routerEvents$:Subject<RouterEvent> = new Subject();
const routerStub:Partial<Router> = {
    events: routerEvents$.asObservable()
};

@Component({
    template: '<ng-template #template><span>{{templateTooltipText}}</span></ng-template>' +
              '<label [tcTooltip]="tooltip">test</label>'
})
class TooltipDirectiveHostComponent
{
    public tooltip:string | TemplateRef<any> = 'Test';
    public readonly templateTooltipText:string = 'Template tooltip';

    @ViewChild('template', {static: true, read: TemplateRef})
    public templateTooltip:TemplateRef<any>;
}

describe('TooltipDirective', () =>
{
    let component:TooltipDirectiveHostComponent;
    let fixture:ComponentFixture<TooltipDirectiveHostComponent>;
    let hostDebugEl:DebugElement;
    let directive:TooltipDirective;

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
                    useValue: routerStub
                }]
        });
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TooltipDirectiveHostComponent);
        component = fixture.componentInstance;
        directive = fixture.debugElement.query(By.directive(TooltipDirective)).injector.get(TooltipDirective);

        hostDebugEl = fixture.debugElement.query(By.css('label'));
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should trigger the tooltip on `mouseover` and hide it on `mouseout`', () =>
    {
        fixture.detectChanges();
        hostDebugEl.triggerEventHandler('mouseover', new Event('MouseEvent'));
        fixture.detectChanges();
        expect(document.body.getElementsByClassName('tippy-popper').length).toEqual(1);

        hostDebugEl.triggerEventHandler('mouseout', new Event('MouseEvent'));
        fixture.detectChanges();
        expect(document.body.getElementsByClassName('tippy-popper').length).toEqual(0);
    });

    it('should not trigger the tooltip when `isDisabled`', () =>
    {
        directive.isDisabled = true;
        directive.ngOnChanges({
            isDisabled: new SimpleChange(null, true, true)
        });

        hostDebugEl.triggerEventHandler('mouseover', new Event('MouseEvent'));
        fixture.detectChanges();
        expect(document.body.getElementsByClassName('tippy-popper').length).toEqual(0);
    });

    it('should subscribe to router events on initialization', () =>
    {
        directive.ngOnInit();
        expect(routerEvents$.observers.length).toBe(1);
    });

    it('should unsubscribe to router events when destroyed', () =>
    {
       directive.ngOnInit();
       directive.ngOnDestroy();
       expect(routerEvents$.observers.length).toBe(0);
    });

    it('should be able to display a tooltip provided as TemplateRef', () =>
    {
        component.tooltip = component.templateTooltip;
        fixture.detectChanges();
        hostDebugEl.triggerEventHandler('mouseover', new MouseEvent('mouseover'));

        const content:Element = document.getElementsByClassName('tippy-content')[0];
        expect(content.textContent).toBe(component.templateTooltipText);
    });
});
