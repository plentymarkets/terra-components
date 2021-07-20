import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableRowComponent } from './table-row.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TerraDataTableRowInterface } from '../interfaces/terra-data-table-row.interface';
import { Component, DebugElement } from '@angular/core';
import { noop } from 'rxjs';
import { MockTooltipDirective } from '../../../../testing/mock-tooltip.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TerraDataTableToken } from '../../table-token';

@Component({
    template: `<tr [tcTableRow]="row"></tr>`,
    viewProviders: [
        {
            provide: TerraDataTableToken,
            useValue: {
                rowClicked: noop,
                onRowCheckboxChange: noop,
                inputHasCheckboxes: true
            }
        }
    ]
})
class HostComponent {
    public row: TerraDataTableRowInterface<any> = {};
}

fdescribe('Component: TableRowComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: TableRowComponent;
    let dataTable: TerraDataTableToken<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MockTooltipDirective, TableRowComponent, HostComponent],
            imports: [FormsModule, MatCheckboxModule]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.debugElement.query(By.directive(TableRowComponent)).componentInstance;
        dataTable = fixture.debugElement.injector.get(TerraDataTableToken);
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
        expect(fixture.debugElement.query(By.css('mat-checkbox'))).toBeTruthy();

        dataTable.inputHasCheckboxes = false;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('mat-checkbox'))).toBeFalsy();
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

        const checkbox: DebugElement = fixture.debugElement.query(By.css('mat-checkbox'));

        checkbox.triggerEventHandler('change', {});

        fixture.detectChanges();

        expect(dataTable.onRowCheckboxChange).toHaveBeenCalledWith(rowData);
    });
});
