import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TerraTwoColumnsContainerComponent } from './terra-two-columns-container.component';
import Spy = jasmine.Spy;

describe('TerraTwoColumnsContainerComponent', () => {
    let component: TerraTwoColumnsContainerComponent;
    let fixture: ComponentFixture<TerraTwoColumnsContainerComponent>;

    let left: DebugElement;
    let right: DebugElement;

    const colXs: string = 'col-';
    const colMd: string = 'col-md-';
    const colLg: string = 'col-lg-';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TerraTwoColumnsContainerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TerraTwoColumnsContainerComponent);
        component = fixture.componentInstance;

        left = fixture.debugElement.query(By.css('.row')).children[0];
        right = fixture.debugElement.query(By.css('.row')).children[1];

        fixture.detectChanges();
    });

    describe(`with default values`, () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it(`should have a default left column definition of 'col-12 col-md-3 col-lg-2'`, () => {
            expect(left.classes[colXs + 12]).toBe(true);
            expect(left.classes[colMd + 3]).toBe(true);
            expect(left.classes[colLg + 2]).toBe(true);
        });

        it(`should have a default right column definition of 'col-12 col-md-9 col-lg-10'`, () => {
            expect(right.classes[colXs + 12]).toBe(true);
            expect(right.classes[colMd + 9]).toBe(true);
            expect(right.classes[colLg + 10]).toBe(true);
        });
    });

    describe(`with 'leftColumnWidth' set to 6`, () => {
        beforeEach(() => {
            component.leftColumnWidth = 6;
            fixture.detectChanges();
        });

        it(`should have a left column width of 'col-12'`, () => {
            checkColumnClass(colXs, left.classes);
            expect(left.classes[colXs + 12]).toBe(true);
        });

        it(`should have a left column width of 'col-md-7'`, () => {
            checkColumnClass(colMd, left.classes);
            expect(left.classes[colMd + 7]).toBe(true);
        });

        it(`should have a left column width of 'col-lg-6'`, () => {
            checkColumnClass(colLg, left.classes);
            expect(left.classes[colLg + 6]).toBe(true);
        });

        it(`should have a right column width of 'col-12'`, () => {
            checkColumnClass(colXs, right.classes);
            expect(right.classes[colXs + 12]).toBe(true);
        });

        it(`should have a right column width of 'col-md-9'`, () => {
            checkColumnClass(colMd, right.classes);
            expect(right.classes[colMd + 5]).toBe(true);
        });

        it(`should have a right column width of 'col-lg-6'`, () => {
            checkColumnClass(colLg, right.classes);
            expect(right.classes[colLg + 6]).toBe(true);
        });
    });

    describe(`with 'leftColumnWidth' set to 15`, () => {
        let consoleErrorSpy: Spy;
        beforeEach(() => {
            consoleErrorSpy = spyOn(console, 'error');
            component.leftColumnWidth = 15;
            fixture.detectChanges();
        });

        afterEach(() => {
            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        });

        it(`should have a left column width of 'col-12'`, () => {
            checkColumnClass(colXs, left.classes);
            expect(left.classes[colXs + 12]).toBe(true);
        });

        it(`should have a left column width of 'col-md-12'`, () => {
            checkColumnClass(colMd, left.classes);
            expect(left.classes[colMd + 12]).toBe(true);
        });

        it(`should have a left column width of 'col-lg-11'`, () => {
            checkColumnClass(colLg, left.classes);
            expect(left.classes[colLg + 11]).toBe(true);
        });

        it(`should have a right column width of 'col-12'`, () => {
            checkColumnClass(colXs, right.classes);
            expect(right.classes[colXs + 12]).toBe(true);
        });

        it(`should have a right column width of 'col-md-1'`, () => {
            checkColumnClass(colMd, right.classes);
            expect(right.classes[colMd + 0]).toBe(true);
        });

        it(`should have a right column width of 'col-lg-1'`, () => {
            checkColumnClass(colLg, right.classes);
            expect(right.classes[colLg + 1]).toBe(true);
        });
    });

    describe(`with 'leftColumnWidth' set to -5`, () => {
        let consoleErrorSpy: Spy;
        beforeEach(() => {
            consoleErrorSpy = spyOn(console, 'error');
            component.leftColumnWidth = -5;
            fixture.detectChanges();
        });

        afterEach(() => {
            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        });

        it(`should have a left column width of 'col-12'`, () => {
            checkColumnClass(colXs, left.classes);
            expect(left.classes[colXs + 12]).toBe(true);
        });

        it(`should have a left column width of 'col-md-12'`, () => {
            checkColumnClass(colMd, left.classes);
            expect(left.classes[colMd + 2]).toBe(true);
        });

        it(`should have a left column width of 'col-lg-11'`, () => {
            checkColumnClass(colLg, left.classes);
            expect(left.classes[colLg + 1]).toBe(true);
        });

        it(`should have a right column width of 'col-12'`, () => {
            checkColumnClass(colXs, right.classes);
            expect(right.classes[colXs + 12]).toBe(true);
        });

        it(`should have a right column width of 'col-md-1'`, () => {
            checkColumnClass(colMd, right.classes);
            expect(right.classes[colMd + 10]).toBe(true);
        });

        it(`should have a right column width of 'col-lg-1'`, () => {
            checkColumnClass(colLg, right.classes);
            expect(right.classes[colLg + 11]).toBe(true);
        });
    });
});

function checkColumnClass(className: string, columnClasses: { [key: string]: boolean }): void {
    let count: number = Object.keys(columnClasses).filter(
        (key: string) => key.startsWith(className) && !isNaN(+key.replace(className, '')) && columnClasses[key]
    ).length;

    expect(count).toBe(1);
}
