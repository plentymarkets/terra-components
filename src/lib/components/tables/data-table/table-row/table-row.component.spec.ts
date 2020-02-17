import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TableRowComponent } from './table-row.component';
import { TerraDataTableComponent } from '../terra-data-table.component';
import { TerraCheckboxComponent } from '../../../forms/checkbox/terra-checkbox.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TerraDataTableRowInterface } from '../interfaces/terra-data-table-row.interface';
import { DebugElement } from '@angular/core';
import { TooltipDirective } from '../../../tooltip/tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../../../testing/mock-router';
import Spy = jasmine.Spy;

export const dataTableStub:Partial<TerraDataTableComponent<any, any>> =
    {
        rowClicked:          ():void =>
                             {
                                 return;
                             },
        onRowCheckboxChange: ():void =>
                             {
                                 return;
                             },
        inputHasCheckboxes:  true
    };

describe('Component: TableRowComponent', () =>
{
    let component:TableRowComponent;
    let dataTable:TerraDataTableComponent<any, any>;
    let fixture:ComponentFixture<TableRowComponent>;
    const router:MockRouter = new MockRouter();

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TooltipDirective,
                           TableRowComponent,
                           TerraCheckboxComponent,
            ],
            imports:      [
                FormsModule
            ],
            providers:    [
                {
                    provide:  Router,
                    useValue: router
                },
                {
                    provide:  TerraDataTableComponent,
                    useValue: dataTableStub
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TableRowComponent);
        component = fixture.componentInstance;
        dataTable = TestBed.get(TerraDataTableComponent);
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should call data table #rowClicked() on click', () =>
    {
        const rowClicked:Spy = spyOn(dataTable, 'rowClicked');

        fixture.debugElement.triggerEventHandler('click', {});

        expect(rowClicked).toHaveBeenCalled();
    });

    it('should set classes according to rowData', () =>
    {
        let rowData:TerraDataTableRowInterface<any> = {
            isActive: false,
            selected: false,
            disabled: false
        };

        component.row = rowData;

        fixture.detectChanges();

        expect(fixture.debugElement.classes['selected']).toBe(false);
        expect(fixture.debugElement.classes['isActive']).toBe(false);
        expect(fixture.debugElement.classes['disabled']).toBe(false);

        rowData = {
            isActive: true,
            selected: true,
            disabled: true
        };

        component.row = rowData;

        fixture.detectChanges();

        expect(fixture.debugElement.classes['selected']).toBe(true);
        expect(fixture.debugElement.classes['isActive']).toBe(true);
        expect(fixture.debugElement.classes['disabled']).toBe(true);
    });

    it('should toggle checkbox visibility', () =>
    {
        expect(fixture.debugElement.query(By.css('terra-checkbox'))).toBeTruthy();

        dataTable.inputHasCheckboxes = false;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('terra-checkbox'))).toBeFalsy();
    });

    it('should call #_onRowCheckboxChange() when checkbox changes', () =>
    {
        let rowData:TerraDataTableRowInterface<any> = {
            isActive: false,
            selected: false,
            disabled: false
        };

        const onRowCheckboxChange:Spy = spyOn(dataTable, 'onRowCheckboxChange');

        component.row = rowData;

        fixture.detectChanges();

        let checkbox:DebugElement = fixture.debugElement.query(By.css('terra-checkbox'));

        checkbox.triggerEventHandler('change', {});

        fixture.detectChanges();

        expect(onRowCheckboxChange).toHaveBeenCalledWith(rowData);
    });
});
