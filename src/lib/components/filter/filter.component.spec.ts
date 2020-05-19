import { DebugElement } from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { LocalizationModule } from 'angular-l10n';

import { By } from '@angular/platform-browser';
import { FilterComponent } from './filter.component';
import { TerraBaseToolbarComponent } from '../toolbar/base-toolbar/terra-base-toolbar.component';
import { TerraButtonComponent } from '../buttons/button/terra-button.component';
import { TerraPortletComponent } from '../layouts/portlet/terra-portlet.component';
import { l10nConfig } from '../../../app/translation/l10n.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TerraLabelTooltipDirective } from '../../helpers/terra-label-tooltip.directive';
import { TerraInfoComponent } from '../info/terra-info.component';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../testing/mock-router';
import Spy = jasmine.Spy;

describe('FilterComponent:', () =>
{
    let filterComponent:FilterComponent;
    let fixture:ComponentFixture<FilterComponent>;
    let buttons:Array<DebugElement>;
    const router:MockRouter = new MockRouter();

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TooltipDirective,
                           TerraLabelTooltipDirective,
                           TerraButtonComponent,
                           TerraBaseToolbarComponent,
                           TerraInfoComponent,
                           TerraPortletComponent,
                           FilterComponent
            ],
            imports:      [
                BrowserAnimationsModule,
                LocalizationModule.forRoot(l10nConfig)
            ],
            providers:    [
                {
                    provide:  Router,
                    useValue: router
                }]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(FilterComponent);
        filterComponent = fixture.componentInstance;
        buttons = fixture.debugElement.queryAll(By.css('form terra-base-toolbar div.btn-group terra-button'));

        fixture.detectChanges();
    });

    it(`should create`, () =>
    {
        expect(filterComponent).toBeTruthy();
    });

    it(`should initialize correctly`, () =>
    {
        expect(filterComponent.reset).toBeDefined();
        expect(filterComponent.search).toBeDefined();
    });

    it(`should emit on #search if search button is clicked`, () =>
    {
        let spy:Spy = jasmine.createSpy('search');

        filterComponent.search.subscribe(() =>
        {
            spy();
        });

        buttons[0].componentInstance.outputClicked.emit();

        expect(spy).toHaveBeenCalled();
    });

    it(`should emit on #reset if reset button is clicked`, () =>
    {
        let spy:Spy = jasmine.createSpy('reset');

        filterComponent.reset.subscribe(() =>
        {
            spy();
        });

        buttons[1].componentInstance.outputClicked.emit();

        expect(spy).toHaveBeenCalled();
    });
});
