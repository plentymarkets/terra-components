import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../translation/l10n.config';
import {
    DebugElement,
    SimpleChange
} from '@angular/core';
import { TerraLabelTooltipDirective } from '../../../helpers/terra-label-tooltip.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { buttonList } from '../../../testing/mock-buttons';
import { TerraPortletComponent } from './terra-portlet.component';
import { TerraButtonComponent } from '../../buttons/button/terra-button.component';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';
import Spy = jasmine.Spy;

describe('TerraPortletComponent', () =>
{
    let component:TerraPortletComponent;
    let fixture:ComponentFixture<TerraPortletComponent>;
    let debugElement:DebugElement;

    const portletHeader:string = 'What is my purpose?';

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraPortletComponent,
                TerraButtonComponent,
                TerraLabelTooltipDirective
            ],
            imports:      [
                TooltipModule.forRoot(),
                FormsModule,
                BrowserAnimationsModule,
                LocalizationModule.forRoot(l10nConfig)
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraPortletComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        fixture.detectChanges();
    });

    it(`should create an instance`, () =>
    {
        expect(component).toBeTruthy();
    });

    it(`should initialize with the correct values`, () =>
    {
        expect(component.inputHighlightPortlet).toBe(false);
        expect(component.inputPortletHeader).toBeUndefined();
        expect(component.inputIsCollapsable).toBe(false);
        expect(component.inputCollapsed).toBe(false);
        expect(component.inputIsDisabled).toBe(false);
        expect(component.inputButtonList).toEqual([]);
    });

    it(`should set classes accordingly to 'inputIsCollapsable', 'inputHighlightPortlet' and 'inputIsDisabled'`, () =>
    {
        const portletDiv:DebugElement = debugElement.query(By.css('div.portlet'));

        component.inputIsCollapsable = true;
        fixture.detectChanges();
        expect(portletDiv.classes['collapsable']).toBe(true);

        component.inputHighlightPortlet = true;
        fixture.detectChanges();
        expect(portletDiv.classes['highlight']).toBe(true);

        component.inputIsDisabled = true;
        fixture.detectChanges();
        expect(portletDiv.classes['disabled']).toBe(true);
    });

    it(`should have a visible header after 'inputPortletHeader' is set`, () =>
    {
        expect(debugElement.query(By.css('div.portlet-head'))).toBeFalsy();

        component.inputPortletHeader = portletHeader;
        fixture.detectChanges();

        expect(debugElement.query(By.css('div.portlet-head'))).toBeTruthy();
    });

    it(`should have his header unfolded/folded according 'inputCollapsed = false' or 'inputCollapsed = true'`, () =>
    {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        fixture.detectChanges();

        let portletHead:DebugElement = debugElement.query(By.css('div.portlet-head'));

        expect(portletHead.classes['unfolded']).toBe(true);

        component.inputCollapsed = true;
        fixture.detectChanges();

        expect(portletHead.classes['unfolded']).toBe(false);
    });

    it(`should call #toggleCollapse() if his header is clicked`, () =>
    {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        fixture.detectChanges();

        let onHeaderClick:Spy = spyOn(component, 'toggleCollapse');

        debugElement.query(By.css('div.portlet-head')).triggerEventHandler('click', null);

        expect(onHeaderClick).toHaveBeenCalled();
    });

    it(`should show the correct collapse icon depending on 'inputIsCollapsable' state`, () =>
    {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        fixture.detectChanges();

        expect(debugElement.query(By.css('span.icon-collapse_down'))).toBeTruthy();
        expect(debugElement.query(By.css('span.icon-collapse_up'))).toBeFalsy();

        debugElement.query(By.css('div.portlet-head')).triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(debugElement.query(By.css('span.icon-collapse_down'))).toBeFalsy();
        expect(debugElement.query(By.css('span.icon-collapse_up'))).toBeTruthy();
    });

    it(`should keep the collapse state when disabled`, () =>
    {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        component.inputIsDisabled = true;
        fixture.detectChanges();

        let onHeaderClick:Spy = spyOn(component, 'toggleCollapse');

        expect(component.inputCollapsed).toBe(false);
        expect(debugElement.query(By.css('span.icon-collapse_down'))).toBeTruthy();
        expect(debugElement.query(By.css('span.icon-collapse_up'))).toBeFalsy();

        debugElement.query(By.css('div.portlet-head')).triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(onHeaderClick).toHaveBeenCalled();
        expect(component.inputCollapsed).toBe(false);
        expect(debugElement.query(By.css('span.icon-collapse_down'))).toBeTruthy();
        expect(debugElement.query(By.css('span.icon-collapse_up'))).toBeFalsy();
    });

    it(`should collapse icon only of 'inputIsCollapsable' set to true`, () =>
    {
        component.inputPortletHeader = portletHeader;
        fixture.detectChanges();

        expect(debugElement.query(By.css('span.icon-collapse_down'))).toBeFalsy();

        component.inputIsCollapsable = true;
        fixture.detectChanges();

        expect(debugElement.query(By.css('span.icon-collapse_down'))).toBeTruthy();
    });

    it(`should set classes on portlet-body depending on it's #collapsedState()`, () =>
    {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        fixture.detectChanges();

        expect(debugElement.query(By.css('div.portlet-body')).classes['collapsed']).toBe(false);

        debugElement.query(By.css('div.portlet-head')).triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(debugElement.query(By.css('div.portlet-body')).classes['collapsed']).toBe(true);

        debugElement.query(By.css('div.portlet-head')).triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(debugElement.query(By.css('div.portlet-body')).classes['collapsed']).toBe(false);
    });

    it(`should update view correctly if 'inputIsCollapsable' is changed`, () =>
    {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        fixture.detectChanges();

        component.inputIsCollapsable = false;
        component.inputCollapsedChange.subscribe((value:boolean) => expect(value).toBe(false));

        component.ngOnChanges({inputIsCollapsable: new SimpleChange(true, false, true)});

        expect(component.inputCollapsed).toBe(false);
    });

    /* tslint:disable:max-line-length */
    it(`[NEED BETTER EXPECTATION] should toggle 'inputCollapsed' and emits 'inputCollapsedChange' if 'inputIsCollapsable is true and #toggleCollapse() is called`,
        () =>
        {
            let inputCollapsedChangeEmit:Spy = spyOn(component.inputCollapsedChange, 'emit');

            component.inputPortletHeader = portletHeader;
            component.inputIsCollapsable = true;
            component.inputCollapsed = false;
            fixture.detectChanges();

            expect(component.inputCollapsed).toBe(false);

            component.toggleCollapse();

            expect(component.inputCollapsed).toBe(true);
            expect(inputCollapsedChangeEmit).toHaveBeenCalledWith(true);

            component.toggleCollapse();

            expect(component.inputCollapsed).toBe(false);
            expect(inputCollapsedChangeEmit).toHaveBeenCalledWith(false);
        });

    it(`should set'inputCollapsed' to false when #toggleCollapse() is called and 'inputIsCollapsable is false`, () =>
    {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        component.inputCollapsed = true;
        fixture.detectChanges();

        expect(component.inputCollapsed).toBe(true);

        component.inputIsCollapsable = false;

        component.toggleCollapse();

        expect(component.inputCollapsed).toBe(false);
    });

    it(`should render a given 'inputButtonList' correctly`, () =>
    {
        component.inputPortletHeader = portletHeader;
        component.inputButtonList = buttonList;
        fixture.detectChanges();

        let htmlButtonDebugElements:Array<DebugElement> = debugElement.queryAll(By.css('div.header-buttons terra-button'));

        expect(htmlButtonDebugElements.length).toBe(buttonList.length);

        htmlButtonDebugElements.forEach((button:DebugElement, index:number) =>
        {
            testButton(button.componentInstance, buttonList[index]);
            testButtonClickFunction(button.componentInstance, buttonList[index]);
        });
    });

    function testButton(button:TerraButtonComponent, buttonInterface:TerraButtonInterface):void
    {
        expect(button.inputCaption).toBe(buttonInterface.caption);
        expect(button.inputIcon).toBe(buttonInterface.icon);
        expect(button.inputTooltipText).toBe(buttonInterface.tooltipText);
        expect(button.inputTooltipPlacement).toBe(buttonInterface.tooltipPlacement);
        expect(button.inputIsActive).toBe(buttonInterface.isActive);
        expect(button.inputIsDisabled).toBe(buttonInterface.isDisabled);
        expect(button.inputIsHidden).toBe(buttonInterface.isHidden);
        expect(button.inputIsDivider).toBe(buttonInterface.isDivider);
        expect(button.inputIsHighlighted).toBe(buttonInterface.isHighlighted);
        expect(button.inputIsSmall).toBe(true);
    }

    function testButtonClickFunction(button:TerraButtonComponent, buttonInterface:TerraButtonInterface):void
    {
        let buttonClickFunction:Spy = spyOn(buttonInterface, 'clickFunction');

        button.outputClicked.emit();
        expect(buttonClickFunction).toHaveBeenCalled();
    }
});
