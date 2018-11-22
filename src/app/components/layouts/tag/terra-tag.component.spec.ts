import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import { TerraTagComponent } from '../../../..';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../translation/l10n.config';
import { HttpClientModule } from '@angular/common/http';
import { tagOne } from '../../../testing/mock-tags';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('TerraTagComponent', () =>
{
    let component:TerraTagComponent;
    let fixture:ComponentFixture<TerraTagComponent>;
    let tagDiv:DebugElement;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraTagComponent
            ],
            imports:      [
                HttpClientModule,
                LocalizationModule.forRoot(l10nConfig)
            ],
            providers:    []
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraTagComponent);
        component = fixture.componentInstance;

        tagDiv = fixture.debugElement.query(By.css('div.tag'));
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('`inputColor` should be equal to background-color style', () =>
    {
        expect(tagDiv.styles['background-color']).toBeFalsy(); // no background color set

        component.inputColor = tagOne.color;

        fixture.detectChanges();

        expect(tagDiv.styles['background-color']).toBe(component.inputColor);
    });

    it('`inputCustomClass` should set and equal to class of tagDiv', () =>
    {
        expect(tagDiv.classes).toBe({}); // no background color set

        component.inputCustomClass = 'myClass';

        fixture.detectChanges();

        expect(tagDiv.classes['myClass']).toBe(true);
    });
});
