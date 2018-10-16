import { TerraThreeColumnsContainerComponent } from './terra-three-columns-container.component';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../translation/l10n.config';
import {
    DebugElement,
    ElementRef
} from '@angular/core';
import { MockElementRef } from '../../../../testing/mock-element-ref';
import { By } from '@angular/platform-browser';

fdescribe('Component: TerraThreeColumnsContainerComponent', () =>
{
    let component:TerraThreeColumnsContainerComponent;
    let fixture:ComponentFixture<TerraThreeColumnsContainerComponent>;
    let columns:Array<DebugElement>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraThreeColumnsContainerComponent,
            ],
            imports:      [
                LocalizationModule.forRoot(l10nConfig)
            ],
            providers: [
                { provide: ElementRef, useClass: MockElementRef }
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraThreeColumnsContainerComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        columns = fixture.debugElement.query(By.css('.row')).children;
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize all columns with a width of 12 on extra small screens', () =>
    {
        expect(columns.every((column:DebugElement) => column.classes.hasOwnProperty('col-xs-12'))).toBeTruthy();
    });

    it('should initialize all columns with a width of 4 on medium screens', () =>
    {
        expect(columns.every((column:DebugElement) => column.classes.hasOwnProperty('col-md-4'))).toBeTruthy();
    });

    it('should update the width on the left and the center column if "leftColumnWidth" is set', () =>
    {
        component.leftColumnWidth = 2;

        fixture.detectChanges();

        expect(columns[0].classes.hasOwnProperty('col-md-2')).toBeTruthy();
        expect(columns[1].classes.hasOwnProperty('col-md-6')).toBeTruthy();
        expect(columns[2].classes.hasOwnProperty('col-md-4')).toBeTruthy();
    });

    it('should update the width on the right and the center column if "rightColumnWidth" is set', () =>
    {
        component.rightColumnWidth = 2;

        fixture.detectChanges();

        expect(columns[0].classes.hasOwnProperty('col-md-4')).toBeTruthy();
        expect(columns[1].classes.hasOwnProperty('col-md-6')).toBeTruthy();
        expect(columns[2].classes.hasOwnProperty('col-md-2')).toBeTruthy();
    });

    it('should handle falsy inputs and limit them to the maximum or minimum possible', () =>
    {
        component.leftColumnWidth = 13;

        fixture.detectChanges();

        expect(columns[0].classes.hasOwnProperty('col-md-7')).toBeTruthy();
        expect(columns[1].classes.hasOwnProperty('col-md-1')).toBeTruthy();
        expect(columns[2].classes.hasOwnProperty('col-md-4')).toBeTruthy();

        component.rightColumnWidth = -1;

        fixture.detectChanges();

        expect(columns[0].classes.hasOwnProperty('col-md-7')).toBeTruthy();
        expect(columns[1].classes.hasOwnProperty('col-md-4')).toBeTruthy();
        expect(columns[2].classes.hasOwnProperty('col-md-1')).toBeTruthy();
    });
});
