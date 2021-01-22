import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableRowComponent } from './table-row.component';
import { TerraDataTableComponent } from '../terra-data-table.component';
import { TerraCheckboxComponent } from '../../../forms/checkbox/terra-checkbox.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TerraDataTableRowInterface } from '../interfaces/terra-data-table-row.interface';
import { Component, DebugElement } from '@angular/core';
import { TooltipDirective } from '../../../tooltip/tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../../../testing/mock-router';
import { noop } from 'rxjs';

export const dataTableStub: Partial<TerraDataTableComponent<any, any>> = {
    rowClicked: noop,
    onRowCheckboxChange: noop,
    inputHasCheckboxes: true
};

@Component({
    template: `<tr [tcTableRow]="row"></tr>`,
    viewProviders: [
        {
            provide: TerraDataTableComponent,
            useValue: dataTableStub
        }
    ]
})
class HostComponent {
    public row: TerraDataTableRowInterface<any> = {};
}

describe('Component: TableRowComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: TableRowComponent;
    let dataTable: TerraDataTableComponent<any, any>;
    const router: MockRouter = new MockRouter();

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TooltipDirective, TableRowComponent, TerraCheckboxComponent, HostComponent],
            imports: [FormsModule],
            providers: [
                {
                    provide: Router,
                    useValue: router
                }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.debugElement.query(By.directive(TableRowComponent)).componentInstance;
        dataTable = fixture.debugElement.injector.get(TerraDataTableComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call data table #rowClicked() on click', () => {
        spyOn(dataTable, 'rowClicked');

        const tableRow: HTMLTableRowElement = fixture.debugElement.query(By.directive(TableRowComponent)).nativeElement;
        tableRow.click();

        expect(dataTable.rowClicked).toHaveBeenCalledWith(component.row);
    });

    it('should set classes according to rowData', () => {
        const tableRow: HTMLTableRowElement = fixture.debugElement.query(By.directive(TableRowComponent)).nativeElement;
        let rowData: TerraDataTableRowInterface<any> = {
            isActive: false,
            selected: false,
            disabled: false
        };

        component.row = rowData;

        fixture.detectChanges();

        expect(tableRow.classList).not.toContain('selected');
        expect(tableRow.classList).not.toContain('isActive');
        expect(tableRow.classList).not.toContain('disabled');

        rowData = {
            isActive: true,
            selected: true,
            disabled: true
        };

        component.row = rowData;

        fixture.detectChanges();

        expect(tableRow.classList).toContain('selected');
        expect(tableRow.classList).toContain('isActive');
        expect(tableRow.classList).toContain('disabled');
    });

    it('should toggle checkbox visibility', () => {
        expect(fixture.debugElement.query(By.css('terra-checkbox'))).toBeTruthy();

        dataTable.inputHasCheckboxes = false;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('terra-checkbox'))).toBeFalsy();
    });

    it('should call #_onRowCheckboxChange() when checkbox changes', () => {
        dataTable.inputHasCheckboxes = true;

        const rowData: TerraDataTableRowInterface<any> = {
            isActive: false,
            selected: false,
            disabled: false
        };

        spyOn(dataTable, 'onRowCheckboxChange');

        component.row = rowData;

        fixture.detectChanges();

        const checkbox: DebugElement = fixture.debugElement.query(By.css('terra-checkbox'));

        checkbox.triggerEventHandler('ngModelChange', {});

        fixture.detectChanges();

        expect(dataTable.onRowCheckboxChange).toHaveBeenCalledWith(rowData);
    });
});
