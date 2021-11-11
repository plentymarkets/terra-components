import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { L10nTranslationModule } from 'angular-l10n';
import { DebugElement, SimpleChange } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { buttonList } from '../../../testing/mock-buttons';
import { TerraPortletComponent } from './terra-portlet.component';
import { TerraButtonComponent } from '../../buttons/button/terra-button.component';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';
import { TerraInfoComponent } from '../../info/terra-info.component';
import { mockL10nConfig } from '../../../testing/mock-l10n-config';
import { MockTooltipDirective } from '../../../testing/mock-tooltip.directive';
import Spy = jasmine.Spy;

describe('TerraPortletComponent', () => {
    let component: TerraPortletComponent;
    let fixture: ComponentFixture<TerraPortletComponent>;
    let debugElement: DebugElement;

    const portletHeader: string = 'What is my purpose?';

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MockTooltipDirective, TerraPortletComponent, TerraButtonComponent, TerraInfoComponent],
            imports: [FormsModule, NoopAnimationsModule, L10nTranslationModule.forRoot(mockL10nConfig)]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TerraPortletComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        fixture.detectChanges();
    });

    it(`should create an instance`, () => {
        expect(component).toBeTruthy();
    });

    it(`should initialize with the correct values`, () => {
        expect(component.inputHighlightPortlet).toBe(false);
        expect(component.inputPortletHeader).toBeUndefined();
        expect(component.inputIsCollapsable).toBe(false);
        expect(component.inputCollapsed).toBe(false);
        expect(component.inputIsDisabled).toBe(false);
        expect(component.inputButtonList).toEqual([]);
        expect(component.infoText).toBeUndefined();
    });

    it(`should set classes accordingly to 'inputIsCollapsable', 'inputHighlightPortlet' and 'inputIsDisabled'`, () => {
        const portletDiv: DebugElement = debugElement.query(By.css('div.portlet'));

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

    it(`should have a visible header after 'inputPortletHeader' is set`, () => {
        expect(debugElement.query(By.css('div.portlet-head'))).toBeFalsy();

        component.inputPortletHeader = portletHeader;
        fixture.detectChanges();

        expect(debugElement.query(By.css('div.portlet-head'))).toBeTruthy();
    });

    it(`should have his header unfolded/folded according 'inputCollapsed = false' or 'inputCollapsed = true'`, () => {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        fixture.detectChanges();

        let portletHead: DebugElement = debugElement.query(By.css('div.portlet-head'));

        expect(portletHead.classes['unfolded']).toBe(true);

        component.inputCollapsed = true;
        fixture.detectChanges();

        expect(portletHead.classes['unfolded']).toBeFalsy();
    });

    it(`should call #toggleCollapse() if his header is clicked`, () => {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        fixture.detectChanges();

        let onHeaderClick: Spy = spyOn(component, 'toggleCollapse');

        debugElement.query(By.css('div.portlet-head')).triggerEventHandler('click', null);

        expect(onHeaderClick).toHaveBeenCalled();
    });

    it(`should show the correct collapse icon depending on 'inputCollapsed' state`, () => {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        fixture.detectChanges();

        expect(component.inputCollapsed).toBe(false);
        expect(debugElement.query(By.css('span.icon-collapse_down'))).toBeFalsy();
        expect(debugElement.query(By.css('span.icon-collapse_up'))).toBeTruthy();

        debugElement.query(By.css('div.portlet-head')).triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(component.inputCollapsed).toBe(true);
        expect(debugElement.query(By.css('span.icon-collapse_down'))).toBeTruthy();
        expect(debugElement.query(By.css('span.icon-collapse_up'))).toBeFalsy();
    });

    it(`should keep the collapse state when disabled`, () => {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        component.inputIsDisabled = true;
        fixture.detectChanges();

        let onHeaderClick: Spy = spyOn(component, 'toggleCollapse');

        expect(component.inputCollapsed).toBe(false);
        expect(debugElement.query(By.css('span.icon-collapse_down'))).toBeFalsy();
        expect(debugElement.query(By.css('span.icon-collapse_up'))).toBeTruthy();

        debugElement.query(By.css('div.portlet-head')).triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(onHeaderClick).toHaveBeenCalled();
        expect(component.inputCollapsed).toBe(false);
        expect(debugElement.query(By.css('span.icon-collapse_down'))).toBeFalsy();
        expect(debugElement.query(By.css('span.icon-collapse_up'))).toBeTruthy();
    });

    it(`should show collapse icon only if 'inputIsCollapsable' is set to true`, () => {
        component.inputPortletHeader = portletHeader;
        fixture.detectChanges();

        expect(debugElement.query(By.css('span.icon-collapse_up'))).toBeFalsy();

        component.inputIsCollapsable = true;
        fixture.detectChanges();

        expect(debugElement.query(By.css('span.icon-collapse_up'))).toBeTruthy();
    });

    it(`should set classes on portlet-body depending on it's #collapsedState()`, () => {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        fixture.detectChanges();

        expect(debugElement.query(By.css('div.portlet-body')).classes['collapsed']).toBeFalsy();

        debugElement.query(By.css('div.portlet-head')).triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(debugElement.query(By.css('div.portlet-body')).classes['collapsed']).toBe(true);

        debugElement.query(By.css('div.portlet-head')).triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(debugElement.query(By.css('div.portlet-body')).classes['collapsed']).toBeFalsy();
    });

    it(`should update view correctly if 'inputIsCollapsable' is changed`, () => {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        fixture.detectChanges();

        component.inputIsCollapsable = false;
        component.inputCollapsedChange.subscribe((value: boolean) => expect(value).toBe(false));

        component.ngOnChanges({ inputIsCollapsable: new SimpleChange(true, false, true) });

        expect(component.inputCollapsed).toBe(false);
    });

    /* tslint:disable:max-line-length */
    it(`[NEED BETTER EXPECTATION] should toggle 'inputCollapsed' and emits 'inputCollapsedChange' if 'inputIsCollapsable is true and #toggleCollapse() is called`, () => {
        let inputCollapsedChangeEmit: Spy = spyOn(component.inputCollapsedChange, 'emit');

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

    it(`should set'inputCollapsed' to false when #toggleCollapse() is called and 'inputIsCollapsable is false`, () => {
        component.inputPortletHeader = portletHeader;
        component.inputIsCollapsable = true;
        component.inputCollapsed = true;
        fixture.detectChanges();

        expect(component.inputCollapsed).toBe(true);

        component.inputIsCollapsable = false;

        component.toggleCollapse();

        expect(component.inputCollapsed).toBe(false);
    });

    it(`should render a given 'inputButtonList' correctly`, () => {
        component.inputPortletHeader = portletHeader;
        component.inputButtonList = buttonList;
        fixture.detectChanges();

        let htmlButtonDebugElements: Array<DebugElement> = debugElement.queryAll(
            By.css('div.header-buttons terra-button')
        );

        expect(htmlButtonDebugElements.length).toBe(buttonList.length);

        htmlButtonDebugElements.forEach((button: DebugElement, index: number) => {
            testButton(button.componentInstance, buttonList[index]);
            testButtonClickFunction(button.componentInstance, buttonList[index]);
        });
    });

    it(`should render the info component if 'infoText' is set`, () => {
        let infoElement: DebugElement;
        component.inputPortletHeader = 'Test header';
        fixture.detectChanges();

        infoElement = debugElement.query(By.css('terra-info'));
        expect(infoElement).toBeFalsy();

        component.infoText = 'info text';
        fixture.detectChanges();

        infoElement = debugElement.query(By.css('terra-info'));
        expect(infoElement).toBeTruthy();
    });

    function testButton(button: TerraButtonComponent, buttonInterface: TerraButtonInterface): void {
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

    function testButtonClickFunction(button: TerraButtonComponent, buttonInterface: TerraButtonInterface): void {
        let buttonClickFunction: Spy = spyOn(buttonInterface, 'clickFunction');

        button.outputClicked.emit();
        expect(buttonClickFunction).toHaveBeenCalled();
    }
});
