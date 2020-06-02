import { TerraThreeColumnsContainerComponent } from './terra-three-columns-container.component';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Component: TerraThreeColumnsContainerComponent', () =>
{
    let component:TerraThreeColumnsContainerComponent;
    let fixture:ComponentFixture<TerraThreeColumnsContainerComponent>;
    let columns:Array<HTMLDivElement>;
    let leftColumn:HTMLDivElement;
    let centerColumn:HTMLDivElement;
    let rightColumn:HTMLDivElement;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraThreeColumnsContainerComponent,
            ]
        });
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraThreeColumnsContainerComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        columns = fixture.debugElement.query(By.css('.row')).children.map((de:DebugElement) => de.nativeElement);
        leftColumn = columns[0];
        centerColumn = columns[1];
        rightColumn = columns[2];
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize its inputs', () =>
    {
        expect(component.leftColumnWidth).toEqual(4);
        expect(component.centerColumnWidth).toEqual(4);
        expect(component.rightColumnWidth).toEqual(4);
    });

    it('should initialize all columns with a width of 12 on extra small screens', () =>
    {
        expect(columns.every((column:HTMLDivElement) => column.classList.contains('col-12'))).toBeTruthy();
    });

    it('should initialize all columns with a width of 4 on medium screens', () =>
    {
        expect(columns.every((column:HTMLDivElement) => column.classList.contains('col-md-4'))).toBeTruthy();
    });

    it('should update the width of all columns correctly if the sum of column widths is 12', () =>
    {
        component.leftColumnWidth = 2;
        component.centerColumnWidth = 8;
        component.rightColumnWidth = 2;

        fixture.detectChanges();

        expect(leftColumn.classList.contains('col-md-2')).toBeTruthy();
        expect(centerColumn.classList.contains('col-md-8')).toBeTruthy();
        expect(rightColumn.classList.contains('col-md-2')).toBeTruthy();

        component.leftColumnWidth = 5;
        component.centerColumnWidth = 6;
        component.rightColumnWidth = 1;

        fixture.detectChanges();

        expect(leftColumn.classList.contains('col-md-5')).toBeTruthy();
        expect(centerColumn.classList.contains('col-md-6')).toBeTruthy();
        expect(rightColumn.classList.contains('col-md-1')).toBeTruthy();
    });

    it('should hide a column if its width is set to 0 or null', () =>
    {
        component.leftColumnWidth = 0;

        fixture.detectChanges();

        expect(leftColumn.hidden).toBe(true);
        expect(leftColumn.classList.contains('overflow-auto')).toBeTruthy();
        expect(leftColumn.classList.length).toEqual(1);

        component.centerColumnWidth = null;

        fixture.detectChanges();

        expect(centerColumn.hidden).toBe(true);
        expect(centerColumn.classList.contains('overflow-auto')).toBeTruthy();
        expect(centerColumn.classList.length).toEqual(1);

        component.rightColumnWidth = null;

        fixture.detectChanges();

        expect(rightColumn.hidden).toBe(true);
        expect(rightColumn.classList.contains('overflow-auto')).toBeTruthy();
        expect(rightColumn.classList.length).toEqual(1);

    });

    it('should handle a sum of column width smaller than 12 and fill up the last column so that it fits', () =>
    {
        component.leftColumnWidth = 2;
        component.centerColumnWidth = 4;
        component.rightColumnWidth = 4;

        component.ngOnChanges();

        fixture.detectChanges();

        expect(leftColumn.classList.contains('col-md-2')).toBeTruthy();
        expect(centerColumn.classList.contains('col-md-4')).toBeTruthy();
        expect(rightColumn.classList.contains('col-md-6')).toBeTruthy();
    });
});
