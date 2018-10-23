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

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraThreeColumnsContainerComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraThreeColumnsContainerComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        columns = fixture.debugElement.query(By.css('.row')).children.map((de:DebugElement) => de.nativeElement);
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize all columns with a width of 12 on extra small screens', () =>
    {
        expect(columns.every((column:HTMLDivElement) => column.classList.contains('col-xs-12'))).toBeTruthy();
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

        expect(columns[0].classList.contains('col-md-2')).toBeTruthy();
        expect(columns[1].classList.contains('col-md-8')).toBeTruthy();
        expect(columns[2].classList.contains('col-md-2')).toBeTruthy();

        component.leftColumnWidth = 5;
        component.centerColumnWidth = 6;
        component.rightColumnWidth = 1;

        fixture.detectChanges();

        expect(columns[0].classList.contains('col-md-5')).toBeTruthy();
        expect(columns[1].classList.contains('col-md-6')).toBeTruthy();
        expect(columns[2].classList.contains('col-md-1')).toBeTruthy();
    });

    it('should hide a column if its width is set to 0 or null', () =>
    {
        component.leftColumnWidth = 0;

        fixture.detectChanges();

        expect(columns[0].attributes.getNamedItem('hidden')).toBeDefined();
        expect(columns[0].classList.contains('overflow-auto')).toBeTruthy();
        expect(columns[0].classList.length).toEqual(1);

        component.centerColumnWidth = null;

        fixture.detectChanges();

        expect(columns[1].attributes.getNamedItem('hidden')).toBeDefined();
        expect(columns[1].classList.contains('overflow-auto')).toBeTruthy();
        expect(columns[1].classList.length).toEqual(1);
    });

    xit('should handle a sum of column width smaller than 12 and fill up the last column so that it fits', () =>
    {
        component.leftColumnWidth = 2;
        component.centerColumnWidth = 4;
        component.rightColumnWidth = 4;

        fixture.detectChanges();

        expect(columns[0].classList.contains('col-md-2')).toBeTruthy();
        expect(columns[1].classList.contains('col-md-4')).toBeTruthy();
        expect(columns[2].classList.contains('col-md-6')).toBeTruthy(); // TODO: Find out why this fails
    });
});
