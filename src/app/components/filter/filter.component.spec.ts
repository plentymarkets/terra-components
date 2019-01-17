import {
    Component,
    DebugElement,
    ElementRef
} from '@angular/core';
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

import { By } from '@angular/platform-browser';
import Spy = jasmine.Spy;
import { FilterComponent } from './filter.component';
import { TerraBaseToolbarComponent } from '../toolbar/base-toolbar/terra-base-toolbar.component';
import { TerraButtonComponent } from '../buttons/button/terra-button.component';
import { TerraPortletComponent } from '../layouts/portlet/terra-portlet.component';
import { TerraSelectBoxComponent } from '../forms/select-box/terra-select-box.component';
import { TerraTextInputComponent } from '../forms/input/text-input/terra-text-input.component';
import { l10nConfig } from '../../translation/l10n.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TerraLabelTooltipDirective } from '../../helpers/terra-label-tooltip.directive';
import { FilterComponentExample } from './example/filter.component.example';
import { TerraInfoComponent } from '../info/terra-info.component';

describe('FilterComponent:', () =>
{
    let filterComponent:FilterComponent;
    let fixture:ComponentFixture<FilterComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraLabelTooltipDirective,
                TerraButtonComponent,
                TerraBaseToolbarComponent,
                TerraInfoComponent,
                TerraPortletComponent,
                FilterComponent,
                FilterComponentExample,
                TerraTextInputComponent,
                TerraSelectBoxComponent
            ],
            imports:      [
                TooltipModule.forRoot(),
                BrowserAnimationsModule,
                FormsModule,
                HttpModule,
                HttpClientModule,
                LocalizationModule.forRoot(l10nConfig),
                TooltipModule.forRoot()
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(FilterComponent);
        filterComponent = fixture.componentInstance;

        fixture.detectChanges();
    });

    it(`should create`, () =>
    {
        expect(filterComponent).toBeTruthy();
    });

    it(`should initialize correctly`, () =>
    {
        expect(filterComponent.resetTooltip).toBeUndefined();
        expect(filterComponent.onResetBtnClicked).toBeDefined();
        expect(filterComponent.onSearchBtnClicked).toBeDefined();
        expect(filterComponent.searchTooltip).toBeUndefined();
    });

    describe(`within a test host with inputs`, () =>
    {
        let testComponent:FilterComponentExample;
        let testFixture:ComponentFixture<FilterComponentExample>;
        let testFilterComponent:FilterComponent;
        let testFilterDebug:DebugElement;
        let buttons:Array<DebugElement>;

        beforeEach(() =>
        {
            testFixture = TestBed.createComponent(FilterComponentExample);
            testComponent = testFixture.componentInstance;
            testFilterDebug = testFixture.debugElement.query(By.css('tc-filter'));
            testFilterComponent = testFilterDebug.componentInstance;
            buttons = testFilterDebug.queryAll(By.css('form terra-base-toolbar div.btn-group terra-button'));
            testFixture.detectChanges();
        });

        it(`should create the host component`, () =>
        {
            expect(testComponent).toBeTruthy();
        });

        it(`should call #onSearchBtnClicked`, () =>
        {
            let spy:Spy = spyOn(testFilterComponent.onSearchBtnClicked, 'emit');

            buttons[0].componentInstance.outputClicked.emit();

            expect(spy).toHaveBeenCalled();
        });

        it(`should call #onResetBtnClicked`, () =>
        {
            let spy:Spy = spyOn(testFilterComponent.onResetBtnClicked, 'emit');

            buttons[1].componentInstance.outputClicked.emit();

            expect(spy).toHaveBeenCalled();
        });

        it(`should call #onResetBtnClicked`, () =>
        {
            let spy:Spy = spyOn(testFilterComponent.onResetBtnClicked, 'emit');

            buttons[1].componentInstance.outputClicked.emit();

            expect(spy).toHaveBeenCalled();
        });

        it(`should render buttons correctly`, () =>
        {
            let searchBtn:TerraButtonComponent = buttons[0].componentInstance;
            let resetBtn:TerraButtonComponent = buttons[1].componentInstance;

            expect(searchBtn.inputTooltipText).toBe(testFilterComponent.searchTooltip);
            expect(resetBtn.inputTooltipText).toBe(testFilterComponent.resetTooltip);
        });
    });
});
