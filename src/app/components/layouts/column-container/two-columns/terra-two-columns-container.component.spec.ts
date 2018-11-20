import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TooltipModule } from 'ngx-bootstrap';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../translation/l10n.config';
import { TerraTwoColumnsContainerComponent } from '../../../../../index';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TerraTwoColumnsContainerComponent', () =>
{
    let component:TerraTwoColumnsContainerComponent;
    let fixture:ComponentFixture<TerraTwoColumnsContainerComponent>;

    let left:DebugElement;
    let right:DebugElement;

    let colXs:string = 'col-xs-';
    let colMd:string = 'col-md-';
    let colLg:string = 'col-lg-';

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraTwoColumnsContainerComponent
            ],
            imports:      [
                TooltipModule.forRoot(),
                LocalizationModule.forRoot(l10nConfig)
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraTwoColumnsContainerComponent);
        component = fixture.componentInstance;

        left = fixture.debugElement.query(By.css('.row')).children[0];
        right = fixture.debugElement.query(By.css('.row')).children[1];

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    /**
     * Test for left column
     */
    it('should have a default left column definition of `col-xs-12`', () =>
    {
        expect(left.classes[colXs + 12]).toBe(true);
    });

    it('should have a default left column definition of `col-md-3`', () =>
    {
        expect(left.classes[colMd + 3]).toBe(true);
    });

    it('should have a default left column definition of `col-lg-2`', () =>
    {
        expect(left.classes[colLg + 2]).toBe(true);
    });

    it('should a have left column width of `col-xs-12` when `leftColumnWidth` set to 6', () =>
    {
        component.leftColumnWidth = 6;
        fixture.detectChanges();
        expect(left.classes[colXs + 12]).toBe(true);
    });

    it('should a have left column width of `col-md-7` and not default value when `leftColumnWidth` set to 6', () =>
    {
        component.leftColumnWidth = 6;
        fixture.detectChanges();
        expect(left.classes[colMd + 3]).toBe(false);
        expect(left.classes[colMd + 7]).toBe(true);
    });

    it('should a have left column width of `col-lg-6` and not default value when `leftColumnWidth` set to 6', () =>
    {
        component.leftColumnWidth = 6;
        fixture.detectChanges();
        expect(left.classes[colLg + 2]).toBe(false);
        expect(left.classes[colLg + 6]).toBe(true);
    });

    it('should a have left column width of `col-xs-12` when `leftColumnWidth` set to 15', () =>
    {
        component.leftColumnWidth = 15;
        fixture.detectChanges();
        expect(left.classes[colXs + 12]).toBe(true);
    });

    it('should a have left column width of `col-md-12` and not default value when `leftColumnWidth` set to 15', () =>
    {
        component.leftColumnWidth = 15;
        fixture.detectChanges();
        expect(left.classes[colMd + 3]).toBe(false);
        expect(left.classes[colMd + 12]).toBe(true);
    });

    it('should a have left column width of `col-lg-11` and not default value when `leftColumnWidth` set to 15', () =>
    {
        component.leftColumnWidth = 15;
        fixture.detectChanges();
        expect(left.classes[colLg + 2]).toBe(false);
        expect(left.classes[colLg + 11]).toBe(true);
    });

    it('should a have left column width of `col-xs-12` when `leftColumnWidth` set to -5', () =>
    {
        component.leftColumnWidth = -5;
        fixture.detectChanges();
        expect(left.classes[colXs + 12]).toBe(true);
    });

    it('should a have left column width of `col-md-2` and not default value when `leftColumnWidth` set to -5', () =>
    {
        component.leftColumnWidth = -5;
        fixture.detectChanges();
        expect(left.classes[colMd + 3]).toBe(false);
        expect(left.classes[colMd + 2]).toBe(true);
    });

    it('should a have left column width of `col-lg-1` and not default value when `leftColumnWidth` set to -5', () =>
    {
        component.leftColumnWidth = -5;
        fixture.detectChanges();
        expect(left.classes[colLg + 2]).toBe(false);
        expect(left.classes[colLg + 1]).toBe(true);
    });


    /**
     * Test for right column
     */
    it('should have a default right column definition of `col-xs-12`', () =>
    {
        expect(right.classes[colXs + 12]).toBe(true);
    });

    it('should have a default right column definition of `col-md-9`', () =>
    {
        expect(right.classes[colMd + 9]).toBe(true);
    });

    it('should have a default right column definition of `col-lg-10`', () =>
    {
        expect(right.classes[colLg + 10]).toBe(true);
    });

    it('should a have right column width of `col-xs-12` when `leftColumnWidth` set to 6', () =>
    {
        component.leftColumnWidth = 6;
        fixture.detectChanges();
        expect(right.classes[colXs + 12]).toBe(true);
    });

    it('should a have right column width of `col-md-9` and not default value when `leftColumnWidth` set to 6', () =>
    {
        component.leftColumnWidth = 6;
        fixture.detectChanges();
        expect(right.classes[colMd + 9]).toBe(false);
        expect(right.classes[colMd + 5]).toBe(true);
    });

    it('should a have right column width of `col-lg-6` and not default value when `leftColumnWidth` set to 6', () =>
    {
        component.leftColumnWidth = 6;
        fixture.detectChanges();
        expect(right.classes[colLg + 10]).toBe(false);
        expect(right.classes[colLg + 6]).toBe(true);
    });

    it('should a have right column width of `col-xs-12` when `leftColumnWidth` set to 15', () =>
    {
        component.leftColumnWidth = 15;
        fixture.detectChanges();
        expect(right.classes[colXs + 12]).toBe(true);
    });

    it('should a have right column width of `col-md-1` and not default value when `leftColumnWidth` set to 15', () =>
    {
        component.leftColumnWidth = 15;
        fixture.detectChanges();
        expect(right.classes[colMd + 9]).toBe(false);
        expect(right.classes[colMd + 0]).toBe(true);
    });

    it('should a have right column width of `col-lg-1` and not default value when `leftColumnWidth` set to 15', () =>
    {
        component.leftColumnWidth = 15;
        fixture.detectChanges();
        expect(right.classes[colLg + 10]).toBe(false);
        expect(right.classes[colLg + 1]).toBe(true);
    });


    it('should a have right column width of `col-xs-12` when `leftColumnWidth` set to -5', () =>
    {
        component.leftColumnWidth = -5;
        fixture.detectChanges();
        expect(right.classes[colXs + 12]).toBe(true);
    });

    it('should a have right column width of `col-md-1` and not default value when `leftColumnWidth` set to -5', () =>
    {
        component.leftColumnWidth = -5;
        fixture.detectChanges();
        expect(right.classes[colMd + 9]).toBe(false);
        expect(right.classes[colMd + 10]).toBe(true);
    });

    it('should a have right column width of `col-lg-1` and not default value when `leftColumnWidth` set to -5', () =>
    {
        component.leftColumnWidth = -5;
        fixture.detectChanges();
        expect(right.classes[colLg + 10]).toBe(false);
        expect(right.classes[colLg + 11]).toBe(true);
    });
});
